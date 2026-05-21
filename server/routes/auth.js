const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const pool = require('../db');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { rows: existingUser } = await pool.query('SELECT * FROM "User" WHERE email = $1', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    await pool.query(
      'INSERT INTO "User" (id, name, email, password) VALUES ($1, $2, $3, $4)',
      [userId, name, email, hashedPassword]
    );

    const token = jwt.sign({ userId: userId }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: { id: userId, name, email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { rows } = await pool.query('SELECT * FROM "User" WHERE email = $1', [email]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Get current user
router.get('/me', verifyToken, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, name, email FROM "User" WHERE id = $1', [req.userId]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
