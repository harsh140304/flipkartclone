const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pool = require('../db');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Helper to map join results to nested objects
const mapWishlistItem = (row) => ({
  id: row.wishlist_id,
  userId: row.userId,
  productId: row.productId,
  createdAt: row.wishlist_createdat,
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

const selectWishlistQuery = `
  SELECT 
    w.id as wishlist_id, w."userId", w."productId", w."createdAt" as wishlist_createdAt,
    p.id as product_id, p.name, p.description, p.brand, p.category, p.price, p.mrp, p.stock, 
    p.rating, p."reviewCount", p.images, p.specifications, p."createdAt" as product_createdAt
  FROM "WishlistItem" w
  JOIN "Product" p ON w."productId" = p.id
`;

// Get wishlist
router.get('/', verifyToken, async (req, res) => {
  try {
    const { rows } = await pool.query(`${selectWishlistQuery} WHERE w."userId" = $1 ORDER BY w."createdAt" DESC`, [req.userId]);
    res.json(rows.map(mapWishlistItem));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching wishlist' });
  }
});

// Add to wishlist
router.post('/', verifyToken, async (req, res) => {
  try {
    const { productId } = req.body;

    const check = await pool.query('SELECT id FROM "WishlistItem" WHERE "userId" = $1 AND "productId" = $2', [req.userId, productId]);
    if (check.rows.length > 0) {
      return res.status(400).json({ error: 'Product already in wishlist' });
    }

    const wishlistItemId = uuidv4();
    await pool.query(
      'INSERT INTO "WishlistItem" (id, "userId", "productId") VALUES ($1, $2, $3)',
      [wishlistItemId, req.userId, productId]
    );

    const { rows } = await pool.query(`${selectWishlistQuery} WHERE w.id = $1`, [wishlistItemId]);
    res.status(201).json(mapWishlistItem(rows[0]));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while adding to wishlist' });
  }
});

// Remove from wishlist
router.delete('/:productId', verifyToken, async (req, res) => {
  try {
    const { productId } = req.params;

    const check = await pool.query('SELECT id FROM "WishlistItem" WHERE "userId" = $1 AND "productId" = $2', [req.userId, productId]);
    if (check.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found in wishlist' });
    }

    await pool.query('DELETE FROM "WishlistItem" WHERE id = $1', [check.rows[0].id]);
    res.json({ message: 'Item removed from wishlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while removing from wishlist' });
  }
});

module.exports = router;
