'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getOrderById } from '../../lib/api';
import Navbar from '../../components/Navbar';

export default function Success() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    } else {
      router.push('/');
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const data = await getOrderById(orderId);
      setOrder(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <svg 
              className="mx-auto h-16 w-16 text-green-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Successful!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. We've sent a confirmation email to your inbox.
          </p>
          
          {order && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="text-left space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Order Number:</span>
                  <span className="text-gray-700">{order.orderNumber}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span className="text-gray-700">{order.customerEmail}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="text-gray-700 font-bold">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
                
                <div className="border-t pt-3 mt-3">
                  <h3 className="font-medium mb-2">Items:</h3>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm text-gray-600">
                      <span>{item.name} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    </div>
  );
}