#!/bin/bash

# Start Backend
cd server
npm start &
BACKEND_PID=$!

# Start Frontend
cd ../client
npm run dev &
FRONTEND_PID=$!

# Handle shutdown
trap "kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT

wait
