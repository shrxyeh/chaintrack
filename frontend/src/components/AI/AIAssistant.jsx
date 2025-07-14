import { useState, useEffect } from 'react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [hasNewSuggestion, setHasNewSuggestion] = useState(false);

  const suggestions = [
    "Shipment #23 is ahead of schedule by 6 hours",
    "Predicted warehouse depletion in 3 days for Product A",
    "Weather alert: Storm may affect Route 45 tomorrow",
    "Cost optimization: Alternative supplier available",
    "Quality alert: Batch #67 requires inspection",
    "Efficiency tip: Consolidate shipments 12 & 15",
    "Inventory alert: Low stock detected for Product B",
    "Route optimization: Save 2 hours on delivery #89"
  ];

  useEffect(() => {
    // Periodically show new suggestion indicator
    const interval = setInterval(() => {
      if (!isOpen && Math.random() > 0.8) {
        setHasNewSuggestion(true);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasNewSuggestion(false);
    
    if (messages.length === 0) {
      // Initial greeting
      setTimeout(() => {
        setMessages([{
          id: 1,
          text: "Hello! I'm your AI Supply Chain Assistant. I've been analyzing your data and have some insights to share.",
          type: 'ai',
          timestamp: new Date()
        }]);
        
        // Add a suggestion after greeting
        setTimeout(() => {
          addRandomSuggestion();
        }, 1500);
      }, 500);
    }
  };

  const addRandomSuggestion = () => {
    setIsTyping(true);
    
    setTimeout(() => {
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      const newMessage = {
        id: Date.now(),
        text: randomSuggestion,
        type: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleGetMoreInsights = () => {
    addRandomSuggestion();
  };

  return (
    <>
      {/* Floating Assistant Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleOpen}
          className="relative w-14 h-14 bg-walmart-blue-600 hover:bg-walmart-blue-700 text-white rounded-full shadow-walmart-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          
          {hasNewSuggestion && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          )}
          
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-walmart-blue-600 animate-ping opacity-20"></div>
        </button>
      </div>

      {/* Assistant Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 max-w-[calc(100vw-2rem)] z-50">
          <div className="walmart-card bg-white shadow-walmart-xl rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-walmart-blue-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-walmart-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold">AI Assistant</h3>
                    <p className="text-xs text-walmart-blue-100">Supply Chain Intelligence</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="text-walmart-blue-100 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 max-h-64 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-walmart-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-walmart-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="bg-walmart-blue-50 rounded-lg p-3">
                      <p className="text-sm text-walmart-gray-800">{message.text}</p>
                    </div>
                    <p className="text-xs text-walmart-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-walmart-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-walmart-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="bg-walmart-blue-50 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-walmart-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-walmart-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-walmart-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-walmart-gray-200 p-4">
              <button
                onClick={handleGetMoreInsights}
                disabled={isTyping}
                className="w-full walmart-btn-primary text-sm py-2 disabled:opacity-50"
              >
                {isTyping ? 'Analyzing...' : 'Get More Insights'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}