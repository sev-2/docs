---
title: REST
---

# REST

REST API is the easiest way to interact your client application with your database.
To use REST API on Raiden you need to have a model, then you can define `type:"rest"`
and the controller's folder structure will determine the route.

::: code-group

```go [internal/controllers/books.go]
package controllers

import (
	"app/internal/models"
	"github.com/sev-2/raiden"
)

type BooksController struct {
	raiden.ControllerBase
	Model models.Book // [!code highlight]
}
```

:::

In that example, it uses the `Book` model, and the route will be determined by the controller's folder structure (e.g., if `BooksController` is in `controllers/books`, the route would be `/books`). For a detailed explanation of Raiden's convention-based routing, including dynamic routes, please refer to the [Controller documentation](./controller.md).
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
