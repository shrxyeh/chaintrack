import { useEffect } from 'react';
import { animateStats } from '../utils/animations';

export default function StatsSection() {
  useEffect(() => {
    animateStats();
  }, []);

  const stats = [
    {
      number: 1247,
      label: "Products Tracked",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      number: 89,
      label: "Active Users",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    {
      number: 3456,
      label: "Blockchain Transactions",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      number: 99,
      label: "Accuracy Rate (%)",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="section-padding bg-walmart-blue-600">
      <div className="container-walmart">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Platform Statistics
          </h2>
          <p className="text-xl text-walmart-blue-100 max-w-3xl mx-auto">
            See how our blockchain supply chain platform is making a real impact 
            across industries worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-walmart-yellow-400 rounded-xl flex items-center justify-center text-walmart-gray-900 mx-auto mb-4">
                {stat.icon}
              </div>
              <div className="stat-number text-4xl font-bold text-white mb-2" data-target={stat.number}>
                0
              </div>
              <div className="text-walmart-blue-100 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Global Reach</h4>
                <p className="text-walmart-blue-100">Operating across 25+ countries</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Industry Coverage</h4>
                <p className="text-walmart-blue-100">Food, Pharma, Electronics, Textiles</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Uptime</h4>
                <p className="text-walmart-blue-100">99.9% platform availability</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}