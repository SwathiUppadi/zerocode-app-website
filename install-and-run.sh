#!/bin/bash

# Install dependencies
npm install

# Build the app
npm run build

# Kill any existing servers on port 3000 or 3001
# This is optional and depends on your server environment
# lsof -ti:3000 | xargs kill -9 2>/dev/null
# lsof -ti:3001 | xargs kill -9 2>/dev/null

# Start the app on port 3002 (trying a different port)
PORT=3002 npm start
