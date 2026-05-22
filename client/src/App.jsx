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
            
            {/* Rich Footer */}
            <footer className="bg-[#172337] text-white mt-auto pt-10 pb-6 px-10 text-xs font-medium">
              <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-gray-600 pb-8">
                <div>
                  <h6 className="text-gray-400 mb-4 font-normal">ABOUT</h6>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:underline">Contact Us</a></li>
                    <li><a href="#" className="hover:underline">About Us</a></li>
                    <li><a href="#" className="hover:underline">Careers</a></li>
                    <li><a href="#" className="hover:underline">Flipkart Stories</a></li>
                    <li><a href="#" className="hover:underline">Press</a></li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-gray-400 mb-4 font-normal">HELP</h6>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:underline">Payments</a></li>
                    <li><a href="#" className="hover:underline">Shipping</a></li>
                    <li><a href="#" className="hover:underline">Cancellation & Returns</a></li>
                    <li><a href="#" className="hover:underline">FAQ</a></li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-gray-400 mb-4 font-normal">CONSUMER POLICY</h6>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:underline">Cancellation & Returns</a></li>
                    <li><a href="#" className="hover:underline">Terms Of Use</a></li>
                    <li><a href="#" className="hover:underline">Security</a></li>
                    <li><a href="#" className="hover:underline">Privacy</a></li>
                    <li><a href="#" className="hover:underline">Sitemap</a></li>
                  </ul>
                </div>
                <div className="border-l border-gray-600 pl-8">
                  <h6 className="text-gray-400 mb-4 font-normal">Mail Us:</h6>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Flipkart Internet Private Limited, <br/>
                    Buildings Alyssa, Begonia & <br/>
                    Clove Embassy Tech Village, <br/>
                    Outer Ring Road, Devarabeesanahalli Village, <br/>
                    Bengaluru, 560103, <br/>
                    Karnataka, India
                  </p>
                </div>
              </div>
              <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center text-gray-300">
                <div className="flex space-x-6 mb-4 sm:mb-0">
                  <span className="flex items-center"><span className="text-yellow-400 mr-2">💼</span> Become a Seller</span>
                  <span className="flex items-center"><span className="text-yellow-400 mr-2">⭐</span> Advertise</span>
                  <span className="flex items-center"><span className="text-yellow-400 mr-2">🎁</span> Gift Cards</span>
                  <span className="flex items-center"><span className="text-yellow-400 mr-2">❓</span> Help Center</span>
                </div>
                <p>© 2007-{new Date().getFullYear()} Flipkart.com Clone</p>
                <div className="flex space-x-2">
                  <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg" alt="Payment Methods" className="h-5" />
                </div>
              </div>
            </footer>
          </div>
        </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
