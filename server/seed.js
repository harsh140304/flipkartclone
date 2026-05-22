const pool = require('./db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const productsData = [
  {
    "name": "Essence Mascara Lash Princess",
    "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    "brand": "Essence",
    "category": "beauty",
    "price": 799,
    "mrp": 893,
    "stock": 99,
    "rating": 2.56,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "4g",
      "Dimensions": "15.14x13.08x22.99 cm",
      "Warranty": "1 week warranty",
      "Shipping": "Ships in 3-5 business days"
    }
  },
  {
    "name": "Eyeshadow Palette with Mirror",
    "description": "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
    "brand": "Glamour Beauty",
    "category": "beauty",
    "price": 1599,
    "mrp": 1955,
    "stock": 34,
    "rating": 2.86,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp",
      "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "9g",
      "Dimensions": "9.26x22.47x27.67 cm",
      "Warranty": "1 year warranty",
      "Shipping": "Ships in 2 weeks"
    }
  },
  {
    "name": "Powder Canister",
    "description": "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
    "brand": "Velvet Touch",
    "category": "beauty",
    "price": 1199,
    "mrp": 1330,
    "stock": 89,
    "rating": 4.64,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp",
      "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "8g",
      "Dimensions": "29.27x27.93x20.59 cm",
      "Warranty": "3 months warranty",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Red Lipstick",
    "description": "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
    "brand": "Chic Cosmetics",
    "category": "beauty",
    "price": 1039,
    "mrp": 1183,
    "stock": 91,
    "rating": 4.36,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
      "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "1g",
      "Dimensions": "18.11x28.38x22.17 cm",
      "Warranty": "3 year warranty",
      "Shipping": "Ships in 1 week"
    }
  },
  {
    "name": "Red Nail Polish",
    "description": "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
    "brand": "Nail Couture",
    "category": "beauty",
    "price": 719,
    "mrp": 812,
    "stock": 79,
    "rating": 4.32,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp",
      "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "8g",
      "Dimensions": "21.63x16.48x29.84 cm",
      "Warranty": "1 month warranty",
      "Shipping": "Ships overnight"
    }
  },
  {
    "name": "Calvin Klein CK One",
    "description": "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
    "brand": "Calvin Klein",
    "category": "fragrances",
    "price": 3999,
    "mrp": 4076,
    "stock": 29,
    "rating": 4.37,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/2.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/3.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "7g",
      "Dimensions": "29.36x27.76x20.72 cm",
      "Warranty": "1 week warranty",
      "Shipping": "Ships overnight"
    }
  },
  {
    "name": "Chanel Coco Noir Eau De",
    "description": "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
    "brand": "Chanel",
    "category": "fragrances",
    "price": 10399,
    "mrp": 12456,
    "stock": 58,
    "rating": 4.26,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/2.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/3.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "7g",
      "Dimensions": "24.5x25.7x25.98 cm",
      "Warranty": "3 year warranty",
      "Shipping": "Ships overnight"
    }
  },
  {
    "name": "Dior J'adore",
    "description": "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
    "brand": "Dior",
    "category": "fragrances",
    "price": 7199,
    "mrp": 8442,
    "stock": 98,
    "rating": 3.8,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/1.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/2.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/3.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "4g",
      "Dimensions": "27.67x28.28x11.83 cm",
      "Warranty": "1 week warranty",
      "Shipping": "Ships in 2 weeks"
    }
  },
  {
    "name": "Dolce Shine Eau de",
    "description": "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
    "brand": "Dolce & Gabbana",
    "category": "fragrances",
    "price": 5599,
    "mrp": 5634,
    "stock": 4,
    "rating": 3.96,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/1.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/2.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/3.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "6g",
      "Dimensions": "27.28x29.88x18.3 cm",
      "Warranty": "3 year warranty",
      "Shipping": "Ships in 1 month"
    }
  },
  {
    "name": "Gucci Bloom Eau de",
    "description": "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
    "brand": "Gucci",
    "category": "fragrances",
    "price": 6399,
    "mrp": 7475,
    "stock": 91,
    "rating": 2.74,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/1.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/2.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/3.webp",
      "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "7g",
      "Dimensions": "20.92x21.68x11.2 cm",
      "Warranty": "6 months warranty",
      "Shipping": "Ships overnight"
    }
  },
  {
    "name": "Annibale Colombo Bed",
    "description": "The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.",
    "brand": "Annibale Colombo",
    "category": "furniture",
    "price": 151999,
    "mrp": 166247,
    "stock": 88,
    "rating": 4.77,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp",
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/2.webp",
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/3.webp",
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "10g",
      "Dimensions": "28.16x25.36x17.28 cm",
      "Warranty": "1 year warranty",
      "Shipping": "Ships in 1 month"
    }
  },
  {
    "name": "Annibale Colombo Sofa",
    "description": "The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.",
    "brand": "Annibale Colombo",
    "category": "furniture",
    "price": 199999,
    "mrp": 233644,
    "stock": 60,
    "rating": 3.92,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/1.webp",
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/2.webp",
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/3.webp",
      "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "6g",
      "Dimensions": "12.75x20.55x19.06 cm",
      "Warranty": "Lifetime warranty",
      "Shipping": "Ships in 1 week"
    }
  },
  {
    "name": "Bedside Table African Cherry",
    "description": "The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.",
    "brand": "Furniture Co.",
    "category": "furniture",
    "price": 23999,
    "mrp": 29662,
    "stock": 64,
    "rating": 2.87,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/1.webp",
      "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/2.webp",
      "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/3.webp",
      "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "2g",
      "Dimensions": "13.47x24.99x27.35 cm",
      "Warranty": "5 year warranty",
      "Shipping": "Ships overnight"
    }
  },
  {
    "name": "Knoll Saarinen Executive Conference Chair",
    "description": "The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.",
    "brand": "Knoll",
    "category": "furniture",
    "price": 39999,
    "mrp": 40820,
    "stock": 26,
    "rating": 4.88,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/1.webp",
      "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/2.webp",
      "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/3.webp",
      "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "10g",
      "Dimensions": "13.81x7.5x5.62 cm",
      "Warranty": "2 year warranty",
      "Shipping": "Ships overnight"
    }
  },
  {
    "name": "Wooden Bathroom Sink With Mirror",
    "description": "The Wooden Bathroom Sink with Mirror is a unique and stylish addition to your bathroom, featuring a wooden sink countertop and a matching mirror.",
    "brand": "Bath Trends",
    "category": "furniture",
    "price": 63999,
    "mrp": 70175,
    "stock": 7,
    "rating": 3.59,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/1.webp",
      "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/2.webp",
      "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/3.webp",
      "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "10g",
      "Dimensions": "7.98x8.88x28.46 cm",
      "Warranty": "3 year warranty",
      "Shipping": "Ships in 3-5 business days"
    }
  },
  {
    "name": "Apple",
    "description": "Fresh and crisp apples, perfect for snacking or incorporating into various recipes.",
    "brand": "Generic",
    "category": "groceries",
    "price": 159,
    "mrp": 182,
    "stock": 8,
    "rating": 4.19,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/apple/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "9g",
      "Dimensions": "13.66x11.01x9.73 cm",
      "Warranty": "3 year warranty",
      "Shipping": "Ships in 2 weeks"
    }
  },
  {
    "name": "Beef Steak",
    "description": "High-quality beef steak, great for grilling or cooking to your preferred level of doneness.",
    "brand": "Generic",
    "category": "groceries",
    "price": 1039,
    "mrp": 1150,
    "stock": 86,
    "rating": 4.47,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/beef-steak/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/beef-steak/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/beef-steak/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/beef-steak/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "10g",
      "Dimensions": "18.9x5.77x18.57 cm",
      "Warranty": "3 year warranty",
      "Shipping": "Ships overnight"
    }
  },
  {
    "name": "Cat Food",
    "description": "Nutritious cat food formulated to meet the dietary needs of your feline friend.",
    "brand": "Generic",
    "category": "groceries",
    "price": 719,
    "mrp": 795,
    "stock": 46,
    "rating": 3.13,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/cat-food/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/cat-food/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/cat-food/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/cat-food/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "10g",
      "Dimensions": "18.08x9.26x21.86 cm",
      "Warranty": "1 year warranty",
      "Shipping": "Ships overnight"
    }
  },
  {
    "name": "Chicken Meat",
    "description": "Fresh and tender chicken meat, suitable for various culinary preparations.",
    "brand": "Generic",
    "category": "groceries",
    "price": 799,
    "mrp": 926,
    "stock": 97,
    "rating": 3.19,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/2.webp",
      "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "1g",
      "Dimensions": "11.03x22.11x16.01 cm",
      "Warranty": "1 year warranty",
      "Shipping": "Ships in 1 month"
    }
  },
  {
    "name": "Cooking Oil",
    "description": "Versatile cooking oil suitable for frying, sautéing, and various culinary applications.",
    "brand": "Generic",
    "category": "groceries",
    "price": 399,
    "mrp": 440,
    "stock": 10,
    "rating": 4.8,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/cooking-oil/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/cooking-oil/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/cooking-oil/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/cooking-oil/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "5g",
      "Dimensions": "19.95x27.54x24.86 cm",
      "Warranty": "Lifetime warranty",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Cucumber",
    "description": "Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.",
    "brand": "Generic",
    "category": "groceries",
    "price": 119,
    "mrp": 119,
    "stock": 84,
    "rating": 4.07,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/cucumber/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/cucumber/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/cucumber/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/cucumber/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "4g",
      "Dimensions": "12.8x28.38x21.34 cm",
      "Warranty": "2 year warranty",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Dog Food",
    "description": "Specially formulated dog food designed to provide essential nutrients for your canine companion.",
    "brand": "Generic",
    "category": "groceries",
    "price": 879,
    "mrp": 980,
    "stock": 71,
    "rating": 4.55,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/dog-food/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/dog-food/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/dog-food/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/dog-food/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "10g",
      "Dimensions": "16.93x27.15x9.29 cm",
      "Warranty": "No warranty",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Eggs",
    "description": "Fresh eggs, a versatile ingredient for baking, cooking, or breakfast.",
    "brand": "Generic",
    "category": "groceries",
    "price": 239,
    "mrp": 269,
    "stock": 9,
    "rating": 2.53,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/eggs/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/eggs/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/eggs/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/eggs/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "2g",
      "Dimensions": "11.42x7.44x16.95 cm",
      "Warranty": "1 week warranty",
      "Shipping": "Ships in 1 week"
    }
  },
  {
    "name": "Fish Steak",
    "description": "Quality fish steak, suitable for grilling, baking, or pan-searing.",
    "brand": "Generic",
    "category": "groceries",
    "price": 1199,
    "mrp": 1252,
    "stock": 74,
    "rating": 3.78,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/fish-steak/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/fish-steak/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/fish-steak/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/fish-steak/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "6g",
      "Dimensions": "14.95x26.31x11.27 cm",
      "Warranty": "1 month warranty",
      "Shipping": "Ships in 3-5 business days"
    }
  },
  {
    "name": "Green Bell Pepper",
    "description": "Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes.",
    "brand": "Generic",
    "category": "groceries",
    "price": 103,
    "mrp": 103,
    "stock": 33,
    "rating": 3.25,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "2g",
      "Dimensions": "15.33x26.65x14.44 cm",
      "Warranty": "1 month warranty",
      "Shipping": "Ships in 1 week"
    }
  },
  {
    "name": "Green Chili Pepper",
    "description": "Spicy green chili pepper, ideal for adding heat to your favorite recipes.",
    "brand": "Generic",
    "category": "groceries",
    "price": 79,
    "mrp": 80,
    "stock": 3,
    "rating": 3.66,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "7g",
      "Dimensions": "15.38x18.12x19.92 cm",
      "Warranty": "2 year warranty",
      "Shipping": "Ships in 1 week"
    }
  },
  {
    "name": "Honey Jar",
    "description": "Pure and natural honey in a convenient jar, perfect for sweetening beverages or drizzling over food.",
    "brand": "Generic",
    "category": "groceries",
    "price": 559,
    "mrp": 653,
    "stock": 34,
    "rating": 3.97,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/honey-jar/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/honey-jar/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/honey-jar/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/honey-jar/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "2g",
      "Dimensions": "9.28x21.72x17.74 cm",
      "Warranty": "1 month warranty",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Ice Cream",
    "description": "Creamy and delicious ice cream, available in various flavors for a delightful treat.",
    "brand": "Generic",
    "category": "groceries",
    "price": 439,
    "mrp": 481,
    "stock": 27,
    "rating": 3.39,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/ice-cream/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/ice-cream/2.webp",
      "https://cdn.dummyjson.com/product-images/groceries/ice-cream/3.webp",
      "https://cdn.dummyjson.com/product-images/groceries/ice-cream/4.webp"
    ],
    "specifications": {
      "Weight": "1g",
      "Dimensions": "14.83x15.07x24.2 cm",
      "Warranty": "1 month warranty",
      "Shipping": "Ships in 2 weeks"
    }
  },
  {
    "name": "Juice",
    "description": "Refreshing fruit juice, packed with vitamins and great for staying hydrated.",
    "brand": "Generic",
    "category": "groceries",
    "price": 319,
    "mrp": 363,
    "stock": 50,
    "rating": 3.94,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/juice/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/juice/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/juice/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/juice/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "1g",
      "Dimensions": "18.56x21.46x28.02 cm",
      "Warranty": "6 months warranty",
      "Shipping": "Ships in 1 week"
    }
  },
  {
    "name": "Kiwi",
    "description": "Nutrient-rich kiwi, perfect for snacking or adding a tropical twist to your dishes.",
    "brand": "Generic",
    "category": "groceries",
    "price": 199,
    "mrp": 235,
    "stock": 99,
    "rating": 4.93,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/kiwi/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/kiwi/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/kiwi/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/kiwi/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "5g",
      "Dimensions": "19.4x18.67x17.13 cm",
      "Warranty": "6 months warranty",
      "Shipping": "Ships overnight"
    }
  },
  {
    "name": "Lemon",
    "description": "Zesty and tangy lemons, versatile for cooking, baking, or making refreshing beverages.",
    "brand": "Generic",
    "category": "groceries",
    "price": 63,
    "mrp": 70,
    "stock": 31,
    "rating": 3.53,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/lemon/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/lemon/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/lemon/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/lemon/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "3g",
      "Dimensions": "23.77x9.22x12.05 cm",
      "Warranty": "No warranty",
      "Shipping": "Ships in 1 month"
    }
  },
  {
    "name": "Milk",
    "description": "Fresh and nutritious milk, a staple for various recipes and daily consumption.",
    "brand": "Generic",
    "category": "groceries",
    "price": 279,
    "mrp": 324,
    "stock": 27,
    "rating": 2.61,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/milk/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/milk/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/milk/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/milk/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "5g",
      "Dimensions": "12.92x15.76x11.29 cm",
      "Warranty": "3 year warranty",
      "Shipping": "Ships in 2 weeks"
    }
  },
  {
    "name": "Mulberry",
    "description": "Sweet and juicy mulberries, perfect for snacking or adding to desserts and cereals.",
    "brand": "Generic",
    "category": "groceries",
    "price": 399,
    "mrp": 458,
    "stock": 99,
    "rating": 4.95,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/mulberry/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/mulberry/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/mulberry/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/mulberry/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "5g",
      "Dimensions": "12.8x18.54x6.31 cm",
      "Warranty": "2 year warranty",
      "Shipping": "Ships in 1 week"
    }
  },
  {
    "name": "Nescafe Coffee",
    "description": "Quality coffee from Nescafe, available in various blends for a rich and satisfying cup.",
    "brand": "Generic",
    "category": "groceries",
    "price": 639,
    "mrp": 650,
    "stock": 57,
    "rating": 4.82,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/nescafe-coffee/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/nescafe-coffee/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/nescafe-coffee/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/nescafe-coffee/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "6g",
      "Dimensions": "20.54x29.49x29.2 cm",
      "Warranty": "1 year warranty",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Potatoes",
    "description": "Versatile and starchy potatoes, great for roasting, mashing, or as a side dish.",
    "brand": "Generic",
    "category": "groceries",
    "price": 183,
    "mrp": 194,
    "stock": 13,
    "rating": 4.81,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/potatoes/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/potatoes/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/potatoes/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/potatoes/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "9g",
      "Dimensions": "22.65x9.83x21.75 cm",
      "Warranty": "3 year warranty",
      "Shipping": "Ships in 3-5 business days"
    }
  },
  {
    "name": "Protein Powder",
    "description": "Nutrient-packed protein powder, ideal for supplementing your diet with essential proteins.",
    "brand": "Generic",
    "category": "groceries",
    "price": 1599,
    "mrp": 1731,
    "stock": 80,
    "rating": 4.18,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/protein-powder/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/protein-powder/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/protein-powder/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/protein-powder/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "9g",
      "Dimensions": "9.01x12.53x22.35 cm",
      "Warranty": "1 week warranty",
      "Shipping": "Ships in 1 month"
    }
  },
  {
    "name": "Red Onions",
    "description": "Flavorful and aromatic red onions, perfect for adding depth to your savory dishes.",
    "brand": "Generic",
    "category": "groceries",
    "price": 159,
    "mrp": 177,
    "stock": 82,
    "rating": 4.2,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/red-onions/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/red-onions/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/red-onions/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/red-onions/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "9g",
      "Dimensions": "16.01x24.96x12.74 cm",
      "Warranty": "1 month warranty",
      "Shipping": "Ships in 3-5 business days"
    }
  },
  {
    "name": "Rice",
    "description": "High-quality rice, a staple for various cuisines and a versatile base for many dishes.",
    "brand": "Generic",
    "category": "groceries",
    "price": 479,
    "mrp": 528,
    "stock": 59,
    "rating": 3.18,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/rice/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/rice/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/rice/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/rice/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "5g",
      "Dimensions": "17.21x9.88x17.16 cm",
      "Warranty": "6 months warranty",
      "Shipping": "Ships overnight"
    }
  },
  {
    "name": "Soft Drinks",
    "description": "Assorted soft drinks in various flavors, perfect for refreshing beverages.",
    "brand": "Generic",
    "category": "groceries",
    "price": 159,
    "mrp": 193,
    "stock": 53,
    "rating": 4.75,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/soft-drinks/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/soft-drinks/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/soft-drinks/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/soft-drinks/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "9g",
      "Dimensions": "19.75x6.79x9.33 cm",
      "Warranty": "6 months warranty",
      "Shipping": "Ships in 2 weeks"
    }
  },
  {
    "name": "Strawberry",
    "description": "Sweet and succulent strawberries, great for snacking, desserts, or blending into smoothies.",
    "brand": "Generic",
    "category": "groceries",
    "price": 319,
    "mrp": 323,
    "stock": 46,
    "rating": 3.08,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/strawberry/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/strawberry/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/strawberry/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/strawberry/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "1g",
      "Dimensions": "28.18x21.25x28.54 cm",
      "Warranty": "1 week warranty",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Tissue Paper Box",
    "description": "Convenient tissue paper box for everyday use, providing soft and absorbent tissues.",
    "brand": "Generic",
    "category": "groceries",
    "price": 199,
    "mrp": 230,
    "stock": 86,
    "rating": 2.69,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/tissue-paper-box/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/tissue-paper-box/2.webp",
      "https://cdn.dummyjson.com/product-images/groceries/tissue-paper-box/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/tissue-paper-box/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "1g",
      "Dimensions": "18.75x17.58x12.43 cm",
      "Warranty": "No warranty",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Water",
    "description": "Pure and refreshing bottled water, essential for staying hydrated throughout the day.",
    "brand": "Generic",
    "category": "groceries",
    "price": 79,
    "mrp": 93,
    "stock": 53,
    "rating": 4.96,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/groceries/water/1.webp",
      "https://cdn.dummyjson.com/product-images/groceries/water/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/water/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/groceries/water/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "4g",
      "Dimensions": "18.43x7.4x17.79 cm",
      "Warranty": "3 months warranty",
      "Shipping": "Ships in 1 month"
    }
  },
  {
    "name": "Decoration Swing",
    "description": "The Decoration Swing is a charming addition to your home decor. Crafted with intricate details, it adds a touch of elegance and whimsy to any room.",
    "brand": "Generic",
    "category": "home-decoration",
    "price": 4799,
    "mrp": 5357,
    "stock": 47,
    "rating": 3.16,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/1.webp",
      "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/2.webp",
      "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/3.webp",
      "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "4g",
      "Dimensions": "23.84x15.19x26.05 cm",
      "Warranty": "1 week warranty",
      "Shipping": "Ships in 1 month"
    }
  },
  {
    "name": "Family Tree Photo Frame",
    "description": "The Family Tree Photo Frame is a sentimental and stylish way to display your cherished family memories. With multiple photo slots, it tells the story of your loved ones.",
    "brand": "Generic",
    "category": "home-decoration",
    "price": 2399,
    "mrp": 2818,
    "stock": 77,
    "rating": 4.53,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/1.webp",
      "https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "1g",
      "Dimensions": "17.27x14.81x29.11 cm",
      "Warranty": "1 month warranty",
      "Shipping": "Ships in 2 weeks"
    }
  },
  {
    "name": "House Showpiece Plant",
    "description": "The House Showpiece Plant is an artificial plant that brings a touch of nature to your home without the need for maintenance. It adds greenery and style to any space.",
    "brand": "Generic",
    "category": "home-decoration",
    "price": 3199,
    "mrp": 3457,
    "stock": 28,
    "rating": 4.67,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/home-decoration/house-showpiece-plant/1.webp",
      "https://cdn.dummyjson.com/product-images/home-decoration/house-showpiece-plant/2.webp",
      "https://cdn.dummyjson.com/product-images/home-decoration/house-showpiece-plant/3.webp",
      "https://cdn.dummyjson.com/product-images/home-decoration/house-showpiece-plant/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "8g",
      "Dimensions": "8.55x14.62x17.25 cm",
      "Warranty": "1 year warranty",
      "Shipping": "Ships in 1 week"
    }
  },
  {
    "name": "Plant Pot",
    "description": "The Plant Pot is a stylish container for your favorite plants. With a sleek design, it complements your indoor or outdoor garden, adding a modern touch to your plant display.",
    "brand": "Generic",
    "category": "home-decoration",
    "price": 1199,
    "mrp": 1287,
    "stock": 59,
    "rating": 3.01,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/home-decoration/plant-pot/1.webp",
      "https://cdn.dummyjson.com/product-images/home-decoration/plant-pot/2.webp",
      "https://cdn.dummyjson.com/product-images/home-decoration/plant-pot/3.webp",
      "https://cdn.dummyjson.com/product-images/home-decoration/plant-pot/4.webp"
    ],
    "specifications": {
      "Weight": "9g",
      "Dimensions": "9.83x20.28x13.49 cm",
      "Warranty": "Lifetime warranty",
      "Shipping": "Ships in 3-5 business days"
    }
  },
  {
    "name": "Table Lamp",
    "description": "The Table Lamp is a functional and decorative lighting solution for your living space. With a modern design, it provides both ambient and task lighting, enhancing the atmosphere.",
    "brand": "Generic",
    "category": "home-decoration",
    "price": 3999,
    "mrp": 4304,
    "stock": 9,
    "rating": 3.55,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/1.webp",
      "https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "4g",
      "Dimensions": "8.98x13.41x5.65 cm",
      "Warranty": "3 months warranty",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Bamboo Spatula",
    "description": "The Bamboo Spatula is a versatile kitchen tool made from eco-friendly bamboo. Ideal for flipping, stirring, and serving various dishes.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 639,
    "mrp": 658,
    "stock": 37,
    "rating": 3.27,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "3g",
      "Dimensions": "21.32x23.03x25.94 cm",
      "Warranty": "1 month warranty",
      "Shipping": "Ships overnight"
    }
  },
  {
    "name": "Black Aluminium Cup",
    "description": "The Black Aluminium Cup is a stylish and durable cup suitable for both hot and cold beverages. Its sleek black design adds a modern touch to your drinkware collection.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 479,
    "mrp": 568,
    "stock": 75,
    "rating": 4.46,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/2.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "7g",
      "Dimensions": "5.88x5.11x10.03 cm",
      "Warranty": "1 year warranty",
      "Shipping": "Ships overnight"
    }
  },
  {
    "name": "Black Whisk",
    "description": "The Black Whisk is a kitchen essential for whisking and beating ingredients. Its ergonomic handle and sleek design make it a practical and stylish tool.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 799,
    "mrp": 890,
    "stock": 73,
    "rating": 3.9,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/black-whisk/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/black-whisk/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/black-whisk/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/black-whisk/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "1g",
      "Dimensions": "13.03x5.99x20.64 cm",
      "Warranty": "3 months warranty",
      "Shipping": "Ships in 1 month"
    }
  },
  {
    "name": "Boxed Blender",
    "description": "The Boxed Blender is a powerful and compact blender perfect for smoothies, shakes, and more. Its convenient design and multiple functions make it a versatile kitchen appliance.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 3199,
    "mrp": 3450,
    "stock": 9,
    "rating": 4.56,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/2.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/3.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/4.webp"
    ],
    "specifications": {
      "Weight": "1g",
      "Dimensions": "9.05x19.45x17.59 cm",
      "Warranty": "5 year warranty",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Carbon Steel Wok",
    "description": "The Carbon Steel Wok is a versatile cooking pan suitable for stir-frying, sautéing, and deep frying. Its sturdy construction ensures even heat distribution for delicious meals.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 2399,
    "mrp": 2567,
    "stock": 40,
    "rating": 4.05,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/carbon-steel-wok/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/carbon-steel-wok/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/carbon-steel-wok/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/carbon-steel-wok/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "2g",
      "Dimensions": "27.69x7.54x10.11 cm",
      "Warranty": "2 year warranty",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Chopping Board",
    "description": "The Chopping Board is an essential kitchen accessory for food preparation. Made from durable material, it provides a safe and hygienic surface for cutting and chopping.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 1039,
    "mrp": 1130,
    "stock": 14,
    "rating": 3.7,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/chopping-board/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/chopping-board/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/chopping-board/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/chopping-board/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "2g",
      "Dimensions": "15.6x6.93x8.51 cm",
      "Warranty": "3 months warranty",
      "Shipping": "Ships in 2 weeks"
    }
  },
  {
    "name": "Citrus Squeezer Yellow",
    "description": "The Citrus Squeezer in Yellow is a handy tool for extracting juice from citrus fruits. Its vibrant color adds a cheerful touch to your kitchen gadgets.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 719,
    "mrp": 818,
    "stock": 22,
    "rating": 4.63,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/citrus-squeezer-yellow/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/citrus-squeezer-yellow/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/citrus-squeezer-yellow/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/citrus-squeezer-yellow/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "2g",
      "Dimensions": "17.16x26.8x16.29 cm",
      "Warranty": "2 year warranty",
      "Shipping": "Ships in 3-5 business days"
    }
  },
  {
    "name": "Egg Slicer",
    "description": "The Egg Slicer is a convenient tool for slicing boiled eggs evenly. It's perfect for salads, sandwiches, and other dishes where sliced eggs are desired.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 559,
    "mrp": 656,
    "stock": 40,
    "rating": 3.09,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/egg-slicer/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/egg-slicer/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/egg-slicer/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/egg-slicer/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "2g",
      "Dimensions": "10.81x19.15x13.18 cm",
      "Warranty": "1 week warranty",
      "Shipping": "Ships in 1 month"
    }
  },
  {
    "name": "Electric Stove",
    "description": "The Electric Stove provides a portable and efficient cooking solution. Ideal for small kitchens or as an additional cooking surface for various culinary needs.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 3999,
    "mrp": 4652,
    "stock": 21,
    "rating": 4.11,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/2.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/3.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/4.webp"
    ],
    "specifications": {
      "Weight": "5g",
      "Dimensions": "24.17x22.55x27.49 cm",
      "Warranty": "2 year warranty",
      "Shipping": "Ships in 1 week"
    }
  },
  {
    "name": "Fine Mesh Strainer",
    "description": "The Fine Mesh Strainer is a versatile tool for straining liquids and sifting dry ingredients. Its fine mesh ensures efficient filtering for smooth cooking and baking.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 799,
    "mrp": 828,
    "stock": 85,
    "rating": 3.04,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/fine-mesh-strainer/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/fine-mesh-strainer/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/fine-mesh-strainer/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/fine-mesh-strainer/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "9g",
      "Dimensions": "18.02x13.23x15.92 cm",
      "Warranty": "1 month warranty",
      "Shipping": "Ships overnight"
    }
  },
  {
    "name": "Fork",
    "description": "The Fork is a classic utensil for various dining and serving purposes. Its durable and ergonomic design makes it a reliable choice for everyday use.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 319,
    "mrp": 347,
    "stock": 7,
    "rating": 3.11,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/fork/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/fork/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/fork/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/fork/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "9g",
      "Dimensions": "12.3x25.91x22.57 cm",
      "Warranty": "No warranty",
      "Shipping": "Ships in 1 month"
    }
  },
  {
    "name": "Glass",
    "description": "The Glass is a versatile and elegant drinking vessel suitable for a variety of beverages. Its clear design allows you to enjoy the colors and textures of your drinks.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 399,
    "mrp": 434,
    "stock": 46,
    "rating": 4.02,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/glass/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/glass/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/glass/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/glass/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "10g",
      "Dimensions": "20.23x24.56x26.97 cm",
      "Warranty": "3 year warranty",
      "Shipping": "Ships overnight"
    }
  },
  {
    "name": "Grater Black",
    "description": "The Grater in Black is a handy kitchen tool for grating cheese, vegetables, and more. Its sleek design and sharp blades make food preparation efficient and easy.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 879,
    "mrp": 912,
    "stock": 84,
    "rating": 3.21,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/grater-black/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/grater-black/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/grater-black/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/grater-black/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "3g",
      "Dimensions": "6.32x23.11x24.64 cm",
      "Warranty": "1 month warranty",
      "Shipping": "Ships in 1 week"
    }
  },
  {
    "name": "Hand Blender",
    "description": "The Hand Blender is a versatile kitchen appliance for blending, pureeing, and mixing. Its compact design and powerful motor make it a convenient tool for various recipes.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 2799,
    "mrp": 3373,
    "stock": 84,
    "rating": 3.86,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "5g",
      "Dimensions": "27.31x21x24.27 cm",
      "Warranty": "1 year warranty",
      "Shipping": "Ships in 1 week"
    }
  },
  {
    "name": "Ice Cube Tray",
    "description": "The Ice Cube Tray is a practical accessory for making ice cubes in various shapes. Perfect for keeping your drinks cool and adding a fun element to your beverages.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 479,
    "mrp": 482,
    "stock": 13,
    "rating": 4.71,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/ice-cube-tray/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/ice-cube-tray/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/ice-cube-tray/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/ice-cube-tray/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "3g",
      "Dimensions": "26.67x18.14x5.31 cm",
      "Warranty": "1 month warranty",
      "Shipping": "Ships overnight"
    }
  },
  {
    "name": "Kitchen Sieve",
    "description": "The Kitchen Sieve is a versatile tool for sifting and straining dry and wet ingredients. Its fine mesh design ensures smooth results in your cooking and baking.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 639,
    "mrp": 788,
    "stock": 68,
    "rating": 3.09,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/kitchen-sieve/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/kitchen-sieve/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/kitchen-sieve/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/kitchen-sieve/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "5g",
      "Dimensions": "20.68x6.5x7.86 cm",
      "Warranty": "1 month warranty",
      "Shipping": "Ships overnight"
    }
  },
  {
    "name": "Knife",
    "description": "The Knife is an essential kitchen tool for chopping, slicing, and dicing. Its sharp blade and ergonomic handle make it a reliable choice for food preparation.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 1199,
    "mrp": 1478,
    "stock": 7,
    "rating": 3.26,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/knife/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/knife/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/knife/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/knife/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "3g",
      "Dimensions": "25.19x18.52x20.5 cm",
      "Warranty": "1 month warranty",
      "Shipping": "Ships in 1 week"
    }
  },
  {
    "name": "Lunch Box",
    "description": "The Lunch Box is a convenient and portable container for packing and carrying your meals. With compartments for different foods, it's perfect for on-the-go dining.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 1039,
    "mrp": 1159,
    "stock": 94,
    "rating": 4.93,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/lunch-box/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/lunch-box/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/lunch-box/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/lunch-box/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "9g",
      "Dimensions": "12.45x19.08x8.24 cm",
      "Warranty": "5 year warranty",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Microwave Oven",
    "description": "The Microwave Oven is a versatile kitchen appliance for quick and efficient cooking, reheating, and defrosting. Its compact size makes it suitable for various kitchen setups.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 7199,
    "mrp": 8193,
    "stock": 59,
    "rating": 4.82,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/2.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/3.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/4.webp"
    ],
    "specifications": {
      "Weight": "9g",
      "Dimensions": "16.31x27.45x13.05 cm",
      "Warranty": "1 year warranty",
      "Shipping": "Ships in 1 week"
    }
  },
  {
    "name": "Mug Tree Stand",
    "description": "The Mug Tree Stand is a stylish and space-saving solution for organizing your mugs. Keep your favorite mugs easily accessible and neatly displayed in your kitchen.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 1279,
    "mrp": 1410,
    "stock": 88,
    "rating": 2.64,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/mug-tree-stand/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/mug-tree-stand/2.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/mug-tree-stand/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/mug-tree-stand/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "3g",
      "Dimensions": "18.99x27.14x27.29 cm",
      "Warranty": "1 year warranty",
      "Shipping": "Ships in 1 month"
    }
  },
  {
    "name": "Pan",
    "description": "The Pan is a versatile and essential cookware item for frying, sautéing, and cooking various dishes. Its non-stick coating ensures easy food release and cleanup.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 1999,
    "mrp": 2061,
    "stock": 90,
    "rating": 2.79,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/pan/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/pan/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/pan/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/pan/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "8g",
      "Dimensions": "17.14x21.7x25.75 cm",
      "Warranty": "1 year warranty",
      "Shipping": "Ships in 3-5 business days"
    }
  },
  {
    "name": "Plate",
    "description": "The Plate is a classic and essential dishware item for serving meals. Its durable and stylish design makes it suitable for everyday use or special occasions.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 319,
    "mrp": 344,
    "stock": 66,
    "rating": 3.65,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/plate/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/plate/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/plate/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/plate/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "4g",
      "Dimensions": "16.46x5.39x13.15 cm",
      "Warranty": "1 year warranty",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Red Tongs",
    "description": "The Red Tongs are versatile kitchen tongs suitable for various cooking and serving tasks. Their vibrant color adds a pop of excitement to your kitchen utensils.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 559,
    "mrp": 654,
    "stock": 82,
    "rating": 4.42,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/red-tongs/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/red-tongs/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/red-tongs/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/red-tongs/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "7g",
      "Dimensions": "22.86x26.2x17 cm",
      "Warranty": "No warranty",
      "Shipping": "Ships in 1 week"
    }
  },
  {
    "name": "Silver Pot With Glass Cap",
    "description": "The Silver Pot with Glass Cap is a stylish and functional cookware item for boiling, simmering, and preparing delicious meals. Its glass cap allows you to monitor cooking progress.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 3199,
    "mrp": 3393,
    "stock": 40,
    "rating": 3.22,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/silver-pot-with-glass-cap/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/silver-pot-with-glass-cap/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/silver-pot-with-glass-cap/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/silver-pot-with-glass-cap/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "7g",
      "Dimensions": "21.03x11.7x6.69 cm",
      "Warranty": "1 year warranty",
      "Shipping": "Ships in 1 month"
    }
  },
  {
    "name": "Slotted Turner",
    "description": "The Slotted Turner is a kitchen utensil designed for flipping and turning food items. Its slotted design allows excess liquid to drain, making it ideal for frying and sautéing.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 719,
    "mrp": 830,
    "stock": 88,
    "rating": 3.4,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/slotted-turner/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/slotted-turner/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/slotted-turner/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/slotted-turner/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "8g",
      "Dimensions": "14.41x27.15x14.76 cm",
      "Warranty": "Lifetime warranty",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Spice Rack",
    "description": "The Spice Rack is a convenient organizer for your spices and seasonings. Keep your kitchen essentials within reach and neatly arranged with this stylish spice rack.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 1599,
    "mrp": 1819,
    "stock": 79,
    "rating": 4.87,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/spice-rack/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/spice-rack/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/spice-rack/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/spice-rack/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "7g",
      "Dimensions": "28.06x22.43x26.34 cm",
      "Warranty": "1 week warranty",
      "Shipping": "Ships overnight"
    }
  },
  {
    "name": "Spoon",
    "description": "The Spoon is a versatile kitchen utensil for stirring, serving, and tasting. Its ergonomic design and durable construction make it an essential tool for every kitchen.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 399,
    "mrp": 405,
    "stock": 59,
    "rating": 4.03,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/spoon/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/spoon/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/spoon/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/spoon/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "6g",
      "Dimensions": "8.49x26.04x27.78 cm",
      "Warranty": "1 year warranty",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Tray",
    "description": "The Tray is a functional and decorative item for serving snacks, appetizers, or drinks. Its stylish design makes it a versatile accessory for entertaining guests.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 1359,
    "mrp": 1469,
    "stock": 71,
    "rating": 4.62,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/tray/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/tray/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/tray/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/tray/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "10g",
      "Dimensions": "12.7x7.52x9.72 cm",
      "Warranty": "5 year warranty",
      "Shipping": "Ships in 2 weeks"
    }
  },
  {
    "name": "Wooden Rolling Pin",
    "description": "The Wooden Rolling Pin is a classic kitchen tool for rolling out dough for baking. Its smooth surface and sturdy handles make it easy to achieve uniform thickness.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 959,
    "mrp": 1063,
    "stock": 80,
    "rating": 2.92,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/wooden-rolling-pin/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/wooden-rolling-pin/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/wooden-rolling-pin/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/wooden-rolling-pin/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "7g",
      "Dimensions": "5.92x10.87x19.55 cm",
      "Warranty": "3 year warranty",
      "Shipping": "Ships in 2 weeks"
    }
  },
  {
    "name": "Yellow Peeler",
    "description": "The Yellow Peeler is a handy tool for peeling fruits and vegetables with ease. Its bright yellow color adds a cheerful touch to your kitchen gadgets.",
    "brand": "Generic",
    "category": "kitchen-accessories",
    "price": 479,
    "mrp": 548,
    "stock": 35,
    "rating": 4.24,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/yellow-peeler/1.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/yellow-peeler/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/yellow-peeler/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/kitchen-accessories/yellow-peeler/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "7g",
      "Dimensions": "9.7x6.43x17.93 cm",
      "Warranty": "1 month warranty",
      "Shipping": "Ships in 3-5 business days"
    }
  },
  {
    "name": "Apple MacBook Pro 14 Inch Space Grey",
    "description": "The MacBook Pro 14 Inch in Space Grey is a powerful and sleek laptop, featuring Apple's M1 Pro chip for exceptional performance and a stunning Retina display.",
    "brand": "Apple",
    "category": "laptops",
    "price": 159999,
    "mrp": 167872,
    "stock": 24,
    "rating": 3.65,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp",
      "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/2.webp",
      "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/3.webp",
      "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp"
    ],
    "specifications": {
      "Processor": "Intel Core i7",
      "RAM": "16GB",
      "Storage": "512GB SSD",
      "Warranty": "1 year warranty"
    }
  },
  {
    "name": "Asus Zenbook Pro Dual Screen Laptop",
    "description": "The Asus Zenbook Pro Dual Screen Laptop is a high-performance device with dual screens, providing productivity and versatility for creative professionals.",
    "brand": "Asus",
    "category": "laptops",
    "price": 143999,
    "mrp": 162052,
    "stock": 45,
    "rating": 3.95,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/1.webp",
      "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/2.webp",
      "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/3.webp",
      "https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp"
    ],
    "specifications": {
      "Processor": "Intel Core i7",
      "RAM": "16GB",
      "Storage": "512GB SSD",
      "Warranty": "1 year warranty"
    }
  },
  {
    "name": "Huawei Matebook X Pro",
    "description": "The Huawei Matebook X Pro is a slim and stylish laptop with a high-resolution touchscreen display, offering a premium experience for users on the go.",
    "brand": "Huawei",
    "category": "laptops",
    "price": 111999,
    "mrp": 123592,
    "stock": 75,
    "rating": 4.98,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/1.webp",
      "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/2.webp",
      "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/3.webp",
      "https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/thumbnail.webp"
    ],
    "specifications": {
      "Processor": "Intel Core i7",
      "RAM": "16GB",
      "Storage": "512GB SSD",
      "Warranty": "1 year warranty"
    }
  },
  {
    "name": "Lenovo Yoga 920",
    "description": "The Lenovo Yoga 920 is a 2-in-1 convertible laptop with a flexible hinge, allowing you to use it as a laptop or tablet, offering versatility and portability.",
    "brand": "Lenovo",
    "category": "laptops",
    "price": 87999,
    "mrp": 94167,
    "stock": 40,
    "rating": 2.86,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/1.webp",
      "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/2.webp",
      "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/3.webp",
      "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/thumbnail.webp"
    ],
    "specifications": {
      "Processor": "Intel Core i7",
      "RAM": "16GB",
      "Storage": "512GB SSD",
      "Warranty": "1 year warranty"
    }
  },
  {
    "name": "New DELL XPS 13 9300 Laptop",
    "description": "The New DELL XPS 13 9300 Laptop is a compact and powerful device, featuring a virtually borderless InfinityEdge display and high-end performance for various tasks.",
    "brand": "Dell",
    "category": "laptops",
    "price": 119999,
    "mrp": 136192,
    "stock": 74,
    "rating": 2.67,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/1.webp",
      "https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/2.webp",
      "https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/3.webp",
      "https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp"
    ],
    "specifications": {
      "Processor": "Intel Core i7",
      "RAM": "16GB",
      "Storage": "512GB SSD",
      "Warranty": "1 year warranty"
    }
  },
  {
    "name": "Blue & Black Check Shirt",
    "description": "The Blue & Black Check Shirt is a stylish and comfortable men's shirt featuring a classic check pattern. Made from high-quality fabric, it's suitable for both casual and semi-formal occasions.",
    "brand": "Fashion Trends",
    "category": "mens-shirts",
    "price": 2399,
    "mrp": 2834,
    "stock": 38,
    "rating": 3.64,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/4.webp"
    ],
    "specifications": {
      "Material": "Cotton Blend",
      "Fit": "Regular",
      "Care": "Machine wash",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Gigabyte Aorus Men Tshirt",
    "description": "The Gigabyte Aorus Men Tshirt is a cool and casual shirt for gaming enthusiasts. With the Aorus logo and sleek design, it's perfect for expressing your gaming style.",
    "brand": "Gigabyte",
    "category": "mens-shirts",
    "price": 1999,
    "mrp": 2018,
    "stock": 90,
    "rating": 3.18,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/4.webp"
    ],
    "specifications": {
      "Material": "Cotton Blend",
      "Fit": "Regular",
      "Care": "Machine wash",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Man Plaid Shirt",
    "description": "The Man Plaid Shirt is a timeless and versatile men's shirt with a classic plaid pattern. Its comfortable fit and casual style make it a wardrobe essential for various occasions.",
    "brand": "Classic Wear",
    "category": "mens-shirts",
    "price": 2799,
    "mrp": 3477,
    "stock": 82,
    "rating": 3.46,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/4.webp"
    ],
    "specifications": {
      "Material": "Cotton Blend",
      "Fit": "Regular",
      "Care": "Machine wash",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Man Short Sleeve Shirt",
    "description": "The Man Short Sleeve Shirt is a breezy and stylish option for warm days. With a comfortable fit and short sleeves, it's perfect for a laid-back yet polished look.",
    "brand": "Casual Comfort",
    "category": "mens-shirts",
    "price": 1599,
    "mrp": 1716,
    "stock": 2,
    "rating": 2.9,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/4.webp"
    ],
    "specifications": {
      "Material": "Cotton Blend",
      "Fit": "Regular",
      "Care": "Machine wash",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Men Check Shirt",
    "description": "The Men Check Shirt is a classic and versatile shirt featuring a stylish check pattern. Suitable for various occasions, it adds a smart and polished touch to your wardrobe.",
    "brand": "Urban Chic",
    "category": "mens-shirts",
    "price": 2239,
    "mrp": 2527,
    "stock": 95,
    "rating": 2.72,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/4.webp"
    ],
    "specifications": {
      "Material": "Cotton Blend",
      "Fit": "Regular",
      "Care": "Machine wash",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Nike Air Jordan 1 Red And Black",
    "description": "The Nike Air Jordan 1 in Red and Black is an iconic basketball sneaker known for its stylish design and high-performance features, making it a favorite among sneaker enthusiasts and athletes.",
    "brand": "Nike",
    "category": "mens-shoes",
    "price": 11999,
    "mrp": 12515,
    "stock": 7,
    "rating": 4.77,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/4.webp"
    ],
    "specifications": {
      "Material": "Cotton Blend",
      "Fit": "Regular",
      "Care": "Machine wash",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Nike Baseball Cleats",
    "description": "Nike Baseball Cleats are designed for maximum traction and performance on the baseball field. They provide stability and support for players during games and practices.",
    "brand": "Nike",
    "category": "mens-shoes",
    "price": 6399,
    "mrp": 7808,
    "stock": 12,
    "rating": 3.88,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-baseball-cleats/4.webp"
    ],
    "specifications": {
      "Material": "Cotton Blend",
      "Fit": "Regular",
      "Care": "Machine wash",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Puma Future Rider Trainers",
    "description": "The Puma Future Rider Trainers offer a blend of retro style and modern comfort. Perfect for casual wear, these trainers provide a fashionable and comfortable option for everyday use.",
    "brand": "Puma",
    "category": "mens-shoes",
    "price": 7199,
    "mrp": 7515,
    "stock": 90,
    "rating": 4.9,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/4.webp"
    ],
    "specifications": {
      "Material": "Cotton Blend",
      "Fit": "Regular",
      "Care": "Machine wash",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Sports Sneakers Off White & Red",
    "description": "The Sports Sneakers in Off White and Red combine style and functionality, making them a fashionable choice for sports enthusiasts. The red and off-white color combination adds a bold and energetic touch.",
    "brand": "Off White",
    "category": "mens-shoes",
    "price": 9599,
    "mrp": 10101,
    "stock": 17,
    "rating": 4.77,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/4.webp"
    ],
    "specifications": {
      "Material": "Cotton Blend",
      "Fit": "Regular",
      "Care": "Machine wash",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Sports Sneakers Off White Red",
    "description": "Another variant of the Sports Sneakers in Off White Red, featuring a unique design. These sneakers offer style and comfort for casual occasions.",
    "brand": "Off White",
    "category": "mens-shoes",
    "price": 8799,
    "mrp": 8803,
    "stock": 62,
    "rating": 4.69,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/4.webp"
    ],
    "specifications": {
      "Material": "Cotton Blend",
      "Fit": "Regular",
      "Care": "Machine wash",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Brown Leather Belt Watch",
    "description": "The Brown Leather Belt Watch is a stylish timepiece with a classic design. Featuring a genuine leather strap and a sleek dial, it adds a touch of sophistication to your look.",
    "brand": "Fashion Timepieces",
    "category": "mens-watches",
    "price": 7199,
    "mrp": 7658,
    "stock": 32,
    "rating": 4.19,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/thumbnail.webp"
    ],
    "specifications": {
      "Material": "Cotton Blend",
      "Fit": "Regular",
      "Care": "Machine wash",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Longines Master Collection",
    "description": "The Longines Master Collection is an elegant and refined watch known for its precision and craftsmanship. With a timeless design, it's a symbol of luxury and sophistication.",
    "brand": "Longines",
    "category": "mens-watches",
    "price": 119999,
    "mrp": 144997,
    "stock": 100,
    "rating": 3.87,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/thumbnail.webp"
    ],
    "specifications": {
      "Material": "Cotton Blend",
      "Fit": "Regular",
      "Care": "Machine wash",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Rolex Cellini Date Black Dial",
    "description": "The Rolex Cellini Date with Black Dial is a classic and prestigious watch. With a black dial and date complication, it exudes sophistication and is a symbol of Rolex's heritage.",
    "brand": "Rolex",
    "category": "mens-watches",
    "price": 719999,
    "mrp": 790166,
    "stock": 40,
    "rating": 4.97,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/thumbnail.webp"
    ],
    "specifications": {
      "Material": "Cotton Blend",
      "Fit": "Regular",
      "Care": "Machine wash",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Rolex Cellini Moonphase",
    "description": "The Rolex Cellini Moonphase is a masterpiece of horology, featuring a moon phase complication and exquisite design. It reflects Rolex's commitment to precision and elegance.",
    "brand": "Rolex",
    "category": "mens-watches",
    "price": 1039999,
    "mrp": 1260911,
    "stock": 36,
    "rating": 2.58,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/thumbnail.webp"
    ],
    "specifications": {
      "Material": "Cotton Blend",
      "Fit": "Regular",
      "Care": "Machine wash",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Rolex Datejust",
    "description": "The Rolex Datejust is an iconic and versatile timepiece with a date window. Known for its timeless design and reliability, it's a symbol of Rolex's watchmaking excellence.",
    "brand": "Rolex",
    "category": "mens-watches",
    "price": 879999,
    "mrp": 914095,
    "stock": 86,
    "rating": 3.66,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/thumbnail.webp"
    ],
    "specifications": {
      "Material": "Cotton Blend",
      "Fit": "Regular",
      "Care": "Machine wash",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Rolex Submariner Watch",
    "description": "The Rolex Submariner is a legendary dive watch with a rich history. Known for its durability and water resistance, it's a symbol of adventure and exploration.",
    "brand": "Rolex",
    "category": "mens-watches",
    "price": 1119999,
    "mrp": 1179567,
    "stock": 55,
    "rating": 2.69,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/1.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/2.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/3.webp",
      "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/thumbnail.webp"
    ],
    "specifications": {
      "Material": "Cotton Blend",
      "Fit": "Regular",
      "Care": "Machine wash",
      "Shipping": "Ships in 1-2 business days"
    }
  },
  {
    "name": "Amazon Echo Plus",
    "description": "The Amazon Echo Plus is a smart speaker with built-in Alexa voice control. It features premium sound quality and serves as a hub for controlling smart home devices.",
    "brand": "Amazon",
    "category": "mobile-accessories",
    "price": 7999,
    "mrp": 9097,
    "stock": 61,
    "rating": 4.99,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/1.webp",
      "https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/2.webp",
      "https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/thumbnail.webp",
      "https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "5g",
      "Dimensions": "12.68x15.24x27.46 cm",
      "Warranty": "6 months warranty",
      "Shipping": "Ships in 1 week"
    }
  },
  {
    "name": "Apple Airpods",
    "description": "The Apple Airpods offer a seamless wireless audio experience. With easy pairing, high-quality sound, and Siri integration, they are perfect for on-the-go listening.",
    "brand": "Apple",
    "category": "mobile-accessories",
    "price": 10399,
    "mrp": 12313,
    "stock": 67,
    "rating": 4.15,
    "reviewCount": 30,
    "images": [
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/1.webp",
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/2.webp",
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/3.webp",
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/thumbnail.webp"
    ],
    "specifications": {
      "Weight": "4g",
      "Dimensions": "25.79x18.38x11.53 cm",
      "Warranty": "3 year warranty",
      "Shipping": "Ships in 3-5 business days"
    }
  }
];

async function seedDatabase() {
  console.log('Seeding database using raw SQL...');
  
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

module.exports = seedDatabase;
