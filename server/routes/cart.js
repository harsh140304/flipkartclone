const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pool = require('../db');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Helper to map join results to nested objects
const mapCartItem = (row) => ({
  id: row.cart_id,
  userId: row.userId,
  productId: row.productId,
  quantity: row.quantity,
  createdAt: row.cart_createdat,
  product: {
    id: row.product_id,
    name: row.name,
    description: row.description,
    brand: row.brand,
    category: row.category,
    price: row.price,
    mrp: row.mrp,
    stock: row.stock,
    rating: row.rating,
    reviewCount: row.reviewCount,
    images: row.images,
    specifications: row.specifications,
    createdAt: row.product_createdat
  }
});

const selectCartQuery = `
  SELECT 
    c.id as cart_id, c."userId", c."productId", c.quantity, c."createdAt" as cart_createdAt,
    p.id as product_id, p.name, p.description, p.brand, p.category, p.price, p.mrp, p.stock, 
    p.rating, p."reviewCount", p.images, p.specifications, p."createdAt" as product_createdAt
  FROM "CartItem" c
  JOIN "Product" p ON c."productId" = p.id
`;

// Get cart items
router.get('/', verifyToken, async (req, res) => {
  try {
    const { rows } = await pool.query(`${selectCartQuery} WHERE c."userId" = $1`, [req.userId]);
    res.json(rows.map(mapCartItem));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching cart' });
  }
});

// Add/Update cart item (upsert)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const qty = quantity || 1;
    const cartId = uuidv4();

    // Upsert query
    await pool.query(
      `INSERT INTO "CartItem" (id, "userId", "productId", quantity) 
       VALUES ($1, $2, $3, $4)
       ON CONFLICT ("userId", "productId") 
       DO UPDATE SET quantity = "CartItem".quantity + EXCLUDED.quantity`,
      [cartId, req.userId, productId, qty]
    );

    // Fetch the updated item with product details
    const { rows } = await pool.query(
      `${selectCartQuery} WHERE c."userId" = $1 AND c."productId" = $2`,
      [req.userId, productId]
    );

    res.status(201).json(mapCartItem(rows[0]));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while adding to cart' });
  }
});

// Update cart item quantity
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { quantity } = req.body;

    const check = await pool.query('SELECT "userId" FROM "CartItem" WHERE id = $1', [req.params.id]);
    if (check.rows.length === 0 || check.rows[0].userId !== req.userId) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    await pool.query('UPDATE "CartItem" SET quantity = $1 WHERE id = $2', [quantity, req.params.id]);

    const { rows } = await pool.query(`${selectCartQuery} WHERE c.id = $1`, [req.params.id]);
    res.json(mapCartItem(rows[0]));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while updating cart item' });
  }
});

// Delete cart item
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const check = await pool.query('SELECT "userId" FROM "CartItem" WHERE id = $1', [req.params.id]);
    if (check.rows.length === 0 || check.rows[0].userId !== req.userId) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    await pool.query('DELETE FROM "CartItem" WHERE id = $1', [req.params.id]);
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while removing cart item' });
  }
});

module.exports = router;
