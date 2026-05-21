import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { FaHeart, FaStar } from 'react-icons/fa';

const Wishlist = () => {
  const { addToCart } = useContext(CartContext);
  const { wishlistItems, loading, removeFromWishlist } = useContext(WishlistContext);

  const handleRemove = async (productId) => {
    await removeFromWishlist(productId);
  };

  const handleMoveToCart = async (product) => {
    const success = await addToCart(product.id, 1);
    if (success) {
      await removeFromWishlist(product.id);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading wishlist...</div>;

  return (
    <div className="flex justify-center p-4 sm:p-6 min-h-screen mb-10">
      <div className="w-full max-w-[1200px]">
        <h1 className="text-2xl font-medium text-fkTextPrimary mb-6">
          My Wishlist <span className="text-gray-500 font-normal text-lg">({wishlistItems.length} items)</span>
        </h1>
        
        {wishlistItems.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-sm shadow-sm flex flex-col items-center">
            <FaHeart className="text-6xl text-gray-200 mb-6" />
            <h2 className="text-xl font-medium mb-2">Empty Wishlist</h2>
            <p className="text-fkTextSecondary mb-6">You have no items in your wishlist. Start adding!</p>
            <Link to="/" className="bg-fkBlue text-white px-10 py-3 rounded-sm font-medium hover:shadow transition-shadow">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlistItems.map(item => {
              const product = item.product;
              const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);
              
              return (
                <div key={item.id} className="bg-white p-4 rounded-sm shadow-sm hover:shadow-md transition-shadow flex flex-col h-full relative border border-gray-100">
                  <button 
                    onClick={() => handleRemove(product.id)}
                    className="absolute top-4 right-4 z-10 text-red-500 hover:text-red-600 transition-colors"
                  >
                    <FaHeart className="text-xl" />
                  </button>

                  <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
                    <div className="h-40 w-full flex items-center justify-center mb-4 overflow-hidden">
                      <img src={product.images[0]} alt={product.name} className="max-h-full object-contain hover:scale-105 transition-transform duration-300" />
                    </div>

                    <h3 className="text-sm font-medium text-fkTextPrimary line-clamp-2 mb-2 hover:text-fkBlue">
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
                      <span className="text-base font-bold text-fkTextPrimary mr-2">₹{product.price.toLocaleString()}</span>
                      {product.mrp > product.price && (
                        <>
                          <span className="text-fkTextSecondary text-sm line-through mr-2">₹{product.mrp.toLocaleString()}</span>
                          <span className="text-fkGreen text-sm font-medium">{discountPercent}% off</span>
                        </>
                      )}
                    </div>
                  </Link>

                  <div className="mt-4 border-t border-gray-100 pt-3">
                     <button 
                       onClick={() => handleMoveToCart(product)}
                       disabled={product.stock === 0}
                       className={`w-full py-2 font-medium uppercase text-sm rounded-sm ${product.stock === 0 ? 'text-gray-400 bg-gray-50' : 'text-fkBlue hover:bg-blue-50'}`}
                     >
                       {product.stock === 0 ? 'Out of Stock' : 'Move to Cart'}
                     </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
