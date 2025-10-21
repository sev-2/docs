---
title: RPC
---

# RPC

RPC (Remote Procedure Call) is a way to call PostgreSQL function through Raiden.
When start Raiden's project, the PostgreSQL function will automatically imported
to `internal/rpc` directory. Or you can also import manually by running using
[`imports`](cli/imports) command:

```sh
raiden imports
```

Here is an example of function on PostgreSQL:

```plsql
CREATE OR REPLACE FUNCTION hello(name varchar)
RETURNS text AS $$
BEGIN
  RETURN 'Hello, ' || name || '!';
END;
$$ LANGUAGE plpgsql;
```

The function above will automatically generated as Go code:

::: code-group

```go [internal/rpc/hello.go]
package rpc

import (
    "github.com/sev-2/raiden"
)

type HelloParams struct {
    // Input parameters
    Name string `json:"name" column:"name:name;type:varchar"`
}

// Return type
type HelloResult string

type Hello struct {
    raiden.RpcBase
    Params   *HelloParams `json:"-"`
    Return   HelloResult `json:"-"`
}

func (r *Hello) GetName() string {
    return "hello"
}

func  (r *Hello) UseParamPrefix() bool {
    return false
}

func (r *Hello) GetReturnType() raiden.RpcReturnDataType {
    return raiden.RpcReturnDataTypeVarcharAlias
}

func (r *Hello) GetRawDefinition() string {
    return `
      BEGIN RETURN
        'Hello, ' || :name || '!';
      END;`
}
```

:::

You can also define it as Go code, then publish it to PostgreSQL function
by running [`apply`](cli/apply) command:


## RPC Controller

To expose an RPC function as an API endpoint, you need to create a controller with `type:"rpc"`. The routing for RPC controllers is also convention-based, derived from the controller's folder structure.

For example, if you have an RPC function `hello` and you create a controller at `controllers/rpc/hello/rpc.go`:

```go [internal/controllers/rpc/hello/rpc.go]
package hello

import (
    "billingportal/internal/rpc" // Assuming your generated RPC functions are here
    "github.com/sev-2/raiden"
)

type RpcHelloController struct {
    raiden.ControllerBase
    Payload *rpc.HelloParams
    Result  rpc.HelloResult
}

func (c *RpcHelloController) Post(ctx raiden.Context) error {
    // Call your RPC function
    rpcFunc := rpc.Hello{Params: c.Payload, Return: c.Result}
    return ctx.SendRpc(&rpcFunc)
}
```

This controller would automatically be accessible at the `/rpc/hello` endpoint (assuming the base path for controllers is `/`). The `Post` method is typically used for RPC calls.

For a detailed explanation of Raiden's convention-based routing, including dynamic routes, please refer to the [Controller documentation](./controller.md).

