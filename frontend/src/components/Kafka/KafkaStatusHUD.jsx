import { useState } from 'react';
import { useKafkaSimulation } from './KafkaSimContext';

export default function KafkaStatusHUD() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { metrics, topics, isActive } = useKafkaSimulation();

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-green-500' : 'text-red-500';
  };

  const getStatusIcon = (status) => {
    return status === 'active' ? '✅' : '❌';
  };

  return (
    <div className="fixed top-6 left-6 z-40">
      <div className={`bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-300 ${
        isExpanded ? 'w-80' : 'w-48'
      }`}>
        {/* Header */}
        <div 
          className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-sm font-medium text-gray-900">Kafka Status</span>
            </div>
            <svg 
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="px-3 pb-3 space-y-3 border-t border-gray-100">
            {/* Core Status */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Producer</span>
                <div className="flex items-center space-x-1">
                  <span className={getStatusColor(metrics.producerStatus)}>
                    {getStatusIcon(metrics.producerStatus)}
                  </span>
                  <span className={`font-medium ${getStatusColor(metrics.producerStatus)}`}>
                    {metrics.producerStatus.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Consumer</span>
                <div className="flex items-center space-x-1">
                  <span className={getStatusColor(metrics.consumerStatus)}>
                    {getStatusIcon(metrics.consumerStatus)}
                  </span>
                  <span className={`font-medium ${getStatusColor(metrics.consumerStatus)}`}>
                    {metrics.consumerStatus.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Latency</span>
                <span className="font-medium text-gray-900">{metrics.latency.toFixed(1)}ms</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Messages/sec</span>
                <span className="font-medium text-gray-900">{metrics.messagesPerSecond}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Topics</span>
                <span className="font-medium text-gray-900">{topics.length}</span>
              </div>
            </div>

            {/* Topics List */}
            <div className="pt-2 border-t border-gray-100">
              <div className="text-xs font-medium text-gray-700 mb-2">Active Topics</div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {topics.map((topic, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600 font-mono truncate">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Consumer Info */}
            <div className="pt-2 border-t border-gray-100">
              <div className="text-xs font-medium text-gray-700 mb-2">Consumers</div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">ai-analytics-service</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">prediction-engine</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">anomaly-detector</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}