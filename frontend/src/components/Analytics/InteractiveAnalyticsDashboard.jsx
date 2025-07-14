import { useState, useEffect } from 'react';
import MetricCard from './MetricCard';
import ChartContainer from './ChartContainer';
import HeatMap from './HeatMap';
import ProductOverview from './ProductOverview';
import AIAnalyticsSection from './AIAnalyticsSection';

export default function InteractiveAnalyticsDashboard() {
  const [dateRange, setDateRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [realTimeData, setRealTimeData] = useState({});

  // Generate fake real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData({
        totalScans: Math.floor(Math.random() * 100) + 1200,
        accuracy: Math.floor(Math.random() * 10) + 90,
        speed: (Math.random() * 0.5 + 1.0).toFixed(1),
        confidence: Math.floor(Math.random() * 15) + 85,
        volume: Math.floor(Math.random() * 50) + 150
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Chart data
  const scanVolumeData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Scan Volume',
        data: [120, 190, 300, 500, 200, 300, 450],
        borderColor: '#0071CE',
        backgroundColor: 'rgba(0, 113, 206, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const categoryData = {
    labels: ['Food', 'Electronics', 'Clothing', 'Books', 'Home', 'Other'],
    datasets: [
      {
        label: 'Product Categories',
        data: [35, 25, 15, 10, 10, 5],
        backgroundColor: [
          '#0071CE',
          '#FFDE00',
          '#FF6B35',
          '#4CAF50',
          '#9C27B0',
          '#607D8B',
        ],
      },
    ],
  };

  const statusData = {
    labels: ['Success', 'Warning', 'Error'],
    datasets: [
      {
        label: 'Scan Status',
        data: [85, 12, 3],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
      },
    ],
  };

  const metricCards = [
    {
      title: 'Total Scanned Items',
      value: realTimeData.totalScans || 1247,
      trend: 'up',
      change: '+12.5%',
      color: 'blue',
      sparklineData: [100, 120, 140, 130, 160, 180, 200],
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      ),
      expandedContent: (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Today</span>
            <span className="font-medium">156</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>This Week</span>
            <span className="font-medium">1,247</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>This Month</span>
            <span className="font-medium">5,432</span>
          </div>
        </div>
      )
    },
    {
      title: 'Scan Accuracy Rate',
      value: realTimeData.accuracy || 94,
      unit: '%',
      trend: 'up',
      change: '+2.1%',
      color: 'green',
      sparklineData: [90, 91, 93, 92, 94, 95, 94],
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: 'Processing Speed',
      value: realTimeData.speed || 1.2,
      unit: 's',
      trend: 'down',
      change: '-8.3%',
      color: 'yellow',
      sparklineData: [1.5, 1.4, 1.3, 1.2, 1.1, 1.2, 1.2],
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: 'Detection Confidence',
      value: realTimeData.confidence || 87,
      unit: '%',
      trend: 'up',
      change: '+5.2%',
      color: 'purple',
      sparklineData: [82, 84, 85, 86, 87, 88, 87],
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Daily Scan Volume',
      value: realTimeData.volume || 156,
      trend: 'up',
      change: '+18.7%',
      color: 'blue',
      sparklineData: [120, 130, 140, 145, 150, 155, 156],
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      )
    }
  ];

  const handleExport = () => {
    // Simulate export functionality
    const data = {
      dateRange,
      metrics: realTimeData,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report-${dateRange}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header with Controls */}
      <div className="walmart-card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Interactive Analytics Dashboard</h1>
            <p className="text-gray-600">Real-time insights and AI-powered analytics for your supply chain</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="walmart-input text-sm"
            >
              <option value="1d">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            
            <button
              onClick={handleExport}
              className="walmart-btn-secondary text-sm flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {metricCards.map((metric, index) => (
          <MetricCard
            key={index}
            {...metric}
            onClick={() => setSelectedMetric(metric)}
          />
        ))}
      </div>

      {/* Main Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer
          type="line"
          title="Scan Volume Over Time"
          data={scanVolumeData}
          height={400}
        />
        <ChartContainer
          type="bar"
          title="Product Category Distribution"
          data={categoryData}
          height={400}
        />
      </div>

      {/* Heatmap and Status Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <HeatMap />
        </div>
        <ChartContainer
          type="doughnut"
          title="Scan Status Distribution"
          data={statusData}
          height={300}
        />
      </div>

      {/* AI Analytics Section */}
      <AIAnalyticsSection />

      {/* Product Overview */}
      <ProductOverview />

      {/* Real-time Status Indicators */}
      <div className="walmart-card p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Real-time System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="font-medium text-green-900">Scanner Online</p>
              <p className="text-sm text-green-700">All systems operational</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div>
              <p className="font-medium text-blue-900">AI Processing</p>
              <p className="text-sm text-blue-700">Queue: 3 items</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <div>
              <p className="font-medium text-yellow-900">Database Sync</p>
              <p className="text-sm text-yellow-700">Last sync: 2 min ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}