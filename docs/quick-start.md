---
title: Quick Start
---

<script setup>
  import { ref } from 'vue';

  const tab = ref('cloud');
</script>

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

<div style="flex">
  <div style="display: flex; gap: 12px; border-bottom: 1px solid white;">
    <div @click="tab = 'cloud'" :style="tab == 'cloud' ? 'background: white; color: black; border-radius: 2px 2px 0 0;' : 'background: transparent;'" style="padding: 4px 8px; cursor: pointer;">Cloud</div>
    <div @click="tab = 'selfhosted'" :style="tab == 'selfhosted' ? 'background: white; color:black; border-radius: 2px 2px 0 0;' : 'background: transparent;'" style="padding: 4px 8px; cursor: pointer;">Self Hosted</div>
  </div>

  <div v-if="tab == 'cloud'">

### Supabase Cloud

After run `raiden start` set your target deployment to the cloud.

```sh
Enter your target deployment:
  ▸ cloud
    self_hosted
```

Type your project name. This can be exising project or a new project.

```sh
Enter project name: <your-project-name>
```

Insert the access token.

```sh
Enter your access token: **********
```

You can generate the access token from https://supabase.com/dashboard/account/tokens.

[![qwe](/supabase-access-token.png)](/supabase-access-token.png)

Type the anon key that you can get from Project Settings.

```sh
Enter your anon key: **********
```

[![qwe](/supabase-cloud-anon-key.png)](/supabase-cloud-anon-key.png)

Type the service key that you can get from Project Settings.

```sh
Enter your service key: **********
```

[![qwe](/supabase-cloud-service-key.png)](/supabase-cloud-service-key.png)

  </div>

  <div v-if="tab == 'selfhosted'">

### Self Hosted

::: info
To install Supabase self-hosted, please refers to [Supabase documentation](https://supabase.com/docs/guides/self-hosting).
:::

After run raiden start set your target deployment to self hosted.

```sh
Enter your target deployment:
    cloud
  ▸ self_hosted
```
You can get pre-configured `ANON_KEY` from [Supabase documentation](https://supabase.com/docs/guides/self-hosting/docker#generate-api-keys).

```sh
Enter your anon key: **********
```

You can get pre-configured `SERVICE_KEY` from [Supabase documentation](https://supabase.com/docs/guides/self-hosting/docker#generate-api-keys).

```sh
Enter your service key: **********
```

Type your Supabase API URL.

```sh
Enter supabase api url: https://api.yourdomain.com
```

  </div>
</div>

New directory will be generated based on your project's name.
To know more about project's structure read [Project Structure](/docs/structure).
