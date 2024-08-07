---
title: Custom Controller
---

# Custom Controller

Custom controller is type of controller that doesn't have Supabase route prefixes such as `/rest/v1` or `/functions/v1`.

::: code-group

```go [internal/controllers/delivery.go]
package controllers

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
