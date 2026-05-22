import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProduct } from '../api';
import { FaHeart, FaStar, FaShoppingCart, FaBolt } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { WishlistContext } from '../context/WishlistContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const inWishlist = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { data } = await fetchProduct(id);
        setProduct(data);
        setMainImage(data.images[0]);
      } catch (error) {
        console.error('Failed to load product', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">Loading product details...</div>;
  }

  if (!product) {
    return <div className="p-10 text-center">Product not found.</div>;
  }

  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const outOfStock = product.stock === 0;

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    await addToCart(product.id, quantity);
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const success = await addToCart(product.id, quantity);
    if (success) {
      navigate('/checkout');
    }
  };

  const toggleWishlist = async () => {
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
    <div className="bg-white min-h-screen p-4 sm:p-6 lg:px-10 flex justify-center">
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row">
        
        {/* Left: Images & Actions */}
        <div className="w-full md:w-[40%] flex flex-col">
          <div className="flex flex-row md:flex-row-reverse border border-gray-200 p-2 relative h-[400px]">
             {/* Wishlist toggle */}
            <button 
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors"
              onClick={toggleWishlist}
            >
              <FaHeart className={`text-xl ${inWishlist ? 'text-red-500' : ''}`} />
            </button>

            {/* Main Image */}
            <div className="flex-1 flex items-center justify-center h-full p-4">
              <img src={mainImage} alt={product.name} className="max-h-full object-contain" />
            </div>

            {/* Thumbnails */}
            <div className="flex flex-col space-y-2 w-16 mr-2">
              {product.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`h-16 border p-1 cursor-pointer hover:border-fkBlue ${mainImage === img ? 'border-fkBlue' : 'border-gray-200'}`}
                  onMouseEnter={() => setMainImage(img)}
                >
                  <img src={img} alt="thumbnail" className="h-full w-full object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex mt-4 space-x-4">
            <button 
              onClick={handleAddToCart}
              disabled={outOfStock}
              className={`flex-1 py-4 flex items-center justify-center font-medium text-lg shadow-sm transition-shadow rounded-sm ${outOfStock ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#ff9f00] text-white hover:shadow-md'}`}
            >
              <FaShoppingCart className="mr-2" /> ADD TO CART
            </button>
            <button 
              onClick={handleBuyNow}
              disabled={outOfStock}
              className={`flex-1 py-4 flex items-center justify-center font-medium text-lg shadow-sm transition-shadow rounded-sm ${outOfStock ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#fb641b] text-white hover:shadow-md'}`}
            >
              <FaBolt className="mr-2" /> BUY NOW
            </button>
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-[60%] md:pl-8 mt-8 md:mt-0">
          <p className="text-fkTextSecondary text-sm font-medium mb-1">{product.brand}</p>
          <h1 className="text-xl sm:text-2xl text-fkTextPrimary mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <span className="bg-fkGreen text-white text-sm font-bold px-2 py-0.5 rounded flex items-center mr-2">
              {product.rating} <FaStar className="ml-1 text-[10px]" />
            </span>
            <span className="text-fkTextSecondary text-sm font-medium">
              {product.reviewCount.toLocaleString()} Ratings & Reviews
            </span>
          </div>

          <div className="flex items-baseline mb-2">
            <span className="text-[28px] font-bold text-fkTextPrimary mr-3">₹{product.price.toLocaleString()}</span>
            {product.mrp > product.price && (
              <>
                <span className="text-fkTextSecondary text-base line-through mr-3">₹{product.mrp.toLocaleString()}</span>
                <span className="text-fkGreen text-base font-medium">{discountPercent}% off</span>
              </>
            )}
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-fkTextPrimary font-medium">Free Delivery</p>
          </div>

          <div className="mb-6">
             {outOfStock ? (
               <span className="text-red-500 font-bold text-lg">Out of Stock</span>
             ) : (
               <span className="text-fkGreen font-bold text-lg">In Stock ({product.stock} available)</span>
             )}
          </div>

          {/* Quantity */}
          {!outOfStock && (
            <div className="flex items-center mb-6">
              <span className="mr-4 text-fkTextSecondary font-medium">Quantity</span>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-600 disabled:opacity-50 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-12 text-center border border-gray-300 py-1 font-medium">{quantity}</span>
                <button 
                  onClick={() => quantity < 10 && quantity < product.stock && setQuantity(q => q + 1)}
                  disabled={quantity >= 10 || quantity >= product.stock}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-600 disabled:opacity-50 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Specifications */}
          <div className="mt-8 border border-gray-200 rounded-sm">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-fkTextPrimary">Specifications</h2>
            </div>
            <div className="p-4 flex flex-col">
              <div className="flex border-b border-gray-100 py-3">
                <div className="w-1/3 text-fkTextSecondary text-sm">Description</div>
                <div className="w-2/3 text-fkTextPrimary text-sm">{product.description}</div>
              </div>
              {Object.entries(product.specifications).map(([key, value], idx) => (
                <div key={idx} className="flex border-b border-gray-100 py-3">
                  <div className="w-1/3 text-fkTextSecondary text-sm">{key}</div>
                  <div className="w-2/3 text-fkTextPrimary text-sm">{value}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
