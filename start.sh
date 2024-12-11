#!/bin/bash
cd backend/
echo "Starting project..."
#deployment on render.com 
uvicorn main:app --host 0.0.0.0 --port ${PORT}