---
title: Installation
---

# Installation

The quickest way to install Raiden is by run this command

```sh
sh -c "$(curl -fsSL https://raiden.sev-2.com/install.sh)"
```

The command above will detect your OS and CPU architecture, then install it to your `$PATH`.

If you prefer manual way to install Raiden, we also provide a way to install Raiden on specific OS.

## Ubuntu/Debian

Using Snap

```sh
sudo snap install raiden --classic
```

Using PPA

```sh
sudo apt-get install add-apt-repository
sudo add-apt-repository ppa:sev-2/raiden
sudo apt-get update
sudo apt-get install raiden
```

## macOS

On macOS, you can install through [Homebrew](https://brew.sh).

```sh
brew install sev-2/raiden
```

## Windows

Download the latest version of Raiden at https://raiden.sev-2.com/raiden.exe
