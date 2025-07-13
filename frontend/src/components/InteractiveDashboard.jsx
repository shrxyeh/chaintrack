import { useState, useEffect } from "react";

export default function InteractiveDashboard({ products = [] }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [timeRange, setTimeRange] = useState('7d');

  const mockData = {
    totalProducts: 1247,
    activeShipments: 89,
    completedToday: 23,
    averageTransitTime: 2.3
  };

  return (
    <div className="walmart-card p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-walmart-gray-900 mb-2">Interactive Dashboard</h2>
        <p className="text-walmart-gray-600">Real-time supply chain visualization and analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-walmart-blue-50 to-walmart-blue-100 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-walmart-blue-600 text-sm font-medium">Total Products</p>
              <p className="text-2xl font-bold text-walmart-blue-900">{mockData.totalProducts}</p>
            </div>
            <div className="text-3xl">📦</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-walmart-yellow-50 to-walmart-yellow-100 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-walmart-yellow-600 text-sm font-medium">Active Shipments</p>
              <p className="text-2xl font-bold text-walmart-yellow-900">{mockData.activeShipments}</p>
            </div>
            <div className="text-3xl">🚚</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Completed Today</p>
              <p className="text-2xl font-bold text-green-900">{mockData.completedToday}</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Avg Transit Time</p>
              <p className="text-2xl font-bold text-purple-900">{mockData.averageTransitTime} days</p>
            </div>
            <div className="text-3xl">⏱️</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-walmart-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-walmart-gray-900 mb-4">Supply Chain Map</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-walmart-gray-700">Manufacturing (China) - 45%</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-walmart-blue-500 rounded-full"></div>
              <span className="text-sm text-walmart-gray-700">Warehousing (US) - 30%</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-walmart-yellow-500 rounded-full"></div>
              <span className="text-sm text-walmart-gray-700">Distribution (Regional) - 25%</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-walmart-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-walmart-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-walmart-gray-700">On-time delivery</span>
              <span className="text-sm font-medium text-green-600">95.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-walmart-gray-700">Quality score</span>
              <span className="text-sm font-medium text-green-600">98.7%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-walmart-gray-700">Cost efficiency</span>
              <span className="text-sm font-medium text-green-600">92.1%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-walmart-blue-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">📊</div>
          <div>
            <p className="text-sm font-medium text-walmart-blue-900">Interactive Features</p>
            <p className="text-sm text-walmart-blue-700">
              Click on any metric to drill down into detailed analytics and real-time tracking information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}