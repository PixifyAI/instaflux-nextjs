@echo off
REM Install Node.js and npm if not already installed
echo Checking for Node.js and npm...
node -v >nul 2>&1
IF ERRORLEVEL 1 (
    echo Node.js not found. Please install Node.js from https://nodejs.org/
    exit /b
)

REM Clone the repository
echo Cloning the repository...
git clone https://github.com/PixifyAI/instaflux-nextjs
cd instaflux-nextjs

REM Install dependencies
echo Installing dependencies...
npm install

REM Start the development server
echo Starting the development server...
npm run dev

REM Open the browser to localhost
start http://localhost:3000

pause
