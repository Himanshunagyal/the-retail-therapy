'use client';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-stone-50 via-white to-stone-50 border-b border-stone-100 overflow-hidden">
      {/* Premium Split Layout */}
      <div className="max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-[45%_55%] min-h-[600px] lg:min-h-[700px]">
          
          {/* Left Side - Text Content */}
          <div className="relative px-6 sm:px-12 lg:px-16 xl:px-20 py-20 lg:py-32 flex flex-col justify-center">
            {/* Subtle floating decoration */}
            
            <div className="relative z-10 max-w-xl">
              
              {/* Main heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-red-700 mb-6 leading-[1.1]">
                <span className="block text-7xl"></span>
                <span className="block mt-2 relative">
                  <span className="relative z-10 ">COMING SOON</span>
                </span>
              </h1>
              
              {/* Subheading */}
              <p className="text-stone-600 text-lg sm:text-xl leading-relaxed mb-12 font-light">
                Curated essentials for the modern lifestyle. Where simplicity meets elegance in timeless design.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group relative px-8 py-4 bg-red-900 text-white font-medium rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Explore Collection
                   </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
                </button>
                
                <button className="group px-8 py-4 bg-transparent text-red-700 font-medium rounded-full border border-stone-300 transition-all duration-300 hover:border-stone-900 hover:shadow-lg hover:scale-[1.02]">
                  <span className="flex items-center justify-center gap-2">
                    View Lookbook
                  </span>
                </button>
              </div>
              
              {/* Small trust indicators */}
              <div className="flex items-center gap-8 mt-12 pt-8 border-t border-stone-200">
                
              </div>
            </div>
          </div>
          
          {/* Right Side - Hero Image */}
          <div className="relative h-[500px] lg:h-full overflow-hidden bg-stone-100">
            {/* Grain texture overlay for premium feel */}
            <div className="absolute inset-0 z-10 opacity-[0.03] mix-blend-overlay pointer-events-none" 
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                 }}>
            </div>
            
            {/* Main Image with subtle zoom animation */}
            <div className="absolute inset-0 animate-subtle-zoom">
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80&fit=crop"
                alt="Minimal fashion collection"
                className="w-full h-full object-cover object-center"
              />
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-stone-50/20"></div>
            </div>
            
            {/* Floating accent circle */}
            <div className="absolute bottom-12 right-12 w-24 h-24 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl">
              <div className="text-center">
                <div className="text-sm font-semibold text-stone-900">New</div>
                <div className="text-xs text-stone-600">Season</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(5px); }
        }
        
        @keyframes subtle-zoom {
          0% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-subtle-zoom {
          animation: subtle-zoom 1.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;