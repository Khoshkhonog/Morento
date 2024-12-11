#!/bin/bash


cd car_rent_react || { echo "Directory car_rent_react not found"; exit 1; }


echo "Building React application..."
npm install   
npm run build  

cd ../backend || { echo "Directory backend not found"; exit 1; }


echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Setup completed successfully."