---
title: Function
---

# Function

Raiden provide functions, very similar like edge-functions on Supabase, but powered by Go.
You can utilize anything that Go can do.

::: code-group

```go [internal/controllers/delivery.go]
package controllers

import (
	"github.com/sev-2/raiden"
)

type Response struct {
	Message string
}

type DeliveryController struct {
	raiden.ControllerBase
	Http    string `path:"/delivery" type:"function"` // [!code highlight]
	Payload *Response
}

// Optional middleware
func (c *DeliveryController) BeforePost(ctx raiden.Context) error {
	// Write your before-middleware logic here

	payload := ctx.RequestContext().Request.Body()

	raiden.Info("Request payload", string(payload))

	return nil
}

// Optional middleware
func (c *DeliveryController) AfterPost(ctx raiden.Context) error {
	// Write your after-middleware logic here
	return nil
}

func (c *DeliveryController) Post(ctx raiden.Context) error {
	response := &Response{
		Message: "Hello, Raiden!",
	}

	return ctx.SendJson(response)
}
```

:::

The function only accessible by POST request.

```
raiden.router: =========== Registered Route ===========
raiden.router:  POST
raiden.router: - /functions/v1/delivery
```
