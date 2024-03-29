---
title: Middleware
---

# Middleware

## Overview

In Raiden, middleware refers to a layer of software that sits between the client and the backend application, providing a range of functionalities such as authentication, authorization, data validation, and more. Middleware acts as an intermediary that intercepts incoming requests from the client application before they reach the controller, or intercepts the response before reach the client. It can perform various operations on these requests, such as modifying them, validating them, or enriching them with additional data, before passing them on for execution.

Middleware plays a crucial role in Raiden by abstracting away common tasks and providing a centralized mechanism for implementing business logic and enforcing security policies. This helps in keeping the client-side codebase clean and focused on application-specific logic, while the middleware takes care of handling request and response interactions and enforcing data integrity.

Overall, middleware in provides a flexible and extensible framework for implementing common request and response tasks and enforcing security and data integrity policies, helping developers build robust and scalable applications more efficiently.

## Global Middleware

Some common uses of middleware include:

**Authentication**: Middleware can handle user authentication, verifying user credentials and generating authentication tokens. It can also enforce access control policies to restrict access to certain resources based on user roles and permissions.

**Authorization**: Middleware can enforce authorization policies to control access to specific data or operations within the database. This ensures that only authorized users can perform certain actions or access certain resources.

**Request logging and monitoring**: Middleware can log incoming requests and responses, providing valuable insights into application usage and performance. This can help in identifying and troubleshooting issues quickly.

**Caching**: Middleware can cache frequently accessed data or query results to improve performance and reduce database load. This can help in speeding up response times and reducing latency for client applications.

## User Defined Middleware

You can define your own middleware.
