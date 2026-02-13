'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'sustainability', name: 'Sustainability' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'design', name: 'Design' },
    { id: 'essentials', name: 'Essentials' },
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'The Art of Minimalist Dressing: Less is More',
      excerpt: 'Discover how to build a timeless wardrobe with only essential pieces that transcend seasons.',
      category: 'fashion',
      author: 'Emma Richardson',
      date: 'March 15, 2024',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      alt: 'Minimalist wardrobe with neutral colored clothing on wooden hangers',
      featured: true,
    },
    {
      id: 2,
      title: 'Sustainable Fashion: Our Commitment to the Future',
      excerpt: 'How we\'re redefining luxury through ethical sourcing and sustainable practices.',
      category: 'sustainability',
      author: 'James Wilson',
      date: 'March 12, 2024',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      alt: 'Sustainable fabrics and materials arranged neatly',
      featured: true,
    },
    {
      id: 3,
      title: 'The Psychology of Color in Minimalist Design',
      excerpt: 'Exploring how subtle color palettes influence perception and emotion in modern fashion.',
      category: 'design',
      author: 'Sophia Chen',
      date: 'March 10, 2024',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1558769132-cb1a40ed0ada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      alt: 'Minimalist color palette swatches and fabric samples',
      featured: false,
    },
    {
      id: 4,
      title: 'Capsule Wardrobe Essentials for Spring 2024',
      excerpt: 'The must-have pieces for creating a versatile and sophisticated spring wardrobe.',
      category: 'essentials',
      author: 'Michael Tanaka',
      date: 'March 8, 2024',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      alt: 'Capsule wardrobe pieces laid out on a bed',
      featured: false,
    },
    {
      id: 5,
      title: 'Mindful Consumption: Shopping with Intention',
      excerpt: 'How to make conscious fashion choices that align with your values and lifestyle.',
      category: 'lifestyle',
      author: 'Olivia Martinez',
      date: 'March 5, 2024',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      alt: 'Person thoughtfully selecting quality clothing items',
      featured: false,
    },
    {
      id: 6,
      title: 'Architecture in Fashion: The Parallels of Design',
      excerpt: 'How architectural principles influence modern minimalist clothing design.',
      category: 'design',
      author: 'Alexander Wright',
      date: 'March 3, 2024',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1515266591878-f93e32bc5937?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      alt: 'Minimalist architecture with clean lines and simple forms',
      featured: false,
    },
    {
      id: 7,
      title: 'The Timeless Appeal of Organic Cotton',
      excerpt: 'Why organic cotton remains the gold standard for sustainable luxury fabrics.',
      category: 'sustainability',
      author: 'Isabella Rossi',
      date: 'March 1, 2024',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      alt: 'Close-up of organic cotton fabric texture',
      featured: false,
    },
    {
      id: 8,
      title: 'Digital Detox: Finding Balance in a Connected World',
      excerpt: 'How minimalist principles extend beyond fashion into our digital lives.',
      category: 'lifestyle',
      author: 'David Kim',
      date: 'February 28, 2024',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      alt: 'Minimalist workspace with laptop and notebook',
      featured: false,
    },
    {
      id: 9,
      title: 'The Power of Monochrome: Styling Single-Color Outfits',
      excerpt: 'Master the art of creating impact with single-color ensembles from head to toe.',
      category: 'fashion',
      author: 'Emma Richardson',
      date: 'February 25, 2024',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      alt: 'Monochrome beige outfit on a model',
      featured: false,
    },
    {
      id: 10,
      title: 'Zero-Waste Fashion: Design Principles',
      excerpt: 'Innovative techniques that eliminate fabric waste in the production process.',
      category: 'sustainability',
      author: 'James Wilson',
      date: 'February 22, 2024',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      alt: 'Pattern cutting with minimal fabric waste',
      featured: false,
    },
    {
      id: 11,
      title: 'Morning Routines of Successful Minimalists',
      excerpt: 'How starting your day with intention can transform your approach to life and style.',
      category: 'lifestyle',
      author: 'Olivia Martinez',
      date: 'February 20, 2024',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      alt: 'Minimalist morning setup with coffee and book',
      featured: false,
    },
    {
      id: 12,
      title: 'Investment Pieces: What Makes Clothing Timeless',
      excerpt: 'Identifying the characteristics that make certain pieces worth the investment.',
      category: 'essentials',
      author: 'Michael Tanaka',
      date: 'February 18, 2024',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      alt: 'Quality leather bag and classic white shirt',
      featured: false,
    },
  ];

  const featuredPosts = blogPosts.filter(post => post.featured);
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
     <Navbar/>
      {/* Hero Section */}
      <div className="relative bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-6">
              Stories of Style & Substance
            </h1>
            
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              Insights, inspirations, and conversations about minimalist design, sustainable fashion, and intentional living.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Posts Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-light text-gray-900">Featured Stories</h2>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">Swipe</span>
            <svg className="w-5 h-5 text-gray-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {featuredPosts.map((post) => (
            <article key={post.id} className="group">
              <div className="relative overflow-hidden rounded-2xl bg-gray-100 h-96 mb-6">
                {/* Image with gradient overlay */}
                <div className="absolute inset-0">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{post.readTime}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>By {post.author}</span>
                </div>
                
                <h3 className="text-2xl font-light text-gray-900 group-hover:text-gray-700 transition-colors">
                  <Link href={`/blog/${post.id}`} className="hover:no-underline">
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 group/link font-medium"
                >
                  Read Article
                  <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Category Filters */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
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

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="relative overflow-hidden bg-gray-100 h-64">
                {/* Image */}
                <div className="absolute inset-0">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-light text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.id}`} className="hover:no-underline">
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-xs text-gray-600">
                      {post.author.charAt(0)}
                    </div>
                    <span className="text-sm text-gray-500">{post.author}</span>
                  </div>
                  <Link 
                    href={`/blog/${post.id}`}
                    className="text-gray-700 hover:text-gray-900 text-sm font-medium flex items-center gap-1 group/read"
                  >
                    Read
                    <svg className="w-3 h-3 transform group-hover/read:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div> 
      </div>

      {/* Newsletter Section */}
      <div className="bg-white border-t border-b border-gray-100 py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
        
          
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Subscribe to Our Newsletter
          </h2>
          
          <p className="text-gray-600 mb-8">
            Receive weekly insights on minimalist living, sustainable fashion, and design philosophy.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-gray-700 placeholder-gray-400"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors font-medium"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-xs text-gray-500 mt-4">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </div>

      {/* Authors Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-light text-gray-900 text-center mb-12">
          Meet Our Contributors
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              name: 'Emma Richardson', 
              role: 'Fashion Director', 
              posts: '42 articles',
              image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
            },
            { 
              name: 'James Wilson', 
              role: 'Sustainability Lead', 
              posts: '28 articles',
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w-400&q=80'
            },
            { 
              name: 'Sophia Chen', 
              role: 'Design Editor', 
              posts: '35 articles',
              image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
            },
            { 
              name: 'Michael Tanaka', 
              role: 'Style Consultant', 
              posts: '19 articles',
              image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
            },
          ].map((author, index) => (
            <div key={index} className="text-center group">
              <div className="relative w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${author.image})` }}
                />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-1">{author.name}</h4>
              <p className="text-gray-600 text-sm mb-2">{author.role}</p>
              <p className="text-gray-500 text-xs">{author.posts}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Blog;