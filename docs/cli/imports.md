---
title: Imports
---

# Imports Command

```sh
raiden imports
```

This command will import Supabase resources and generate to files.
You can also import specific resource.

Available flags:

```
$ raiden imports --help

Fetch supabase resource and generate to file

Usage:
  raiden imports [flags]

Flags:
      --generate-routes-only   generate register routes file only
      --generate-rpc-only      generate register rpc file only
  -h, --help                   help for imports
  -m, --models-only            import models only
  -r, --roles-only             import roles only
      --rpc-only               import rpc only
  -s, --schema string          set allowed schema to import, use comma separator for multiple schema

Global Flags:
  -v, --verbose   enable verbose output
```
