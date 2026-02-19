---
title: Storage
---

# Storage

Raiden provides a storage system that proxies to Supabase Storage. You define a bucket as a Go struct, then create a storage controller that connects to it.

## Defining a Bucket

Create a bucket definition in the `internal/storages` directory. A bucket implements the `Bucket` interface by embedding `raiden.BucketBase` and overriding the methods you need.

::: code-group

```go [internal/storages/photo.go]
package storages

import (
	"github.com/sev-2/raiden"
)

type PhotoStorage struct {
	raiden.BucketBase
}

func (r *PhotoStorage) Name() string {
	return "photo"
}

func (r *PhotoStorage) Public() bool {
	return true
}

func (r *PhotoStorage) FileSizeLimit() int {
	return 5 * 1024 * 1024 // 5 MB in bytes
}

func (r *PhotoStorage) AllowedMimeTypes() []string {
	return []string{"image/jpeg", "image/png", "image/gif", "image/bmp"}
}

func (r *PhotoStorage) AvifAutoDetection() bool {
	return true
}
```

:::

### Bucket Interface

| Method              | Return Type  | Default | Description                                      |
|---------------------|-------------|---------|--------------------------------------------------|
| `Name()`            | `string`    | —       | **Required.** The name of the storage bucket      |
| `Public()`          | `bool`      | `false` | Whether the bucket is publicly accessible         |
| `AllowedMimeTypes()`| `[]string`  | `nil`   | Allowed MIME types (nil = all types allowed)       |
| `FileSizeLimit()`   | `int`       | `0`     | Max file size in bytes (0 = no limit)              |
| `AvifAutoDetection()` | `bool`   | `false` | Enable AVIF format auto-detection                 |

## Storage Controller

Create a controller with `type:"storage"` and embed the bucket struct as a `Storage` field:

::: code-group

```go [internal/controllers/photo/storage.go]
package photo

import (
	"app/internal/storages"
	"github.com/sev-2/raiden"
)

type StorageController struct {
	raiden.ControllerBase
	Http    string `path:"/photo" type:"storage"`  // [!code highlight]
	Storage storages.PhotoStorage  // [!code highlight]
}

// Optional lifecycle hooks
func (sc *StorageController) BeforeGet(ctx raiden.Context) error {
	raiden.Info("BeforeGet hook was fired")
	return nil
}

func (sc *StorageController) AfterGet(ctx raiden.Context) error {
	raiden.Info("AfterGet hook was fired")
	return nil
}
```

:::

Storage controllers support all HTTP methods (GET, POST, PUT, PATCH, DELETE) and proxy requests to the Supabase Storage API. The routes are registered under `/storage/v1/object/`:

```
raiden.router: =========== Registered Route ===========
raiden.router:  GET, POST, PUT, PATCH, DELETE
raiden.router: - /storage/v1/object/photo/{path:*}
```

## ACL for Storage

You can add access control to a storage bucket using the `Acl` field and `ConfigureAcl()` method:

```go
type ProtectedStorage struct {
	raiden.BucketBase
	Acl raiden.Acl
}

func (s *ProtectedStorage) Name() string {
	return "protected"
}

func (s *ProtectedStorage) ConfigureAcl() {
	s.Acl.Enable()
	s.Acl.Define(
		raiden.Rule("allow_authenticated_select").
			For("authenticated").
			To(raiden.CommandSelect).
			Using(builder.OwnerIsAuth("owner")),
		raiden.Rule("allow_authenticated_insert").
			For("authenticated").
			To(raiden.CommandInsert).
			Check(builder.OwnerIsAuth("owner")),
	)
}
```

See [ACL](/docs/acl) for more details on defining access control rules.
