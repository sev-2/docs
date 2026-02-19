---
title: Function
---

# Function

Raiden provides functions, similar to edge-functions on Supabase, but powered by Go. You can utilize anything that Go can do.

Set the `type` tag to `"function"` on the `Http` field to create a function controller.

::: code-group

```go [internal/controllers/delivery/function.go]
package delivery

import (
	"github.com/sev-2/raiden"
)

type Response struct {
	Message string
}

type FunctionController struct {
	raiden.ControllerBase
	Http    string `path:"/delivery" type:"function"` // [!code highlight]
	Payload *Response
}

// Optional lifecycle hook
func (c *FunctionController) BeforePost(ctx raiden.Context) error {
	payload := ctx.RequestContext().Request.Body()
	raiden.Info("Request payload", string(payload))
	return nil
}

// Optional lifecycle hook
func (c *FunctionController) AfterPost(ctx raiden.Context) error {
	return nil
}

func (c *FunctionController) Post(ctx raiden.Context) error {
	response := &Response{
		Message: "Hello, Raiden!",
	}

	return ctx.SendJson(response)
}
```

:::

::: warning POST Only
Function controllers **only accept POST requests**. If you need other HTTP methods, use a [Custom](/docs/custom) controller instead.
:::

The function is registered under the `/functions/v1/` prefix:

```
raiden.router: =========== Registered Route ===========
raiden.router:  POST
raiden.router: - /functions/v1/delivery
```

## Multi-Word Folder Names

For function controllers with multi-word names, use `snake_case` for the folder name:

```
internal/controllers/
  send_notification/
    function.go          # type:"function" path:"/send-notification"
```
