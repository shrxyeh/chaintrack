import { useState, useEffect } from 'react';

export default function HeatMap({ title = "Scanning Activity Heatmap" }) {
  const [heatmapData, setHeatmapData] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  useEffect(() => {
    // Generate fake heatmap data
    const data = days.map((day, dayIndex) => 
      hours.map((hour) => ({
        day: dayIndex,
        hour,
        value: Math.floor(Math.random() * 100),
        scans: Math.floor(Math.random() * 50) + 1
      }))
    ).flat();
    setHeatmapData(data);
  }, []);

  const getIntensityColor = (value) => {
    if (value < 20) return 'bg-gray-100';
    if (value < 40) return 'bg-walmart-blue-200';
    if (value < 60) return 'bg-walmart-blue-400';
    if (value < 80) return 'bg-walmart-blue-600';
    return 'bg-walmart-blue-800';
  };

  const getTextColor = (value) => {
    return value > 60 ? 'text-white' : 'text-gray-700';
  };

  return (
    <div className="walmart-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Low</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-gray-100 rounded"></div>
            <div className="w-3 h-3 bg-walmart-blue-200 rounded"></div>
            <div className="w-3 h-3 bg-walmart-blue-400 rounded"></div>
            <div className="w-3 h-3 bg-walmart-blue-600 rounded"></div>
            <div className="w-3 h-3 bg-walmart-blue-800 rounded"></div>
          </div>
          <span>High</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-25 gap-1 min-w-max">
          {/* Hour headers */}
          <div></div>
          {hours.map(hour => (
            <div key={hour} className="text-xs text-gray-500 text-center p-1">
              {hour}
            </div>
          ))}

          {/* Data cells */}
          {days.map((day, dayIndex) => (
            <div key={day} className="contents">
              <div className="text-xs text-gray-500 p-1 flex items-center">
                {day}
              </div>
              {hours.map(hour => {
                const cellData = heatmapData.find(d => d.day === dayIndex && d.hour === hour);
                const value = cellData?.value || 0;
                
                return (
                  <div
                    key={`${dayIndex}-${hour}`}
                    className={`w-8 h-8 rounded cursor-pointer transition-all duration-200 hover:scale-110 flex items-center justify-center text-xs font-medium ${getIntensityColor(value)} ${getTextColor(value)}`}
                    onMouseEnter={() => setSelectedCell({ day, hour, value, scans: cellData?.scans || 0 })}
                    onMouseLeave={() => setSelectedCell(null)}
                    title={`${day} ${hour}:00 - ${cellData?.scans || 0} scans`}
                  >
                    {value > 50 ? cellData?.scans || 0 : ''}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {selectedCell && (
        <div className="mt-4 p-3 bg-walmart-blue-50 rounded-lg">
          <div className="text-sm">
            <span className="font-medium">{selectedCell.day} {selectedCell.hour}:00</span>
            <span className="mx-2">•</span>
            <span>{selectedCell.scans} scans</span>
            <span className="mx-2">•</span>
            <span>Activity: {selectedCell.value}%</span>
          </div>
        </div>
      )}
    </div>
  );
}