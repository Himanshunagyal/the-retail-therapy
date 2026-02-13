'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getDashboardStats } from '../../../lib/api';
import { isAdminAuthenticated, getAdminData, clearAdminAuth } from '../../../lib/adminAuth';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // Check authentication
    if (!isAdminAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    setAdmin(getAdminData());
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearAdminAuth();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="text-stone-600 mt-4">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-stone-900">Admin Dashboard</h1>
              <p className="text-sm text-stone-600 mt-1">Welcome back, {admin?.name}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-stone-600 hover:text-stone-900 text-sm font-medium"
              >
                View Store
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Products */}
          <div className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span className="text-xs font-medium text-stone-500 uppercase">Products</span>
            </div>
            <div className="text-3xl font-light text-stone-900 mb-1">{stats?.totalProducts || 0}</div>
            <p className="text-sm text-stone-600">{stats?.lowStockProducts || 0} low stock</p>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-stone-500 uppercase">Orders</span>
            </div>
            <div className="text-3xl font-light text-stone-900 mb-1">{stats?.totalOrders || 0}</div>
            <p className="text-sm text-stone-600">{stats?.pendingOrders || 0} pending</p>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-stone-500 uppercase">Revenue</span>
            </div>
            <div className="text-3xl font-light text-stone-900 mb-1">₹{stats?.totalRevenue?.toLocaleString() || 0}</div>
            <p className="text-sm text-stone-600">Total earnings</p>
          </div>

          {/* Shipped Orders */}
          <div className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <span className="text-xs font-medium text-stone-500 uppercase">Shipped</span>
            </div>
            <div className="text-3xl font-light text-stone-900 mb-1">{stats?.shippedOrders || 0}</div>
            <p className="text-sm text-stone-600">{stats?.deliveredOrders || 0} delivered</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/admin/products"
            className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-stone-900 mb-1">Manage Products</h3>
                <p className="text-sm text-stone-600">Add, edit, or remove products</p>
              </div>
              <svg className="w-6 h-6 text-stone-400 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/admin/orders"
            className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-stone-900 mb-1">View Orders</h3>
                <p className="text-sm text-stone-600">Manage customer orders</p>
              </div>
              <svg className="w-6 h-6 text-stone-400 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/admin/products/add"
            className="bg-red-600 rounded-xl p-6 shadow-sm hover:shadow-md hover:bg-red-700 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Add New Product</h3>
                <p className="text-sm text-red-100">Create a new listing</p>
              </div>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-stone-100 shadow-sm">
          <div className="px-6 py-4 border-b border-stone-100">
            <h2 className="text-lg font-medium text-stone-900">Recent Orders</h2>
          </div>
          <div className="divide-y divide-stone-100">
            {stats?.recentOrders && stats.recentOrders.length > 0 ? (
              stats.recentOrders.map((order) => (
                <div key={order._id} className="px-6 py-4 hover:bg-stone-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-stone-900">{order.orderNumber}</p>
                      <p className="text-sm text-stone-600 mt-1">{order.customerName} • {order.customerEmail}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-stone-900">₹{order.totalAmount.toLocaleString()}</p>
                      <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                        order.paymentStatus === 'paid' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-stone-500">No recent orders</p>
              </div>
            )}
          </div>
          {stats?.recentOrders && stats.recentOrders.length > 0 && (
            <div className="px-6 py-4 border-t border-stone-100">
              <Link href="/admin/orders" className="text-sm text-red-600 hover:text-red-700 font-medium">
                View all orders →
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}