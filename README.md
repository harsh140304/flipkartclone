# Flipkart Clone

This is a full-stack e-commerce web application built as a clone of Flipkart. It includes core shopping features like product browsing, searching, cart management, and user authentication.

## Live Links
- **Frontend App:** [https://flipkartclone-harsh140304s-projects.vercel.app/](https://flipkartclone-harsh140304s-projects.vercel.app/)
- **Test Account:** 
  - Email: `test@flipkart.com`
  - Password: `password123`

## Tech Stack
- **Frontend:** React 18, Vite, Tailwind CSS v4, React Router
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (using raw SQL queries via the `pg` library)
- **Authentication:** JWT and bcrypt
- **Email Service:** Nodemailer

## Features Implemented

**Shopping:**
- Browse over 100 seeded products with real images (data from DummyJSON)
- Search bar functionality and category-based filtering
- Detailed product pages showing price, stock, and specifications
- Shopping cart with quantity adjustments and dynamic total calculation
- "Buy Now" checkout feature decoupled from the main cart

**User Accounts:**
- Secure signup and login using JWT
- Personal order history dashboard
- Wishlist to save items for later

## Architecture Notes

I made a few specific design decisions for this project:

1. **Raw SQL instead of an ORM:** I chose to use the raw `pg` library to write SQL queries directly. This demonstrates a clear understanding of database design, table joins, and transactions without relying on an abstraction layer like Prisma or Sequelize.
2. **Database Transactions:** The checkout route uses strict `BEGIN`, `COMMIT`, and `ROLLBACK` commands. This ensures that stock levels are only decremented if the entire order goes through successfully, preventing data inconsistency.
3. **Historical Pricing:** In the `OrderItem` table, I store a specific `priceAtPurchase` column. This guarantees that past order receipts remain accurate even if the main product price is changed in the future.
4. **Email Timeout Handling:** The app uses Nodemailer to send order confirmation emails. Because the backend is hosted on Render's free tier (which blocks standard SMTP ports), I implemented a strict 1-second timeout on the email service. This ensures the checkout process completes instantly even if the email port is blocked by the host.

## How to Run Locally

### Prerequisites
- Node.js installed
- A local PostgreSQL database or a remote connection string

### Setup Instructions

1. Clone the repository and navigate into it.
2. **Backend Setup:**
   - Go to the `server` directory: `cd server`
   - Run `npm install`
   - Copy `.env.example` to `.env` and add your database URL and JWT secret.
   - Run `node init.js` to build the database schema.
   - Run `node seed.js` to populate the database with the sample products.
   - Run `npm run dev` to start the backend on port 5001.

3. **Frontend Setup:**
   - Open a new terminal and go to the `client` directory: `cd client`
   - Run `npm install`
   - Copy `.env.example` to `.env` and verify the API URL points to the backend.
   - Run `npm run dev` to start the React development server.
