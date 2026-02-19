---
title: Custom Controller
---

# Custom Controller

Custom controller is type of controller that doesn't have Supabase route prefixes such as `/rest/v1` or `/functions/v1`. You define the route path explicitly using the `Http` struct tag.

::: code-group

```go [internal/controllers/delivery/custom.go]
package delivery

import (
	"fmt"

	"github.com/sev-2/raiden"
)

type ClientPayload struct {
	Name string `path:"name"` // [!code highlight]
}

type ServerResponse struct {
	Success bool `json:"success"`
	Data    any  `json:"data"`
}

type HelloController struct {
	raiden.ControllerBase
	Http    string `path:"/hello/{name}" type:"custom"` // [!code highlight]
	Payload *ClientPayload
	Result  ServerResponse
}

func (c *HelloController) Get(ctx raiden.Context) error {
	response := ServerResponse{
		Success: true,
		Data:    fmt.Sprintf("Hello, %s", c.Payload.Name),
	}

	return ctx.SendJson(response)
}
```
:::

## Payload Binding

The `Payload` struct is automatically populated from the request data. Use struct tags to define where each field value comes from:

| Tag | Source | Example |
|-----|--------|---------|
| `path:"name"` | URL path parameter | `/hello/{name}` |
| `query:"q"` | Query string parameter | `?q=search-term` |
| `json:"field"` | JSON request body | `{"field": "value"}` |

### Example with Multiple Sources

```go
type SearchPayload struct {
	Category string `path:"category"`     // from URL path
	Query    string `query:"q"`           // from query string
	Page     int    `query:"page"`        // from query string
	Filters  []string `json:"filters"`    // from JSON body
}

type SearchController struct {
	raiden.ControllerBase
	Http    string `path:"/search/{category}" type:"custom"`
	Payload *SearchPayload
	Result  SearchResponse
}
```

Supported field types for `path` and `query` binding include: `string`, `bool`, `int`, `int8`..`int64`, `uint`..`uint64`, `float32`, `float64`, and pointers to these types.

## Validation

Payload fields are automatically validated after binding. Use the `validate` tag (from the Go validator library) to define validation rules:

```go
type CreatePayload struct {
	Resource string `path:"resource" validate:"required"`
	Name     string `json:"name" validate:"required,min=3"`
}
```

## File Naming Convention

Custom controller files should be named `custom.go` and placed in a folder that represents the resource. For details on folder structure, see [Project Structure](./structure.md).
