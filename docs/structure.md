---
title: Project Structure
---

# Project Structure

## Application Structure
Default Raiden project structure.

<pre>
├── <b>configs</b>
│   ├── <b>app.yaml</b>          # App configuration file
│   └── <b>modules/</b>          # Module configuration file
│       ├── module_a.yaml
│       ├── module_b.yaml
│       └── ...
├── <b>cmd</b>
│   ├── <b>apply/main.go</b>     # Command to apply changes (e.g., to PostgreSQL)
│   ├── <b>import/main.go</b>    # Command to import (e.g., PostgreSQL functions)
│   └── <b>project-name/</b>
│       └── <b>project_name.go</b> # Main application entry point
├── <b>internal</b>
│   ├── <b>bootstrap</b>         # Application initialization and setup
│   │   ├── route.go
│   │   ├── rpc.go
│   │   ├── roles.go
│   │   ├── models.go
│   │   ├── storages.go
│   │   ├── libs.go
│   │   ├── jobs.go
│   │   └── subscribers.go
│   ├── <b>controllers</b>       # API controllers (REST, RPC, Custom)
│   │   └── <b>hello.go</b>      # Example controller
│   ├── <b>jobs</b>              # Background job definitions
│   │   └── <b>example.go</b>    # Example job
│   ├── <b>libs</b>              # Shared libraries and utilities
│   │   └── <b>email.go</b>      # Example library
│   ├── <b>models</b>            # Database schema definitions
│   │   └── <b>users.go</b>      # Example model
│   ├── <b>repositories</b>      # Data access layer
│   │   └── <b>user.go</b>       # Example repository
│   ├── <b>roles</b>             # ACL/RLS definitions
│   │   └── <b>members.go</b>    # Example role
│   ├── <b>rpc</b>               # Generated RPC function definitions
│   │   └── <b>get_user.go</b>   # Example RPC function
│   ├── <b>storages</b>          # Storage related implementations
│   │   └── <b>avatar.go</b>     # Example storage
│   ├── <b>subscribers</b>       # Event subscribers
│   │   └── <b>status.go</b>     # Example subscriber
│   ├── <b>types</b>             # Custom types and enums
│   │   └── <b>user_role.go</b>  # Example type
│   └── <b>utils</b>             # General utility functions
│       └── <b>string.go</b>     # Example utility
├── <b>migrations</b>            # Database migration files
├── <b>vendor</b>                # Go module dependencies
├── <b>.env</b>                  # Environment variables
├── <b>.gitignore</b>
├── <b>Dockerfile</b>
├── <b>go.mod</b>
├── <b>go.sum</b>
└── <b>README.md</b>
</pre>

## Module Structure

<pre>
├── pkg
│   ├── <b>controllers</b>
│   │   ├── hello.go
│   │   └── ...
│   ├── <b>rbac</b>
│   │   ├── creator.go
│   │   ├── approver.go
│   │   └── ...
│   ├── <b>models</b>
│   │   ├── users.go
│   │   └── ...
│   ├── <b>rpc</b>
│   │   └── get_user.go
│   ├── topics
│   │   ├── notification.go
│   │   └── inbox.go
│   └── storages
│       └── avatar.go
├── go.sum
└── go.mod
</pre>

## Directories

### configs

Default config directory. Including the default config `app.yaml`. For more information, read [Config](/docs/config).

### cmd

Contains the main entry points for different application commands or services, such as `apply`, `import`, and the main project executable.

### internal

This directory contains the core application logic and components.

#### internal/bootstrap

Handles the initialization and bootstrapping of various application components, including routes, RPCs, roles, models, storages, libraries, jobs, and subscribers.

#### internal/controllers

Defines the API controllers, which handle incoming requests and define the application's endpoints. This includes REST, RPC, and custom controllers. For more details, read [Controller](/docs/controller).

#### internal/jobs

Contains definitions for background jobs that perform asynchronous tasks.

#### internal/libs

Houses shared libraries and utility functions used across the application.

#### internal/models

Defines the database schema and data structures. Model definitions can auto-synchronize with Supabase. For more details, read [Model](/docs/model).

#### internal/repositories

Provides an abstraction layer for data access, handling interactions with the database or other data sources.

#### internal/roles

Contains Access Control List (ACL) and Row Level Security (RLS) definitions, which can auto-sync with Supabase. For more details, read [ACL](/docs/acl).

#### internal/rpc

Contains generated Go code for PostgreSQL functions, allowing them to be called as Remote Procedure Calls within the application.

#### internal/storages

Manages storage-related implementations, such as file storage for avatars or attachments.

#### internal/subscribers

Defines event subscribers that react to specific application events.

#### internal/types

Contains custom Go types and enumerations used throughout the application.

#### internal/utils

Provides general utility functions that support various parts of the application.

### migrations

Contains database migration files used to manage schema changes over time.

### vendor

Stores Go module dependencies.
