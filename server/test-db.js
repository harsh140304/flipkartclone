const pool = require('./db');

async function test() {
  try {
    const { rows } = await pool.query('SELECT COUNT(*) FROM "Product"');
    console.log("Total products in DB:", rows[0].count);
    
    const { rows: products } = await pool.query('SELECT * FROM "Product" LIMIT 1');
    console.log("Sample product:", products[0]);
  } catch (err) {
    console.error("DB Error:", err);
  } finally {
    pool.end();
  }
}

test();
