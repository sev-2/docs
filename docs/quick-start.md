---
title: Quick Start
---

# Quick Start

Copy and paste this command to your Terminal

```sh
sh -c "$(curl -fsSL https://raiden.sev-2.com/install.sh)"
```

Type `raiden version` to check Raiden version and ensure Raiden was installed properly.

::: info
For manual installation, you can visit [Installation](/docs/installation) page.
:::

To start development with Raiden type `raiden start`.
That command will guide you interactively. You can choose between Supabase Cloud or Supabase self-hosted.

## Supabase Cloud

Supabase provide cloud infrastructure

```sh
~ raiden start
Enter project name: <your-project-name>
Enter your anon key: **********
Enter your service key: **********
Enter your target deployment:
  ▸ cloud
    self_hosted
Enter supabase api url: https://api.supabase.com
Enter your access token: **********
Enable Tracer (yes/no): no
```
You can get the anon key and service key from Supabase Project Settings.

[![qwe](/supabase-api-settings.png)](/supabase-api-settings.png)

For access token, you can generate it from https://supabase.com/dashboard/account/tokens.

[![qwe](/supabase-access-token.png)](/supabase-access-token.png)

## Self Hosted

To install Supabase self-hosted, please refers to [Supabase documentation](https://supabase.com/docs/guides/self-hosting).

You can get pre-configured `ANON_KEY` and `SERVICE_KEY` on https://supabase.com/docs/guides/self-hosting/docker#generate-api-keys.

```sh
~ raiden start
Enter project name: <your-project-name>
Enter your anon key: **********
Enter your service key: **********
Enter your target deployment:
    cloud
  ▸ self_hosted
Enter supabase api url: http://api.yourdomain.com
Enter supabase api base path: /api/pg-meta/default
Enable Tracer (yes/no): no
```

New directory will be generated based on your project's name.
To know more about project's structure read [Project Structure](/docs/structure).
