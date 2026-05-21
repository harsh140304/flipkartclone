const pool = require('./db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const productsData = [
  // Electronics
  {
    name: 'Samsung Galaxy S23 Ultra',
    description: 'The ultimate smartphone with 200MP camera and S Pen.',
    brand: 'Samsung',
    category: 'Electronics',
    price: 124999,
    mrp: 149999,
    stock: 50,
    rating: 4.8,
    reviewCount: 15400,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/s23ultra_${i}/400/400`),
    specifications: { "RAM": "12GB", "Storage": "256GB", "Display": "6.8 inch AMOLED" }
  },
  {
    name: 'Apple MacBook Air M2',
    description: 'Supercharged by M2 chip. 13.6-inch Liquid Retina display.',
    brand: 'Apple',
    category: 'Electronics',
    price: 104900,
    mrp: 114900,
    stock: 20,
    rating: 4.9,
    reviewCount: 8200,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/macbookm2_${i}/400/400`),
    specifications: { "RAM": "8GB", "Storage": "256GB SSD", "Processor": "Apple M2" }
  },
  {
    name: 'Sony WH-1000XM5 Noise Cancelling Headphones',
    description: 'Industry leading noise cancellation headphones.',
    brand: 'Sony',
    category: 'Electronics',
    price: 29990,
    mrp: 34990,
    stock: 0, // Out of stock example
    rating: 4.7,
    reviewCount: 4500,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/sonyxm5_${i}/400/400`),
    specifications: { "Type": "Over-Ear", "Connectivity": "Bluetooth", "Battery": "30 Hours" }
  },
  {
    name: 'LG 55 inch 4K Smart OLED TV',
    description: 'Experience self-lit OLED pixels and 4K resolution.',
    brand: 'LG',
    category: 'Electronics',
    price: 89990,
    mrp: 129990,
    stock: 15,
    rating: 4.6,
    reviewCount: 3200,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/lgoled_${i}/400/400`),
    specifications: { "Resolution": "4K Ultra HD", "Display": "OLED", "Refresh Rate": "120Hz" }
  },
  {
    name: 'Apple iPad Pro 11-inch',
    description: 'M2 chip, Liquid Retina display, Pro cameras.',
    brand: 'Apple',
    category: 'Electronics',
    price: 81900,
    mrp: 89900,
    stock: 25,
    rating: 4.8,
    reviewCount: 5100,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/ipadpro_${i}/400/400`),
    specifications: { "Display": "11-inch", "Storage": "128GB", "Processor": "Apple M2" }
  },

  // Fashion
  {
    name: 'Levi\'s Men\'s Slim Fit Jeans',
    description: 'Classic blue jeans for everyday wear.',
    brand: 'Levi\'s',
    category: 'Fashion',
    price: 1499,
    mrp: 2999,
    stock: 100,
    rating: 4.2,
    reviewCount: 8900,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/levisjeans_${i}/400/400`),
    specifications: { "Fit": "Slim", "Material": "Cotton Blend", "Color": "Blue" }
  },
  {
    name: 'Puma Running Shoes for Men',
    description: 'Lightweight and breathable running shoes.',
    brand: 'Puma',
    category: 'Fashion',
    price: 2199,
    mrp: 4999,
    stock: 80,
    rating: 4.3,
    reviewCount: 12000,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/pumashoes_${i}/400/400`),
    specifications: { "Type": "Running", "Outer Material": "Mesh", "Color": "Black" }
  },
  {
    name: 'Biba Women\'s Kurta Set',
    description: 'Elegant ethnic wear for festive occasions.',
    brand: 'Biba',
    category: 'Fashion',
    price: 1999,
    mrp: 3999,
    stock: 60,
    rating: 4.5,
    reviewCount: 6500,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/bibakurta_${i}/400/400`),
    specifications: { "Type": "Kurta Set", "Material": "Cotton", "Occasion": "Festive" }
  },
  {
    name: 'Casio Enticer Men\'s Watch',
    description: 'Classic analog watch with leather strap.',
    brand: 'Casio',
    category: 'Fashion',
    price: 2495,
    mrp: 2995,
    stock: 45,
    rating: 4.6,
    reviewCount: 4300,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/casiowatch_${i}/400/400`),
    specifications: { "Dial Color": "Black", "Strap Material": "Leather", "Display": "Analog" }
  },
  {
    name: 'Ray-Ban Aviator Sunglasses',
    description: 'Iconic aviator sunglasses with UV protection.',
    brand: 'Ray-Ban',
    category: 'Fashion',
    price: 5490,
    mrp: 6590,
    stock: 0, // Out of stock example
    rating: 4.7,
    reviewCount: 3100,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/rayban_${i}/400/400`),
    specifications: { "Style": "Aviator", "Frame Material": "Metal", "Lens Type": "UV Protected" }
  },

  // Home & Furniture
  {
    name: 'Wakefit Orthopedic Memory Foam Mattress',
    description: 'Comfortable mattress for a good night\'s sleep.',
    brand: 'Wakefit',
    category: 'Home & Furniture',
    price: 12499,
    mrp: 18999,
    stock: 30,
    rating: 4.6,
    reviewCount: 25000,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/wakefit_${i}/400/400`),
    specifications: { "Size": "King", "Material": "Memory Foam", "Thickness": "8 Inch" }
  },
  {
    name: 'Solimo 3-Seater Sofa',
    description: 'Modern 3-seater fabric sofa.',
    brand: 'Amazon Brand - Solimo',
    category: 'Home & Furniture',
    price: 15999,
    mrp: 25000,
    stock: 15,
    rating: 4.1,
    reviewCount: 1800,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/solimosofa_${i}/400/400`),
    specifications: { "Capacity": "3 Seater", "Material": "Fabric", "Color": "Grey" }
  },
  {
    name: 'Pigeon by Stovekraft Induction Cooktop',
    description: 'Efficient induction cooktop for fast cooking.',
    brand: 'Pigeon',
    category: 'Home & Furniture',
    price: 1499,
    mrp: 3195,
    stock: 150,
    rating: 4.0,
    reviewCount: 45000,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/pigeoninduction_${i}/400/400`),
    specifications: { "Type": "Induction", "Power": "1800W", "Control": "Push Button" }
  },
  {
    name: 'Philips 12W LED Bulb (Pack of 4)',
    description: 'Energy efficient LED bulbs.',
    brand: 'Philips',
    category: 'Home & Furniture',
    price: 499,
    mrp: 800,
    stock: 200,
    rating: 4.5,
    reviewCount: 12000,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/philipsbulb_${i}/400/400`),
    specifications: { "Wattage": "12W", "Type": "LED", "Color": "Cool Day Light" }
  },
  {
    name: 'Nilkamal Plastic Chair (Set of 2)',
    description: 'Durable plastic chairs for indoor/outdoor use.',
    brand: 'Nilkamal',
    category: 'Home & Furniture',
    price: 1199,
    mrp: 1800,
    stock: 80,
    rating: 4.2,
    reviewCount: 5600,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/nilkamalchair_${i}/400/400`),
    specifications: { "Material": "Plastic", "Set Size": "2", "Color": "Brown" }
  },

  // Books
  {
    name: 'Atomic Habits by James Clear',
    description: 'An easy & proven way to build good habits & break bad ones.',
    brand: 'Penguin',
    category: 'Books',
    price: 399,
    mrp: 799,
    stock: 120,
    rating: 4.8,
    reviewCount: 85000,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/atomichabits_${i}/400/400`),
    specifications: { "Author": "James Clear", "Format": "Paperback", "Language": "English" }
  },
  {
    name: 'The Psychology of Money',
    description: 'Timeless lessons on wealth, greed, and happiness.',
    brand: 'Jaico',
    category: 'Books',
    price: 299,
    mrp: 399,
    stock: 90,
    rating: 4.7,
    reviewCount: 62000,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/psychologymoney_${i}/400/400`),
    specifications: { "Author": "Morgan Housel", "Format": "Paperback", "Language": "English" }
  },
  {
    name: 'Ikigai',
    description: 'The Japanese secret to a long and happy life.',
    brand: 'Random House',
    category: 'Books',
    price: 350,
    mrp: 550,
    stock: 0, // Out of stock
    rating: 4.6,
    reviewCount: 41000,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/ikigai_${i}/400/400`),
    specifications: { "Author": "Hector Garcia", "Format": "Hardcover", "Language": "English" }
  },
  {
    name: 'Rich Dad Poor Dad',
    description: 'What the rich teach their kids about money.',
    brand: 'Plata Publishing',
    category: 'Books',
    price: 320,
    mrp: 499,
    stock: 150,
    rating: 4.6,
    reviewCount: 95000,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/richdad_${i}/400/400`),
    specifications: { "Author": "Robert T. Kiyosaki", "Format": "Mass Market Paperback", "Language": "English" }
  },
  {
    name: 'Harry Potter and the Philosopher\'s Stone',
    description: 'The magic begins here.',
    brand: 'Bloomsbury',
    category: 'Books',
    price: 450,
    mrp: 599,
    stock: 75,
    rating: 4.9,
    reviewCount: 110000,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/harrypotter_${i}/400/400`),
    specifications: { "Author": "J.K. Rowling", "Format": "Paperback", "Language": "English" }
  },

  // Sports
  {
    name: 'Yonex Mavis 350 Nylon Shuttlecock',
    description: 'Premium quality nylon shuttlecocks.',
    brand: 'Yonex',
    category: 'Sports',
    price: 999,
    mrp: 1250,
    stock: 200,
    rating: 4.5,
    reviewCount: 32000,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/yonexmavis_${i}/400/400`),
    specifications: { "Type": "Nylon", "Speed": "Slow", "Quantity": "6 per tube" }
  },
  {
    name: 'Nivia Storm Football',
    description: 'Durable football for training and matches.',
    brand: 'Nivia',
    category: 'Sports',
    price: 450,
    mrp: 850,
    stock: 120,
    rating: 4.1,
    reviewCount: 15000,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/niviafootball_${i}/400/400`),
    specifications: { "Size": "5", "Material": "Rubber", "Stitching": "Machine Stitched" }
  },
  {
    name: 'Decathlon Dumbbell Kit 20kg',
    description: 'Adjustable dumbbell set for home workouts.',
    brand: 'Decathlon',
    category: 'Sports',
    price: 3999,
    mrp: 4999,
    stock: 40,
    rating: 4.6,
    reviewCount: 8900,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/decathlondumbbell_${i}/400/400`),
    specifications: { "Weight": "20kg", "Material": "Cast Iron", "Type": "Adjustable" }
  },
  {
    name: 'Cosco Light Tennis Ball (Pack of 6)',
    description: 'Lightweight tennis balls for cricket.',
    brand: 'Cosco',
    category: 'Sports',
    price: 350,
    mrp: 450,
    stock: 300,
    rating: 4.4,
    reviewCount: 22000,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/coscoball_${i}/400/400`),
    specifications: { "Sport": "Cricket/Tennis", "Quantity": "6", "Color": "Green" }
  },
  {
    name: 'Kore PVC 10-40 Kg Home Gym Set',
    description: 'Complete home gym equipment set.',
    brand: 'Kore',
    category: 'Sports',
    price: 1299,
    mrp: 3599,
    stock: 60,
    rating: 3.9,
    reviewCount: 14000,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/koregym_${i}/400/400`),
    specifications: { "Material": "PVC", "Total Weight": "20kg", "Includes": "Plates, Rods" }
  },

  // Beauty
  {
    name: 'L\'Oreal Paris Revitalift Hyaluronic Acid Serum',
    description: 'Hydrating face serum for glowing skin.',
    brand: 'L\'Oreal Paris',
    category: 'Beauty',
    price: 899,
    mrp: 999,
    stock: 80,
    rating: 4.4,
    reviewCount: 18000,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/loreal_serum_${i}/400/400`),
    specifications: { "Volume": "30ml", "Skin Type": "All Skin Types", "Ingredient": "Hyaluronic Acid" }
  },
  {
    name: 'Maybelline New York Fit Me Foundation',
    description: 'Matte + Poreless liquid foundation.',
    brand: 'Maybelline',
    category: 'Beauty',
    price: 549,
    mrp: 649,
    stock: 150,
    rating: 4.5,
    reviewCount: 45000,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/maybelline_fitme_${i}/400/400`),
    specifications: { "Finish": "Matte", "Coverage": "Medium to Full", "Skin Type": "Normal to Oily" }
  },
  {
    name: 'Mamaearth Onion Hair Oil',
    description: 'Hair oil for hair growth and hair fall control.',
    brand: 'Mamaearth',
    category: 'Beauty',
    price: 399,
    mrp: 419,
    stock: 200,
    rating: 4.1,
    reviewCount: 35000,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/mamaearth_oil_${i}/400/400`),
    specifications: { "Volume": "150ml", "Hair Type": "All Hair Types", "Key Ingredient": "Onion Oil" }
  },
  {
    name: 'NIVEA Soft Light Moisturizer Cream',
    description: 'Non-greasy cream for face, hands and body.',
    brand: 'NIVEA',
    category: 'Beauty',
    price: 250,
    mrp: 350,
    stock: 250,
    rating: 4.6,
    reviewCount: 52000,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/nivea_cream_${i}/400/400`),
    specifications: { "Volume": "200ml", "Skin Type": "All Skin Types", "Form": "Cream" }
  },
  {
    name: 'Philips HP8100/46 Hair Dryer',
    description: 'Compact hair dryer for everyday styling.',
    brand: 'Philips',
    category: 'Beauty',
    price: 849,
    mrp: 945,
    stock: 120,
    rating: 4.3,
    reviewCount: 68000,
    images: Array(4).fill(0).map((_, i) => `https://picsum.photos/seed/philips_dryer_${i}/400/400`),
    specifications: { "Power": "1000W", "Settings": "2 Speed Settings", "Feature": "Compact Design" }
  }
];

async function main() {
  console.log('Seeding database using raw SQL...');
  
  // Clear existing data (using cascading delete to keep it simple, but we'll clear tables manually to be safe)
  await pool.query('DELETE FROM "OrderItem"');
  await pool.query('DELETE FROM "CartItem"');
  await pool.query('DELETE FROM "WishlistItem"');
  await pool.query('DELETE FROM "Order"');
  await pool.query('DELETE FROM "Product"');
  await pool.query('DELETE FROM "User"');

  const hashedPassword = await bcrypt.hash("password123", 10);
  const userId = uuidv4();
  
  await pool.query(
    'INSERT INTO "User" (id, name, email, password) VALUES ($1, $2, $3, $4)',
    [userId, "Test User", "test@flipkart.com", hashedPassword]
  );

  console.log('Created test user: test@flipkart.com');

  for (const p of productsData) {
    const id = uuidv4();
    await pool.query(
      `INSERT INTO "Product" (id, name, description, brand, category, price, mrp, stock, rating, "reviewCount", images, specifications) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        id, p.name, p.description, p.brand, p.category, p.price, p.mrp, 
        p.stock, p.rating, p.reviewCount, p.images, JSON.stringify(p.specifications)
      ]
    );
  }

  console.log(`Seeded ${productsData.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    pool.end();
  });
