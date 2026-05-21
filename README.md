# Flipkart Clone

## Tech Stack
Frontend: React + Vite + Tailwind CSS v4
Backend: Node.js + Express.js
Database: PostgreSQL (Raw SQL via `pg` library)
Auth: JWT + bcrypt
Email: Nodemailer

## Features
Core:
- Product listing with search and category filter
- Product detail with image gallery, specs, stock status
- Cart with quantity controls
- Checkout with address form
- Order confirmation with Order ID

Bonus:
- Responsive design (mobile/tablet/desktop)
- User authentication (Signup/Login with JWT)
- Order history
- Wishlist
- Email notification on order placement

## Setup
1. Clone repo
2. Backend Setup (`cd server`)
   - Copy `.env.example` to `.env`
   - Fill: `DATABASE_URL`, `JWT_SECRET`, `EMAIL_USER`, `EMAIL_PASS`, `PORT=5001`
   - Run `npm install`
   - Run `node init.js` to create tables
   - Run `node seed.js` to populate sample data
   - Run `npm run dev` to start server
3. Frontend Setup (`cd client`)
   - Copy `.env.example` to `.env`
   - Fill: `VITE_API_URL=http://localhost:5001/api`
   - Run `npm install`
   - Run `npm run dev` to start frontend

## Test Credentials
Email: test@flipkart.com
Password: password123

## Assumptions
- JWT stored in localStorage; sent as Authorization: Bearer header
- priceAtPurchase stored in OrderItem for financial accuracy
- Free delivery on all orders
- Stock decrements on order placement
- Email uses Gmail App Password (not regular password)
