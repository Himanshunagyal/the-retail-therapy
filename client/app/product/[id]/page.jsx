'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProductById } from '../../../lib/api';  // Fixed
import { addToCart } from '../../../lib/cart';      // Fixed
import Navbar from '../../../components/Navbar';    // Fixed

export default function ProductDetail({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const data = await getProductById(params.id);
      setProduct(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      window.dispatchEvent(new Event('cartUpdated'));
      alert('Added to cart!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p>Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => router.back()}
          className="text-blue-600 hover:underline mb-6"
        >
          ← Back to Products
        </button>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <p className="text-gray-600 mb-6">
                {product.description}
              </p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{product.price}
                </span>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-2">Category: {product.category}</p>
                <p className="text-gray-600">Stock: {product.stock} available</p>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <label className="text-gray-700">Quantity:</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full py-3 rounded-lg font-semibold ${
                  product.stock === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}