import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { setupCardHovers, scrollReveal } from '../utils/animations';
import Footer from '../components/Footer';

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setupCardHovers();
    scrollReveal('.step-detail-card');
    scrollReveal('.process-card');
  }, []);

  const steps = [
    {
      number: "01",
      title: "Product Registration",
      subtitle: "Create Digital Identity",
      description: "Register your product on the blockchain with comprehensive details including name, origin, batch information, and initial status. This creates an immutable digital identity that follows the product throughout its journey.",
      details: [
        "Unique blockchain ID generation",
        "Comprehensive product metadata",
        "Origin verification and documentation",
        "Initial quality certifications",
        "Stakeholder access permissions"
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      image: "📝"
    },
    {
      number: "02",
      title: "ChainTrack.ai Tracking",
      subtitle: "Real-time Movement Monitoring",
      description: "Track product movement through each stage with ChainTrack.ai. Every status change, location update, and quality check is recorded with cryptographic security and timestamp verification.",
      details: [
        "GPS location tracking integration",
        "Automated status updates via IoT",
        "Quality checkpoint verification",
        "Temperature and condition monitoring",
        "Multi-party validation system"
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      image: "🚚"
    },
    {
      number: "03",
      title: "Verification & Delivery",
      subtitle: "Authenticity Confirmation",
      description: "Complete the cycle with final verification and delivery confirmation. Customers and stakeholders can verify product authenticity and access the complete journey history through our transparent blockchain.",
      details: [
        "Final delivery confirmation",
        "Customer verification portal",
        "Complete journey visualization",
        "Authenticity certificate generation",
        "Feedback and rating system"
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      image: "✅"
    }
  ];

  const technicalProcess = [
    {
      title: "Smart Contract Deployment",
      description: "Ethereum-based smart contracts handle all ChainTrack.ai logic",
      icon: "⚡"
    },
    {
      title: "Cryptographic Hashing",
      description: "Each transaction is secured with SHA-256 encryption",
      icon: "🔐"
    },
    {
      title: "Consensus Mechanism",
      description: "Network validation ensures data integrity and immutability",
      icon: "🤝"
    },
    {
      title: "Decentralized Storage",
      description: "Data distributed across multiple nodes for redundancy",
      icon: "🌐"
    }
  ];

  const benefits = [
    {
      title: "Reduced Fraud",
      value: "95%",
      description: "Decrease in counterfeit products"
    },
    {
      title: "Faster Recalls",
      value: "10x",
      description: "Quicker identification of affected products"
    },
    {
      title: "Cost Savings",
      value: "30%",
      description: "Reduction in operational costs"
    },
    {
      title: "Trust Increase",
      value: "85%",
      description: "Improvement in customer confidence"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="walmart-hero-bg section-padding">
        <div className="container-walmart">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">
              How ChainTrack.ai Works
            </h1>
            <p className="text-xl text-walmart-blue-100 max-w-3xl mx-auto mb-8">
              Discover the step-by-step process of how blockchain technology creates 
              transparency, security, and trust in modern supply chain management with ChainTrack.ai.
            </p>
            <Link to="/dashboard" className="walmart-btn-secondary text-lg px-8 py-4">
              Try It Yourself
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Step Process */}
      <section className="section-padding bg-white">
        <div className="container-walmart">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-walmart-gray-900 mb-4">
              Three Simple Steps to Transparency
            </h2>
            <p className="text-xl text-walmart-gray-800 max-w-3xl mx-auto">
              Our platform simplifies complex tracking into actionable insights with ChainTrack.ai.
            </p>
          </div>

          {/* Step Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-4 bg-walmart-blue-50 p-2 rounded-lg">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeStep === index
                      ? 'bg-walmart-blue-600 text-white shadow-lg'
                      : 'text-walmart-gray-700 hover:bg-white hover:shadow-md'
                  }`}
                >
                  Step {step.number}
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Details */}
          <div className="step-detail-card walmart-card p-8 bg-white max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 walmart-gradient rounded-xl flex items-center justify-center text-white mr-4">
                    {steps[activeStep].icon}
                  </div>
                  <div>
                    <div className="text-sm text-walmart-blue-600 font-medium">
                      {steps[activeStep].subtitle}
                    </div>
                    <h3 className="text-3xl font-bold text-walmart-gray-900">
                      {steps[activeStep].title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-walmart-gray-800 text-lg mb-6 leading-relaxed">
                  {steps[activeStep].description}
                </p>

                <ul className="space-y-3">
                  {steps[activeStep].details.map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-walmart-blue-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-walmart-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <div className="text-8xl mb-4">{steps[activeStep].image}</div>
                <div className="bg-walmart-blue-50 p-6 rounded-xl">
                  <h4 className="text-lg font-bold text-walmart-gray-900 mb-2">
                    Step {steps[activeStep].number}
                  </h4>
                  <p className="text-walmart-gray-700">
                    {steps[activeStep].subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Process */}
      <section className="section-padding bg-walmart-blue-50">
        <div className="container-walmart">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-walmart-gray-900 mb-4">
              Technical Implementation
            </h2>
            <p className="text-xl text-walmart-gray-800 max-w-3xl mx-auto">
              Behind the scenes, our platform leverages cutting-edge blockchain 
              technology to ensure security, transparency, and reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technicalProcess.map((process, index) => (
              <div key={index} className="process-card walmart-card p-6 text-center bg-white">
                <div className="text-4xl mb-4">{process.icon}</div>
                <h3 className="text-xl font-bold text-walmart-gray-900 mb-3">
                  {process.title}
                </h3>
                <p className="text-walmart-gray-700">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Results */}
      <section className="section-padding bg-white">
        <div className="container-walmart">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-walmart-gray-900 mb-4">
              Proven Results
            </h2>
            <p className="text-xl text-walmart-gray-800 max-w-3xl mx-auto">
              See the measurable impact that ChainTrack.ai tracking delivers for businesses across industries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center walmart-card p-6 bg-white">
                <div className="text-4xl font-bold text-walmart-blue-600 mb-2">
                  {benefit.value}
                </div>
                <h3 className="text-xl font-bold text-walmart-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-walmart-gray-700">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="section-padding bg-walmart-blue-600">
        <div className="container-walmart">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              See It in Action
            </h2>
            <p className="text-xl text-walmart-blue-100 max-w-2xl mx-auto mb-8">
              Ready to experience ChainTrack.ai tracking firsthand? 
              Start with our interactive dashboard and create your first product.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard" className="walmart-btn-secondary text-lg px-8 py-4">
                Launch Dashboard
              </Link>
              <Link to="/features" className="walmart-btn-primary bg-transparent border-2 border-white hover:bg-white hover:text-walmart-blue-600 text-lg px-8 py-4">
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}