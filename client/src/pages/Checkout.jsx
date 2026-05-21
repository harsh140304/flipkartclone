import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { placeOrder } from '../api';
import toast from 'react-hot-toast';

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
];

const Checkout = () => {
  const { cartItems, loadCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pincode: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    if (formData.phone.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    if (formData.pincode.length !== 6) {
      toast.error('Please enter a valid 6-digit pincode');
      return;
    }

    setLoading(true);
    try {
      const { data } = await placeOrder({ shippingAddress: formData });
      await loadCart(); // refresh cart (it should be empty now)
      navigate(`/order-confirmation/${data.id}`, { state: { previewUrl: data.previewUrl } });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  let total = 0;
  cartItems.forEach(item => {
    total += item.product.price * item.quantity;
  });

  return (
    <div className="flex justify-center p-4 sm:p-6 mb-10 min-h-screen">
      <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-4">
        
        {/* Left: Address Form */}
        <div className="flex-1">
          <div className="bg-fkBlue text-white p-4 font-medium text-lg rounded-t-sm shadow-sm">
            <span className="bg-white text-fkBlue w-6 h-6 inline-flex justify-center items-center rounded-sm mr-4 text-sm">1</span>
            DELIVERY ADDRESS
          </div>
          <div className="bg-[#f5faff] p-4 sm:p-8 border-l border-r border-b border-gray-200 rounded-b-sm shadow-sm">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-[600px]">
              
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-fkBlue focus:border-2"
                    placeholder="Full Name"
                  />
                </div>
                <div className="flex-1 relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-fkBlue focus:border-2"
                    placeholder="10-digit mobile number"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{6}"
                    className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-fkBlue focus:border-2"
                    placeholder="Pincode"
                  />
                </div>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-fkBlue focus:border-2"
                    placeholder="City/District/Town"
                  />
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-fkBlue focus:border-2 min-h-[80px]"
                  placeholder="Address (House No, Building, Street, Area)"
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-fkBlue focus:border-2"
                  placeholder="Locality / Landmark (Optional)"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-fkBlue focus:border-2 bg-white cursor-pointer"
                  >
                    <option value="" disabled>--Select State--</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1"></div>
              </div>

              <div className="mt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-[#fb641b] text-white px-10 py-3.5 rounded-sm font-medium hover:bg-[#f35306] transition-colors"
                >
                  {loading ? 'PROCESSING...' : 'SAVE AND DELIVER HERE'}
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Right: Order Summary mini */}
        <div className="w-full lg:w-[30%]">
          <div className="bg-white rounded-sm shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-gray-500 font-medium uppercase">Order Summary</h3>
            </div>
            <div className="p-4 max-h-[300px] overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex mb-4 text-sm">
                  <div className="w-12 h-12 mr-3 flex-shrink-0">
                    <img src={item.product.images[0]} alt="" className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-1">{item.product.name}</p>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                    <p className="font-medium">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between font-bold text-lg">
              <span>Total Payable:</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
