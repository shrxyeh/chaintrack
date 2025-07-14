import { useState, useEffect } from "react";

export default function QRHistory() {
  const [scanHistory, setScanHistory] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('qrScanHistory') || '[]');
    setScanHistory(history);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('qrScanHistory');
    setScanHistory([]);
  };

  const filteredHistory = scanHistory.filter(scan => {
    const matchesSearch = scan.data.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || scan.type === filter;
    return matchesSearch && matchesFilter;
  });

  const getScanTypeIcon = (type) => {
    switch (type) {
      case 'product':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="7" width="18" height="13" rx="2" strokeWidth="2" stroke="currentColor" fill="none" />
            <path d="M16 3v4M8 3v4" strokeWidth="2" stroke="currentColor" fill="none" />
          </svg>
        );
      case 'batch':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" stroke="currentColor" fill="none" />
            <path d="M8 8h8v8H8z" strokeWidth="2" stroke="currentColor" fill="none" />
          </svg>
        );
      case 'location':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21c-4.418 0-8-4.03-8-9a8 8 0 1116 0c0 4.97-3.582 9-8 9z" />
            <circle cx="12" cy="12" r="3" strokeWidth="2" stroke="currentColor" fill="none" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" stroke="currentColor" fill="none" />
            <path d="M9 9h6v6H9z" strokeWidth="2" stroke="currentColor" fill="none" />
          </svg>
        );
    }
  };

  const getScanTypeColor = (type) => {
    switch (type) {
      case 'product':
        return 'bg-walmart-blue-100 text-walmart-blue-800';
      case 'batch':
        return 'bg-walmart-yellow-100 text-walmart-yellow-800';
      case 'location':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="walmart-card p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-walmart-gray-900">QR Scan History</h2>
          <p className="text-walmart-gray-600 mt-1">Track all your QR code scans</p>
        </div>
        <button
          onClick={clearHistory}
          className="mt-4 md:mt-0 walmart-btn-secondary text-sm"
        >
          Clear History
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search scans..."
            className="walmart-input w-full pl-10"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-walmart-gray-500 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          className="walmart-input"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="product">Products</option>
          <option value="batch">Batches</option>
          <option value="location">Locations</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-block p-4 rounded-full bg-walmart-gray-100 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-walmart-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-walmart-gray-700">No scans found</h3>
          <p className="text-walmart-gray-500 mt-2">
            {scanHistory.length === 0 
              ? "Start scanning QR codes to see them here" 
              : "Try adjusting your search or filter criteria"
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((scan) => (
            <div
              key={scan.id}
              className="border border-walmart-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{getScanTypeIcon(scan.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-walmart-gray-900">
                        {scan.productName ? scan.productName : (scan.data.length > 50 ? scan.data.substring(0, 50) + '...' : scan.data)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScanTypeColor(scan.type)}`}>
                        {scan.type}
                      </span>
                    </div>
                    {scan.location && (
                      <p className="text-xs text-walmart-blue-600 mb-1">Location: {scan.location}</p>
                    )}
                    {scan.productId && (
                      <p className="text-xs text-walmart-gray-600 mb-1">Product ID: {scan.productId}</p>
                    )}
                    <p className="text-sm text-walmart-gray-500">
                      Scanned on {new Date(scan.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(scan.data);
                    // You could add a toast notification here
                  }}
                  className="text-walmart-gray-400 hover:text-walmart-gray-600"
                  title="Copy to clipboard"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {scanHistory.length > 0 && (
        <div className="mt-6 pt-4 border-t border-walmart-gray-200">
          <p className="text-sm text-walmart-gray-500 text-center">
            Showing {filteredHistory.length} of {scanHistory.length} scans
          </p>
        </div>
      )}
    </div>
  );
}