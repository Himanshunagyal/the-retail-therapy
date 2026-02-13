'use client';

import { useState, useEffect } from 'react';
import { getProducts } from '../lib/api';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter featured and regular products
  const featuredProducts = products.filter(p => p.featured);
  const regularProducts = products.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      {/* Featured T-Shirts Section */}
      <section className="bg-gradient-to-b from-stone-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Featured Products Grid */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900"></div>
              <p className="text-stone-600 mt-4">Loading collection...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8 text-center">
              <p className="font-medium">Unable to load products</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}
          
          {!loading && featuredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* All T-Shirts Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-light text-stone-900 mb-2">
                Complete Collection
              </h2>
              <p className="text-stone-600">
                {products.length} styles available
              </p>
            </div>
            
            {/* Filter Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === 'all'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                All Tees
              </button>
              <button
                onClick={() => setActiveCategory('featured')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === 'featured'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Featured
              </button>
            </div>
          </div>

          {/* All Products Grid */}
          {!loading && regularProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(activeCategory === 'all' ? regularProducts : featuredProducts).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
          
          {!loading && products.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-stone-600 text-lg mb-2">No products available</p>
              <p className="text-stone-500 text-sm">Check back soon for new arrivals</p>
            </div>
          )}
        </div>
      </section>

      {/* Brand Promise Section */}
      <section className="bg-stone-50 border-y border-stone-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-stone-900">Premium Quality</h3>
              <p className="text-stone-600 text-sm">100% organic cotton, sustainably sourced</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-stone-900">Secure Payment</h3>
              <p className="text-stone-600 text-sm">Safe checkout with Razorpay</p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-stone-900">Free Shipping</h3>
              <p className="text-stone-600 text-sm">On orders above ₹1999</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}