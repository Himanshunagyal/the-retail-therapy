'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCart, getCartCount } from '../lib/cart';
import { isAdminAuthenticated, getAdminData } from '../lib/adminAuth';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    updateCartCount();
    checkAdminAuth();
    
    // Listen for cart updates
    const handleCartUpdate = () => updateCartCount();
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    // Set active link based on current path
    const path = window.location.pathname;
    if (path === '/') setActiveLink('home');
    else if (path.includes('/products')) setActiveLink('products');
    else if (path.includes('/about')) setActiveLink('about');
    else if (path.includes('/contact')) setActiveLink('contact');
    else if (path.includes('/collections')) setActiveLink('collections');
    
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const updateCartCount = () => {
    const cart = getCart();
    setCartCount(getCartCount(cart));
  };

  const checkAdminAuth = () => {
    const authenticated = isAdminAuthenticated();
    setIsAdmin(authenticated);
    if (authenticated) {
      const admin = getAdminData();
      setAdminName(admin?.name || 'Admin');
    }
  };

  const navLinks = [
    { name: 'Home', href: '/', key: 'home' },
    { name: 'Products', href: '/product', key: 'products' },
    { name: 'Collections', href: '/collections', key: 'collections' },
    { name: 'About', href: '/about', key: 'about' },
    { name: 'Contact', href: '/contact', key: 'contact' },
    { name: 'Blog', href: '/blog', key: 'blog' },
    { name: 'Magazine', href: '/magazine', key: 'magazine' },
    { name: 'Thrift', href: '/thrift', key: 'thrift' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/" className="text-3xl font-bold text-red-700 hover:text-red-800 transition-colors">
            The Retail Therapy
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeLink === link.key
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-700 hover:text-red-900 hover:bg-red-50'
                }`}
                onClick={() => setActiveLink(link.key)}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Cart with badge */}
            <Link 
              href="/cart" 
              className="relative ml-4 px-4 py-2 text-gray-700 hover:text-gray-900 group transition-colors"
              onClick={() => setActiveLink('cart')}
            >
              <div className="flex items-center">
                <svg 
                  className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse-once">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Admin Button - Changes based on auth status */}
            {isAdmin ? (
              <Link
                href="/admin/dashboard"
                className="ml-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md text-sm font-medium transition-all duration-200 flex items-center"
              >
                <svg 
                  className="w-4 h-4 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                {adminName}
              </Link>
            ) : (
              <Link
                href="/admin/login"
                className="ml-2 px-4 py-2 border border-stone-300 text-stone-700 hover:border-red-600 hover:text-red-600 rounded-md text-sm font-medium transition-all duration-200 flex items-center"
              >
                <svg 
                  className="w-4 h-4 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Admin
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            {/* Cart for mobile */}
            <Link href="/cart" className="relative">
              <svg 
                className="w-6 h-6 text-gray-700" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`px-4 py-3 rounded-md text-base font-medium ${
                    activeLink === link.key
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setActiveLink(link.key);
                    setIsMenuOpen(false);
                  }}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Admin button for mobile */}
              <div className="border-t border-gray-200 pt-2 mt-2">
                {isAdmin ? (
                  <Link
                    href="/admin/dashboard"
                    className="mx-4 px-4 py-3 bg-red-600 text-white rounded-md text-base font-medium flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg 
                      className="w-5 h-5 mr-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/admin/login"
                    className="mx-4 px-4 py-3 border border-stone-300 text-stone-700 rounded-md text-base font-medium flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg 
                      className="w-5 h-5 mr-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Admin Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse-once {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        .animate-pulse-once {
          animation: pulse-once 0.5s ease-in-out;
        }
      `}</style>
    </nav>
  );
}