import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import PriceSummary from '../components/PriceSummary';

const Cart = () => {
  const { cartItems, loading } = useContext(CartContext);
  const navigate = useNavigate();

  if (loading) {
    return <div className="p-10 text-center">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center mt-10 px-4 mb-10">
        <div className="w-full max-w-[1000px] bg-white rounded-sm shadow-sm p-10 flex flex-col items-center">
          <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty Cart" className="w-64 mb-6" />
          <h2 className="text-xl font-medium mb-2 text-fkTextPrimary">Your cart is empty!</h2>
          <p className="text-fkTextSecondary text-sm mb-6">Add items to it now.</p>
          <Link to="/" className="bg-fkBlue text-white px-16 py-3 rounded-sm font-medium shadow-sm hover:shadow-md transition-shadow">
            Shop now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-4 sm:p-6 mb-10">
      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-4">
        
        {/* Left: Cart Items */}
        <div className="flex-1">
          <div className="bg-white rounded-sm shadow-sm flex flex-col h-full">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-fkTextPrimary">My Cart ({cartItems.length})</h2>
            </div>
            
            <div className="flex-1">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="p-4 border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-end sticky bottom-0 bg-white">
              <button 
                onClick={() => navigate('/checkout')}
                className="bg-[#fb641b] text-white px-12 py-3.5 rounded-sm font-medium text-lg hover:bg-[#f35306] transition-colors"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>

        {/* Right: Price Summary */}
        <div className="w-full lg:w-[30%]">
          <PriceSummary cartItems={cartItems} />
        </div>

      </div>
    </div>
  );
};

export default Cart;
