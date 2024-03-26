---
title: Kubernetes Deployment
---

# Kubernetes Deployment

Before run the deployment, ensure your `SERVER_HOST`
on [configs/app.yaml](/docs/config) is `0.0.0.0`.

To install Raiden on Kubernetes, you can use the [Helm](https://helm.sh/).

```sh
helm repo add raiden https://raiden.sev-2.com/charts
helm repo update
```

To customize the default helm values.

```sh
helm get values raiden > values.yaml
```

To install with custom values.

```sh
helm upgrade --install raiden -f values.yaml
```
