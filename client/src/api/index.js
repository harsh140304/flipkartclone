import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
});

// Request interceptor to add token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('fk_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (data) => API.post('/auth/login', data);
export const signup = (data) => API.post('/auth/signup', data);
export const fetchCurrentUser = () => API.get('/auth/me');

export const fetchProducts = (params) => API.get('/products', { params });
export const fetchProduct = (id) => API.get(`/products/${id}`);

export const fetchCart = () => API.get('/cart');
export const addToCart = (data) => API.post('/cart', data);
export const updateCartItem = (id, data) => API.put(`/cart/${id}`, data);
export const removeCartItem = (id) => API.delete(`/cart/${id}`);

export const placeOrder = (data) => API.post('/orders', data);
export const fetchOrders = () => API.get('/orders');
export const fetchOrder = (id) => API.get(`/orders/${id}`);

export const fetchWishlist = () => API.get('/wishlist');
export const addToWishlist = (data) => API.post('/wishlist', data);
export const removeFromWishlist = (productId) => API.delete(`/wishlist/${productId}`);

export default API;
