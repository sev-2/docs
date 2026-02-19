---
title: Configuration
---

# Configuration

Raiden uses a YAML configuration file to manage application settings. By default, configuration is generated when you first create a Raiden project and stored at `configs/app.yaml`.

## Loading Configuration

```go
config, err := raiden.LoadConfig(nil) // loads from configs/app.yaml
```

You can also load from a custom path:

```go
path := "./configs/production.yaml"
config, err := raiden.LoadConfig(&path)
```

## Application Settings

### PROJECT_NAME

The name of your project.

### PROJECT_ID

The Supabase project ID.

### DEPLOYMENT_TARGET

The deployment target. Possible values: `cloud` or `self_hosted`.

### MODE

Application mode. Possible values:

| Value | Description                                |
|-------|--------------------------------------------|
| `bff` | Backend-for-Frontend mode (default)        |
| `svc` | Service mode                               |

### ENVIRONMENT

The environment name. Example values: `development` (default), `production`, `testing`.

### VERSION

The project version. Default: `1.0.0`.

### LOG_LEVEL

Controls the logging verbosity. Possible values: `trace`, `debug`, `info` (default), `warning`, `error`.

## Server Settings

### SERVER_HOST

The server bind address. Default: `127.0.0.1`. Change to `0.0.0.0` to make the server accessible externally.

### SERVER_PORT

Default: `8002`.

### SERVER_DNS

Optional DNS name for the server.

### MAX_SERVER_REQUEST_BODY_SIZE

Maximum request body size in bytes. Default: `8388608` (8 MB).

## Authentication & Keys

### ACCESS_TOKEN

Only used with `cloud` deployment target. The value can be found at https://supabase.com/dashboard/account/tokens.

### ANON_KEY

The anon key allows users to interact with Supabase as "anonymous" users.

- **Cloud**: Found in [Project Settings](https://supabase.com/dashboard/projects).
- **Self-hosted**: Generate your own anon key.

Read [anon key documentation on Supabase](https://supabase.com/docs/guides/api/api-keys#the-anon-key).

### SERVICE_KEY

The service key performs administrative tasks and can bypass RLS.

- **Cloud**: Found in [Project Settings](https://supabase.com/dashboard/projects).
- **Self-hosted**: Generate your own service key.

Read [service key documentation on Supabase](https://supabase.com/docs/guides/api/api-keys#the-servicerole-key).

### JWT_TOKEN

JWT token for authentication.

### JWT_SECRET

JWT secret for token verification.

## Supabase Connection

### SUPABASE_API_URL

- **Cloud**: `https://api.supabase.com`
- **Self-hosted**: Your Supabase API URL.

### SUPABASE_API_BASE_PATH

Used for self-hosted deployments. Default: `/api/pg-meta/default`.

### SUPABASE_PUBLIC_URL

- **Cloud**: Your project URL.
- **Self-hosted**: Your Supabase Studio URL.

### SUPABASE_API_TOKEN

API token for Supabase API authentication.

### SUPABASE_API_TOKEN_TYPE

Token type for the Supabase API. Values: `basic` or `bearer`.

### PG_META_URL

URL for the PostgreSQL metadata service.

### POSTGREST_URL

URL for the PostgREST API.

### ALLOWED_TABLES

Comma-separated list of tables to expose. Default: `*` (all tables).

## CORS Settings

### CORS_ALLOWED_ORIGINS

Comma-separated list of allowed origins for CORS requests.

### CORS_ALLOWED_METHODS

Comma-separated list of allowed HTTP methods.

### CORS_ALLOWED_HEADERS

Comma-separated list of allowed HTTP headers.

### CORS_ALLOWED_CREDENTIALS

Boolean. Whether to allow credentials in CORS requests.

## Scheduler Settings

### SCHEDULE_STATUS

Enable or disable the job scheduler. Values: `on` or `off` (default).

See [Scheduler](/docs/schedule) for details on defining jobs.

## Tracing Settings

### TRACE_ENABLE

Enable OpenTelemetry tracing. Default: `false`.

### TRACE_COLLECTOR

The tracing collector type (e.g., `jaeger`, `otlp`).

### TRACE_COLLECTOR_ENDPOINT

The endpoint URL for the tracing collector.

## Circuit Breaker

### BREAKER_ENABLE

Enable the circuit breaker middleware. Default: `true`.

## Google Cloud Settings

### GOOGLE_PROJECT_ID

Google Cloud project ID. Required for Google Cloud Pub/Sub integration.

### GOOGLE_SA_PATH

Path to the Google Cloud service account JSON file.

## Dynamic Configuration Access

The `Config` struct provides helper methods to access additional configuration values from the YAML file:

```go
config.GetString("CUSTOM_KEY")
config.GetBool("FEATURE_FLAG")
config.GetInt("MAX_RETRIES")
config.GetFloat64("RATE_LIMIT")
config.GetStringSlice("ALLOWED_IPS")
config.GetIntSlice("PORT_RANGE")
```

## Example Configuration

```yaml
# configs/app.yaml
PROJECT_NAME: my-app
PROJECT_ID: your-project-id
DEPLOYMENT_TARGET: self_hosted
MODE: bff
ENVIRONMENT: development
VERSION: 1.0.0
LOG_LEVEL: info

SERVER_HOST: 0.0.0.0
SERVER_PORT: 8002

ANON_KEY: your-anon-key
SERVICE_KEY: your-service-key

SUPABASE_API_URL: http://localhost:8000
SUPABASE_API_BASE_PATH: /api/pg-meta/default
SUPABASE_PUBLIC_URL: http://localhost:3000
POSTGREST_URL: http://localhost:3001

CORS_ALLOWED_ORIGINS: http://localhost:5173,http://localhost:3000

SCHEDULE_STATUS: "on"

TRACE_ENABLE: false

BREAKER_ENABLE: true

GOOGLE_PROJECT_ID: my-gcp-project
GOOGLE_SA_PATH: ./configs/service-account.json
```
