<div align="center">
  <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png" alt="Flipkart Logo" width="150" />
  
  # Flipkart Clone - Full Stack E-Commerce Platform

  <p>A high-performance, production-ready e-commerce platform replicating the core functionality and UI/UX of Flipkart.</p>

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

---

## 🚀 Live Demo
**Frontend:** [Vercel Deployment](https://flipkartclone-harsh140304s-projects.vercel.app/)  
**Backend:** Render API  
**Database:** Supabase PostgreSQL

**Test Account:**  
📧 `test@flipkart.com`  
🔑 `password123`

---

## 🛠️ Technology Stack

| Architecture Layer | Technologies Used |
| :--- | :--- |
| **Frontend UI** | React 18, Vite, Tailwind CSS v4, React Router DOM, React Icons |
| **Backend API** | Node.js, Express.js |
| **Database** | PostgreSQL (Raw SQL queries via `pg` library) |
| **Authentication** | JWT (JSON Web Tokens), `bcrypt` for password hashing |
| **Integrations** | `nodemailer` for automated order confirmation emails |

---

## ✨ Key Features

### 🛍️ Core E-Commerce
- **Dynamic Product Catalog:** Seeded with 100+ real products from DummyJSON API with accurate images.
- **Search & Filtering:** Functional search bar and category-based filtering (Laptops, Beauty, Home Decor, etc.).
- **Product Details:** Dedicated product pages featuring image galleries, rich specifications, and live stock tracking.
- **Cart Management:** Fully functional cart with quantity controls and real-time total calculation.
- **Decoupled Checkout:** Users can "Buy Now" for a single item without affecting their main cart, mirroring real Flipkart logic.

### 👤 User Experience & Account
- **Premium UI:** Includes an auto-sliding hero carousel, dynamic offer banners, category icon strips, and a rich footer.
- **Secure Authentication:** Full Signup/Login flow with password hashing and JWT session management.
- **Order History:** Users can view their past orders, delivery status, and historical pricing.
- **Wishlist:** Save products for later.
- **Email Notifications:** Automated HTML-formatted email receipts sent upon order confirmation.

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL installed locally (or a remote Supabase DB URL)

### 1. Clone the repository
```bash
git clone https://github.com/harsh140304/flipkartclone.git
cd flipkartclone
```

### 2. Backend Setup
```bash
cd server

# Install dependencies
npm install

# Environment Variables
cp .env.example .env
# Edit .env and fill in DATABASE_URL, JWT_SECRET, EMAIL_USER, EMAIL_PASS

# Initialize Database Schema
node init.js

# Seed 100+ Products from DummyJSON
node seed.js

# Start Development Server
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd client

# Install dependencies
npm install

# Environment Variables
cp .env.example .env
# Edit .env and set VITE_API_URL=http://localhost:5001/api

# Start React Vite Server
npm run dev
```

---

## 📐 Architecture & Design Decisions

- **Raw SQL over ORMs:** Used raw `pg` library queries instead of Prisma/Sequelize to demonstrate deep understanding of SQL joins, transactions, and schema design.
- **Transaction Safety:** Order placement utilizes strict PostgreSQL `BEGIN` / `COMMIT` / `ROLLBACK` transactions to ensure stock is accurately decremented and financial data is protected.
- **Financial Accuracy:** Historical prices (`priceAtPurchase`) are saved independently in the `OrderItem` table, guaranteeing that past receipts don't change if the master product price is updated later.
- **Fault-Tolerant Email:** Implemented aggressive connection timeouts (1000ms) for Nodemailer to prevent server hangs in restricted environments (e.g., Render Free Tier SMTP blocking), gracefully failing the email while succeeding the order.

---

<div align="center">
  <b>Built for academic demonstration purposes.</b>
</div>
