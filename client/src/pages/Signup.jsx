import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { signup as apiSignup } from '../api';
import toast from 'react-hot-toast';

const Signup = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ 
    name: '',
    email: '', 
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const { data } = await apiSignup({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      login(data.token, data.user);
      toast.success('Account created successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4 mb-10">
      <div className="flex flex-col md:flex-row w-full max-w-[850px] bg-white rounded-sm shadow-md overflow-hidden min-h-[500px]">
        {/* Left Side */}
        <div className="bg-fkBlue p-10 text-white md:w-2/5 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-medium mb-4">Looks like you're new here!</h2>
            <p className="text-gray-200 text-lg leading-relaxed">
              Sign up with your details to get started
            </p>
          </div>
          <div className="hidden md:block">
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" alt="Signup" className="w-full" />
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12 md:w-3/5">
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="mb-6 relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-fkBlue transition-colors peer placeholder-transparent"
                placeholder=" "
              />
              <label className="absolute left-0 transition-all text-gray-500 top-2 text-base peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-fkBlue peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-xs">
                Enter Full Name
              </label>
            </div>

            <div className="mb-6 relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-fkBlue transition-colors peer placeholder-transparent"
                placeholder=" "
              />
              <label className="absolute left-0 transition-all text-gray-500 top-2 text-base peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-fkBlue peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-xs">
                Enter Email/Mobile number
              </label>
            </div>

            <div className="mb-6 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-fkBlue transition-colors peer placeholder-transparent"
                placeholder=" "
              />
              <label className="absolute left-0 transition-all text-gray-500 top-2 text-base peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-fkBlue peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-xs">
                Enter Password
              </label>
              <button
                type="button"
                className="absolute right-0 top-2 text-fkBlue text-sm font-medium"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="mb-8 relative">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength="6"
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-fkBlue transition-colors peer placeholder-transparent"
                placeholder=" "
              />
              <label className="absolute left-0 transition-all text-gray-500 top-2 text-base peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-fkBlue peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-xs">
                Confirm Password
              </label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#fb641b] text-white py-3 rounded-sm font-medium hover:bg-[#f35306] transition-colors mb-4 mt-auto"
            >
              {loading ? 'Creating Account...' : 'Continue'}
            </button>
            
            <Link to="/login" className="w-full bg-white text-fkBlue border border-gray-200 py-3 rounded-sm font-medium hover:shadow transition-shadow text-center block">
              Existing User? Log in
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
