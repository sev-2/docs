import{_ as e,c as o,o as r,V as t}from"./chunks/framework.sH_TUDjc.js";const m=JSON.parse('{"title":"Project Structure","description":"","frontmatter":{"title":"Project Structure"},"headers":[],"relativePath":"docs/structure.md","filePath":"docs/structure.md"}'),a={name:"docs/structure.md"},n=t(`<h1 id="project-structure" tabindex="-1">Project Structure <a class="header-anchor" href="#project-structure" aria-label="Permalink to &quot;Project Structure&quot;">​</a></h1><h2 id="application-structure" tabindex="-1">Application Structure <a class="header-anchor" href="#application-structure" aria-label="Permalink to &quot;Application Structure&quot;">​</a></h2><p>Default Raiden project structure.</p><pre>├── <b>configs</b>
│   ├── <b>app.yaml</b>          # App configuration file
│   └── <b>modules/</b>          # Module configuration file
│       ├── module_a.yaml
│       ├── module_b.yaml
│       └── ...
├── cmd
│   └── project-name
│       └── project-name.go    # Main project
│   └── apply/main.go
│   └── import/main.go
├── internal
│   ├── bootstrap
│   │   ├── route.go
│   │   ├── rpc.go
│   │   ├── roles.go
│   │   └── models.go
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
</pre><h2 id="module-structure" tabindex="-1">Module Structure <a class="header-anchor" href="#module-structure" aria-label="Permalink to &quot;Module Structure&quot;">​</a></h2><pre>├── pkg
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
</pre><h2 id="directories" tabindex="-1">Directories <a class="header-anchor" href="#directories" aria-label="Permalink to &quot;Directories&quot;">​</a></h2><h3 id="configs" tabindex="-1">configs <a class="header-anchor" href="#configs" aria-label="Permalink to &quot;configs&quot;">​</a></h3><p>Default config directory. Including the default config <code>app.yaml</code>. For more information, read <a href="/docs/config">Config</a>.</p><h3 id="controllers" tabindex="-1">controllers <a class="header-anchor" href="#controllers" aria-label="Permalink to &quot;controllers&quot;">​</a></h3><p>You can define route path, HTTP verb, request and response on the controllers. For more details read <a href="/docs/controller">Controller</a>.</p><h3 id="models" tabindex="-1">models <a class="header-anchor" href="#models" aria-label="Permalink to &quot;models&quot;">​</a></h3><p>You can database schema on models. The model definition will auto-synchronize with Supabase. For more details read <a href="/docs/model">Model</a>.</p><h3 id="roles" tabindex="-1">roles <a class="header-anchor" href="#roles" aria-label="Permalink to &quot;roles&quot;">​</a></h3><p>This directory contains ACL definition that can auto-sync with Supabase. For more details read <a href="/docs/acl">Controller</a>.</p><h3 id="routes" tabindex="-1">routes <a class="header-anchor" href="#routes" aria-label="Permalink to &quot;routes&quot;">​</a></h3><p>This folder contains generated files by controlers.</p>`,17),i=[n];function l(s,c,d,u,h,p){return r(),o("div",null,i)}const f=e(a,[["render",l]]);export{m as __pageData,f as default};
