---
title: REST
---

# REST

REST API is the easiest way to interact your client application with your database.
To use REST API on Raiden you need to have a model, then define a controller with the `Model` field.
The controller's folder structure will determine the route.

::: code-group

```go [internal/controllers/rest/v1/books/rest.go]
package books

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

The `Model` field tells Raiden which database table to proxy CRUD operations to. The route is determined by the controller's folder structure. For example, if `BooksController` is in `controllers/rest/v1/books/`, the route would be `/rest/v1/books`.

For resources with multi-word names, use `snake_case` for the folder name. The URL path will use `kebab-case` automatically:

::: code-group

```go [internal/controllers/rest/v1/live_stream_sessions/rest.go]
package live_stream_sessions

import (
	"app/internal/models"
	"github.com/sev-2/raiden"
)

type LiveStreamSessionsController struct {
	raiden.ControllerBase
	Model models.LiveStreamSession
}
```

:::

This will register endpoints at `/rest/v1/live-stream-sessions`.

When you execute `raiden run` it will create new REST API endpoints:

```
raiden.router: =========== Registered Route ===========
raiden.router:  GET
raiden.router: - /rest/v1/books
raiden.router:  POST
raiden.router: - /rest/v1/books
raiden.router:  PUT
raiden.router: - /rest/v1/books
raiden.router:  PATCH
raiden.router: - /rest/v1/books
raiden.router:  DELETE
raiden.router: - /rest/v1/books
```

You can interact with the endpoints with [Supabase Client](https://supabase.com/docs#client-libraries).

## Validation

REST controllers automatically validate the request body against the model struct on `POST`, `PUT`, and `PATCH` requests. If validation fails, the request is rejected before it reaches the upstream database.

Bulk inserts (JSON arrays) are also supported on `POST`.

## Customizing Behavior

You can use lifecycle hooks to add custom logic before or after any CRUD operation. For details, see [Controller Lifecycle Hooks](./controller.md#lifecycle-hooks).

```go
type BooksController struct {
	raiden.ControllerBase
	Model models.Book
}

func (c *BooksController) BeforePost(ctx raiden.Context) error {
	// Custom validation or authorization before insert
	return nil
}

func (c *BooksController) AfterGet(ctx raiden.Context) error {
	// Post-processing after data retrieval
	return nil
}
```

## File Naming Convention

REST controller files should be named `rest.go` and placed in a folder that represents the resource name using `snake_case`. For more details on folder structure conventions, see [Project Structure](./structure.md).
