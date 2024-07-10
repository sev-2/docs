@echo off
setlocal

REM Check if TempBinaryPath parameter is provided
if "%~1"=="" (
    echo Error: TempBinaryPath is mandatory.
    exit /b 1
)

set TempBinaryPath=%~1

REM Function to handle errors
:HandleError
    echo %~1
    exit /b 1

REM Ensure the provided path exists
if not exist "%TempBinaryPath%" (
    call :HandleError "Error: '%TempBinaryPath%' does not exist."
)

REM Find the current location of the raiden binary
for /f "delims=" %%i in ('where raiden.exe 2^>nul') do set BinPath=%%i

if "%BinPath%"=="" (
    call :HandleError "Error: 'raiden.exe' binary not found."
)

REM Step 1: Backup existing binary
copy "%BinPath%" "%BinPath%.old"
if errorlevel 1 (
    call :HandleError "Error: Failed to backup the existing binary."
)

REM Step 2: Replace with new binary
copy "%TempBinaryPath%" "%BinPath%" /Y
if errorlevel 1 (
    call :HandleError "Error: Failed to replace the binary."
)

REM Step 3: Set executable permissions (Windows does not require this for .exe files)

REM Check raiden version
"%BinPath%" --version

endlocal
exit /b 0
