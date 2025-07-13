import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AIAnalytics() {
  const [activeTab, setActiveTab] = useState('disruption');
  const [timeRange, setTimeRange] = useState('30');

  // Mock AI analytics data - in production, this would come from your AI service
  const disruptionData = {
    riskLevel: 'Medium',
    riskScore: 65,
    alerts: [
      {
        type: 'warning',
        message: 'Potential delay in Southeast Asia shipping routes',
        impact: 'Medium',
        eta: '2-3 days',
        mitigation: 'Consider alternative shipping routes via Pacific corridor'
      },
      {
        type: 'info',
        message: 'Weather conditions may affect European deliveries',
        impact: 'Low',
        eta: '1-2 days',
        mitigation: 'Monitor weather patterns and adjust schedules accordingly'
      }
    ]
  };

  const demandForecastData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Predicted Demand',
        data: [120, 135, 148, 162, 155, 170],
        borderColor: '#0071CE',
        backgroundColor: 'rgba(0, 113, 206, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Historical Average',
        data: [115, 125, 140, 150, 145, 160],
        borderColor: '#FFDE00',
        backgroundColor: 'rgba(255, 222, 0, 0.1)',
        tension: 0.4,
      }
    ]
  };

  const supplyChainMetrics = {
    labels: ['Production', 'Warehousing', 'Transportation', 'Distribution', 'Retail'],
    datasets: [
      {
        label: 'Efficiency Score',
        data: [92, 88, 75, 85, 90],
        backgroundColor: [
          '#0071CE',
          '#004C91',
          '#FFDE00',
          '#FFC220',
          '#FF6B35'
        ],
      }
    ]
  };

  const riskIndicators = {
    labels: ['Supply Risk', 'Demand Risk', 'Operational Risk', 'Financial Risk'],
    datasets: [
      {
        data: [25, 35, 20, 20],
        backgroundColor: [
          '#FF6B35',
          '#FFDE00',
          '#0071CE',
          '#004C91'
        ],
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const tabs = [
    { id: 'disruption', label: 'Disruption Analysis', icon: '⚠️' },
    { id: 'demand', label: 'Demand Forecasting', icon: '📈' },
    { id: 'efficiency', label: 'Efficiency Metrics', icon: '⚡' },
    { id: 'risks', label: 'Risk Assessment', icon: '🛡️' }
  ];

  return (
    <div className="walmart-card p-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-walmart-gray-900 mb-2">
            AI Analytics Dashboard
          </h2>
          <p className="text-walmart-gray-700">
            Real-time insights powered by machine learning
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="walmart-input w-auto"
          >
            <option value="30">30 Days</option>
            <option value="60">60 Days</option>
            <option value="90">90 Days</option>
          </select>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">Live Data</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-walmart-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-t-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-walmart-blue-600 text-white border-b-2 border-walmart-blue-600'
                : 'text-walmart-gray-700 hover:bg-walmart-blue-50'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'disruption' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="walmart-card p-4 bg-walmart-blue-50">
                <h3 className="font-semibold text-walmart-gray-900 mb-2">Risk Level</h3>
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full ${
                    disruptionData.riskLevel === 'High' ? 'bg-red-500' :
                    disruptionData.riskLevel === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <span className="font-bold">{disruptionData.riskLevel}</span>
                  <span className="text-sm text-walmart-gray-600">({disruptionData.riskScore}/100)</span>
                </div>
              </div>
              
              <div className="walmart-card p-4 bg-walmart-yellow-50">
                <h3 className="font-semibold text-walmart-gray-900 mb-2">Active Alerts</h3>
                <div className="text-2xl font-bold text-walmart-yellow-600">
                  {disruptionData.alerts.length}
                </div>
              </div>
              
              <div className="walmart-card p-4 bg-green-50">
                <h3 className="font-semibold text-walmart-gray-900 mb-2">Mitigation Actions</h3>
                <div className="text-2xl font-bold text-green-600">
                  {disruptionData.alerts.length}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-walmart-gray-900">Current Alerts & Recommendations</h3>
              {disruptionData.alerts.map((alert, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' : 'bg-blue-50 border-blue-400'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-walmart-gray-900">{alert.message}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      alert.impact === 'High' ? 'bg-red-100 text-red-800' :
                      alert.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {alert.impact} Impact
                    </span>
                  </div>
                  <p className="text-sm text-walmart-gray-700 mb-2">
                    <strong>ETA:</strong> {alert.eta}
                  </p>
                  <p className="text-sm text-walmart-gray-700">
                    <strong>Recommended Action:</strong> {alert.mitigation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'demand' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-walmart-gray-900 mb-4">
                  Demand Forecast - Next 6 Weeks
                </h3>
                <Line data={demandForecastData} options={chartOptions} />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-walmart-gray-900">Key Insights</h3>
                <div className="space-y-3">
                  <div className="walmart-card p-4 bg-walmart-blue-50">
                    <h4 className="font-medium text-walmart-gray-900">Seasonal Trend</h4>
                    <p className="text-sm text-walmart-gray-700 mt-1">
                      15% increase expected due to holiday season approaching
                    </p>
                  </div>
                  <div className="walmart-card p-4 bg-walmart-yellow-50">
                    <h4 className="font-medium text-walmart-gray-900">Peak Demand</h4>
                    <p className="text-sm text-walmart-gray-700 mt-1">
                      Week 6 shows highest projected demand at 170 units
                    </p>
                  </div>
                  <div className="walmart-card p-4 bg-green-50">
                    <h4 className="font-medium text-walmart-gray-900">Confidence Level</h4>
                    <p className="text-sm text-walmart-gray-700 mt-1">
                      92% accuracy based on historical data patterns
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'efficiency' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-walmart-gray-900 mb-4">
                  Supply Chain Efficiency by Stage
                </h3>
                <Bar data={supplyChainMetrics} options={chartOptions} />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-walmart-gray-900">Performance Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="walmart-card p-4 text-center">
                    <div className="text-2xl font-bold text-walmart-blue-600">87%</div>
                    <div className="text-sm text-walmart-gray-600">Overall Efficiency</div>
                  </div>
                  <div className="walmart-card p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">95%</div>
                    <div className="text-sm text-walmart-gray-600">On-Time Delivery</div>
                  </div>
                  <div className="walmart-card p-4 text-center">
                    <div className="text-2xl font-bold text-walmart-yellow-600">2.3</div>
                    <div className="text-sm text-walmart-gray-600">Avg Transit Days</div>
                  </div>
                  <div className="walmart-card p-4 text-center">
                    <div className="text-2xl font-bold text-walmart-orange-600">98.5%</div>
                    <div className="text-sm text-walmart-gray-600">Quality Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-walmart-gray-900 mb-4">
                  Risk Distribution
                </h3>
                <Doughnut data={riskIndicators} options={{ responsive: true }} />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-walmart-gray-900">Risk Assessment</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium">Supply Risk</span>
                    <span className="text-red-600 font-bold">25%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium">Demand Risk</span>
                    <span className="text-yellow-600 font-bold">35%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Operational Risk</span>
                    <span className="text-blue-600 font-bold">20%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">Financial Risk</span>
                    <span className="text-purple-600 font-bold">20%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}