import { useState, useEffect } from 'react';
import { useKafkaSimulation } from './KafkaSimContext';

export default function KafkaPredictionCard({ productId, productName, onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const [prediction, setPrediction] = useState(null);
  const { publishEvent } = useKafkaSimulation();

  useEffect(() => {
    // Simulate Kafka-powered AI prediction
    publishEvent('AI_ANALYSIS', {
      productId,
      topic: 'chaintrack.analytics.predictions',
      source: 'prediction-service'
    });

    // Simulate processing time
    setTimeout(() => {
      const mockPrediction = {
        eta: `${Math.floor(Math.random() * 12) + 1}h ${Math.floor(Math.random() * 60)}m`,
        confidence: Math.floor(Math.random() * 20) + 75,
        riskLevel: ['LOW', 'MEDIUM', 'HIGH'][Math.floor(Math.random() * 3)],
        factors: [
          'Historical shipping data',
          'Current traffic conditions',
          'Weather patterns',
          'Carrier performance metrics'
        ],
        kafkaTopic: 'chaintrack.analytics.predictions',
        processingTime: (Math.random() * 2 + 0.5).toFixed(2)
      };

      setPrediction(mockPrediction);
      setIsLoading(false);

      // Publish prediction result
      publishEvent('ETA_PREDICTION', {
        productId,
        eta: mockPrediction.eta,
        confidence: mockPrediction.confidence,
        topic: 'chaintrack.events.predictions'
      });
    }, 2000 + Math.random() * 1000);
  }, [productId, publishEvent]);

  const getRiskColor = (level) => {
    switch (level) {
      case 'LOW': return 'text-green-600 bg-green-100';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
      case 'HIGH': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'LOW': return '✅';
      case 'MEDIUM': return '⚠️';
      case 'HIGH': return '🚨';
      default: return '❓';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">AI Prediction</h3>
              <p className="text-sm text-gray-600">{productName}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                <div className="absolute inset-2 rounded-full bg-blue-50 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">AI Processing</h4>
              <p className="text-gray-600 mb-4">Analyzing ChainTrack.ai data via Kafka...</p>
              <div className="text-xs text-gray-500 space-y-1">
                <div>📤 Publishing to Kafka topic...</div>
                <div>🤖 AI consumer processing...</div>
                <div>📊 Generating predictions...</div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Prediction Results */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium mb-1">Estimated ETA</div>
                  <div className="text-2xl font-bold text-blue-900">{prediction.eta}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-green-600 font-medium mb-1">Confidence</div>
                  <div className="text-2xl font-bold text-green-900">{prediction.confidence}%</div>
                </div>
              </div>

              {/* Risk Level */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Risk Level</span>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${getRiskColor(prediction.riskLevel)}`}>
                    <span>{getRiskIcon(prediction.riskLevel)}</span>
                    <span>{prediction.riskLevel}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${prediction.confidence > 85 ? 'bg-green-500' : prediction.confidence > 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${prediction.confidence}%` }}
                  ></div>
                </div>
              </div>

              {/* AI Factors */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Analysis Factors</h4>
                <div className="space-y-2">
                  {prediction.factors.map((factor, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{factor}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kafka Info */}
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="text-xs text-gray-400 mb-2">Powered by Kafka Streaming</div>
                <div className="space-y-1 text-xs font-mono">
                  <div className="text-green-400">✓ Topic: {prediction.kafkaTopic}</div>
                  <div className="text-blue-400">⚡ Processing time: {prediction.processingTime}s</div>
                  <div className="text-yellow-400">🔄 Real-time data pipeline</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isLoading && (
          <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Generated by AI via Kafka</span>
              <span>Updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}