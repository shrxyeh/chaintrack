import { useState, useEffect } from 'react';

export default function AIPredictionCard({ productId, productName, status }) {
  const [isLoading, setIsLoading] = useState(true);
  const [predictions, setPredictions] = useState(null);

  // Generate fake AI predictions
  const generatePredictions = () => {
    const etaDays = Math.floor(Math.random() * 7) + 1;
    const confidence = Math.floor(Math.random() * 20) + 80; // 80-100%
    const riskLevels = ['Low', 'Medium', 'High'];
    const riskLevel = riskLevels[Math.floor(Math.random() * 3)];
    
    const insights = [
      "Optimal weather conditions detected",
      "Traffic patterns favorable",
      "Historical data suggests on-time delivery",
      "Supply chain efficiency at 94%",
      "No disruptions detected in route"
    ];

    return {
      eta: etaDays,
      confidence,
      riskLevel,
      insight: insights[Math.floor(Math.random() * insights.length)]
    };
  };

  useEffect(() => {
    // Simulate AI processing time
    const timer = setTimeout(() => {
      setPredictions(generatePredictions());
      setIsLoading(false);
    }, 1500 + Math.random() * 1000);

    return () => clearTimeout(timer);
  }, [productId]);

  const getRiskColor = (level) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'Low': 
        return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
      case 'Medium':
        return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>;
      case 'High':
        return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="walmart-card p-6 bg-gradient-to-br from-walmart-blue-50 to-walmart-blue-100">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-walmart-blue-600 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-walmart-blue-900">AI Predictions</h3>
            <p className="text-sm text-walmart-blue-700">Analyzing data...</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="animate-pulse">
            <div className="h-4 bg-walmart-blue-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-walmart-blue-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="walmart-card p-6 bg-gradient-to-br from-walmart-blue-50 to-walmart-blue-100 animate-fade-in">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-walmart-blue-600 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-walmart-blue-900">AI Predictions</h3>
          <p className="text-sm text-walmart-blue-700">For {productName}</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* ETA Prediction */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-walmart-gray-700">Predicted ETA</span>
            <span className="text-lg font-bold text-walmart-blue-600">
              {predictions.eta} {predictions.eta === 1 ? 'day' : 'days'}
            </span>
          </div>
          <div className="text-xs text-walmart-gray-500">
            Based on historical supply chain data
          </div>
        </div>

        {/* Confidence Score */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-walmart-gray-700">Confidence Score</span>
            <span className="text-lg font-bold text-walmart-blue-600">{predictions.confidence}%</span>
          </div>
          <div className="w-full bg-walmart-gray-200 rounded-full h-2">
            <div 
              className="bg-walmart-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${predictions.confidence}%` }}
            ></div>
          </div>
        </div>

        {/* Risk Level */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-walmart-gray-700">Risk Level</span>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${getRiskColor(predictions.riskLevel)}`}>
              {getRiskIcon(predictions.riskLevel)}
              <span>{predictions.riskLevel}</span>
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 text-walmart-blue-600 mt-0.5">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-walmart-gray-700 mb-1">AI Insight</p>
              <p className="text-sm text-walmart-gray-600">{predictions.insight}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}