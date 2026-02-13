'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const About = () => {
  const values = [
    {
      title: 'Intentional Design',
      description: 'Every piece is thoughtfully crafted with purpose and precision.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: 'Sustainable Practice',
      description: 'We believe luxury should not come at the expense of our planet.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: 'Timeless Quality',
      description: 'Investing in pieces that endure beyond seasonal trends.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Minimalist Philosophy',
      description: 'Finding beauty in simplicity and purpose in restraint.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    }
  ];

  const milestones = [
    { year: '2018', title: 'Foundation', description: 'Born from a vision to redefine modern minimalism' },
    { year: '2019', title: 'First Collection', description: 'Launched our inaugural capsule collection' },
    { year: '2020', title: 'Sustainability Pledge', description: 'Committed to 100% sustainable sourcing' },
    { year: '2022', title: 'Global Recognition', description: 'Featured in leading design publications' },
    { year: '2023', title: 'Flagship Store', description: 'Opened our first physical space in Tokyo' },
    { year: '2024', title: 'Future Vision', description: 'Expanding our commitment to circular fashion' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/5 to-transparent z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 mb-8">
              <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
              <span className="text-sm font-medium text-gray-700 tracking-wider">OUR STORY</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 mb-8">
              Redefining Modern Minimalism
            </h1>
            
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              Where thoughtful design meets sustainable practice. Crafting pieces that are not just worn, but lived in.
            </p>
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="w-12 h-px bg-gray-300"></div>
              <h2 className="text-3xl font-light text-gray-900">
                The Philosophy of Less
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At TRT, we believe that true luxury lies not in excess, but in intention. Each piece in our collection is designed with purpose, crafted with precision, and meant to be cherished for years to come.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We challenge the conventional cycle of fast fashion by creating garments that transcend seasons, trends, and time itself. Our commitment extends beyond design to every aspect of our process.
              </p>
            </div>
            
            <div className="pt-8">
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors group"
              >
                <span>Explore Our Collections</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              {/* Placeholder for philosophy image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <span className="text-lg">Timeless Design</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 mb-6">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              <span className="text-sm font-medium text-gray-600 tracking-wider">OUR VALUES</span>
            </div>
            <h2 className="text-3xl font-light text-gray-900">
              Principles That Guide Us
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="group p-8 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-500"
              >
                <div className="mb-6 text-gray-700 group-hover:text-gray-900 transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 mb-6">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            <span className="text-sm font-medium text-gray-600 tracking-wider">OUR JOURNEY</span>
          </div>
          <h2 className="text-3xl font-light text-gray-900">
            Milestones Along The Way
          </h2>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gray-200 hidden lg:block"></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-0 ${
                  index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Year */}
                <div className="lg:w-1/2 lg:px-12 flex justify-center lg:justify-start">
                  <div className={`text-right ${index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'}`}>
                    <div className="text-4xl font-light text-gray-300 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-light text-gray-900">{milestone.title}</h3>
                  </div>
                </div>
                
                {/* Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-2 border-gray-300 rounded-full z-10 hidden lg:block"></div>
                
                {/* Description */}
                <div className="lg:w-1/2 lg:px-12">
                  <div className={`text-center lg:text-left ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                    <p className="text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Craftsmanship Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-20 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              <span className="text-sm font-medium text-gray-600 tracking-wider">CRAFTSMANSHIP</span>
            </div>
            
            <h2 className="text-3xl font-light text-gray-900">
              The Art of Making
            </h2>
            
            <p className="text-gray-600 leading-relaxed text-lg">
              Each garment begins with the finest materials, selected for their quality, durability, and environmental impact. Our artisans, masters of their craft, bring these materials to life through techniques that honor traditional craftsmanship while embracing modern innovation.
            </p>
            
            <div className="pt-8">
              <div className="inline-flex items-center gap-4 text-gray-500 text-sm">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  100% Sustainable Materials
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Ethical Production
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Lifetime Quality Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 text-center border border-gray-100">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl font-light text-gray-900">
              Join Us in Redefining Fashion
            </h2>
            
            <p className="text-gray-600 leading-relaxed">
              Experience clothing that respects both the wearer and the world it inhabits. Discover pieces designed not for a season, but for a lifetime.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/collections"
                className="px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                Shop Collection
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-transparent text-gray-700 rounded-full border border-gray-300 hover:border-gray-400 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;