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

```sh
raiden apply
```
