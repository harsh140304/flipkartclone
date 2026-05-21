import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { fetchCart, addToCart as apiAddToCart, updateCartItem, removeCartItem } from '../api';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    setLoading(true);
    try {
      const { data } = await fetchCart();
      setCartItems(data);
    } catch (error) {
      console.error("Failed to load cart", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) return false;
    try {
      await apiAddToCart({ productId, quantity });
      toast.success('Added to Cart');
      await loadCart();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add to cart');
      return false;
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (!isAuthenticated) return;
    try {
      await updateCartItem(id, { quantity });
      await loadCart();
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const removeFromCart = async (id) => {
    if (!isAuthenticated) return;
    try {
      await removeCartItem(id);
      toast.success('Removed from Cart');
      await loadCart();
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const clearCartState = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      loading,
      cartCount,
      addToCart,
      updateQuantity,
      removeFromCart,
      loadCart,
      clearCartState
    }}>
      {children}
    </CartContext.Provider>
  );
};
