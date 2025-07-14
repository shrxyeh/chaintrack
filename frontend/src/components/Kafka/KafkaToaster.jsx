import { useState, useEffect } from 'react';
import { useKafkaSimulation } from './KafkaSimContext';

export default function KafkaToaster() {
  const [toasts, setToasts] = useState([]);
  const { events } = useKafkaSimulation();

  useEffect(() => {
    if (events.length === 0) return;

    const latestEvent = events[0];
    
    // Only show toasts for certain event types
    const toastableEvents = ['QR_SCAN', 'ETA_PREDICTION', 'ANOMALY_DETECTED', 'AI_ANALYSIS'];
    if (!toastableEvents.includes(latestEvent.eventType)) return;

    const toastMessages = {
      QR_SCAN: '📱 Kafka: QR scan event published',
      ETA_PREDICTION: '🔮 Kafka: AI pushed updated ETA prediction',
      ANOMALY_DETECTED: '⚠️ Kafka: Anomaly detection alert',
      AI_ANALYSIS: '🤖 Kafka: AI analysis completed'
    };

    const toast = {
      id: latestEvent.id,
      message: toastMessages[latestEvent.eventType] || '📡 Kafka: New event published',
      timestamp: Date.now(),
      type: latestEvent.eventType
    };

    setToasts(prev => [toast, ...prev.slice(0, 2)]); // Keep max 3 toasts

    // Auto remove after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toast.id));
    }, 4000);
  }, [events]);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const getToastColor = (type) => {
    const colors = {
      QR_SCAN: 'bg-blue-500',
      ETA_PREDICTION: 'bg-purple-500',
      ANOMALY_DETECTED: 'bg-red-500',
      AI_ANALYSIS: 'bg-green-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <div className="fixed top-6 right-6 z-50 space-y-2">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className={`transform transition-all duration-300 ease-out ${
            index === 0 ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-90'
          }`}
          style={{ 
            transform: `translateY(${index * 60}px) translateX(${index * 4}px)`,
            zIndex: 50 - index
          }}
        >
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
            <div className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${getToastColor(toast.type)}`}></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{toast.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(toast.timestamp).toLocaleTimeString()}
                </p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}