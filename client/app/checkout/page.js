'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { getCart, getCartTotal, clearCart } from '../../lib/cart';
import { createOrder, updateOrderStatus } from '../../lib/api';
import { createRazorpayOrder, verifyRazorpayPayment } from '../../lib/api';
import Navbar from '../../components/Navbar';

export default function Checkout() {
  const router = useRouter();
  
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('all'); // 'all', 'upi', 'card', 'netbanking'
  
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });

  useEffect(() => {
    const currentCart = getCart();
    if (currentCart.length === 0) {
      router.push('/cart');
    }
    setCart(currentCart);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!razorpayLoaded) {
      setError('Payment gateway is loading. Please wait...');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const total = getCartTotal(cart);
      
      // Create order in your database
      const orderData = {
        customerEmail: formData.email,
        customerName: formData.name,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        items: cart.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        }))
      };
      
      const order = await createOrder(orderData);
      
      // Create Razorpay order
      const { orderId, amount, currency } = await createRazorpayOrder({
        amount: total,
        orderId: order._id
      });
      
      // Configure payment method options
      const paymentConfig = getPaymentConfig(selectedPaymentMethod);
      
      // Razorpay checkout options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: 'Minimal Store',
        description: 'Order Payment',
        order_id: orderId,
        ...paymentConfig, // Add method-specific config
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#2563eb'
        },
        handler: async function (response) {
          try {
            // Verify payment signature
            const verificationResult = await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            
            if (verificationResult.verified) {
              // Update order status
              await updateOrderStatus(order._id, {
                razorpayPaymentId: response.razorpay_payment_id,
                paymentStatus: 'paid'
              });
              
              clearCart();
              window.dispatchEvent(new Event('cartUpdated'));
              router.push(`/success?orderId=${order._id}`);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (err) {
            setError('Payment verification failed');
            await updateOrderStatus(order._id, {
              razorpayPaymentId: response.razorpay_payment_id,
              paymentStatus: 'failed'
            });
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            setError('Payment cancelled');
          }
        }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Get payment configuration based on selected method
  const getPaymentConfig = (method) => {
    switch(method) {
      case 'upi':
        return {
          method: {
            upi: true,
            card: false,
            netbanking: false,
            wallet: false
          }
        };
      case 'card':
        return {
          method: {
            upi: false,
            card: true,
            netbanking: false,
            wallet: false
          }
        };
      case 'netbanking':
        return {
          method: {
            upi: false,
            card: false,
            netbanking: true,
            wallet: false
          }
        };
      case 'wallet':
        return {
          method: {
            upi: false,
            card: false,
            netbanking: false,
            wallet: true
          }
        };
      default:
        return {}; // Show all methods
    }
  };

  const total = getCartTotal(cart);

  return (
    <>
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
      />
      
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                {cart.map(item => (
                  <div key={item._id} className="flex justify-between mb-2">
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{10}"
                      placeholder="10-digit mobile number"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{6}"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  {/* Payment Method Selection */}
                  <div className="border-t pt-4 mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Payment Method
                    </label>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedPaymentMethod('upi')}
                        className={`p-3 border-2 rounded-lg text-center transition-all ${
                          selectedPaymentMethod === 'upi'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold text-sm">UPI</div>
                        <div className="text-xs text-gray-500">GPay, PhonePe, etc.</div>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setSelectedPaymentMethod('card')}
                        className={`p-3 border-2 rounded-lg text-center transition-all ${
                          selectedPaymentMethod === 'card'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold text-sm">Card</div>
                        <div className="text-xs text-gray-500">Debit/Credit</div>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setSelectedPaymentMethod('netbanking')}
                        className={`p-3 border-2 rounded-lg text-center transition-all ${
                          selectedPaymentMethod === 'netbanking'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold text-sm">Net Banking</div>
                        <div className="text-xs text-gray-500">All Banks</div>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setSelectedPaymentMethod('wallet')}
                        className={`p-3 border-2 rounded-lg text-center transition-all ${
                          selectedPaymentMethod === 'wallet'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold text-sm">Wallets</div>
                        <div className="text-xs text-gray-500">Paytm, etc.</div>
                      </button>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod('all')}
                      className={`mt-3 w-full p-2 border-2 rounded-lg text-sm transition-all ${
                        selectedPaymentMethod === 'all'
                          ? 'border-blue-600 bg-blue-50 font-semibold'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      Show All Payment Options
                    </button>
                  </div>
                  
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                      {error}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={loading || !razorpayLoaded}
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 font-semibold"
                  >
                    {loading ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
                  </button>
                  
                  <div className="text-center text-sm text-gray-500">
                    🔒 Secured by Razorpay
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}