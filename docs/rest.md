---
title: REST
---

# REST

REST API is the easiest way to interact your client application with your database.
To use REST API on Raiden you need to have a model, then you can define `type:"rest"`
and `path` of the controller.

::: code-group

```go [internal/controllers/books.go]
package controllers

import (
	"app/internal/models"
	"github.com/sev-2/raiden"
)

type BooksController struct {
	raiden.ControllerBase
	Http  string `path:"/books" type:"rest"` // [!code highlight]
	Model models.Book // [!code highlight]
}
```

:::

In that example, it use Book model, `/books` as the path, and rest type of controller.
When you execute `raiden run` it will create new REST API endpoints:

```
raiden.router: =========== Registered Route ===========
raiden.router:  GET
raiden.router: - /rest/v1/teams
raiden.router:  POST
raiden.router: - /rest/v1/teams
raiden.router:  PUT
raiden.router: - /rest/v1/teams
raiden.router:  PATCH
raiden.router: - /rest/v1/teams
raiden.router:  DELETE
raiden.router: - /rest/v1/teams
```

You can interact with the endpoints with [Supabase Client](https://supabase.com/docs#client-libraries).
