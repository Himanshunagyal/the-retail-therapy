'use client';

import Link from 'next/link';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // In a real app, you would connect to your newsletter service
      console.log('Subscribed email:', email);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    shop: [
      { name: 'All Products', href: '/products' },
      { name: 'New Arrivals', href: '/collections/new' },
      { name: 'Best Sellers', href: '/collections/bestsellers' },
      { name: 'Capsule Wardrobe', href: '/collections/capsule' },
      { name: 'Sustainable Collection', href: '/collections/sustainable' },
    ],
    company: [
      { name: 'Our Story', href: '/about' },
      { name: 'Sustainability', href: '/sustainability' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Store Locations', href: '/stores' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Shipping & Returns', href: '/shipping' },
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Care Instructions', href: '/care' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
  };

  const socialLinks = [
    { name: 'Instagram', icon: 'Instagram', href: 'https://instagram.com' },
    { name: 'Pinterest', icon: 'Pinterest', href: 'https://pinterest.com' },
    { name: 'Twitter', icon: 'Twitter', href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: 'LinkedIn', href: 'https://linkedin.com' },
  ];

  const paymentMethods = [
    'Visa', 'Mastercard', 'American Express', 'PayPal', 'Apple Pay', 'Google Pay'
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
     
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold text-red-500 mb-6 inline-block">
              The Retail Therapy Store
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              Curated essentials for the modern lifestyle. Simple, elegant, timeless designs that transcend seasons.
            </p>
            
            {/* Social Links */}
            <div className="mb-8">
              <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wider">Follow Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:shadow-sm transition-all duration-300"
                    aria-label={social.name}
                  >
                    <span className="sr-only">{social.name}</span>
                    {social.icon === 'Instagram' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    )}
                    {social.icon === 'Pinterest' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10 0 4.411-2.865 8.138-6.828 9.448-.507-.101-.772-.618-.772-.618l-.204-.831c-.224.744-.839 1.393-1.503 1.748-.903.532-2.08.401-2.91-.214-.536-.425-.856-1.063-1.016-1.76-.176-.768-.062-1.586.316-2.29.501.603 1.138.945 1.852 1.114.588.139 1.177.132 1.738-.027.682-.194 1.251-.614 1.68-1.174.522-.683.794-1.5.794-2.404 0-1.984-1.65-3.862-4.174-3.862-2.315 0-3.934 1.339-3.934 3.204 0 .896.446 1.688 1.125 2.063.124.072.19.041.22-.093l.095-.377c.035-.139.024-.185-.077-.301-.318-.376-.519-.887-.519-1.445 0-1.289 1.074-2.792 3.064-2.792 1.677 0 2.791 1.035 2.791 2.556 0 1.797-.896 3.106-2.138 3.106-.668 0-1.169-.552-1.008-1.233.192-.81.565-1.682.565-2.267 0-.522-.28-.957-.862-.957-.684 0-1.234.707-1.234 1.654 0 .599.203 1.004.203 1.004s-.674 2.849-.796 3.389c-.094.398-.14.83-.14 1.285-1.215-.546-2.001-1.816-2.001-3.271 0-2.301 1.874-4.37 5.273-4.37 2.818 0 4.727 1.933 4.727 4.31 0 2.882-1.671 5.012-4.079 5.012-.796 0-1.545-.414-1.802-.903l-.49 1.937c-.177.712-.669 1.604-.995 2.15.75.231 1.547.357 2.37.357 5.514 0 10-4.486 10-10s-4.486-10-10-10z"/>
                      </svg>
                    )}
                    {social.icon === 'Twitter' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    )}
                    {social.icon === 'LinkedIn' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wider">We Accept</h4>
          <div className="flex flex-wrap gap-3 items-center">
            {paymentMethods.map((method) => (
              <div 
                key={method} 
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs text-gray-600"
              >
                {method}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} TRT STORE. All rights reserved.
            </div>
            
            <div className="flex flex-wrap gap-6 justify-center">
              {footerLinks.legal.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="text-gray-500 text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Worldwide Shipping
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-lg transition-all duration-300 group/backtotop"
          aria-label="Back to top"
        >
          <svg className="w-5 h-5 transform group-hover/backtotop:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        /* Subtle gradient effect for premium feel */
        footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent);
        }
      `}</style>
    </footer>
  );
};

export default Footer;