'use client';

import Image from 'next/image';
import Link from 'next/link';
import { addToCart } from '../lib/cart'; 

export default function ProductCard({ product }) {
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    window.dispatchEvent(new Event('cartUpdated'));
    alert('Added to cart!');
  };

  return (
    <Link href={`/product/${product._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-64 bg-gray-200">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
          
          {product.stock < 10 && product.stock > 0 && (
            <p className="text-orange-600 text-sm mt-2">
              Only {product.stock} left in stock!
            </p>
          )}
          
          {product.stock === 0 && (
            <p className="text-red-600 text-sm mt-2">
              Out of stock
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}