@echo off
echo ===============================================
echo    Professional Portfolio - Setup Script
echo ===============================================
echo.

echo Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo.
    echo Error: Failed to install dependencies
    echo Please make sure Node.js is installed
    pause
    exit /b 1
)

echo.
echo ===============================================
echo    Setup completed successfully!
echo ===============================================
echo.
echo Starting development server...
echo Your portfolio will open at http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev

pause
