// src/Pages/Admin/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Frontend-only validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      // Frontend-only authentication (demo credentials)
      if (email === 'admin@justerps.com' && password === 'admin123') {
        // Store authentication in localStorage
        localStorage.setItem('adminAuthenticated', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials. Use admin@justerps.com / admin123');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9faf5]">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <div className="mx-auto bg-[#708238] w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Admin Portal</h1>
          <p className="text-gray-600 mt-2">Sign in to your JustERPs account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#708238] focus:border-[#708238] transition-colors"
              placeholder="admin@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
            </div>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#708238] focus:border-[#708238] transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#708238] text-white py-3 px-4 rounded-lg hover:bg-[#5a6a2c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#708238] transition-colors ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <div className="inline-flex items-center bg-[#fff8e6] px-4 py-2 rounded-lg mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFA500] mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-gray-600 text-sm">
              Demo: admin@justerps.com / admin123
            </p>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            &copy; {new Date().getFullYear()} JustERPs • Enterprise Solutions
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;