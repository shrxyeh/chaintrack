import { useState, useEffect } from 'react';

export default function DisruptionAlert({ onDismiss }) {
  const [isVisible, setIsVisible] = useState(false);
  const [alert, setAlert] = useState(null);

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Potential Delay Detected',
      message: 'AI has detected a possible delay on Batch #21A due to weather conditions',
      severity: 'medium',
      icon: '⚠️'
    },
    {
      id: 2,
      type: 'info',
      title: 'Route Optimization Available',
      message: 'AI suggests alternative route for Shipment #45B to reduce transit time by 12 hours',
      severity: 'low',
      icon: '🛣️'
    },
    {
      id: 3,
      type: 'success',
      title: 'Early Delivery Predicted',
      message: 'Shipment #78C is ahead of schedule and will arrive 2 days early',
      severity: 'low',
      icon: '🚀'
    },
    {
      id: 4,
      type: 'error',
      title: 'Supply Chain Disruption',
      message: 'Critical: Port congestion detected affecting 3 active shipments',
      severity: 'high',
      icon: '🚨'
    }
  ];

  useEffect(() => {
    // Randomly show alerts
    const shouldShow = Math.random() > 0.7; // 30% chance
    if (shouldShow) {
      const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
      setAlert(randomAlert);
      
      setTimeout(() => {
        setIsVisible(true);
      }, 2000 + Math.random() * 3000); // Show after 2-5 seconds
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss?.();
    }, 300);
  };

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getTypeStyles = (type) => {
    switch (type) {
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      case 'success':
        return 'bg-green-500 text-white';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (!alert || !isVisible) return null;

  return (
    <div className={`fixed top-20 right-4 max-w-sm w-full z-40 transform transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className={`walmart-card p-4 border-l-4 ${getSeverityStyles(alert.severity)} shadow-walmart-lg`}>
        <div className="flex items-start">
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getTypeStyles(alert.type)}`}>
            <span className="text-sm">{alert.icon}</span>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-walmart-gray-900 mb-1">
                  {alert.title}
                </h4>
                <p className="text-sm text-walmart-gray-700 leading-relaxed">
                  {alert.message}
                </p>
              </div>
              
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 ml-2 text-walmart-gray-400 hover:text-walmart-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mt-3 flex items-center space-x-2">
              <span className="text-xs text-walmart-gray-500">AI Detected</span>
              <div className="w-2 h-2 bg-walmart-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-walmart-gray-500">Just now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}