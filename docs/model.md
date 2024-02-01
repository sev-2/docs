---
title: Model
---

# Model

## Overview

Model refers to the structure and schema of your database tables, as well as the data managed within those tables. Raiden provides a way help you define, manage, and interact with your models effectively, empowering you to build powerful and scalable applications on top of PostgreSQL.

## Model definition

You have two options to define a model:

1. Using Supabase Studio. You can create a new table on Studio, then run `raiden generate`. It will generate new model with the name same as the table name.

2. Create your own definition. After create your own model, you can run `raiden generate` to auto-sync with the database table. The new table, new column, of modified column will be created or updated according to your model.

Here is the model structure:

::: code-group

```go [internal/models/books.go]
package models

import (
    "time"
)

type Books struct {
    Id int64 `json:"id,omitempty" column:"id"`
    Title *string `json:"title,omitempty" column:"title"`
    Body *string `json:"body,omitempty" column:"body"`
    CreatedAt *time.Time `json:"created_at,omitempty" column:"created_at"`

    Metadata string `schema:"public"`
    Acl string `read:"" write:"public"`
}
```

:::

You can create a column of a table by define it with `column:"name"`.
The type of column based on Go struct's field type.

The `json:"body,omitempty` will be the JSON key of response.
To understand about JSON encoding on Go, read https://pkg.go.dev/encoding/json.

### Metadata

You can set which is the schema of a table will be created by update schema on Metadata field.
Usually the value of schema is `public`.

```go
type Books struct {
    // ...

    Metadata string `schema:"public"` // [!code highlight]
}
```

### ACL

Please refers to [ACL documentation](/docs/acl).
