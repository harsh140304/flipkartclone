import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../api';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const { data } = await fetchOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to load orders", error);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading orders...</div>;

  return (
    <div className="flex justify-center p-4 sm:p-6 min-h-screen mb-10">
      <div className="w-full max-w-[1000px]">
        <h1 className="text-2xl font-medium text-fkTextPrimary mb-6">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-sm shadow-sm">
            <h2 className="text-lg font-medium text-gray-600 mb-4">You haven't placed any orders yet.</h2>
            <Link to="/" className="bg-fkBlue text-white px-8 py-2.5 rounded-sm font-medium hover:shadow transition-shadow">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row border border-gray-100">
                
                {/* Images summary */}
                <div className="p-4 md:w-1/4 flex items-center justify-center bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100 cursor-pointer overflow-x-auto">
                  <div className="flex space-x-2">
                    {order.items.slice(0, 3).map(item => (
                      <div key={item.id} className="w-16 h-16 bg-white border border-gray-200 p-1 flex-shrink-0">
                        <img src={item.product.images[0]} alt="" className="w-full h-full object-contain" />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-16 h-16 bg-gray-200 border border-gray-300 flex items-center justify-center text-sm font-medium text-gray-600">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 md:w-2/4 flex flex-col justify-center">
                  <p className="font-medium text-lg text-fkTextPrimary mb-1">
                    Order ID: {order.id.slice(0, 8)}...
                  </p>
                  <p className="text-sm text-fkTextSecondary mb-2">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <div className="flex items-center space-x-2">
                     <span className="w-2 h-2 rounded-full bg-fkBlue"></span>
                     <span className="font-medium text-fkBlue text-sm">{order.status}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 md:w-1/4 flex flex-col items-end justify-center border-t md:border-t-0 border-gray-100">
                  <p className="font-bold text-xl mb-4">₹{order.total.toLocaleString()}</p>
                  <Link 
                    to={`/order-confirmation/${order.id}`}
                    className="text-fkBlue font-medium hover:underline flex items-center"
                  >
                    View Details
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
