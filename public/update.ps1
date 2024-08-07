param (
    [Parameter(Mandatory = $true)]
    [string]$TempBinaryPath
)

function Handle-Error {
    param (
        [string]$Message
    )
    Write-Error $Message
    exit 1
}

# Ensure the provided path exists
if (-Not (Test-Path $TempBinaryPath)) {
    Handle-Error "Error: '$TempBinaryPath' does not exist."
}

# Find the current location of the raiden binary
$BinPath = Get-Command raiden.exe -ErrorAction SilentlyContinue

if (-Not $BinPath) {
    Handle-Error "Error: 'raiden.exe' binary not found."
}

# Convert to string
$BinPath = $BinPath.Source

try {
    # Step 1: Backup existing binary
    Copy-Item -Path $BinPath -Destination "$BinPath.old" -ErrorAction Stop

    # Step 2: Replace with new binary
    Copy-Item -Path $TempBinaryPath -Destination $BinPath -Force -ErrorAction Stop

    # Step 3: Set executable permissions
    # In Windows, this is generally not needed for .exe files, but we can ensure it has the correct attributes
    $acl = Get-Acl $BinPath
    $rule = New-Object System.Security.AccessControl.FileSystemAccessRule("Everyone", "FullControl", "Allow")
    $acl.SetAccessRule($rule)
    Set-Acl $BinPath $acl
}
catch {
    Handle-Error $_.Exception.Message
}

# Check raiden version
& $BinPath --version
