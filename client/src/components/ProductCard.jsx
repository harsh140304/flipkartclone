import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaStar } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { WishlistContext } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();
  
  const inWishlist = isInWishlist(product.id);
  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (inWishlist) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product.id);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="bg-white p-4 rounded-sm hover:shadow-lg transition-shadow duration-300 relative flex flex-col h-full group border border-transparent hover:border-gray-200">
      
      {/* Wishlist Icon */}
      <button 
        onClick={toggleWishlist}
        className="absolute top-4 right-4 z-10 text-gray-300 hover:text-red-500 transition-colors"
      >
        <FaHeart className={`text-xl ${inWishlist ? 'text-red-500' : ''}`} />
      </button>

      {/* Image */}
      <div className="h-48 w-full flex items-center justify-center mb-4 relative overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Details */}
      <div className="flex-grow flex flex-col">
        <h3 className="text-sm font-medium text-fkTextPrimary line-clamp-2 mb-2">
          {product.name}
        </h3>
        
        <div className="flex items-center mb-2">
          <span className="bg-fkGreen text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center">
            {product.rating} <FaStar className="ml-1 text-[8px]" />
          </span>
          <span className="text-fkTextSecondary text-xs ml-2">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        <div className="mt-auto flex items-baseline flex-wrap">
          <span className="text-base font-bold text-fkTextPrimary mr-2">
            ₹{product.price.toLocaleString()}
          </span>
          {product.mrp > product.price && (
            <>
              <span className="text-fkTextSecondary text-sm line-through mr-2">
                ₹{product.mrp.toLocaleString()}
              </span>
              <span className="text-fkGreen text-sm font-medium">
                {discountPercent}% off
              </span>
            </>
          )}
        </div>
        
        <div className="text-xs text-fkTextSecondary mt-2">
          Free delivery
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
