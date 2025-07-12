import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('donor');
  const [showPassword, setShowPassword] = useState(false); // 👈 for toggle
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
    rememberMe: false
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.emailOrUsername && formData.password) {
      if (selectedRole === 'medical') {
        navigate('/doctor-dashboard');
      } else {
        alert('Login successful! Welcome, Living Donor.');
        navigate('/donor-dashboard');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-emerald-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-green-600 hover:text-green-700 transition duration-300">
            Find A Donor
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 gap-4">
              {/* Donor Role */}
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="donor"
                  checked={selectedRole === 'donor'}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="sr-only"
                />
                <div className={`border-2 rounded-lg p-4 transition duration-200 ${
                  selectedRole === 'donor' ? 'border-green-600 bg-green-50' : 'border-gray-300 bg-white hover:border-green-500'
                }`}>
                  <div className="flex flex-col items-center text-center">
                    <svg className="w-8 h-8 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">Living Donor</span>
                    <span className="text-xs text-gray-500 mt-1">Kidney Donor Volunteer</span>
                  </div>
                </div>
              </label>

              {/* Medical Role */}
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="medical"
                  checked={selectedRole === 'medical'}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="sr-only"
                />
                <div className={`border-2 rounded-lg p-4 transition duration-200 ${
                  selectedRole === 'medical' ? 'border-green-600 bg-green-50' : 'border-gray-300 bg-white hover:border-green-500'
                }`}>
                  <div className="flex flex-col items-center text-center">
                    <svg className="w-8 h-8 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">Medical Professional</span>
                    <span className="text-xs text-gray-500 mt-1">Manages Patients & Donors</span>
                  </div>
                </div>
              </label>
            </div>
            <div className="mt-2 text-xs text-gray-500 text-center">
              <span className="italic">Note: Patients are managed by medical professionals</span>
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email / Username
            </label>
            <input
              type="text"
              name="emailOrUsername"
              value={formData.emailOrUsername}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
              placeholder="Enter your email or username"
              required
            />
          </div>

          {/* Password Input with Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
              >
                {showPassword ? (
                  // Eye off icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"
                       viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.94 10.94 0 0112 19c-5 0-9.27-3-11-7a10.94 10.94 0 011.82-2.88M1 1l22 22" />
                    <path d="M9.53 9.53A3.5 3.5 0 0112 8.5c1.93 0 3.5 1.57 3.5 3.5 0 .79-.26 1.52-.7 2.11" />
                  </svg>
                ) : (
                  // Eye icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"
                       viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-green-600 hover:text-green-700 transition duration-300">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition duration-300 shadow-lg"
          >
            Sign In as {selectedRole === 'donor' ? 'Living Donor' : 'Medical Professional'}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-green-600 hover:text-green-700 font-medium transition duration-300">
              Sign up here
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm transition duration-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
