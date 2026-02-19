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
  Select([]string{"id", "slug", "name"}). // [!code highlight]
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
  Select([]string{"id", "title:name"}). // [!code highlight]
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
  Limit(10).
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

err = db.
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

err = db.
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

err = db.
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

err = db.
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
  OrderAsc("created_at"). // [!code highlight]
  Get(&books)
// SQL: select * from books order by created_at asc
// URL: /rest/v1/books?select=*&order=created_at.asc

err = db.
  NewQuery(ctx).
  From(models.Books{}).
  OrderDesc("created_at"). // [!code highlight]
  Get(&books)
// SQL: select * from books order by created_at desc
// URL: /rest/v1/books?select=*&order=created_at.desc
```

### `.Offset()`

Skip a number of rows before returning results. Commonly used with `.Limit()` for pagination.

```go
var books []models.Books

err := db.
  NewQuery(ctx).
  From(models.Books{}).
  Limit(10).
  Offset(20). // [!code highlight]
  Get(&books)
// SQL: select * from books limit 10 offset 20
// URL: /rest/v1/books?select=*&limit=10&offset=20
```

### Or Conditions

Use `Or` variants of filter methods to build `OR` conditions. Multiple `Or` calls are grouped together.

```go
var books []models.Books

err := db.
  NewQuery(ctx).
  From(models.Books{}).
  OrEq("status", "published"). // [!code highlight]
  OrEq("status", "draft"). // [!code highlight]
  Get(&books)
// URL: /rest/v1/books?select=*&or=(status.eq.published,status.eq.draft)
```

Available `Or` methods: `.OrEq()`, `.OrNeq()`, `.OrLt()`, `.OrLte()`, `.OrGt()`, `.OrGte()`, `.OrIn()`, `.OrLike()`, `.OrIlike()`.

### Not Conditions

Use `Not` variants to negate filter conditions.

```go
var books []models.Books

err := db.
  NewQuery(ctx).
  From(models.Books{}).
  NotEq("status", "archived"). // [!code highlight]
  Get(&books)
// URL: /rest/v1/books?select=*&status=not.eq.archived
```

Available `Not` methods: `.NotEq()`, `.NotNeq()`, `.NotLt()`, `.NotLte()`, `.NotGt()`, `.NotGte()`, `.NotLike()`, `.NotIlike()`.

## Aggregate Functions

### `.Count()`

Get the total number of rows matching the query.

```go
count, err := db.
  NewQuery(ctx).
  From(models.Books{}).
  Eq("is_active", true).
  Count() // [!code highlight]
// Returns the count of active books
```

You can specify the count method with `CountOptions`:

```go
count, err := db.
  NewQuery(ctx).
  From(models.Books{}).
  Count(db.CountOptions{Count: "exact"}) // [!code highlight]
// Options: "exact", "planned", "estimated"
```

### `.Sum()`

```go
var result []map[string]interface{}

err := db.
  NewQuery(ctx).
  From(models.Products{}).
  Sum("price", "total_price"). // [!code highlight]
  Get(&result)
// URL: /rest/v1/products?select=total_price:price.sum()
```

### `.Avg()`

```go
var result []map[string]interface{}

err := db.
  NewQuery(ctx).
  From(models.Products{}).
  Avg("price", "average_price"). // [!code highlight]
  Get(&result)
// URL: /rest/v1/products?select=average_price:price.avg()
```

### `.Min()` & `.Max()`

```go
var result []map[string]interface{}

err := db.
  NewQuery(ctx).
  From(models.Products{}).
  Min("price", "lowest_price"). // [!code highlight]
  Max("price", "highest_price"). // [!code highlight]
  Get(&result)
// URL: /rest/v1/products?select=lowest_price:price.min(),highest_price:price.max()
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

By using `.Preload()`, you can get the relation of a model. The first argument is the relation field name on the model struct.

```go
var books []models.Books

res := db.
  NewQuery(ctx).
  From(models.Books{}).
  Preload("Authors"). // models.Authors{}
  Preload("Publishers"). // models.Publishers{}
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
  Preload("Authors.Teams.Orgs").
  Get(&books)

// URL: /rest/v1/books?select=*,users(*,teams(*,orgs(*)))
```

::: warning
Nested relations support up to 3 levels deep.
:::

### Filtering Relations

You can add a where condition to the preloaded relation by passing additional arguments in the format: `field`, `operator`, `value`.

```go
var users []models.Users

err := db.
  NewQuery(ctx).
  From(models.Users{}).
  Preload("Articles", "rating", "eq", "5").
  Get(&users)

// URL: /rest/v1/users?select=*,articles!article_id(*)&articles.rating=eq.5
```

### Multiple Relations

```go
var users []models.Users

err := db.
  NewQuery(ctx).
  From(models.Users{}).
  Preload("Articles").
  Preload("Team").
  Get(&users)

// URL: /rest/v1/users?select=*,articles!article_id(*),team:teams!team_id(*)
```
