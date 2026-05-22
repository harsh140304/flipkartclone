const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pool = require('../db');
const verifyToken = require('../middleware/verifyToken');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

// Helper to structure order items
const structureOrders = (rows) => {
  const ordersMap = new Map();
  rows.forEach(row => {
    if (!ordersMap.has(row.order_id)) {
      ordersMap.set(row.order_id, {
        id: row.order_id,
        userId: row.order_userid,
        status: row.status,
        subtotal: row.subtotal,
        discount: row.discount,
        deliveryCharges: row.deliveryCharges,
        total: row.total,
        shippingAddress: row.shippingAddress,
        createdAt: row.order_createdat,
        items: []
      });
    }
    if (row.item_id) {
      ordersMap.get(row.order_id).items.push({
        id: row.item_id,
        orderId: row.order_id,
        productId: row.productId,
        quantity: row.item_quantity,
        priceAtPurchase: row.priceAtPurchase,
        createdAt: row.item_createdat,
        product: {
          id: row.product_id,
          name: row.name,
          images: row.images
        }
      });
    }
  });
  return Array.from(ordersMap.values());
};

const selectOrdersQuery = `
  SELECT 
    o.id as order_id, o."userId" as order_userId, o.status, o.subtotal, o.discount, o."deliveryCharges", o.total, o."shippingAddress", o."createdAt" as order_createdAt,
    i.id as item_id, i."productId", i.quantity as item_quantity, i."priceAtPurchase", i."createdAt" as item_createdAt,
    p.id as product_id, p.name, p.images
  FROM "Order" o
  LEFT JOIN "OrderItem" i ON o.id = i."orderId"
  LEFT JOIN "Product" p ON i."productId" = p.id
`;

// Create Order
router.post('/', verifyToken, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { shippingAddress, buyNowItem } = req.body;

    let orderItemsData = [];
    
    if (buyNowItem) {
      // Direct Buy Now checkout
      const { rows: productRows } = await client.query(
        'SELECT id, price, mrp, stock, name FROM "Product" WHERE id = $1',
        [buyNowItem.productId]
      );
      if (productRows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({ error: 'Product not found' });
      }
      orderItemsData = [{
        ...productRows[0],
        productId: productRows[0].id,
        quantity: buyNowItem.quantity
      }];
    } else {
      // Fetch cart items for user
      const { rows: cartItems } = await client.query(`
        SELECT c.*, p.price, p.mrp, p.stock, p.name 
        FROM "CartItem" c 
        JOIN "Product" p ON c."productId" = p.id 
        WHERE c."userId" = $1
      `, [req.userId]);

      if (cartItems.length === 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: 'Cart is empty' });
      }
      orderItemsData = cartItems;
    }

    let subtotal = 0;
    let discount = 0;

    for (const item of orderItemsData) {
      if (item.stock < item.quantity) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: `Not enough stock for ${item.name}` });
      }

      const itemTotal = item.price * item.quantity;
      const itemMrpTotal = item.mrp * item.quantity;
      
      subtotal += itemTotal;
      discount += (itemMrpTotal - itemTotal);
    }

    const deliveryCharges = 0;
    const total = subtotal + deliveryCharges;
    const orderId = uuidv4();

    // Insert Order
    await client.query(
      `INSERT INTO "Order" (id, "userId", status, subtotal, discount, "deliveryCharges", total, "shippingAddress")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [orderId, req.userId, 'CONFIRMED', subtotal, discount, deliveryCharges, total, JSON.stringify(shippingAddress)]
    );

    // Insert OrderItems and Decrement stock
    for (const item of orderItemsData) {
      const orderItemId = uuidv4();
      await client.query(
        `INSERT INTO "OrderItem" (id, "orderId", "productId", quantity, "priceAtPurchase")
         VALUES ($1, $2, $3, $4, $5)`,
        [orderItemId, orderId, item.productId, item.quantity, item.price]
      );

      await client.query(
        `UPDATE "Product" SET stock = stock - $1 WHERE id = $2`,
        [item.quantity, item.productId]
      );
    }

    // Clear cart only if it's a regular cart checkout
    if (!buyNowItem) {
      await client.query('DELETE FROM "CartItem" WHERE "userId" = $1', [req.userId]);
    }

    await client.query('COMMIT');

    // Fetch created order to return and send email
    const { rows: newOrderRows } = await client.query(`${selectOrdersQuery} WHERE o.id = $1`, [orderId]);
    const result = structureOrders(newOrderRows)[0];

    // Fetch user email for notification
    const { rows: userRows } = await pool.query('SELECT email FROM "User" WHERE id = $1', [req.userId]);
    const userEmail = userRows[0].email;

    // Send confirmation email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2874f0;">Flipkart</h1>
        <h2>Your order has been placed successfully!</h2>
        <p><strong>Order ID:</strong> ${result.id}</p>
        <h3>Items:</h3>
        <ul>
          ${result.items.map(item => "<li>" + item.product.name + " (x" + item.quantity + ") - ₹" + item.priceAtPurchase + "</li>").join('')}
        </ul>
        <p><strong>Total Amount:</strong> ₹${result.total}</p>
        <p><strong>Delivery Address:</strong><br>
          ${shippingAddress.addressLine1}, ${shippingAddress.addressLine2 || ''}<br>
          ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pincode}
        </p>
        <p><strong>Estimated Delivery:</strong> ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toDateString()}</p>
        <p>Thank you for shopping with Flipkart Clone.</p>
      </div>
    `;

    const emailResult = await sendEmail({
      to: userEmail,
      subject: `Order Confirmed! Order #${result.id}`,
      html: emailHtml,
    });
    
    if (emailResult && emailResult.previewUrl) {
      result.previewUrl = emailResult.previewUrl;
    }

    res.status(201).json(result);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ error: 'Server error while placing order' });
  } finally {
    client.release();
  }
});

// Get all orders for user
router.get('/', verifyToken, async (req, res) => {
  try {
    const { rows } = await pool.query(`${selectOrdersQuery} WHERE o."userId" = $1 ORDER BY o."createdAt" DESC`, [req.userId]);
    res.json(structureOrders(rows));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching orders' });
  }
});

// Get single order by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { rows } = await pool.query(`${selectOrdersQuery} WHERE o.id = $1`, [req.params.id]);
    const order = structureOrders(rows)[0];

    if (!order || order.userId !== req.userId) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching order details' });
  }
});

module.exports = router;
