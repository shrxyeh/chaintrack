import { useState, useEffect, useRef } from 'react';
import { useKafkaSimulation } from './KafkaSimContext';

export default function KafkaConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const { events, metrics, isActive, setIsActive } = useKafkaSimulation();
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = 0;
    }
  }, [events]);

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    return event.eventType.toLowerCase().includes(filter.toLowerCase());
  });

  const getEventColor = (eventType) => {
    const colors = {
      QR_SCAN: 'text-blue-400',
      SHIPMENT_UPDATE: 'text-green-400',
      ETA_PREDICTION: 'text-purple-400',
      ANOMALY_DETECTED: 'text-red-400',
      STATUS_CHANGE: 'text-yellow-400',
      AI_ANALYSIS: 'text-cyan-400',
      QUALITY_CHECK: 'text-orange-400'
    };
    return colors[eventType] || 'text-gray-400';
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-20 z-50 bg-gray-900 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        title="Kafka Event Console"
      >
        <div className="relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          {isActive && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </div>
      </button>

      {/* Console Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 max-w-[calc(100vw-2rem)] h-96 bg-gray-900 rounded-lg shadow-2xl z-40 flex flex-col border border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <h3 className="text-white font-semibold">Kafka Console</h3>
              </div>
              <span className="text-xs text-gray-400">
                {metrics.messagesPerSecond} msg/s
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsActive(!isActive)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  isActive 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isActive ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="p-3 border-b border-gray-700">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-gray-800 text-white text-xs rounded px-2 py-1 border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Events</option>
              <option value="qr">QR Scans</option>
              <option value="shipment">Shipments</option>
              <option value="prediction">Predictions</option>
              <option value="anomaly">Anomalies</option>
              <option value="ai">AI Analysis</option>
            </select>
          </div>

          {/* Event Log */}
          <div 
            ref={consoleRef}
            className="flex-1 overflow-y-auto p-3 space-y-2 font-mono text-xs"
          >
            {filteredEvents.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                {isActive ? 'Waiting for events...' : 'Kafka simulation paused'}
              </div>
            ) : (
              filteredEvents.map((event, index) => (
                <div 
                  key={event.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start space-x-2">
                    <span className="text-gray-500 text-xs">
                      {formatTimestamp(event.timestamp)}
                    </span>
                    <span className={`font-semibold ${getEventColor(event.eventType)}`}>
                      [{event.eventType}]
                    </span>
                  </div>
                  <div className="text-gray-300 ml-16 mb-1">
                    {event.message}
                  </div>
                  <div className="text-gray-500 ml-16 text-xs">
                    Topic: {event.topic}
                  </div>
                  {Object.keys(event.data).length > 0 && (
                    <div className="text-gray-600 ml-16 text-xs">
                      Data: {JSON.stringify(event.data)}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer Stats */}
          <div className="p-3 border-t border-gray-700 bg-gray-800 rounded-b-lg">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Events: {events.length}</span>
              <span>Latency: {metrics.latency.toFixed(1)}ms</span>
              <span>Topics: {metrics.topicsCount}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}