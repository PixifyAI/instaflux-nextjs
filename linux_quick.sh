#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit
fi

# Clone the repository
echo "Cloning the repository..."
git clone https://github.com/PixifyAI/instaflux-nextjs
cd instaflux-nextjs || exit

# Install dependencies
echo "Installing dependencies..."
npm install

# Start the development server
echo "Starting the development server..."
npm run dev &

# Open the browser to localhost
xdg-open http://localhost:3000 || open http://localhost:3000
