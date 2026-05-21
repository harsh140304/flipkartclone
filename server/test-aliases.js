const pool = require('./db');

async function test() {
  try {
    const { rows } = await pool.query(`
      SELECT 
        o.id as order_id, o."userId" as order_userId, o.status, o.subtotal, o.discount, o."deliveryCharges", o.total, o."shippingAddress", o."createdAt" as order_createdAt,
        i.id as item_id, i."productId", i.quantity as item_quantity, i."priceAtPurchase", i."createdAt" as item_createdAt,
        p.id as product_id, p.name, p.images
      FROM "Order" o
      LEFT JOIN "OrderItem" i ON o.id = i."orderId"
      LEFT JOIN "Product" p ON i."productId" = p.id
      LIMIT 1
    `);
    console.log(Object.keys(rows[0] || {}));
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

test();
