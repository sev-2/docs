---
title: Access Control Lists (ACL)
---

# Access Control Lists (ACL)

## Overview

Raiden uses PostgreSQL's Row-Level Security (RLS) to control access to individual rows. ACL rules are defined programmatically using the `Acl` struct and a fluent Rule builder API. When applied, these rules translate to Postgres RLS policies.

Key concepts:

- **RLS** controls access at the row level — enforcement occurs automatically regardless of how users interact with the database.
- **ACL** in Raiden provides a Go API to define, enable, and manage RLS policies on your models and storage buckets.
- The **service key** can bypass all ACL rules.

## Enabling ACL on a Model

Add an `Acl` field to your model and implement the `ConfigureAcl()` method:

```go
package models

import (
	"github.com/sev-2/raiden"
	"github.com/sev-2/raiden/pkg/builder"
	"github.com/sev-2/raiden/pkg/db"
)

type Articles struct {
	db.ModelBase
	Id        int64  `json:"id,omitempty" column:"name:id;type:bigint;primaryKey;autoIncrement;nullable:false"`
	Title     string `json:"title,omitempty" column:"name:title;type:text;nullable:false"`
	AuthorId  string `json:"author_id,omitempty" column:"name:author_id;type:uuid;nullable:false"`

	Metadata string `json:"-" schema:"public" tableName:"articles" rlsEnable:"true" rlsForced:"false"`

	// Access control // [!code highlight]
	Acl raiden.Acl // [!code highlight]
}

func (m *Articles) ConfigureAcl() { // [!code highlight]
	m.Acl.Enable()
	m.Acl.Define(
		raiden.Rule("anyone_can_read").
			For("anon", "authenticated").
			To(raiden.CommandSelect),

		raiden.Rule("author_can_insert").
			For("authenticated").
			To(raiden.CommandInsert).
			Check(builder.OwnerIsAuth("author_id")),

		raiden.Rule("author_can_update").
			For("authenticated").
			To(raiden.CommandUpdate).
			Using(builder.OwnerIsAuth("author_id")).
			Check(builder.OwnerIsAuth("author_id")),

		raiden.Rule("author_can_delete").
			For("authenticated").
			To(raiden.CommandDelete).
			Using(builder.OwnerIsAuth("author_id")),
	)
}
```

### Acl Methods

| Method       | Description                                        |
|--------------|----------------------------------------------------|
| `Enable()`   | Enable RLS on the table                            |
| `Forced()`   | Force RLS even for the table owner                 |
| `Define()`   | Define one or more RLS rules                       |

## Rule Builder

Create rules using the fluent builder: `raiden.Rule(name)`.

```go
raiden.Rule("rule_name").
	For("authenticated").        // target roles
	To(raiden.CommandSelect).    // SQL command
	Using(clause).               // USING clause (row visibility)
	Check(clause).               // WITH CHECK clause (row mutation)
	WithPermissive()             // or WithRestrictive()
```

### Rule Methods

| Method              | Description                                                   |
|---------------------|---------------------------------------------------------------|
| `For(roles...)`     | Specify which database roles this rule applies to              |
| `To(command)`       | The SQL command this rule governs                              |
| `Using(clause)`     | The `USING` expression — controls which rows are visible       |
| `Check(clause)`     | The `WITH CHECK` expression — controls which rows can be written |
| `WithPermissive()`  | Set mode to PERMISSIVE (default). Multiple permissive policies are OR'd |
| `WithRestrictive()` | Set mode to RESTRICTIVE. Restrictive policies are AND'd with permissive ones |

### Commands

| Constant             | Description                               |
|----------------------|-------------------------------------------|
| `raiden.CommandAll`    | Applies to all operations                 |
| `raiden.CommandSelect` | SELECT (read)                             |
| `raiden.CommandInsert` | INSERT                                    |
| `raiden.CommandUpdate` | UPDATE                                    |
| `raiden.CommandDelete` | DELETE                                    |

### Which Clauses Apply to Which Commands

| Command  | USING | WITH CHECK |
|----------|-------|------------|
| SELECT   | Yes   | —          |
| INSERT   | —     | Yes        |
| UPDATE   | Yes   | Yes        |
| DELETE   | Yes   | —          |
| ALL      | Yes   | Yes        |

## Expression Builder

The `builder` package (`github.com/sev-2/raiden/pkg/builder`) provides a DSL for building type-safe RLS clauses. Import it alongside `raiden`:

```go
import "github.com/sev-2/raiden/pkg/builder"
```

### Common Expressions

```go
// Current authenticated user's UUID
builder.AuthUID()

// Check if a column equals the authenticated user
builder.OwnerIsAuth("user_id")

// Check JWT role
builder.RoleIs("admin")
builder.RolesAny("admin", "moderator")

// Column comparisons
builder.Eq("status", builder.String("active"))
builder.Ne("role", builder.String("banned"))
builder.Gt("age", builder.Int64(18))
builder.IsNull("deleted_at")
builder.NotNull("email")

// Logical operators
builder.And(clause1, clause2)
builder.Or(clause1, clause2)
builder.Not(clause1)

// IN / NOT IN
builder.In("status", builder.String("active"), builder.String("pending"))
builder.InStrings("role", "admin", "editor")

// LIKE / pattern matching
builder.Like("name", "%smith%")
builder.ILike("email", "%@example.com")
builder.StartsWith("name", "John")
builder.ContainsText("bio", "golang")

// BETWEEN
builder.Between("age", builder.Int64(18), builder.Int64(65))

// JSON/JSONB
builder.JSONGetText("metadata", "category")
builder.JSONContains("tags", builder.JSONB(`["featured"]`))
builder.JSONHasKey("config", "enabled")

// EXISTS subquery
builder.ExistsFrom("public.team_members",
	builder.Eq("team_members.user_id", builder.AuthUID()),
	builder.Eq("team_members.team_id", builder.Ident("teams.id")),
)

// Multi-tenant helpers
builder.TenantMatch("org_id", "request.jwt.claims", "uuid")
builder.InOrg("organization_id")
```

### Value Constructors

| Function                | Description                                |
|-------------------------|--------------------------------------------|
| `builder.String(s)`     | SQL string literal `'...'`                 |
| `builder.Int64(n)`      | Integer literal                            |
| `builder.Float64(f)`    | Float literal                              |
| `builder.Bool(b)`       | `TRUE` or `FALSE`                          |
| `builder.UUID(s)`       | String cast to `::uuid`                    |
| `builder.Raw(s)`        | Raw trusted SQL fragment                   |
| `builder.Ident(name)`   | Quoted identifier (e.g., column reference) |
| `builder.AuthUID()`     | `auth.uid()`                               |
| `builder.CurrentUser()` | `current_user`                             |
| `builder.Now()`         | `now()`                                    |
| `builder.Date(s)`       | String cast to `::date`                    |
| `builder.Timestamp(s)`  | String cast to `::timestamp`               |

## ACL on Storage

Storage buckets also support ACL via the same API. See [Storage](/docs/storage) for details.

```go
type SecureStorage struct {
	raiden.BucketBase
	Acl raiden.Acl
}

func (s *SecureStorage) Name() string {
	return "secure"
}

func (s *SecureStorage) ConfigureAcl() {
	s.Acl.Enable()
	s.Acl.Define(
		raiden.Rule("auth_read").
			For("authenticated").
			To(raiden.CommandSelect).
			Using(builder.OwnerIsAuth("owner")),
	)
}
```

Storage ACL policies are scoped to the `storage.objects` table with an automatic `bucket_id` filter.

::: info
The service key bypasses all ACL rules.
:::
