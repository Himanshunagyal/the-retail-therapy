'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProducts, deleteProduct } from '../../../lib/api';
import { isAdminAuthenticated, clearAdminAuth } from '../../../lib/adminAuth';

export default function AdminProducts() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p._id !== id));
      alert('Product deleted successfully');
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  const handleLogout = () => {
    clearAdminAuth();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="text-stone-600 hover:text-stone-900">
                ← Dashboard
              </Link>
              <h1 className="text-2xl font-light text-stone-900">Manage Products</h1>
            </div>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-stone-600">{products.length} products</p>
          <Link href="/admin/products/add" className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
            + Add Product
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">Category</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-stone-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover" />
                      <div>
                        <div className="font-medium text-stone-900">{product.name}</div>
                        <div className="text-sm text-stone-500">{product.description.substring(0, 50)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-stone-900">₹{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock < 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-stone-600">{product.category}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/products/edit/${product._id}`} className="text-blue-600 hover:text-blue-700 mr-4">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(product._id, product.name)} className="text-red-600 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}