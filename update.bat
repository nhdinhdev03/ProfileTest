@echo off
echo ===============================================
echo    Professional Portfolio - Update Script
echo ===============================================
echo.

echo Updating to latest dependencies...
echo This will fix SCSS deprecation warnings and update Sass to modern version.
echo.

echo Installing latest dependencies...
npm install

if %errorlevel% neq 0 (
    echo.
    echo Error: Failed to update dependencies
    pause
    exit /b 1
)

echo.
echo ===============================================
echo    Update completed successfully!
echo ===============================================
echo.
echo Changes applied:
echo - Updated Sass to modern version ^(1.77.0^)
echo - Migrated all SCSS files from @import to @use syntax
echo - Enabled modern Sass compiler API in Vite
echo - Removed duplicate imports causing warnings
echo - Fixed React Icons import error ^(FiFolderOpen -^> FiFolder^)
echo.
echo Starting development server...
echo.

npm run dev

pause
