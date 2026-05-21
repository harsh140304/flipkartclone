import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderHistory from './pages/OrderHistory';
import Wishlist from './pages/Wishlist';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
          <div className="min-h-screen bg-fkBg flex flex-col font-sans">
            <Toaster position="top-center" />
            <Navbar />
            <div className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/product/:id" element={<ProductDetail />} />

                {/* Protected Routes */}
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                <Route path="/order-confirmation/:orderId" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
                <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
              </Routes>
            </div>
            
            {/* Simple Footer */}
            <footer className="bg-fkTextPrimary text-white text-center py-6 mt-auto">
              <p className="text-sm">© {new Date().getFullYear()} Flipkart Clone. Built for demonstration purposes.</p>
            </footer>
          </div>
        </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
