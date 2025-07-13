import { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

export default function InteractiveDashboard({ products = [] }) {
  const [filters, setFilters] = useState({
    category: 'all',
    timeRange: '30',
    location: 'all',
    stage: 'all'
  });
  
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('inventory');

  // Mock data for demonstration
  const mockAnalytics = {
    inventory: {
      current: 1247,
      trend: '+12%',
      data: [1100, 1150, 1200, 1180, 1220, 1247],
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6']
    },
    fulfillment: {
      current: 94.5,
      trend: '+2.1%',
      data: [92, 93, 94, 93.5, 94.2, 94.5],
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6']
    },
    efficiency: {
      current: 87.3,
      trend: '+5.2%',
      data: [82, 84, 85, 86, 87, 87.3],
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6']
    },
    quality: {
      current: 98.7,
      trend: '+0.3%',
      data: [98.2, 98.4, 98.5, 98.6, 98.6, 98.7],
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6']
    }
  };

  const categories = ['all', 'electronics', 'food', 'textiles', 'pharmaceuticals'];
  const locations = ['all', 'north-america', 'europe', 'asia', 'south-america'];
  const stages = ['all', 'production', 'warehousing', 'transportation', 'distribution'];

  useEffect(() => {
    // Filter products based on current filters
    let filtered = products;
    
    if (filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    
    // Add more filtering logic based on your data structure
    setFilteredData(filtered);
  }, [filters, products]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getChartData = (metric) => {
    const data = mockAnalytics[metric];
    return {
      labels: data.labels,
      datasets: [
        {
          label: metric.charAt(0).toUpperCase() + metric.slice(1),
          data: data.data,
          borderColor: '#0071CE',
          backgroundColor: 'rgba(0, 113, 206, 0.1)',
          tension: 0.4,
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const metrics = [
    { id: 'inventory', label: 'Inventory Levels', icon: '📦', color: 'blue' },
    { id: 'fulfillment', label: 'Fulfillment Rate', icon: '✅', color: 'green' },
    { id: 'efficiency', label: 'Production Efficiency', icon: '⚡', color: 'yellow' },
    { id: 'quality', label: 'Quality Control', icon: '🎯', color: 'purple' }
  ];

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="walmart-card p-6">
        <h3 className="text-lg font-bold text-walmart-gray-900 mb-4">Dashboard Filters</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-walmart-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="walmart-input"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-walmart-gray-700 mb-2">
              Time Range
            </label>
            <select
              value={filters.timeRange}
              onChange={(e) => handleFilterChange('timeRange', e.target.value)}
              className="walmart-input"
            >
              <option value="7">7 Days</option>
              <option value="30">30 Days</option>
              <option value="60">60 Days</option>
              <option value="90">90 Days</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-walmart-gray-700 mb-2">
              Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="walmart-input"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>
                  {loc.charAt(0).toUpperCase() + loc.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-walmart-gray-700 mb-2">
              Supply Chain Stage
            </label>
            <select
              value={filters.stage}
              onChange={(e) => handleFilterChange('stage', e.target.value)}
              className="walmart-input"
            >
              {stages.map(stage => (
                <option key={stage} value={stage}>
                  {stage.charAt(0).toUpperCase() + stage.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const data = mockAnalytics[metric.id];
          const isSelected = selectedMetric === metric.id;
          
          return (
            <div
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`walmart-card p-6 cursor-pointer transition-all duration-300 ${
                isSelected ? 'ring-2 ring-walmart-blue-500 bg-walmart-blue-50' : 'hover:shadow-walmart-lg'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">{metric.icon}</div>
                <div className={`text-sm font-medium px-2 py-1 rounded ${
                  data.trend.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {data.trend}
                </div>
              </div>
              
              <div className="text-2xl font-bold text-walmart-gray-900 mb-1">
                {typeof data.current === 'number' && data.current < 100 
                  ? `${data.current}%` 
                  : data.current.toLocaleString()
                }
              </div>
              
              <div className="text-sm text-walmart-gray-600">
                {metric.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Chart */}
      <div className="walmart-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-walmart-gray-900">
            {metrics.find(m => m.id === selectedMetric)?.label} Trend
          </h3>
          <div className="flex space-x-2">
            <button className="walmart-btn-primary text-sm">
              Export Data
            </button>
            <button className="walmart-btn-secondary text-sm">
              Generate Report
            </button>
          </div>
        </div>
        
        <div className="h-80">
          <Line data={getChartData(selectedMetric)} options={chartOptions} />
        </div>
      </div>

      {/* Detailed Analytics Table */}
      <div className="walmart-card p-6">
        <h3 className="text-xl font-bold text-walmart-gray-900 mb-4">
          Detailed Product Analytics
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-walmart-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-walmart-gray-900">Product</th>
                <th className="text-left py-3 px-4 font-semibold text-walmart-gray-900">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-walmart-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-walmart-gray-900">Inventory</th>
                <th className="text-left py-3 px-4 font-semibold text-walmart-gray-900">Quality Score</th>
                <th className="text-left py-3 px-4 font-semibold text-walmart-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? filteredData.map((product, index) => (
                <tr key={index} className="border-b border-walmart-gray-100 hover:bg-walmart-blue-50">
                  <td className="py-3 px-4 font-medium">{product.name}</td>
                  <td className="py-3 px-4">{product.category || 'Electronics'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 0 ? 'bg-walmart-blue-100 text-walmart-blue-800' :
                      product.status === 1 ? 'bg-walmart-yellow-100 text-walmart-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {product.status === 0 ? 'Created' : product.status === 1 ? 'In Transit' : 'Delivered'}
                    </span>
                  </td>
                  <td className="py-3 px-4">{Math.floor(Math.random() * 1000) + 100}</td>
                  <td className="py-3 px-4">{(Math.random() * 10 + 90).toFixed(1)}%</td>
                  <td className="py-3 px-4">
                    <button className="text-walmart-blue-600 hover:text-walmart-blue-800 text-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-walmart-gray-500">
                    No products match the current filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}