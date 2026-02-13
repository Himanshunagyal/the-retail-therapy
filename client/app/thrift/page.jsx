'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Thrift = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'denim', name: 'Vintage Denim' },
    { id: 'knitwear', name: 'Knitwear' },
    { id: 'outerwear', name: 'Outerwear' },
    { id: 'shirts', name: 'Shirts & Tops' },
    { id: 'accessories', name: 'Accessories' },
  ];

  const thriftItems = [
    {
      id: 1,
      title: '90s Levi\'s Denim Jacket',
      description: 'Authentic 90s denim jacket with original hardware',
      category: 'denim',
      era: '1990s',
      condition: 'Excellent',
      price: '$89',
      originalPrice: '$145',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
      featured: true,
      rarity: 'Rare'
    },
    {
      id: 2,
      title: 'Vintage Cable Knit Sweater',
      description: 'Hand-knitted wool sweater with intricate cable pattern',
      category: 'knitwear',
      era: '1980s',
      condition: 'Very Good',
      price: '$65',
      originalPrice: '$120',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
      featured: true,
      rarity: 'Unique'
    },
    {
      id: 3,
      title: 'Leather Trench Coat',
      description: 'Vintage leather coat with classic silhouette',
      category: 'outerwear',
      era: '1970s',
      condition: 'Good',
      price: '$125',
      originalPrice: '$280',
      image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800&q=80',
      featured: false,
      rarity: 'Vintage'
    },
    {
      id: 4,
      title: 'Silk Floral Blouse',
      description: 'Delicate silk blouse with floral embroidery',
      category: 'shirts',
      era: '1960s',
      condition: 'Excellent',
      price: '$45',
      originalPrice: '$85',
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&q=80',
      featured: false,
      rarity: 'Delicate'
    },
    {
      id: 5,
      title: 'Vintage Leather Bag',
      description: 'Classic leather shoulder bag with patina',
      category: 'accessories',
      era: '1950s',
      condition: 'Good',
      price: '$75',
      originalPrice: '$160',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
      featured: false,
      rarity: 'Classic'
    },
    {
      id: 6,
      title: 'Corduroy Overshirt',
      description: 'Soft corduroy shirt jacket in olive green',
      category: 'outerwear',
      era: '1990s',
      condition: 'Very Good',
      price: '$55',
      originalPrice: '$95',
      image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80',
      featured: false,
      rarity: 'Retro'
    },
    {
      id: 7,
      title: 'Striped Wool Vest',
      description: 'Vintage wool vest with nautical stripes',
      category: 'knitwear',
      era: '1970s',
      condition: 'Good',
      price: '$38',
      originalPrice: '$70',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
      featured: false,
      rarity: 'Vintage'
    },
    {
      id: 8,
      title: 'Distressed Denim Jeans',
      description: 'Authentic worn-in vintage jeans',
      category: 'denim',
      era: '1980s',
      condition: 'Good',
      price: '$68',
      originalPrice: '$130',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
      featured: false,
      rarity: 'Authentic'
    },
  ];

  const filteredItems = activeCategory === 'all' 
    ? thriftItems 
    : thriftItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-white to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 100 0 L 0 0 0 100' fill='none' stroke='white' stroke-width='2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            
            
            <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
              Timeless Finds,<br />Reduced Footprint
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              Discover unique vintage pieces with character. Each item tells a story and gives new life to pre-loved fashion.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#collection"
                className="px-8 py-4 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors font-medium"
              >
                Browse Collection
              </a>
              <Link
                href="/sustainability"
                className="px-8 py-4 bg-transparent text-white rounded-full border border-white/30 hover:border-white/50 transition-colors font-medium"
              >
                Learn About Impact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-light text-gray-900">2.5K</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Items Saved from Landfill</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-light text-gray-900">75%</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Less Water Usage</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-light text-gray-900">500+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Stories Preserved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Collection Section */}
      <div id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 mb-4">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              <span className="text-sm font-medium text-gray-600 tracking-wider">CURATED SELECTION</span>
            </div>
            <h2 className="text-3xl font-light text-gray-900">Vintage Treasures</h2>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <p className="text-gray-600 text-sm">One-of-a-kind pieces</p>
            <p className="text-gray-500 text-xs">Each item is unique</p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Items */}
        <div className="mb-16">
          <h3 className="text-xl font-light text-gray-900 mb-8">Featured Finds</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {thriftItems.filter(item => item.featured).map((item) => (
              <div key={item.id} className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500">
                <div className="relative h-96 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                      {item.rarity}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                      {item.era}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-2xl font-light text-gray-900">{item.title}</h4>
                    <div className="text-right">
                      <div className="text-lg font-medium text-gray-900">{item.price}</div>
                      <div className="text-sm text-gray-500 line-through">{item.originalPrice}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-100 gap-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item.condition}
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item.era}
                      </span>
                    </div>
                    
                    <button className="px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors text-sm font-medium">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Items Grid */}
        <div>
          <h3 className="text-xl font-light text-gray-900 mb-8">Browse Collection</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                      {item.rarity}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <h4 className="text-lg font-light text-gray-900 flex-1 pr-2">{item.title}</h4>
                    <div className="text-right">
                      <div className="text-base font-medium text-gray-900">{item.price}</div>
                      <div className="text-xs text-gray-500 line-through">{item.originalPrice}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{item.era}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>{item.condition}</span>
                    </div>
                    
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors text-xs font-medium">
                      Quick View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-white border border-gray-300 text-gray-700 rounded-full hover:border-gray-400 hover:shadow-sm transition-all duration-300 font-medium">
            <span className="flex items-center gap-2">
              Discover More Vintage
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Sustainability Impact Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">    
          <h2 className="text-3xl font-light text-gray-900 mb-6">
            Fashion with a Conscience
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="space-y-4 p-6">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-light text-gray-900">Reduce Waste</h4>
              <p className="text-gray-600 text-sm">Each purchase extends a garment&apos;s life by 2+ years</p>
            </div>
            
            <div className="space-y-4 p-6">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-lg font-light text-gray-900">Preserve History</h4>
              <p className="text-gray-600 text-sm">Every piece has a story worth keeping alive</p>
            </div>
            
            <div className="space-y-4 p-6">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-lg font-light text-gray-900">Unique Style</h4>
              <p className="text-gray-600 text-sm">Find pieces that can&apos;t be replicated in fast fashion</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Thrift;