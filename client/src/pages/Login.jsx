import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login as apiLogin } from '../api';
import toast from 'react-hot-toast';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await apiLogin(formData);
      login(data.token, data.user);
      toast.success('Login Successful');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-[850px] bg-white rounded-sm shadow-md overflow-hidden">
        {/* Left Side */}
        <div className="bg-fkBlue p-10 text-white md:w-2/5 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-medium mb-4">Login</h2>
            <p className="text-gray-200 text-lg leading-relaxed">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
          <div className="hidden md:block">
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" alt="Login" className="w-full" />
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12 md:w-3/5">
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="mb-6 relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-fkBlue transition-colors peer placeholder-transparent"
                placeholder="Enter Email/Mobile number"
              />
              <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-fkBlue">
                Enter Email/Mobile number
              </label>
            </div>

            <div className="mb-8 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-fkBlue transition-colors peer placeholder-transparent"
                placeholder="Enter Password"
              />
              <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-fkBlue">
                Enter Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-2 text-fkBlue font-medium text-sm"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <p className="text-xs text-gray-500 mb-6">
              By continuing, you agree to Flipkart's <span className="text-fkBlue">Terms of Use</span> and <span className="text-fkBlue">Privacy Policy</span>.
            </p>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#fb641b] text-white py-3 rounded-sm font-medium hover:bg-[#f35306] transition-colors mb-4"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            
            <div className="text-center mt-auto">
              <Link to="/signup" className="text-fkBlue font-medium hover:underline text-sm">
                New to Flipkart? Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
