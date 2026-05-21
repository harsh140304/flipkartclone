import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { fetchOrder } from '../api';
import { FaCheckCircle } from 'react-icons/fa';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const { data } = await fetchOrder(orderId);
        setOrder(data);
      } catch (error) {
        console.error("Failed to load order", error);
      } finally {
        setLoading(false);
      }
    };
    loadOrder();
  }, [orderId]);

  if (loading) return <div className="p-10 text-center">Loading order details...</div>;
  if (!order) return <div className="p-10 text-center">Order not found.</div>;

  const estimatedDelivery = new Date(order.createdAt);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  return (
    <div className="flex justify-center p-4 sm:p-6 mb-10 min-h-screen">
      <div className="w-full max-w-[800px] bg-white rounded-sm shadow-sm p-8 flex flex-col items-center">
        
        <FaCheckCircle className="text-6xl text-fkGreen mb-4 animate-[bounce_1s_ease-in-out_1]" />
        
        <h1 className="text-2xl font-bold text-fkTextPrimary mb-2">Order Placed Successfully!</h1>
        
        <div className="bg-gray-50 p-4 rounded w-full text-center mb-8 border border-gray-200">
          <p className="text-gray-600 mb-1">Order ID:</p>
          <p className="font-mono text-lg font-medium cursor-pointer hover:text-fkBlue" onClick={() => navigator.clipboard.writeText(order.id)}>
            {order.id}
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-medium text-lg border-b pb-2 mb-4">Delivery Address</h3>
            <p className="font-medium">{order.shippingAddress.name}</p>
            <p className="text-sm text-gray-600 mt-1">{order.shippingAddress.addressLine1}</p>
            {order.shippingAddress.addressLine2 && <p className="text-sm text-gray-600">{order.shippingAddress.addressLine2}</p>}
            <p className="text-sm text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
            <p className="text-sm text-gray-600 mt-2">Phone: {order.shippingAddress.phone}</p>
          </div>
          <div>
            <h3 className="font-medium text-lg border-b pb-2 mb-4">Order Summary</h3>
            <div className="max-h-[150px] overflow-y-auto mb-2">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between text-sm mb-2">
                  <span className="line-clamp-1 flex-1 pr-2">{item.product.name} (x{item.quantity})</span>
                  <span className="font-medium">₹{(item.priceAtPurchase * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span>₹{order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f0faeb] w-full p-4 rounded text-center mb-8 border border-[#c3e6cb]">
          <p className="text-[#155724] font-medium">
            Estimated Delivery: {estimatedDelivery.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {location.state?.previewUrl && (
          <div className="bg-[#fff3cd] w-full p-4 rounded text-center mb-8 border border-[#ffeeba]">
            <p className="text-[#856404] font-medium mb-2">
              (Testing Mode) We generated a fake email for you.
            </p>
            <a 
              href={location.state.previewUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#ff9f00] text-white px-6 py-2 rounded font-medium hover:shadow inline-block"
            >
              View Order Confirmation Email
            </a>
          </div>
        )}

        <Link to="/" className="bg-fkBlue text-white px-10 py-3 rounded-sm font-medium hover:shadow-md transition-shadow">
          CONTINUE SHOPPING
        </Link>
        
      </div>
    </div>
  );
};

export default OrderConfirmation;
