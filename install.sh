#!/bin/sh

detect_os() {
    case "$(uname -s)" in
        Linux*)   echo "linux" ;;
        Darwin*)  echo "macos" ;;
        CYGWIN*|MINGW*) echo "windows" ;;
        *)        echo "Unsupported OS" ; exit 1 ;;
    esac
}

detect_architecture() {
    case "$(uname -m)" in
        x86_64)   echo "amd64" ;;
        aarch64)  echo "arm64" ;;
        arm64)    echo "arm64" ;;
        *)        echo "Unsupported architecture" ; exit 1 ;;
    esac
}

OS=$(detect_os)
ARCH=$(detect_architecture)
REPO_OWNER="sev-2"
REPO_NAME="raiden"
DOWNLOAD_URL="https://github.com/$REPO_OWNER/$REPO_NAME/releases/latest/download"

case "$OS" in
    "linux")
        DOWNLOAD_URL="$DOWNLOAD_URL/raiden-$OS-$ARCH.tar.gz"
        ;;
    "macos")
        DOWNLOAD_URL="$DOWNLOAD_URL/raiden-$OS-$ARCH.tar.gz"
        ;;
    "windows")
        DOWNLOAD_URL="$DOWNLOAD_URL/raiden-$OS-$ARCH.exe"
        ;;
    *)
        echo "Unsupported OS"
        exit 1
        ;;
esac

# Download the binary
echo "Downloading Raiden from $DOWNLOAD_URL"
tmpfile=$(mktemp)
curl -sL -o $tmpfile "$DOWNLOAD_URL"
tar -xf $tmpfile
rm $tmpfile
echo "Raiden downloaded successfully!"
sh -c "./raiden version"
