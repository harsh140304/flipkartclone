#!/bin/bash
set -e
echo "Installing backend dependencies..."
cd /Users/harshsingh/.gemini/antigravity/scratch/flipkart-clone/server
npm install express cors dotenv jsonwebtoken bcrypt nodemailer @prisma/client
npm install --save-dev prisma nodemon

echo "Initializing frontend..."
cd /Users/harshsingh/.gemini/antigravity/scratch/flipkart-clone
npx -y create-vite@latest client --template react
cd client
npm install
npm install react-router-dom axios react-hot-toast react-icons
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

echo "Initialization complete!"
