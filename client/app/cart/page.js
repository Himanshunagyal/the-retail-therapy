'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCart, getCartTotal } from '../../lib/cart';
import CartItem from '../../components/CartItem';
import Navbar from '../../components/Navbar';

export default function Cart() {
  const router = useRouter();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    updateCart();
  }, []);

  const updateCart = () => {
    setCart(getCart());
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const total = getCartTotal(cart);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Shopping Cart
        </h1>
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem 
                  key={item._id} 
                  item={item} 
                  onUpdate={updateCart}
                />
              ))}
            </div>
            
            <div className="border-t mt-6 pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-semibold">Total:</span>
                <span className="text-3xl font-bold">${total.toFixed(2)}</span>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => router.push('/')}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300"
                >
                  Continue Shopping
                </button>
                
                <button
                  onClick={() => router.push('/checkout')}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}