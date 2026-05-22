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
