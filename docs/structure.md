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
├── cmd
│   └── project-name
│       └── project_name.go    # Main project
│   └── apply/main.go
│   └── import/main.go
├── internal
│   ├── bootstrap
│   │   ├── route.go
│   │   ├── rpc.go
│   │   ├── roles.go
│   │   ├── models.go
│   │   └── storages.go
│   ├── <b>controllers</b>
│   │   └── <b>hello.go</b>    # Example controller
│   ├── <b>roles</b>           # ACL/RLS definition
│   │   ├── members.go
│   │   └── ...
│   ├── <b>models</b>          # All model will auto-sync
│   │   ├── users.go
│   │   └── ...
│   ├── <b>rpc</b>             # RPC
│   │   └── get_user.go
│   ├── <b>topics</b>          # Real-time
│   │   ├── notification.go
│   │   └── inbox.go
│   │
│   └── <b>storages</b>
│       └── avatar.go
├── build
│   └── state      # Bytecode containing raiden state
├── go.sum
└── go.mod
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

### controllers

You can define route path, HTTP verb, request and response on the controllers. For more details read [Controller](/docs/controller).

### models

You can database schema on models. The model definition will auto-synchronize with Supabase. For more details read [Model](/docs/model).

### roles

This directory contains ACL definition that can auto-sync with Supabase. For more details read [Controller](/docs/acl).

### routes

This folder contains generated files by controlers.
