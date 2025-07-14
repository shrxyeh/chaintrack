import { useState, useEffect } from 'react';

export default function AIAnalyticsSection() {
  const [metrics, setMetrics] = useState({});
  const [anomalies, setAnomalies] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate AI analytics loading
    setTimeout(() => {
      setMetrics({
        recognitionConfidence: 94.7,
        classificationAccuracy: 97.2,
        errorRate: 2.8,
        processingSpeed: 1.3
      });

      setAnomalies([
        {
          id: 1,
          type: 'Quality Deviation',
          product: 'Organic Apples',
          severity: 'medium',
          confidence: 87,
          description: 'Detected unusual color variation in batch #A-2024-001'
        },
        {
          id: 2,
          type: 'Size Anomaly',
          product: 'Coffee Beans',
          severity: 'low',
          confidence: 92,
          description: 'Bean size distribution outside normal parameters'
        },
        {
          id: 3,
          type: 'Packaging Issue',
          product: 'Fresh Milk',
          severity: 'high',
          confidence: 95,
          description: 'Label positioning inconsistency detected'
        }
      ]);

      setPredictions([
        {
          id: 1,
          metric: 'Daily Scan Volume',
          current: 1247,
          predicted: 1389,
          change: '+11.4%',
          confidence: 89
        },
        {
          id: 2,
          metric: 'Quality Score',
          current: 94.2,
          predicted: 96.1,
          change: '+2.0%',
          confidence: 92
        },
        {
          id: 3,
          metric: 'Processing Time',
          current: 1.3,
          predicted: 1.1,
          change: '-15.4%',
          confidence: 85
        }
      ]);

      setIsLoading(false);
    }, 1500);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="walmart-card p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Metrics Overview */}
      <div className="walmart-card p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">AI Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Recognition Confidence</p>
                <p className="text-2xl font-bold text-blue-900">{metrics.recognitionConfidence}%</p>
              </div>
              <div className="text-3xl">🎯</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Classification Accuracy</p>
                <p className="text-2xl font-bold text-green-900">{metrics.classificationAccuracy}%</p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">Error Rate</p>
                <p className="text-2xl font-bold text-red-900">{metrics.errorRate}%</p>
              </div>
              <div className="text-3xl">⚠️</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Processing Speed</p>
                <p className="text-2xl font-bold text-purple-900">{metrics.processingSpeed}s</p>
              </div>
              <div className="text-3xl">⚡</div>
            </div>
          </div>
        </div>
      </div>

      {/* Anomaly Detection */}
      <div className="walmart-card p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Anomaly Detection Results</h3>
        <div className="space-y-4">
          {anomalies.map((anomaly) => (
            <div key={anomaly.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-gray-900">{anomaly.type}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(anomaly.severity)}`}>
                      {anomaly.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{anomaly.description}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-500">Product: <span className="font-medium">{anomaly.product}</span></span>
                    <span className="text-gray-500">Confidence: <span className="font-medium">{anomaly.confidence}%</span></span>
                  </div>
                </div>
                <button className="text-walmart-blue-600 hover:text-walmart-blue-800 text-sm font-medium">
                  Investigate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prediction Trends */}
      <div className="walmart-card p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">AI Prediction Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {predictions.map((prediction) => (
            <div key={prediction.id} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">{prediction.metric}</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current</span>
                  <span className="font-medium">{prediction.current}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Predicted</span>
                  <span className="font-medium">{prediction.predicted}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Change</span>
                  <span className={`font-medium ${prediction.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {prediction.change}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Confidence</span>
                    <span>{prediction.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-walmart-blue-600 h-2 rounded-full"
                      style={{ width: `${prediction.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}