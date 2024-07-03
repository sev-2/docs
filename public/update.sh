#!/bin/bash

# Function to handle errors
handle_error() {
    exit $exit_code
}

# Trap errors and call handle_error function
trap 'handle_error $LINENO $?' ERR

if [ $# -ne 1 ]; then
    echo "Usage: $0 <temporary_binary_path>"
    exit 1
fi

TEMP_BINARY_PATH=$1

# Find the current location of the raiden binary
BIN_PATH=$(command -v raiden)

if [ -z "$BIN_PATH" ]; then
    echo "Error: 'raiden' binary not found."
    exit 1
fi

# Step 1: Backup existing binary
sudo cp "$BIN_PATH" "${BIN_PATH}.old"

# Step 2: Replace with new binary
sudo cp "$TEMP_BINARY_PATH" "$BIN_PATH"

# Step 3: Set executable permissions
sudo chmod +x "$BIN_PATH"

echo "'raiden' updated successfully."
