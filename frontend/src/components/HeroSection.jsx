import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { animateHero, animateFloatingElements } from '../utils/animations';

export default function HeroSection() {
  useEffect(() => {
    // Delay animations to ensure DOM is ready
    const timer = setTimeout(() => {
      animateHero();
      animateFloatingElements();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative walmart-hero-bg overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-walmart-yellow-400 rounded-full opacity-10"></div>
        <div className="floating-element absolute top-40 right-20 w-32 h-32 bg-walmart-blue-300 rounded-full opacity-10"></div>
        <div className="floating-element absolute bottom-20 left-1/4 w-16 h-16 bg-walmart-orange-400 rounded-full opacity-10"></div>
        <div className="floating-element absolute bottom-40 right-1/3 w-24 h-24 bg-walmart-yellow-300 rounded-full opacity-10"></div>
      </div>

      <div className="relative section-padding">
        <div className="container-walmart">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Content */}
            <div className="text-center lg:text-left">
              <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Transparent Supply Chain
                <span className="block text-walmart-yellow-400">Powered by Blockchain</span>
              </h1>
              
              <p className="hero-subtitle text-xl text-walmart-blue-100 mb-8 max-w-2xl">
                Track every product from origin to destination with immutable blockchain technology. 
                Ensure authenticity, prevent fraud, and build customer trust with complete transparency.
              </p>
              
              <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/dashboard" className="walmart-btn-secondary text-lg px-8 py-4">
                  Start Tracking
                  <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <a href="#how-it-works" className="walmart-btn-primary text-lg px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-walmart-blue-600">
                  Learn More
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 text-walmart-blue-100">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-walmart-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">100% Secure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-walmart-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Immutable Records</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-walmart-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Real-time Tracking</span>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="hero-image relative">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                {/* Blockchain Visualization */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-walmart-yellow-400 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-walmart-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Product #1234</h3>
                        <p className="text-walmart-blue-200 text-sm">Organic Coffee Beans</p>
                      </div>
                    </div>
                    <div className="status-badge-delivered">Delivered</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-walmart-blue-400 rounded-full"></div>
                      <div className="flex-1 h-2 bg-white/20 rounded-full">
                        <div className="h-full bg-walmart-blue-400 rounded-full w-full"></div>
                      </div>
                      <span className="text-white text-sm">Created</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-walmart-yellow-400 rounded-full"></div>
                      <div className="flex-1 h-2 bg-white/20 rounded-full">
                        <div className="h-full bg-walmart-yellow-400 rounded-full w-full"></div>
                      </div>
                      <span className="text-white text-sm">In Transit</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <div className="flex-1 h-2 bg-white/20 rounded-full">
                        <div className="h-full bg-green-400 rounded-full w-full"></div>
                      </div>
                      <span className="text-white text-sm">Delivered</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-walmart-blue-200">Blockchain Hash:</span>
                      <span className="text-white font-mono">0x7a8f...9c2d</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-walmart-blue-200">Timestamp:</span>
                      <span className="text-white">Dec 15, 2024 14:32</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}