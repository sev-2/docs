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

    "github.com/sev-2/raiden"
)

type Books struct {
    raiden.ModelBase

    Id        int64      `json:"id,omitempty" column:"name:id;type:bigint;primaryKey;autoIncrement;nullable:false"`
    Title     *string    `json:"title,omitempty" column:"name:title;type:varchar;nullable;default:'255'::character varying"`
    Body      *string    `json:"body,omitempty" column:"name:body;type:text;nullable"`
    CreatedAt *time.Time `json:"created_at,omitempty" column:"name:created_at;type:timestampz;nullable;default:now()"`

    // Table information
    Metadata string `json:"-" schema:"public"`

    // Access control
    Acl string `json:"-" read:"" write:""`
}
```

:::

You can create a column of a table by define it with `column:` struct tag.
The type of column based on Go struct's field type.

Available struct tag values inside `column:`:

| Name            | Required | Description |
|-----------------|----------| ------------|
| `name`          | Yes      | The name of column. |
| `type`          | Yes      | [PostgreSQL data types](https://www.postgresql.org/docs/current/datatype.html) such as `bigint`, `boolean`, `varying`, `text`, `date` |
| `primaryKey`    | No       | Column with this key will be Primary Key. |
| `autoIncrement` | No       | Column with this key will be auto-incrementing. The column must be a numeric. |
| `nullable`      | No       | To determine a column is nullable or not by define `nullable:true` or `nullable:false`. |
| `default`       | No       | The default value of column based on column data type. Example: `default:'255'` or `default:now()`. |

The `json:"body,omitempty` will be the JSON key of response.
To understand about JSON encoding on Go, read https://pkg.go.dev/encoding/json.

### Metadata

You can set which is the schema of a table will be created by update schema on Metadata field.
Usually the value of schema is `public`.

```go
type Books struct {
    // ...

    Metadata string `json:"-" schema:"public"` // [!code highlight]
}
```

### ACL

Please refers to [ACL documentation](/docs/acl).
