import { useState, useEffect } from "react";

export default function AIAnalytics() {
  const [analytics, setAnalytics] = useState({
    predictions: 94.5,
    accuracy: 98.2,
    scansToday: 156,
    anomalies: 3
  });

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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