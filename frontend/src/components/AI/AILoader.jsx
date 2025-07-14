import { useState, useEffect } from 'react';

export default function AILoader({ isVisible, onComplete, messages = [] }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const defaultMessages = [
    "Analyzing supply chain data...",
    "Predicting ETA from historical patterns...",
    "Detecting potential anomalies...",
    "Processing blockchain transactions...",
    "Generating AI insights..."
  ];

  const displayMessages = messages.length > 0 ? messages : defaultMessages;

  useEffect(() => {
    if (!isVisible) return;

    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % displayMessages.length);
    }, 600);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [isVisible, onComplete, displayMessages]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center">
        <div className="mb-6">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-walmart-blue-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-walmart-blue-600 border-t-transparent animate-spin"></div>
            <div className="absolute inset-2 rounded-full bg-walmart-blue-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-walmart-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-walmart-gray-900 mb-2">AI Analysis in Progress</h3>
          <p className="text-walmart-gray-600 animate-pulse">
            {displayMessages[currentMessageIndex]}
          </p>
        </div>

        <div className="mb-4">
          <div className="w-full bg-walmart-gray-200 rounded-full h-2">
            <div 
              className="bg-walmart-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-walmart-gray-500 mt-2">{progress}% Complete</p>
        </div>

        <div className="flex items-center justify-center space-x-2 text-walmart-blue-600">
          <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}