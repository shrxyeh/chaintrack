import { useState, useEffect } from 'react';

export default function ProductOverview() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Generate fake product data
    const mockProducts = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: [
        'Organic Apples', 'Coffee Beans', 'Fresh Milk', 'Whole Grain Bread',
        'Free Range Eggs', 'Organic Tomatoes', 'Greek Yogurt', 'Almond Milk',
        'Quinoa', 'Avocados', 'Olive Oil', 'Dark Chocolate'
      ][i],
      status: ['success', 'success', 'warning', 'success', 'error', 'success', 'success', 'warning', 'success', 'success', 'success', 'error'][i],
      lastScan: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
      quality: Math.floor(Math.random() * 30) + 70,
      batchStatus: ['processing', 'completed', 'pending', 'completed', 'failed', 'completed', 'processing', 'pending', 'completed', 'completed', 'processing', 'failed'][i],
      confidence: Math.floor(Math.random() * 20) + 80,
      thumbnail: `https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?w=100&h=100&fit=crop&crop=center`
    }));
    setProducts(mockProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true;
    return product.status === filter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return (
          <div className="w-3 h-3 bg-green-500 rounded-full">
            <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75"></div>
          </div>
        );
      case 'warning':
        return <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>;
      case 'error':
        return <div className="w-3 h-3 bg-red-500 rounded-full"></div>;
      default:
        return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getBatchStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="walmart-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Product Overview</h3>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="walmart-input text-sm py-2"
        >
          <option value="all">All Products</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
                <div className="absolute -top-1 -right-1">
                  {getStatusIcon(product.status)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBatchStatusColor(product.batchStatus)}`}>
                    {product.batchStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Quality Score</span>
                <span className="font-medium">{product.quality}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${product.quality > 85 ? 'bg-green-500' : product.quality > 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${product.quality}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Confidence</span>
                <span className="font-medium">{product.confidence}%</span>
              </div>

              <div className="text-xs text-gray-500">
                Last scan: {new Date(product.lastScan).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
        <span>Showing {filteredProducts.length} of {products.length} products</span>
        <button className="text-walmart-blue-600 hover:text-walmart-blue-800 font-medium">
          View All Products →
        </button>
      </div>
    </div>
  );
}