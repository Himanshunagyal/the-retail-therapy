'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '../../../lib/api';
import { setAdminToken, setAdminData, isAdminAuthenticated } from '../../../lib/adminAuth';

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect if already logged in
    if (isAdminAuthenticated()) {
      router.push('/admin/dashboard');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('📤 Attempting login with:', formData);

    try {
      const response = await adminLogin(formData);
      console.log('✅ Login successful:', response);
      
      // Save token and admin data
      setAdminToken(response.token);
      setAdminData(response.admin);
      
      // Redirect to dashboard
      router.push('/admin/dashboard');
    } catch (err) {
      console.error('❌ Login failed:', err);
      console.error('Response:', err.response?.data);
      setError(err.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-stone-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-stone-900 mb-2">Admin Panel</h1>
          <p className="text-stone-600">Sign in to manage your store</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-stone-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                placeholder="admin@yourstore.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                placeholder="••••••••"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 pt-6 border-t border-stone-100">
            <p className="text-center text-sm text-stone-500">
              Protected admin access only
            </p>
          </div>
        </div>

        {/* Back to Store */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/')}
            className="text-stone-600 hover:text-stone-900 text-sm font-medium"
          >
            ← Back to Store
          </button>
        </div>
      </div>
    </div>
  );
}