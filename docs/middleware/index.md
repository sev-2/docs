---
title: Middleware
---

# Middleware

## Overview

In Raiden, middleware refers to a layer of software that sits between the client and the backend application, providing a range of functionalities such as authentication, authorization, data validation, and more. Middleware acts as an intermediary that intercepts incoming requests from the client application before they reach the controller, or intercepts the response before reaching the client.

Middleware plays a crucial role in Raiden by abstracting away common tasks and providing a centralized mechanism for implementing business logic and enforcing security policies. This helps in keeping the client-side codebase clean and focused on application-specific logic, while the middleware takes care of handling request and response interactions and enforcing data integrity.

## Middleware Function Type

A middleware in Raiden is defined as:

```go
type MiddlewareFn func(next RouteHandlerFn) RouteHandlerFn
```

Middlewares are chained together using `raiden.NewChain()`:

```go
chain := raiden.NewChain(middlewareA, middlewareB, middlewareC)
```

The chain executes middlewares in the order they are added. You can also use `Append()` and `Prepend()` to add middlewares to an existing chain.

## Built-in Middlewares

Raiden provides several built-in middlewares:

### Trace Middleware

Extracts trace and span information from incoming requests and injects them into the request context. It automatically sets span status based on the response.

```go
raiden.TraceMiddleware
```

### Circuit Breaker Middleware

Uses a circuit breaker pattern to protect your service. When a path starts failing, the breaker opens and returns `503 Service Unavailable` to prevent cascading failures.

```go
raiden.BreakerMiddleware("/api/v1/resource")
```

### CORS Middleware

Handles Cross-Origin Resource Sharing (CORS) preflight requests. CORS is configured through the application config:

```go
// CORS options are configured via raiden.Config
type CorsOptions struct {
    AllowedOrigins     []string
    AllowedMethods     []string
    AllowedHeaders     []string
    AllowCredentials   bool
    OptionsPassthrough bool
}
```

## Global Middleware

Some common uses of global middleware include:

**Authentication**: Middleware can handle user authentication, verifying user credentials and generating authentication tokens. It can also enforce access control policies to restrict access to certain resources based on user roles and permissions.

**Authorization**: Middleware can enforce authorization policies to control access to specific data or operations within the database. This ensures that only authorized users can perform certain actions or access certain resources.

**Request logging and monitoring**: Middleware can log incoming requests and responses, providing valuable insights into application usage and performance. This can help in identifying and troubleshooting issues quickly.

**Caching**: Middleware can cache frequently accessed data or query results to improve performance and reduce database load. This can help in speeding up response times and reducing latency for client applications.

## User Defined Middleware

You can define your own middleware using the `MiddlewareFn` type:

```go
func MyCustomMiddleware(next raiden.RouteHandlerFn) raiden.RouteHandlerFn {
    return func(ctx raiden.Context) error {
        // Do something before the handler
        fmt.Println("Before handler")

        // Call the next handler
        err := next(ctx)

        // Do something after the handler
        fmt.Println("After handler")

        return err
    }
}
```
