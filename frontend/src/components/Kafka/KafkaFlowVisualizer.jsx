import { useState, useEffect } from 'react';
import { useKafkaSimulation } from './KafkaSimContext';

export default function KafkaFlowVisualizer({ trigger = null }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { publishEvent } = useKafkaSimulation();

  const steps = [
    { id: 'source', label: 'Event Source', icon: '📱' },
    { id: 'producer', label: 'Kafka Producer', icon: '📤' },
    { id: 'topic', label: 'Topic', icon: '📋' },
    { id: 'consumer', label: 'AI Consumer', icon: '🤖' },
    { id: 'insight', label: 'Dashboard', icon: '📊' }
  ];

  useEffect(() => {
    if (trigger) {
      startAnimation();
    }
  }, [trigger]);

  const startAnimation = async () => {
    setIsAnimating(true);
    setCurrentStep(0);

    // Animate through each step
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Publish Kafka event
    publishEvent('AI_ANALYSIS', {
      source: 'flow-visualizer',
      topic: 'chaintrack.analytics.predictions'
    });

    setTimeout(() => {
      setIsAnimating(false);
      setCurrentStep(0);
    }, 1000);
  };

  if (!isAnimating) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-2xl p-6 border border-gray-200 min-w-96">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Kafka Event Flow</h3>
        <p className="text-sm text-gray-600">Processing real-time event...</p>
      </div>

      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2 z-0"></div>
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-blue-500 transform -translate-y-1/2 z-10 transition-all duration-800"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>

        {/* Steps */}
        {steps.map((step, index) => (
          <div key={step.id} className="relative z-20 flex flex-col items-center">
            <div 
              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                index <= currentStep 
                  ? 'bg-blue-500 text-white scale-110' 
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.icon}
            </div>
            <span className={`text-xs mt-2 font-medium transition-colors duration-300 ${
              index <= currentStep ? 'text-blue-600' : 'text-gray-500'
            }`}>
              {step.label}
            </span>
            
            {/* Pulse animation for current step */}
            {index === currentStep && (
              <div className="absolute top-0 w-12 h-12 rounded-full bg-blue-500 opacity-30 animate-ping"></div>
            )}
          </div>
        ))}
      </div>

      {/* Current Step Info */}
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <div className="text-sm font-medium text-blue-900">
          {currentStep < steps.length ? steps[currentStep].label : 'Complete'}
        </div>
        <div className="text-xs text-blue-700 mt-1">
          {currentStep === 0 && 'Capturing event data...'}
          {currentStep === 1 && 'Publishing to Kafka...'}
          {currentStep === 2 && 'Routing through topic...'}
          {currentStep === 3 && 'AI processing event...'}
          {currentStep === 4 && 'Updating dashboard...'}
          {currentStep >= steps.length && 'Event processed successfully!'}
        </div>
      </div>
    </div>
  );
}