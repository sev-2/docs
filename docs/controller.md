---
title: Controller
---

# Controller

Controller responsible for directing and coordinating the flow of data and operations within an application. The controller are defined in `controllers` directory. You can define the payload request and response in a controller.

Here is the default Raiden's controller.

::: code-group

```go [internal/controllers/hello.go]
package controllers

import (
    "github.com/sev-2/raiden"
)

type HelloWorldRequest struct {
}

type HelloWorldResponse struct {
    Message string `json:"message"`
}

type HelloWorldController struct {
    raiden.ControllerBase
    Http    string `path:"/hello/{name}" type:"custom"`
    Payload *HelloWorldRequest
    Result  HelloWorldResponse
}

func (c *HelloWorldController) Get(ctx raiden.Context) raiden.Presenter {
    c.Result.Message = "Welcome to raiden"
    return ctx.SendJson(c.Result)
}
```

:::

## Routing

Please refers to [Routing](/docs/routing).

## HTTP Verb

You can use `Get`, `Post`, `Put`, `Patch`, `Delete`, `Options`, or `Head` on function name
to use specific HTTP verb request.

For example, if you want to use `Post` and `Delete` request.

```go
func (c *HelloWorldController) Post(ctx raiden.Context) raiden.Presenter { // [!code highlight]
    c.Result.Message = "Data has been inserted."
    return ctx.SendJson(c.Result)
}

func (c *HelloWorldController) Delete(ctx raiden.Context) raiden.Presenter { // [!code highlight]
    c.Result.Message = "Data has been deleted."
    return ctx.SendJson(c.Result)
}
```

## Type

There are several options of type: `custom`, `rest`, `rpc` — that you can define on controller's struct.

```go
type HelloWorldController struct {
    raiden.ControllerBase
    Http    string `path:"/hello/{name}" type:"custom"` // [!code highlight]
    Payload *HelloWorldRequest
    Result  HelloWorldResponse
}
```
