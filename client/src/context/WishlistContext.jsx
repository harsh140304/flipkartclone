import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { fetchWishlist, addToWishlist as apiAddToWishlist, removeFromWishlist as apiRemoveFromWishlist } from '../api';
import toast from 'react-hot-toast';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadWishlist();
    } else {
      setWishlistItems([]);
    }
  }, [isAuthenticated]);

  const loadWishlist = async () => {
    setLoading(true);
    try {
      const { data } = await fetchWishlist();
      setWishlistItems(data);
    } catch (error) {
      console.error("Failed to load wishlist", error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId) => {
    if (!isAuthenticated) return false;
    try {
      await apiAddToWishlist({ productId });
      toast.success('Added to Wishlist');
      await loadWishlist();
      return true;
    } catch (error) {
      if (error.response?.data?.error === 'Product already in wishlist') {
         await loadWishlist(); // sync state just in case
         return true;
      }
      toast.error('Failed to add to wishlist');
      return false;
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!isAuthenticated) return;
    try {
      await apiRemoveFromWishlist(productId);
      toast.success('Removed from Wishlist');
      await loadWishlist();
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.productId === productId);
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      loading,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      loadWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
