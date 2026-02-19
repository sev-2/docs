---
title: Custom Types
---

# Custom Types

Raiden supports defining custom PostgreSQL types (enums and composite types) as Go structs. These are synced to the database when you run `raiden apply`.

## Defining an Enum Type

Create type files in the `internal/types/` directory. An enum type implements the `Type` interface by embedding `raiden.TypeBase` and overriding the required methods.

::: code-group

```go [internal/types/creator_type.go]
package types

import (
	"github.com/sev-2/raiden"
)

const (
	CreatorTypeCreator = "creator"
	CreatorTypeBrand   = "brand"
)

type CreatorType struct {
	raiden.TypeBase
}

func (t *CreatorType) Name() string {
	return "creator_type"
}

func (t *CreatorType) Format() string {
	return "creator_type"
}

func (t *CreatorType) Enums() []string {
	return []string{CreatorTypeCreator, CreatorTypeBrand}
}
```

:::

## Type Interface

| Method         | Return Type                  | Default        | Description                                         |
|----------------|------------------------------|----------------|-----------------------------------------------------|
| `Name()`       | `string`                     | `""`           | **Required.** The PostgreSQL type name               |
| `Schema()`     | `string`                     | `"public"`     | The schema where the type is created                 |
| `Format()`     | `string`                     | `""`           | The type format identifier                           |
| `Enums()`      | `[]string`                   | `[]`           | List of allowed enum values                          |
| `Attributes()` | `[]objects.TypeAttribute`    | `[]`           | Composite type attributes (for non-enum types)       |
| `Comment()`    | `*string`                    | `nil`          | Optional comment for the type                        |

## TypeBase

`TypeBase` provides default implementations for all methods plus value handling:

| Method           | Description                                                |
|------------------|------------------------------------------------------------|
| `SetValue(v)`    | Set the value (validates against `Enums()` if defined)     |
| `GetValue()`     | Get the current value                                      |
| `String()`       | Return the value as a string                               |
| `MarshalJSON()`  | Custom JSON marshaling (serializes the value directly)     |
| `UnmarshalJSON()`| Custom JSON unmarshaling                                   |

## Using a Type in a Model

Reference your custom type as a field type in your model:

```go
package models

import (
	"app/internal/types"
	"github.com/sev-2/raiden/pkg/db"
)

type Creators struct {
	db.ModelBase
	Id   int64             `json:"id" column:"name:id;type:bigint;primaryKey;autoIncrement"`
	Name string            `json:"name" column:"name:name;type:text"`
	Type types.CreatorType `json:"type" column:"name:type;type:creator_type"` // [!code highlight]

	Metadata string `json:"-" schema:"public" tableName:"creators"`
}
```

## Registering Types

Types are registered via the `resource` package in your bootstrap code:

::: code-group

```go [internal/bootstrap/types.go]
package bootstrap

import (
	"app/internal/types"
	"github.com/sev-2/raiden/pkg/resource"
)

func RegisterTypes() {
	resource.RegisterTypes(
		&types.CreatorType{},
		&types.SourceType{},
	)
}
```

:::

Call `RegisterTypes()` before running `raiden apply` so the CLI is aware of your custom types:

```go [cmd/apply/main.go]
func main() {
	bootstrap.RegisterTypes()
	// ... apply logic
}
```
