#!/bin/sh

# Function to detect operating system
detect_os() {
    case "$(uname -s)" in
        Linux*)   echo "linux" ;;
        Darwin*)  echo "macos" ;;
        CYGWIN*|MINGW*) echo "windows" ;;
        *)        echo "Unsupported OS" ; exit 1 ;;
    esac
}

# Function to detect architecture
detect_architecture() {
    case "$(uname -m)" in
        x86_64)   echo "amd64" ;;
        aarch64)  echo "arm64" ;;
        arm64)  echo "arm64" ;;
        *)        echo "Unsupported architecture" ; exit 1 ;;
    esac
}

# Main script
OS=$(detect_os)
ARCH=$(detect_architecture)
REPO_OWNER="sev-2"
REPO_NAME="raiden"
RELEASE_TAG="v1.0.0-alpha.4"
DOWNLOAD_URL="https://github.com/$REPO_OWNER/$REPO_NAME/releases/download/$RELEASE_TAG"

# Download binary according to OS and architecture
case "$OS" in
    "linux")
        DOWNLOAD_URL="$DOWNLOAD_URL/$REPO_NAME-linux-$ARCH"
        ;;
    "macos")
        DOWNLOAD_URL="$DOWNLOAD_URL/$REPO_NAME-macos-$ARCH"
        ;;
    *)
        echo "Unsupported OS"
        exit 1
        ;;
esac

# Download the binary
echo "Downloading binary from $DOWNLOAD_URL"
curl -LO "$DOWNLOAD_URL"

echo "Binary downloaded successfully!"
