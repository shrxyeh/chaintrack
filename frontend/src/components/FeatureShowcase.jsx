import { useEffect } from 'react';
import { animateFeatureCards } from '../utils/animations';

export default function FeatureShowcase() {
  useEffect(() => {
    animateFeatureCards();
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Complete Transparency",
      description: "Every product journey is recorded on the blockchain, providing complete visibility from origin to destination with immutable proof of authenticity."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Unbreakable Security",
      description: "Blockchain technology ensures that all supply chain data is cryptographically secured and cannot be tampered with or falsified."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Real-time Tracking",
      description: "Monitor product status updates in real-time as they move through the supply chain, with instant notifications for status changes."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Enhanced Efficiency",
      description: "Streamline operations with automated tracking, reduce manual processes, and eliminate paperwork with digital blockchain records."
    }
  ];

  return (
    <section id="features" className="features-section section-padding bg-white relative z-10">
      <div className="container-walmart">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-walmart-gray-900 mb-4">
            Why Choose Blockchain for Supply Chain?
          </h2>
          <p className="text-xl text-walmart-gray-800 max-w-3xl mx-auto">
            Transform your supply chain with cutting-edge blockchain technology that delivers 
            unprecedented transparency, security, and efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-20">
          {features.map((feature, index) => (
            <div key={index} className="feature-card walmart-card p-6 text-center group bg-white relative z-30 shadow-walmart-lg">
              <div className="w-16 h-16 walmart-gradient rounded-xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-walmart-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-walmart-gray-800 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="mt-16 walmart-card p-8 bg-white relative z-20 shadow-walmart-lg">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-walmart-blue-600 mb-2">99.9%</div>
              <div className="text-walmart-gray-800 font-medium">Data Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-walmart-blue-600 mb-2">50%</div>
              <div className="text-walmart-gray-800 font-medium">Cost Reduction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-walmart-blue-600 mb-2">24/7</div>
              <div className="text-walmart-gray-800 font-medium">Real-time Monitoring</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}