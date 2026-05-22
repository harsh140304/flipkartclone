const express = require('express');
const cors = require('cors');
require('dotenv').config();


const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const wishlistRoutes = require('./routes/wishlist');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);

app.get('/', (req, res) => {
  res.send('Flipkart Clone API is running');
});

const seedDatabase = require('./seed');
app.get('/api/seed', async (req, res) => {
  try {
    await seedDatabase();
    res.send('Database seeded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Seeding failed: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
