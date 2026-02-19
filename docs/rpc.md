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
by running [`apply`](cli/apply) command.


## RPC Structure

Every RPC definition struct must embed `raiden.RpcBase` and declare two fields:

| Field    | Type | Description |
|----------|------|-------------|
| `Params` | Pointer to params struct | Input parameters for the PostgreSQL function. Use `column` tag to define name and type. |
| `Return` | Any type | Return type of the function (scalar, struct, or slice). |

### Required Methods

| Method | Description |
|--------|-------------|
| `GetName() string` | Returns the PostgreSQL function name. |
| `GetReturnType() raiden.RpcReturnDataType` | Returns the PostgreSQL return type constant. |
| `GetRawDefinition() string` | Returns the SQL function body. Use `:paramName` for parameter placeholders. |

### Optional Methods

| Method | Default | Description |
|--------|---------|-------------|
| `UseParamPrefix() bool` | `true` | When `true`, parameters are prefixed with `in_` (e.g., `in_name`). Set to `false` if your SQL uses bare parameter names. |
| `GetLanguage() string` | `"plpgsql"` | The language of the PostgreSQL function. |
| `GetSecurity() raiden.RpcSecurityType` | `RpcSecurityTypeInvoker` | Security context: `RpcSecurityTypeInvoker` or `RpcSecurityTypeDefiner`. |
| `GetBehavior() raiden.RpcBehaviorType` | `RpcBehaviorVolatile` | Function behavior: `RpcBehaviorVolatile`, `RpcBehaviorStable`, or `RpcBehaviorImmutable`. |
| `BindModels()` | No-op | Override to bind model aliases used in the SQL definition. |


## Parameter Types

Use the `column` tag on param struct fields to define parameter name, type, and optional default.

```go
type MyParams struct {
    UserId   int64  `json:"user_id" column:"name:user_id;type:bigint"`
    Status   string `json:"status" column:"name:status;type:varchar;default:active"`
}
```

Available `column` tag values for RPC params:

| Name      | Description |
|-----------|-------------|
| `name`    | Parameter name in the PostgreSQL function. |
| `type`    | PostgreSQL data type (see table below). |
| `default` | Default value. Parameters with defaults are skipped when their value is zero/nil. |

Supported parameter data types:

| Constant | PostgreSQL Type |
|----------|----------------|
| `integer` | `INTEGER` |
| `bigint` | `BIGINT` |
| `numeric` | `NUMERIC` |
| `real` | `REAL` |
| `double precision` | `DOUBLE PRECISION` |
| `text` | `TEXT` |
| `varchar` | `CHARACTER VARYING` |
| `boolean` | `BOOLEAN` |
| `bytea` | `BYTEA` |
| `timestamp` | `TIMESTAMP WITHOUT TIME ZONE` |
| `timestampz` | `TIMESTAMP WITH TIME ZONE` |
| `json` | `JSON` |
| `jsonb` | `JSONB` |
| `uuid` | `UUID` |
| `date` | `DATE` |
| `point` | `POINT` |

Array types are also supported by appending `[]` (e.g., `uuid[]`, `integer[]`, `text[]`).


## Return Types

| Constant | PostgreSQL Type | Description |
|----------|----------------|-------------|
| `RpcReturnDataTypeText` | `TEXT` | Returns a text value. |
| `RpcReturnDataTypeVarcharAlias` | `VARCHAR` | Returns a varchar value. |
| `RpcReturnDataTypeInteger` | `INTEGER` | Returns an integer. |
| `RpcReturnDataTypeBigInt` | `BIGINT` | Returns a big integer. |
| `RpcReturnDataTypeBoolean` | `BOOLEAN` | Returns a boolean. |
| `RpcReturnDataTypeJSON` | `JSON` | Returns a JSON value. |
| `RpcReturnDataTypeJSONB` | `JSONB` | Returns a JSONB value. |
| `RpcReturnDataTypeVoid` | `VOID` | Returns nothing. |
| `RpcReturnDataTypeSetOf` | `SETOF` | Returns a set of records (use with a model struct). |
| `RpcReturnDataTypeTable` | `TABLE` | Returns a table-shaped result. |
| `RpcReturnDataTypeRecord` | `RECORD` | Returns a record (tuple). |
| `RpcReturnDataTypeTrigger` | `TRIGGER` | Used for trigger functions. |


## Model Binding

For complex SQL that references table names, use `BindModels()` to map model structs to aliases. In the SQL definition, use `:alias` as a placeholder that gets replaced with the actual table name.

```go
type GetUserStats struct {
    raiden.RpcBase
    Params *GetUserStatsParams `json:"-"`
    Return []GetUserStatsResult `json:"-"`
}

func (r *GetUserStats) BindModels() {
    r.BindModel(models.Users{}, "users")
    r.BindModel(models.Orders{}, "orders")
}

func (r *GetUserStats) GetRawDefinition() string {
    return `
      BEGIN
        RETURN QUERY
        SELECT u.id, u.name, count(o.id) as order_count
        FROM :users u
        JOIN :orders o ON o.user_id = u.id
        WHERE u.id = :user_id
        GROUP BY u.id, u.name;
      END;`
}
```

The `:users` and `:orders` placeholders will be replaced with the actual table names derived from the model struct names (converted to snake_case).


## Security

| Type | Constant | Description |
|------|----------|-------------|
| Invoker | `RpcSecurityTypeInvoker` | Function runs with the privileges of the calling user (default). |
| Definer | `RpcSecurityTypeDefiner` | Function runs with the privileges of the user who created it. |

```go
func (r *MyRpc) GetSecurity() raiden.RpcSecurityType {
    return raiden.RpcSecurityTypeDefiner
}
```


## Behavior

| Type | Constant | Description |
|------|----------|-------------|
| Volatile | `RpcBehaviorVolatile` | Function may modify data and return different results on each call (default). |
| Stable | `RpcBehaviorStable` | Function does not modify data and returns consistent results within a single query. |
| Immutable | `RpcBehaviorImmutable` | Function does not modify data and always returns the same result for the same arguments. |

```go
func (r *MyRpc) GetBehavior() raiden.RpcBehaviorType {
    return raiden.RpcBehaviorStable
}
```


## RPC Controller

To expose an RPC function as an API endpoint, you need to create a controller. The routing for RPC controllers is convention-based, derived from the controller's folder structure.

For example, if you have an RPC function `hello` and you create a controller at `controllers/rpc/hello/rpc.go`:

```go [internal/controllers/rpc/hello/rpc.go]
package hello

import (
    "app/internal/rpc"
    "github.com/sev-2/raiden"
)

type RpcHelloController struct {
    raiden.ControllerBase
    Payload *rpc.HelloParams
    Result  rpc.HelloResult
}

func (c *RpcHelloController) Post(ctx raiden.Context) error {
    rpcFunc := rpc.Hello{Params: c.Payload, Return: c.Result}
    return ctx.SendRpc(&rpcFunc)
}
```

This controller would automatically be accessible at the `/rest/v1/rpc/hello` endpoint. The `Post` method is typically used for RPC calls.

For multi-word RPC names, use `kebab-case` for the folder name:

```go [internal/controllers/rpc/get-user-stats/rpc.go]
package get_user_stats

import (
    "app/internal/rpc"
    "github.com/sev-2/raiden"
)

type GetUserStatsController struct {
    raiden.ControllerBase
    Payload *rpc.GetUserStatsParams
    Result  []rpc.GetUserStatsResult
}

func (c *GetUserStatsController) Post(ctx raiden.Context) error {
    rpcFunc := rpc.GetUserStats{Params: c.Payload}
    return ctx.SendRpc(&rpcFunc)
}
```

This registers the endpoint at `/rest/v1/rpc/get-user-stats`.

For a detailed explanation of Raiden's convention-based routing, including dynamic routes and folder naming conventions, please refer to the [Controller documentation](./controller.md) and [Project Structure](./structure.md).

