---
title: Configuration
---

# Configuration

Using a `.env` file is a common practice in software development for storing configuration variables that should not be hardcoded into the codebase.

## Application

By default, configuration will be generated at first-time you create Raiden's project.
The configuration is stored on `configs/app.yaml`.

### PROJECT_NAME

This is the name of your project.

### DEPLOYMENT_TARGET

The deployment target of Raiden. The possibility values id `cloud` or `self-hosted`.

### ACCESS_TOKEN

This only be used if you use `cloud` as target deployment.
The value can be found on https://supabase.com/dashboard/account/tokens.

### ANON_KEY

The anon key allows users to interact with Supabase as "anonymous" users.

On cloud, the anon key value can be found on [Project Settings](https://supabase.com/dashboard/projects). On self-hosted, you can generate the anon key value by your own.

Read [anon key documentation on Supabase](https://supabase.com/docs/guides/api/api-keys#the-anon-key)

### SERVICE_KEY

The service key is designed to perform various administrative and service-related tasks. It can bypass RLS (Row Level Security),

On cloud, the service key value can be found on [Project Settings](https://supabase.com/dashboard/projects). On self-hosted, you can generate the service key value by your own.

Read [service key documentation on Supabase](https://supabase.com/docs/guides/api/api-keys#the-servicerole-key).

### SUPABASE_API_URL

On cloud deployment target, the URL should be `https://api.supabase.com`.

On self-hosted deployment target, the URL value is your Supabase api URL.

### SUPABASE_API_BASE_PATH

This will used if your deployment target is self-hosted.
By default the value is `/api/pg-meta/default`.

### SUPABASE_PUBLIC_URL

On cloud target deployment the value should be your project URL.

On self-hosted target deployment the value of public URL can be your Supabase Studio URL.

### SERVER_HOST

The Raiden default host. Default is `127.0.0.1`.
You can change it to `0.0.0.0` to make the server be able to accessible from the outside.

### SERVER_PORT

Default port is `8002`.

### ENVIRONMENT

The value typically refers to a specific configuration or setup where the project is deployed, tested, or developed. Example value: `development`, `production`, or `testing`.

### VERSION

The version of project.

### BREAKER_ENABLE

Default value is `true`.

### TRACE_ENABLE

Default value is `false`.

### TRACE_COLLECTOR


### TRACE_ENDPOINT


## Modules

### ALIASES

Contain aliases for models and RPC address.

```
[APP_ALIAS]=[MODULE_ALIASES]

```

### RBAC

```
Creator: APP_ROLE1, APP_ROLE2, APP_ROLE3
Approver: APP_ROLE1, APP_ROLE2
```
