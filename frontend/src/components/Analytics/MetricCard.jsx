import { useState } from 'react';

export default function MetricCard({ 
  title, 
  value, 
  unit = '', 
  trend, 
  change, 
  icon, 
  color = 'blue',
  sparklineData = [],
  onClick,
  expandedContent 
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    onClick?.();
  };

  const getTrendIcon = () => {
    if (trend === 'up') {
      return (
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L10 4.414 4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      );
    } else if (trend === 'down') {
      return (
        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L10 15.586l5.293-5.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    }
    return null;
  };

  const getColorClasses = () => {
    const colors = {
      blue: 'from-walmart-blue-50 to-walmart-blue-100 border-walmart-blue-200',
      green: 'from-green-50 to-green-100 border-green-200',
      yellow: 'from-walmart-yellow-50 to-walmart-yellow-100 border-walmart-yellow-200',
      purple: 'from-purple-50 to-purple-100 border-purple-200',
      red: 'from-red-50 to-red-100 border-red-200'
    };
    return colors[color] || colors.blue;
  };

  const renderSparkline = () => {
    if (!sparklineData.length) return null;
    
    const max = Math.max(...sparklineData);
    const min = Math.min(...sparklineData);
    const range = max - min || 1;
    
    const points = sparklineData.map((value, index) => {
      const x = (index / (sparklineData.length - 1)) * 60;
      const y = 20 - ((value - min) / range) * 15;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg className="w-16 h-6" viewBox="0 0 60 20">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          points={points}
          className="text-walmart-blue-600"
        />
      </svg>
    );
  };

  return (
    <div className={`walmart-card p-6 cursor-pointer transition-all duration-300 hover:shadow-walmart-lg border bg-gradient-to-br ${getColorClasses()}`}>
      <div onClick={handleClick}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${color === 'blue' ? 'walmart-blue' : color}-600 text-white`}>
              {icon}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">{title}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  {value}{unit}
                </span>
                {getTrendIcon()}
              </div>
            </div>
          </div>
          <div className="text-right">
            {renderSparkline()}
            <div className="flex items-center space-x-1 mt-1">
              <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                {change}
              </span>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && expandedContent && (
        <div className="mt-4 pt-4 border-t border-gray-200 animate-fade-in">
          {expandedContent}
        </div>
      )}
    </div>
  );
}