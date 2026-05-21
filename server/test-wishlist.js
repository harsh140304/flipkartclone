const pool = require('./db');

async function testWishlist() {
  try {
    const { rows } = await pool.query(`
      SELECT 
        w.id as wishlist_id, w."userId", w."productId", w."createdAt" as wishlist_createdAt,
        p.id as product_id, p.name, p.description, p.brand, p.category, p.price, p.mrp, p.stock, 
        p.rating, p."reviewCount", p.images, p.specifications, p."createdAt" as product_createdAt
      FROM "WishlistItem" w
      JOIN "Product" p ON w."productId" = p.id
      LIMIT 1
    `);
    console.log("Keys returned for wishlist query:");
    console.log(Object.keys(rows[0] || {}));
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

testWishlist();
