import { useEffect } from 'react';
import { animateHowItWorks } from '../utils/animations';

export default function HowItWorks() {
  useEffect(() => {
    animateHowItWorks();
  }, []);

  const steps = [
    {
      number: "01",
      title: "Create Product Record",
      description: "Register your product on the blockchain with essential details like name, origin, and initial status. This creates an immutable digital identity.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Track Movement",
      description: "Update product status as it moves through the supply chain. Each update is cryptographically secured and timestamped on the blockchain.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Verify Authenticity",
      description: "Access complete product history with full transparency. Verify authenticity and track the entire journey from origin to destination.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works-section section-padding bg-white">
      <div className="container-walmart">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-walmart-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-walmart-gray-800 max-w-3xl mx-auto">
            Our blockchain-powered supply chain tracking system makes it easy to ensure 
            transparency and authenticity throughout your product journey.
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-walmart-blue-200 transform -translate-y-1/2"></div>
          <div className="hidden lg:block step-connector absolute top-1/2 left-0 w-1/3 h-0.5 bg-walmart-blue-600 transform -translate-y-1/2"></div>
          <div className="hidden lg:block step-connector absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-walmart-blue-600 transform -translate-y-1/2"></div>

          <div className="grid lg:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="step-card text-center">
                {/* Step Number */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 walmart-gradient rounded-full flex items-center justify-center text-white mx-auto mb-4 relative z-10">
                    <span className="text-2xl font-bold">{step.number}</span>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-walmart-blue-100 rounded-full -z-10"></div>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-walmart-yellow-400 rounded-xl flex items-center justify-center text-walmart-gray-900 mx-auto mb-4">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-walmart-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-walmart-gray-800 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="walmart-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-walmart-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-walmart-gray-800 mb-6">
              Join thousands of businesses already using blockchain technology to transform their supply chains.
            </p>
            <a href="/dashboard" className="walmart-btn-secondary text-lg px-8 py-4">
              Start Tracking Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}