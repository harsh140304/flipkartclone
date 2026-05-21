const axios = require('axios');

async function test() {
  try {
    const res = await axios.post('http://localhost:5001/api/auth/login', {
      email: 'test@flipkart.com',
      password: 'password123'
    });
    console.log("LOGIN SUCCESS", res.data);
    
    // Also test products
    const res2 = await axios.get('http://localhost:5001/api/products');
    console.log("PRODUCTS COUNT", res2.data.length);
  } catch (err) {
    if (err.response) {
      console.log("HTTP ERROR:", err.response.status, err.response.data);
    } else {
      console.log("NETWORK ERROR:", err.message);
    }
  }
}

test();
