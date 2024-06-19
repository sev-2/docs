---
title: Storage
---

# Storage

To access the storage, you can create from a bucket from Supabase Studio or define the storage in `internal/storage` directory.

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
	return 5 * 1024 * 1024 // bytes
}

func (r *PhotoStorage) AllowedMimeTypes() []string {
	return []string{"image/jpeg", "image/png", "image/gif", "image/bmp"}
}
```

:::

Then define a controller

::: code-group

```go [internal/controllers/photo.go]
package controllers

import (
	"app/internal/storages"
	"github.com/sev-2/raiden"
)

type PhotoController struct {
	raiden.ControllerBase
	Http    string `path:"/photo" type:"storage"`  // [!code highlight]
	Storage storages.PhotoStorage  // [!code highlight]
}

func (sc *PhotoController) BeforeGet(ctx raiden.Context) error {
	raiden.Info("BeforeGet middleware was fired")
	return nil
}

func (sc *PhotoController) AfterGet(ctx raiden.Context) error {
	raiden.Info("AfterGet middleware was fired")
	return nil
}
```

:::
