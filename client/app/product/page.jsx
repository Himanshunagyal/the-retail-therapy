'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProductById } from '../../lib/api';
import { addToCart } from '../../lib/cart';
import Navbar from '../../components/Navbar';

const ProductDetail = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) return;
      
      try {
        const data = await getProductById(params.id);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedToCart(true);
      window.dispatchEvent(new Event('cartUpdated'));
      
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      router.push('/cart');
    }, 500);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-stone-600">Loading product details...</p>
          </div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-light text-stone-900 mb-4">Product not found</h2>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors"
            >
              Back to Products
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-stone-50 border-b border-stone-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <button
                onClick={() => router.push('/')}
                className="hover:text-stone-900 transition-colors"
              >
                Home
              </button>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-stone-900">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Detail */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Images */}
            <div className="space-y-6">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <div
                    key={num}
                    className="aspect-square rounded-lg overflow-hidden border border-stone-200 cursor-pointer hover:border-stone-400 transition-colors"
                  >
                    <img 
                      src={product.image}
                      alt={`${product.name} view ${num}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-50 border border-stone-200">
                  <span className="w-2 h-2 bg-stone-400 rounded-full"></span>
                  <span className="text-sm font-medium text-stone-600 tracking-wider uppercase">
                    {product.category}
                  </span>
                </div>
                
                <h1 className="text-4xl font-light text-stone-900">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-light text-stone-900">
                    ₹{product.price}
                  </div>
                  {product.featured && (
                    <span className="px-3 py-1 bg-stone-900 text-white text-sm rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                
                <p className="text-stone-600 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-light text-stone-900">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-stone-900 text-white'
                          : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-stone-900">Quantity:</span>
                  <div className="flex items-center border border-stone-300 rounded-full">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-stone-600 hover:text-stone-900"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 min-w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-4 py-2 text-stone-600 hover:text-stone-900"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-stone-500">
                    {product.stock} available
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 px-8 py-4 rounded-full font-medium transition-all duration-300 ${
                      addedToCart
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-stone-900 text-white hover:bg-stone-800'
                    }`}
                    disabled={addedToCart || product.stock === 0}
                  >
                    {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
                  </button>
                  
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 px-8 py-4 bg-transparent text-stone-700 rounded-full border border-stone-300 hover:border-stone-400 font-medium transition-all duration-300"
                    disabled={product.stock === 0}
                  >
                    Buy Now
                  </button>
                </div>

                {product.stock === 0 && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                    <p className="text-red-700 text-center">Currently out of stock</p>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-6 pt-8 border-t border-stone-100">
                <div className="space-y-4">
                  <h3 className="text-lg font-light text-stone-900">Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-stone-600">
                    <div>
                      <span className="font-medium text-stone-700">Material:</span>
                      <p>100% Premium Cotton</p>
                    </div>
                    <div>
                      <span className="font-medium text-stone-700">Fit:</span>
                      <p>Regular Fit</p>
                    </div>
                    <div>
                      <span className="font-medium text-stone-700">Care:</span>
                      <p>Machine Wash Cold</p>
                    </div>
                    <div>
                      <span className="font-medium text-stone-700">Origin:</span>
                      <p>Ethically Made</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Products Button */}
          <div className="mt-16 text-center">
            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-stone-100 text-stone-700 rounded-full hover:bg-stone-200 font-medium transition-all duration-300"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;