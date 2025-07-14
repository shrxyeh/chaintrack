import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setupCardHovers, scrollReveal } from '../utils/animations';
import Footer from '../components/Footer';

export default function FeaturesPage() {
  useEffect(() => {
    setupCardHovers();
    scrollReveal('.feature-detail-card');
    scrollReveal('.benefit-card');
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Immutable Record Keeping",
      description: "Every transaction and status update is permanently recorded on the blockchain, creating an unalterable history of your product's journey.",
      benefits: [
        "Tamper-proof data storage",
        "Permanent audit trail",
        "Cryptographic verification",
        "Decentralized validation"
      ]
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: "Complete Transparency",
      description: "Gain full visibility into your supply chain with ChainTrack.ai. Real-time tracking and comprehensive product histories accessible to all stakeholders.",
      benefits: [
        "End-to-end visibility",
        "Real-time status updates",
        "Stakeholder access control",
        "Comprehensive reporting"
      ]
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Enhanced Security",
      description: "Protect your data with military-grade encryption and distributed ledger technology by ChainTrack.ai that prevents unauthorized access.",
      benefits: [
        "Cryptographic security",
        "Distributed architecture",
        "Access control management",
        "Fraud prevention"
      ]
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Smart Automation",
      description: "Automate processes with ChainTrack.ai smart contracts that execute predefined actions when specific conditions are met.",
      benefits: [
        "Automated workflows",
        "Conditional execution",
        "Reduced manual errors",
        "Cost optimization"
      ]
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Advanced Analytics",
      description: "Leverage ChainTrack.ai data for powerful insights into performance, bottlenecks, and optimization opportunities.",
      benefits: [
        "Performance metrics",
        "Predictive analytics",
        "Bottleneck identification",
        "ROI optimization"
      ]
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
        </svg>
      ),
      title: "Global Interoperability",
      description: "Connect with partners worldwide through standardized blockchain protocols that ensure seamless data exchange and collaboration.",
      benefits: [
        "Cross-platform compatibility",
        "Standardized protocols",
        "Global accessibility",
        "Partner integration"
      ]
    }
  ];

  const industryBenefits = [
    {
      industry: "Food & Agriculture",
      icon: "🌾",
      benefits: ["Farm-to-table traceability", "Food safety compliance", "Organic certification", "Contamination prevention"]
    },
    {
      industry: "Pharmaceuticals",
      icon: "💊",
      benefits: ["Drug authenticity verification", "Cold chain monitoring", "Regulatory compliance", "Counterfeit prevention"]
    },
    {
      industry: "Electronics",
      icon: "📱",
      benefits: ["Component sourcing verification", "Quality assurance", "Warranty tracking", "Recycling compliance"]
    },
    {
      industry: "Fashion & Textiles",
      icon: "👕",
      benefits: ["Ethical sourcing verification", "Sustainability tracking", "Brand protection", "Labor compliance"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="walmart-hero-bg section-padding">
        <div className="container-walmart">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">
              Blockchain Features
            </h1>
            <p className="text-xl text-walmart-blue-100 max-w-3xl mx-auto mb-8">
              Discover how ChainTrack.ai revolutionizes supply chain management 
              with cutting-edge features designed for transparency, security, and efficiency.
            </p>
            <Link to="/dashboard" className="walmart-btn-secondary text-lg px-8 py-4">
              Start Using Features
            </Link>
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="section-padding bg-walmart-blue-50">
        <div className="container-walmart">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-walmart-gray-900 mb-4">
              Comprehensive Feature Set
            </h2>
            <p className="text-xl text-walmart-gray-800 max-w-3xl mx-auto">
              Our blockchain platform provides enterprise-grade features that address 
              every aspect of modern supply chain management with ChainTrack.ai.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-detail-card walmart-card p-8 bg-white">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 walmart-gradient rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-walmart-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-walmart-gray-800 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center text-walmart-gray-700">
                          <svg className="w-5 h-5 text-walmart-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Benefits */}
      <section className="section-padding bg-white">
        <div className="container-walmart">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-walmart-gray-900 mb-4">
              Industry-Specific Benefits
            </h2>
            <p className="text-xl text-walmart-gray-800 max-w-3xl mx-auto">
              See how our blockchain features deliver value across different industries 
              with tailored solutions for specific challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industryBenefits.map((industry, index) => (
              <div key={index} className="benefit-card walmart-card p-6 text-center bg-white">
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="text-xl font-bold text-walmart-gray-900 mb-4">
                  {industry.industry}
                </h3>
                <ul className="space-y-2 text-left">
                  {industry.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start text-walmart-gray-700">
                      <div className="w-2 h-2 bg-walmart-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-walmart-blue-600">
        <div className="container-walmart">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform with ChainTrack.ai?
            </h2>
            <p className="text-xl text-walmart-blue-100 max-w-2xl mx-auto mb-8">
              Join thousands of businesses already leveraging blockchain technology 
              to create more transparent, secure, and efficient supply chains with ChainTrack.ai.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard" className="walmart-btn-secondary text-lg px-8 py-4">
                Start Free Trial
              </Link>
              <Link to="/how-it-works" className="walmart-btn-primary bg-transparent border-2 border-white hover:bg-white hover:text-walmart-blue-600 text-lg px-8 py-4">
                Learn How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}