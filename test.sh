#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "Starting Spice Haven Test Suite..."

# Check if MongoDB is running
echo "Checking MongoDB connection..."
if ! mongosh --eval "db.version()" > /dev/null 2>&1; then
    echo -e "${RED}MongoDB is not running. Please start MongoDB first.${NC}"
    exit 1
fi
echo -e "${GREEN}MongoDB is running.${NC}"

# Start backend server
echo "Starting backend server..."
cd backend
npm install
npm start &
BACKEND_PID=$!

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 5

# Run backend tests
echo "Running backend tests..."
npm test

# Start frontend development server
echo "Starting frontend development server..."
cd ../frontend
npm install
npm start &
FRONTEND_PID=$!

# Wait for frontend to start
echo "Waiting for frontend to start..."
sleep 5

# Run frontend tests
echo "Running frontend tests..."
npm test

# Cleanup
echo "Cleaning up..."
kill $BACKEND_PID
kill $FRONTEND_PID

echo -e "${GREEN}Test suite completed!${NC}"

curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmM3NGViMGZiYmIxN2UzOTVlNzZkMyIsImlhdCI6MTc0Nzc0NDE1NiwiZXhwIjoxNzUwMzM2MTU2fQ.oPeqEUHv4B74C9ZF1izNrqp2Gil2E-sXCW8OYia0u2E" \
  -d '{
    "name": "Premium Black Pepper",
    "description": "Freshly ground black pepper from India",
    "price": 12.99,
    "images": ["black-pepper.jpg"],
    "category": "ground",
    "origin": "India",
    "flavorProfile": ["spicy", "aromatic"],
    "heatLevel": 2,
    "stock": 100,
    "weight": {"value": 100, "unit": "g"}
  }' 