import { useState, useEffect } from 'react';

export default function QRHistory() {
  const [scanHistory, setScanHistory] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load scan history from localStorage
    const history = JSON.parse(localStorage.getItem('qrScanHistory') || '[]');
    setScanHistory(history);
  }, []);

  const addScanToHistory = (scanData) => {
    const newScan = {
      id: Date.now(),
      data: scanData,
      timestamp: new Date().toISOString(),
      type: detectScanType(scanData),
      status: 'processed'
    };
    
    const updatedHistory = [newScan, ...scanHistory].slice(0, 50); // Keep last 50 scans
    setScanHistory(updatedHistory);
    localStorage.setItem('qrScanHistory', JSON.stringify(updatedHistory));
  };

  const detectScanType = (data) => {
    if (data.includes('product-')) return 'product';
    if (data.includes('shipment-')) return 'shipment';
    if (data.includes('batch-')) return 'batch';
    return 'unknown';
  };

  const filteredHistory = scanHistory.filter(scan => 
    filter === 'all' || scan.type === filter
  );

  const getTypeIcon = (type) => {
    switch (type) {
      case 'product': return '📦';
      case 'shipment': return '🚚';
      case 'batch': return '📋';
      default: return '❓';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'product': return 'bg-walmart-blue-100 text-walmart-blue-800';
      case 'shipment': return 'bg-walmart-yellow-100 text-walmart-yellow-800';
      case 'batch': return 'bg-green-100 text-green-800';
      default: return 'bg-walmart-gray-100 text-walmart-gray-800';
    }
  };

  return (
    <div className="walmart-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-walmart-gray-900">QR Scan History</h3>
        <div className="flex items-center space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="walmart-input w-auto"
          >
            <option value="all">All Scans</option>
            <option value="product">Products</option>
            <option value="shipment">Shipments</option>
            <option value="batch">Batches</option>
          </select>
          <button
            onClick={() => {
              setScanHistory([]);
              localStorage.removeItem('qrScanHistory');
            }}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Clear History
          </button>
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📱</div>
          <h4 className="text-lg font-medium text-walmart-gray-900 mb-2">No Scan History</h4>
          <p className="text-walmart-gray-600">Start scanning QR codes to see your history here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((scan) => (
            <div key={scan.id} className="border border-walmart-gray-200 rounded-lg p-4 hover:bg-walmart-blue-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{getTypeIcon(scan.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(scan.type)}`}>
                        {scan.type.charAt(0).toUpperCase() + scan.type.slice(1)}
                      </span>
                      <span className="text-sm text-walmart-gray-500">
                        {new Date(scan.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="font-mono text-sm text-walmart-gray-800 bg-walmart-gray-50 p-2 rounded">
                      {scan.data}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm text-green-600 font-medium">Processed</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Export functionality */}
      {scanHistory.length > 0 && (
        <div className="mt-6 pt-6 border-t border-walmart-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-walmart-gray-600">
              {filteredHistory.length} of {scanHistory.length} scans shown
            </span>
            <button className="walmart-btn-secondary text-sm">
              Export History
            </button>
          </div>
        </div>
      )}
    </div>
  );
}