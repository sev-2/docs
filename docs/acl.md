---
title: Access Control Lists (ACL)
---

# Access Control Lists (ACL)

## Overview

In Supabase, ACL (Access Control Lists) and RLS (Row-Level Security) are essential components for managing access to data and ensuring data security within the platform. ACL and RLS provide powerful tools for controlling access to data at both the database object and row levels. They enable administrators to define fine-grained access control rules, ensuring data security and compliance with privacy requirements. Here's an overview of how they work:

- Supabase leverages PostgreSQL's built-in Row-Level Security (RLS) feature to control access to individual rows within a table based on specific criteria.
- ACL refers to the management of access permissions at the database object level, including tables, schemas, functions, etc.
- Model definition in Raiden can be used for managing access control. The ACL allows to grant or revoke permissions to users and roles.
- Enforcement occurs automatically, regardless of how users interact with the database, whether through SQL queries, RPC, application code, or Supabase's client libraries.

## Role Definition

::: code-group

```go [internal/roles/anon.go]
package roles

import (
    "github.com/sev-2/raiden/pkg/postgres"
)

```

:::

## ACL Definition on Model

You can ACL value on model. Please read [Model](/docs/model) to know more about it.

```go
type Books struct {
    // ...

    Acl string `read:"" write:"public"` // [!code highlight]
}
```

There are `read` and `write` method of ACL. Insert, update, and delete are included in `write`.

The available values:
- `"public"`: data on this model accessible by public.
- `"authenticated"`: only authenticated users are be able to access data on this model.
- `""`: no one can access.

::: info
Service key can bypass the ACL.
:::
