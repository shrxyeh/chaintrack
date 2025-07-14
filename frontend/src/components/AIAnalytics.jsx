import { useState, useEffect } from "react";
import AIPredictionCard from "./AI/AIPredictionCard";

export default function AIAnalytics() {
  const [analytics, setAnalytics] = useState({
    predictions: 94.5,
    accuracy: 98.2,
    scansToday: 156,
    anomalies: 3
  });
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    // Simulate loading AI insights
    setTimeout(() => {
      setInsights([
        {
          id: 1,
          type: 'optimization',
          title: 'Route Optimization Opportunity',
          description: 'AI detected 15% efficiency gain possible by consolidating shipments 12 & 15',
          impact: 'High',
          savings: '$2,400'
        },
        {
          id: 2,
          type: 'prediction',
          title: 'Demand Forecast Alert',
          description: 'Predicted 30% increase in Product A demand next week',
          impact: 'Medium',
          confidence: '92%'
        },
        {
          id: 3,
          type: 'risk',
          title: 'Weather Risk Assessment',
          description: 'Storm system may affect Route 45 in 48 hours',
          impact: 'Low',
          probability: '65%'
        }
      ]);
    }, 1500);
  }, []);

  return (
    <div className="walmart-card p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-walmart-gray-900 mb-2">AI Analytics Dashboard</h2>
        <p className="text-walmart-gray-600">Advanced analytics powered by artificial intelligence</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-walmart-blue-50 to-walmart-blue-100 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-walmart-blue-600 text-sm font-medium">Prediction Accuracy</p>
              <p className="text-2xl font-bold text-walmart-blue-900">{analytics.predictions}%</p>
            </div>
            <div className="text-3xl">🤖</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">System Accuracy</p>
              <p className="text-2xl font-bold text-green-900">{analytics.accuracy}%</p>
            </div>
            <div className="text-3xl">📊</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-walmart-yellow-50 to-walmart-yellow-100 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-walmart-yellow-600 text-sm font-medium">Scans Today</p>
              <p className="text-2xl font-bold text-walmart-yellow-900">{analytics.scansToday}</p>
            </div>
            <div className="text-3xl">📱</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Anomalies Detected</p>
              <p className="text-2xl font-bold text-red-900">{analytics.anomalies}</p>
            </div>
            <div className="text-3xl">⚠️</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-walmart-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-walmart-gray-900 mb-4">AI Insights</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-walmart-gray-700">Supply chain efficiency increased by 23%</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-walmart-blue-500 rounded-full"></div>
              <span className="text-sm text-walmart-gray-700">Predictive maintenance alerts working optimally</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-walmart-yellow-500 rounded-full"></div>
              <span className="text-sm text-walmart-gray-700">3 potential delays identified and resolved</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-walmart-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-walmart-gray-900 mb-4">Recent Predictions</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-walmart-gray-700">Delivery time prediction</span>
              <span className="text-sm font-medium text-green-600">98.2% accurate</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-walmart-gray-700">Quality assessment</span>
              <span className="text-sm font-medium text-green-600">99.1% accurate</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-walmart-gray-700">Route optimization</span>
              <span className="text-sm font-medium text-green-600">95.7% accurate</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-walmart-gray-900 mb-4">AI-Generated Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight) => (
            <div key={insight.id} className="bg-white border border-walmart-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  insight.type === 'optimization' ? 'bg-green-100 text-green-600' :
                  insight.type === 'prediction' ? 'bg-blue-100 text-blue-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {insight.type === 'optimization' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  )}
                  {insight.type === 'prediction' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {insight.type === 'risk' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  insight.impact === 'High' ? 'bg-red-100 text-red-600' :
                  insight.impact === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {insight.impact} Impact
                </span>
              </div>
              
              <h4 className="font-semibold text-walmart-gray-900 mb-2">{insight.title}</h4>
              <p className="text-sm text-walmart-gray-600 mb-3">{insight.description}</p>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-walmart-gray-500">AI Confidence</span>
                <span className="font-medium text-walmart-blue-600">
                  {insight.savings || insight.confidence || insight.probability}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-walmart-blue-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">💡</div>
          <div>
            <p className="text-sm font-medium text-walmart-blue-900">AI Recommendation</p>
            <p className="text-sm text-walmart-blue-700">
              Consider implementing automated temperature monitoring for cold chain products to improve quality predictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}