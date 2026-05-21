import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);
  const { product, quantity } = item;

  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(item.id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < 10 && quantity < product.stock) {
      updateQuantity(item.id, quantity + 1);
    }
  };

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  return (
    <div className="flex flex-col sm:flex-row bg-white p-4 border-b border-gray-200">
      {/* Image & Qty Controls */}
      <div className="flex flex-col items-center sm:w-1/4 mb-4 sm:mb-0">
        <div className="h-24 w-24 flex items-center justify-center mb-4">
          <img src={product.images[0]} alt={product.name} className="max-h-full object-contain" />
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleDecrease}
            disabled={quantity <= 1}
            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-600 disabled:opacity-50"
          >
            -
          </button>
          <span className="w-10 text-center border border-gray-300 py-0.5">{quantity}</span>
          <button 
            onClick={handleIncrease}
            disabled={quantity >= 10 || quantity >= product.stock}
            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-600 disabled:opacity-50"
          >
            +
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 sm:ml-6 flex flex-col justify-start">
        <h3 className="text-base font-medium text-fkTextPrimary hover:text-fkBlue cursor-pointer">
          {product.name}
        </h3>
        <p className="text-sm text-fkTextSecondary mt-1">{product.brand}</p>
        
        <div className="flex items-baseline mt-3 space-x-2">
          <span className="text-sm text-fkTextSecondary line-through">₹{product.mrp.toLocaleString()}</span>
          <span className="text-lg font-bold text-fkTextPrimary">₹{product.price.toLocaleString()}</span>
          <span className="text-fkGreen text-sm font-medium">{discountPercent}% Off</span>
        </div>

        <div className="mt-4 flex items-center space-x-6 text-sm font-medium">
          <button className="text-fkTextPrimary hover:text-fkBlue uppercase transition-colors font-semibold">
            Save for later
          </button>
          <button 
            onClick={() => removeFromCart(item.id)}
            className="text-fkTextPrimary hover:text-fkBlue uppercase transition-colors font-semibold"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Delivery */}
      <div className="sm:w-1/4 mt-4 sm:mt-0 text-sm text-fkTextPrimary">
        Delivery by {deliveryDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} | <span className="text-fkGreen">Free</span>
      </div>
    </div>
  );
};

export default CartItem;
