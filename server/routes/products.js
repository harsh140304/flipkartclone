const express = require('express');
const pool = require('../db');

const router = express.Router();

// Get all products with optional filters
router.get('/', async (req, res) => {
  try {
    const { search, category, sort } = req.query;

    let queryStr = 'SELECT * FROM "Product" WHERE 1=1';
    const queryParams = [];
    let paramIndex = 1;

    if (search) {
      queryStr += ` AND name ILIKE $${paramIndex}`;
      queryParams.push(`%${search}%`);
      paramIndex++;
    }
    
    if (category && category !== 'All') {
      queryStr += ` AND category = $${paramIndex}`;
      queryParams.push(category);
      paramIndex++;
    }

    if (sort === 'price_asc') {
      queryStr += ' ORDER BY price ASC';
    } else if (sort === 'price_desc') {
      queryStr += ' ORDER BY price DESC';
    } else if (sort === 'rating') {
      queryStr += ' ORDER BY rating DESC';
    }

    const { rows } = await pool.query(queryStr, queryParams);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching products' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM "Product" WHERE id = $1', [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching product' });
  }
});

module.exports = router;
