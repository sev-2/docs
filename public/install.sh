#!/bin/sh
set -euo pipefail

# Detect OS
detect_os() {
    case "$(uname -s)" in
        Linux*)   echo "linux" ;;
        Darwin*)  echo "macos" ;;
        CYGWIN*|MINGW*) echo "windows" ;;
        *)        echo "Unsupported OS" >&2; exit 1 ;;
    esac
}

# Detect Architecture
detect_architecture() {
    case "$(uname -m)" in
        x86_64)   echo "amd64" ;;
        aarch64|arm64) echo "arm64" ;;
        *)        echo "Unsupported architecture" >&2; exit 1 ;;
    esac
}

# Default version
VERSION="latest"

# Parse arguments
while [ "$#" -gt 0 ]; do
    case "$1" in
        --version)
            VERSION="${2:-}"
            if [ -z "$VERSION" ]; then
                echo "Error: --version requires a value" >&2
                exit 1
            fi
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [--version <tag>]"
            exit 0
            ;;
        *)
            echo "Unknown argument: $1" >&2
            exit 1
            ;;
    esac
    shift
done

# Variables
OS="$(detect_os)"
ARCH="$(detect_architecture)"
REPO_OWNER="sev-2"
REPO_NAME="raiden"
FILE_NAME="$REPO_NAME-$OS-$ARCH"

# Determine download URL
if [ "$VERSION" = "latest" ]; then
    DOWNLOAD_URL="https://github.com/$REPO_OWNER/$REPO_NAME/releases/latest/download/$FILE_NAME"
else
    DOWNLOAD_URL="https://github.com/$REPO_OWNER/$REPO_NAME/releases/download/$VERSION/$FILE_NAME"
fi

# Download
echo "Downloading binary from $DOWNLOAD_URL"
if ! curl -fLo "$FILE_NAME" "$DOWNLOAD_URL"; then
    echo "Error: Failed to download version '$VERSION'. It may not exist." >&2
    exit 1
fi

chmod +x "$FILE_NAME"

[ "$OS" = "macos" ] && xattr -rc "$FILE_NAME"

echo "Binary downloaded successfully!"
./"$FILE_NAME" version
