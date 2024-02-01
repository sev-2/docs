---
title: Deployment Strategy
---

# Deployment Strategy

Before run the deployment, ensure your `SERVER_HOST`
on [configs/app.yaml](/docs/config) is `0.0.0.0`.

## Binary Deployment

```sh
go build ./cmd/project-name/project-name.go
```

That command will build `project-name` binary based on your OS and CPU architecture.
You can deploy that binary to the server.

It could be your target deployment OS is different with your development OS.
For example, your development machine is MacBook with M1 CPU, and your deployment target is
Linux with AMD/Intel CPU. In that case you can add `GOOS` or `GOARCH` variable to
the build command.

```sh
GOOS=linux GOARCH=amd64 go build ./cmd/project-name/project-name.go
```

## Kubernetes Deployment

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
