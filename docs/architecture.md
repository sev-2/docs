---
title: Architecture
---

# Architecture

Raiden is a framework build on top of Supabase. Although the knowledge of Supabase architecture is optional when work with Raiden, that knowledge will help you understanding the underlying works between Raiden and Supabase. Here is the information about [Supabase architecture](https://supabase.com/docs/guides/getting-started/architecture).

[![](/architecture.png)](/architecture.png)

Raiden already included with Router, Proxy & Middleware, Model & Controller,
Functions, Database as Code, CLI Utility, and Scheduler.

## Router

Router is mechanism for building dynamic and interactive web applications by directing incoming requests to the appropriate code handlers based on predefined URL patterns. On Raiden, [router is defined on Controller](/docs/controller).

## Proxy & Middleware

Proxy and middleware act as intermediaries in Raiden, proxies primarily handle communication between clients and servers, while middleware processes requests and responses within an application. [Read more](/docs/middleware/index.md)

## Model & Controller

The model represents the data of the application. It manages the data, responds to queries about the state of the application, and responds to instructions to change the state of the application. [Read more](/docs/model)

Controller responsible for directing and coordinating the flow of data and operations within an application. [Read more](/docs/controller)

## Database As Code

"Database as code" refers to the methodology of managing and provisioning database resources to database infrastructure. This approach treats database schema, configuration, and provisioning as code, which are version-controlled, automated, and deployed alongside application code.

Raiden can manage RLS & Roles, tables and relations, Stored Procedure (RPC), an trigger as codes.

## CLI Utility

The built-in CLI command.

## Scheduler

Raiden included with scheduler or cron — a mechanism to execute a code based on time-period or specific time.
