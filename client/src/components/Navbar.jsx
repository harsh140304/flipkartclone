import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="sticky top-0 z-50 shadow-sm">
      <nav className="bg-fkBlue px-4 py-3 sm:px-10 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center w-1/4">
          <Link to="/" className="flex flex-col">
            <span className="italic font-bold text-white text-xl flex items-center">
              Flipkart
              <span className="bg-fkYellow text-fkBlue text-[10px] font-bold px-1 ml-1 rounded">Clone</span>
            </span>
          </Link>
        </div>

        {/* Center: Search */}
        <div className="hidden sm:flex flex-1 mx-6 relative">
          <form onSubmit={handleSearch} className="w-full relative">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full py-2 px-4 rounded-sm text-sm focus:outline-none shadow-sm text-fkTextPrimary bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-0 top-0 h-full px-4 text-fkBlue">
              <FaSearch />
            </button>
          </form>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end w-1/4 space-x-6">
          {!isAuthenticated ? (
            <Link to="/login" className="bg-white text-fkBlue font-medium px-8 py-1 rounded-sm border border-gray-200">
              Login
            </Link>
          ) : (
            <div className="relative group cursor-pointer text-white font-medium flex items-center">
              <FaUser className="mr-2" />
              {user?.name?.split(' ')[0]} ▾
              
              {/* Dropdown menu */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white text-fkTextPrimary rounded shadow-lg hidden group-hover:block z-50">
                <div className="absolute -top-2 right-4 w-4 h-4 bg-white transform rotate-45 border-l border-t border-gray-200"></div>
                <div className="py-2 flex flex-col relative z-10 border border-gray-200">
                  <Link to="/orders" className="px-4 py-3 hover:bg-gray-50 hover:text-fkBlue transition-colors border-b border-gray-100">
                    My Orders
                  </Link>
                  <Link to="/wishlist" className="px-4 py-3 hover:bg-gray-50 hover:text-fkBlue transition-colors border-b border-gray-100">
                    Wishlist
                  </Link>
                  <div onClick={handleLogout} className="px-4 py-3 hover:bg-gray-50 hover:text-fkBlue transition-colors cursor-pointer">
                    Logout
                  </div>
                </div>
              </div>
            </div>
          )}

          <Link to="/cart" className="flex items-center text-white font-medium hover:opacity-90">
            <div className="relative mr-2">
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-fkYellow text-fkBlue text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden md:inline">Cart</span>
          </Link>
        </div>
      </nav>

      {/* Categories Bar */}
      <div className="bg-white shadow px-4 py-2 sm:px-10 overflow-x-auto whitespace-nowrap hide-scrollbar flex space-x-6 text-sm font-medium text-fkTextPrimary border-b border-gray-200">
        <Link to="/" className="hover:text-fkBlue transition-colors">All</Link>
        <Link to="/?category=Electronics" className="hover:text-fkBlue transition-colors">Electronics</Link>
        <Link to="/?category=Fashion" className="hover:text-fkBlue transition-colors">Fashion</Link>
        <Link to="/?category=Home%20%26%20Furniture" className="hover:text-fkBlue transition-colors">Home & Furniture</Link>
        <Link to="/?category=Books" className="hover:text-fkBlue transition-colors">Books</Link>
        <Link to="/?category=Sports" className="hover:text-fkBlue transition-colors">Sports</Link>
        <Link to="/?category=Beauty" className="hover:text-fkBlue transition-colors">Beauty</Link>
      </div>

      {/* Mobile Search */}
      <div className="sm:hidden bg-fkBlue p-2">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full py-2 px-3 rounded text-sm focus:outline-none text-fkTextPrimary bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default Navbar;
