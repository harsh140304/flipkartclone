import React from 'react';

const PriceSummary = ({ cartItems }) => {
  let subtotal = 0;
  let totalMrp = 0;

  cartItems.forEach(item => {
    subtotal += item.product.price * item.quantity;
    totalMrp += item.product.mrp * item.quantity;
  });

  const discount = totalMrp - subtotal;
  const deliveryCharges = 0; // Free delivery
  const total = subtotal + deliveryCharges;

  return (
    <div className="bg-white rounded-sm shadow-sm p-4 sticky top-24">
      <h3 className="text-gray-500 font-medium uppercase border-b border-gray-200 pb-3 mb-4">
        Price Details
      </h3>
      
      <div className="space-y-4 text-base text-fkTextPrimary">
        <div className="flex justify-between">
          <span>Price ({cartItems.length} items)</span>
          <span>₹{totalMrp.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span className="text-fkGreen">- ₹{discount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Charges</span>
          <span className="text-fkGreen">Free</span>
        </div>
        
        <div className="border-t border-gray-200 border-dashed pt-4 flex justify-between font-bold text-lg">
          <span>Total Amount</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="text-fkGreen font-medium text-sm mt-4">
        You will save ₹{discount.toLocaleString()} on this order
      </div>
    </div>
  );
};

export default PriceSummary;
