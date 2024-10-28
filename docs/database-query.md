---
title: Database Query Builder
---

# Overview

Raiden utilize [PostgREST](https://postgrest.org) to run query PostgreSQL database.
Here is the quick example to get data from `bookModel`.

::: code-group

```go [internal/controllers/books.go]
func (c *GetBooksController) Get(ctx raiden.Context) error {
  var books []models.Books

  err := db.
    NewQuery(ctx).
    From(models.Books{}).
    Select([]string{"id", "name", "isbn"}).
    Eq("isbn", "9786235266008").
    Get(&books)
  // SQL: select id, name, isbn from books where isbn = '9786235266008'
  // URL: /rest/v1/books?select=id,name,isbn&isbn=9786235266008

  if err != nil {
    fmt.Println(err)
    panic("Whoops!")
  }

  fmt.Println(books)
  fmt.Println(books[0].Id)
  fmt.Println(books[0].Name)
  fmt.Println(books[0].Isbn)

  return ctx.SendJson(books)
}
```

:::

## Retrieve Data

### `.Select()`

```go
var books []models.Books

err := db.NewQuery(ctx).
  From(models.Books{}).
  Select([]sring{"id", "slug", "name"}). // [!code highlight]
  Get(&books)
// SQL: select id, slug, name from books
// URL: /rest/v1/books?select=id,slug,name
```

#### Alias

Use `:` to make an alias of column name with format `alias_name:original_name`.

```go
var books []models.Books

err := db.NewQuery(ctx).
  From(models.Books{}).
  Select([]sring{"id", "title:name"}). // [!code highlight]
  Get(&books)
// SQL: select id, name as title from books
// URL: /rest/v1/books?select=id,title:name
```

### `.Get()` and `.Limit()`

Retrieve 10 rows of data.

```go
var books []models.Books

err := db.NewQuery(ctx).
  From(models.Books{}).
  Limit(10)
  Get(&books)
// SQL: select * from books limit 10
// URL: "/rest/v1/books?select=*&limit=10"
```

### `.Single()`

Get single row of data.

```go
book := models.Books{}

err := db.NewQuery(ctx).
  From(models.Books{}).
  Eq("id", 1). // [!code highlight]
  Single(&book)
// SQL: select * from books where id = 1 limit 1
// cURL: "/rest/v1/books?select=*&id=eq.1" -H "Accept: application/vnd.pgrst.object+json"
```

### `.Eq()`

```go
var books []models.Books

err := db.NewQuery(ctx).
  From(models.Books{}).
  Eq("id", 1). // [!code highlight]
  Get(&books)
// SQL: select * from books where id = 1
// URL: /rest/v1/books?select=*&id=eq.1
```

### `.Neq()`

```go
var books []models.Books

err := db.NewQuery(ctx).
  From(models.Books{}).
  Neq("id", 1). // [!code highlight]
  Get(&books)
// SQL: select * from books where id != 1
// URL: /rest/v1/books?select=*&id=neq.1
```

### `.Lt()` & `.Lte()`

```go
var books []models.Books

err := db.
  NewQuery(ctx).
  From(models.Books{}).
  Lt("pages", 100). // [!code highlight]
  Get(&books)
// SQL: select * from books where pages < 100
// URL: /rest/v1/books?select=*&id=lt.100

err = db.
  NewQuery(ctx).
  From(models.Books{}).
  Lte("pages", 100). // [!code highlight]
  Get(&books)
// SQL: select * from books where pages <= 100
// URL: /rest/v1/books?select=*&id=lte.100
```

### `.Gt()` & `.Gte()`

```go
var books []models.Books

err := db.
  NewQuery(ctx).
  From(models.Books{}).
  Gt("pages", 100). // [!code highlight]
  Get(&books)
// SQL: select * from books where pages > 100
// URL: /rest/v1/books?select=*&id=gt.100

err := db.
  NewQuery(ctx).
  From(models.Books{}).
  Gte("pages", 100). // [!code highlight]
  Get(&books)
// SQL: select * from books where pages >= 100
// URL: /rest/v1/books?select=*&id=gte.100
```

### `.In()`

```go
var books []models.Books

err := db.
  NewQuery(ctx).
  From(models.Books{}).
  In("id", []int{1, 2, 3}). // [!code highlight]
  Get(&books)
// SQL: select * from books where id in (1, 2, 3)
// URL: /rest/v1/books?select=*&id=in.(1,2,3)

err = db.
  NewQuery(ctx).
  From(models.Books{}).
  In("slug", []string{"raiden", "supabase"}). // [!code highlight]
  Get(&books)
// SQL: select * from books where slug in ('raiden', 'supabase')
// URL: /rest/v1/books?select=*&slug=in.(raiden,supabase)
```

### `.NotIn()`

```go
var books []models.Books

err := db.
  NewQuery(ctx).
  From(models.Books{}).
  NotIn("id", []int{1, 2, 3}). // [!code highlight]
  Get(&books)
// SQL: select * from books where id not in (1, 2, 3)
// URL: /rest/v1/books?select=*&id=not.in.(1,2,3)

err = db.
  NewQuery(ctx).
  From(models.Books{}).
  NotIn("slug", []string{"raiden", "supabase"}). // [!code highlight]
  Get(&books)
// SQL: select * from books where slug not in ('raiden', 'supabase')
// URL: /rest/v1/books?select=*&slug=not.in.(raiden,supabase)
```

### `.Like()` & `.Ilike()`

```go
var books []models.Books

err := db.
  NewQuery(ctx).
  From(models.Books{}).
  Like("name", "%rai%"). // [!code highlight]
  Get(&books)
// SQL: select * from books where name like '%rai%'
// URL: /rest/v1/books?select=*&name=like.*rai*

err := db.
  NewQuery(ctx).
  From(models.Books{}).
  Ilike("name", "%SuPa%"). // [!code highlight]
  Get(&books)
// SQL: select * from books where name ilike '%SuPa%'
// URL: /rest/v1/books?select=*&name=ilike.*SuPa*
```

### `.NotLike()` & `.NotIlike()`

```go
var books []models.Books

err := db.
  NewQuery(ctx).
  From(models.Books{}).
  NotLike("name", "%rai%"). // [!code highlight]
  Get(&books)
// SQL: select * from books where name not like '%rai%'
// URL: /rest/v1/books?select=*&name=not.like.*rai*

err := db.
  NewQuery(ctx).
  From(models.Books{}).
  NotIlike("name", "%SuPa%"). // [!code highlight]
  Get(&books)
// SQL: select * from books where name not ilike '%SuPa%'
// URL: /rest/v1/books?select=*&name=not.ilike.*SuPa*
```

### `.Is()` & `.NotIs()`

`Is()` and `NotIs()` only accepts `true`, `false`, or `nil`.

```go
var books []models.Books

err := db.
  NewQuery(ctx).
  From(models.Books{}).
  Is("is_active", true). // [!code highlight]
  Get(&books)
// SQL: select * from books where is_active is true
// URL: /rest/v1/books?select=*&is_active=is.true

err := db.
  NewQuery(ctx).
  From(models.Books{}).
  NotIs("is_active", true). // [!code highlight]
  Get(&books)
// SQL: select * from books where is_active not is true
// URL: /rest/v1/books?select=*&is_active=not.is.true
```

### `.OrderAsc()` & `.OrderDesc()`

```go
var books []models.Books

err := db.
  NewQuery(ctx).
  From(models.Books{}).
  OrderAsc("created_at") // [!code highlight]
  Get(&books)
// SQL: select * from books order by created_at asc
// URL: /rest/v1/books?select=*&order=created_at.asc

err := db.
  NewQuery(ctx).
  From(models.Books{}).
  OrderDesc("created_at") // [!code highlight]
  Get(&books)
// SQL: select * from books order by created_at desc
// URL: /rest/v1/books?select=*&order=created_at.desc
```

## Insert

```go{4,7}
payload := models.Products{name: "Chair", price: 20}

err := db.
  NewQuery(ctx).
  From(models.Books{}).
  Insert(&payload, nil)
// insert into products (name, price) values ('Chair', 20)
```

## Update

```go{4,7}
payload := models.Products{slug: "raiden"}

err := db.
  NewQuery(ctx).
  From(models.Books{}).
  Eq("id", 1).
  Update(payload, nil)
// SQL: update products set slug = 'raiden' where id = 1
```

## Delete

```go{4,5}
err := db.
  NewQuery(ctx).
  From(models.Books{}).
  Eq("id", 1).
  Delete()
// SQL: delete from products where id = 1
```

## Upsert

```go
id1 := int64(6)
name1 := "Cake"
slug1 := "cake"
rating1 := int64(4)

id2 := int64(42)
name2 := "Water"
slug2 := "water"
rating2 := int64(5)

products := []models.Products{
  {
    Id:        id1,
    Name:      &name1,
    Slug:      &slug1,
    Rating:    &rating1,
  },
  {
    Id:        id2,
    Name:      &name2,
    Slug:      &slug2,
    Rating:    &rating2,
  },
}

// Convert to []interface{}
var payload = make([]interface{}, len(products))
for i, v := range teams {
  payload[i] = v
}

opt := db.UpsertOptions{
  OnConflict: db.MergeDuplicates, // or db.IgnoreDuplicates
}

err := db.
  NewQuery(ctx).
  From(models.Books{}).
  Upsert(payload, opt) // [!code highlight]

// SQL:
// insert into products (id, name, slug, rating)
// values (6, 'Cake', 'cake', 4), (6, 'Water', 'water', 4)
// on conflict(id)
// do update set
//   price = excluded.price,
//   quantity = excluded.quantity;
```

## Relationship

### Get Relations

By using `.With()`, you can get the relation of a model.

```go
var books []models.Books

res := db.
  NewQuery(ctx).
  From(models.Books{}).
  With("Authors", nil). // models.Authors{}
  With("Publishers", nil). // models.Publishers{}
  Get(&books)

// SQL:
// select books.*, users.*, publishers.* from books
// inner join users on books.author_id = users.id
// inner join publishers on books.published_id = publishers.id;

// URL: /rest/v1/books?select=*,users(*),publishers(*)
```

### Nested Relations

```go
var books []models.Books

res := db.
  NewQuery(ctx).
  From(models.Books{}).
  With("Authors.Teams.Orgs", nil).
  Get(&books)

// URL: /rest/v1/books?select=*,users(*,teams(*,orgs(*)))
```

### Column Selections

```go
var books []models.Books

err := db.
  NewQuery(ctx).
  From(models.Books{}).
  With(
    "Publishers.Orgs",
    map[string][]string{
      "publishers": {"id", "name"},
      "orgs":       {"id", "name"},
    },
  ).
  Get(&books)

// URL: /rest/v1/books?select=*,publishers(id,name,orgs(id,name))
```

### Foreign Keys

Assume you have this tables

```sql
create table
  public.orders (
    id bigint generated by default as identity not null,
    created_at timestamp with time zone not null default now(),
    billing_id bigint null,
    shipping_id bigint null,
    constraint orders_pkey primary key (id),
    constraint orders_shipping_id_fkey foreign key (shipping_id) references addresses (id),
    constraint orders_billing_id_fkey foreign key (billing_id) references addresses (id)
  ) tablespace pg_default;

create table
  public.addresses (
    id bigint generated by default as identity not null,
    created_at timestamp with time zone not null default now(),
    name text not null,
    constraint addresses_pkey primary key (id)
  ) tablespace pg_default;
```

Since the `orders` table has two foreign keys to the `addresses` table, a foreign key join is ambiguous and you will get an error.

```go
// Error
orders := []models.Orders{}

err := db.
  NewQuery(ctx).
  From(models.Orders{}).
  With("Addresses", nil).
  Get(&orders)
```

To successfully join `orders` with `addresses` you need to add explicit foreign key by adding `!` symbol with format `table!foreign_key`.

```go
orders := []models.Orders{}

err := db.
  NewQuery(ctx).
  From(models.Orders{}).
  With(
    "Addresses",
    map[string][]string{
      "addresses!shipping_id": {"*"},
    },
  ).
  Get(&orders)

// URL: /rest/v1/orders?select=*,addresses!shipping_id(*)
```

To add the shipping address and billing address you need to use alias.

```go
orders := []models.Orders{}

err := db.
  NewQuery(ctx).
  From(models.Orders{}).
  With(
    "Addresses",
    map[string][]string{
      "shipping_address:addresses!shipping_id": {"*"},
    },
  ).
  With(
    "Addresses",
    map[string][]string{
      "billing_address:addresses!billing_id": {"*"},
    },
  ).
  Get(&orders)

// URL: /rest/v1/orders?select=*,shipping_address:addresses!shipping_id(*),billing_address:addresses!billing_id(*)
```
