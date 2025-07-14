import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";
import { getMetaMaskProvider } from "../utils/ethProvider";
import TrackForm from "../components/TrackForm";
import ProductList from "../components/ProductList";
import QRScanner from "../components/QRScanner";
import AIAnalytics from "../components/AIAnalytics";
import InteractiveDashboard from "../components/InteractiveDashboard";
import QRHistory from "../components/QRHistory";
import { setupCardHovers } from "../utils/animations";
import AILoader from "../components/AI/AILoader";
import AIAssistant from "../components/AI/AIAssistant";
import { KafkaSimProvider } from "../components/Kafka/KafkaSimContext";
import KafkaConsole from "../components/Kafka/KafkaConsole";
import KafkaFlowVisualizer from "../components/Kafka/KafkaFlowVisualizer";
import KafkaToaster from "../components/Kafka/KafkaToaster";
import KafkaStatusHUD from "../components/Kafka/KafkaStatusHUD";

const CONTRACT_ADDRESS = "0x9d610A4Df5020Ebea026C04FFD73037b20751965";

export default function Dashboard({ signer: propSigner }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState(null);
  const [signer, setSigner] = useState(propSigner);
  const [activeTab, setActiveTab] = useState('overview');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [products, setProducts] = useState([]);
  const [qrFormData, setQrFormData] = useState({ name: "", origin: "" });
  const [showAILoader, setShowAILoader] = useState(false);
  const [kafkaFlowTrigger, setKafkaFlowTrigger] = useState(null);

  const connectWallet = async () => {
    const mmProvider = getMetaMaskProvider();
    if (!mmProvider) {
      console.error("MetaMask not detected");
      return;
    }
    try {
      const provider = new BrowserProvider(mmProvider);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setSigner(signer);
      setWalletAddress(address);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const disconnectWallet = () => {
    setSigner(null);
    setWalletAddress(null);
  };

  useEffect(() => {
    if (propSigner) {
      setSigner(propSigner);
      propSigner.getAddress().then(setWalletAddress);
    } else {
      connectWallet();
    }
    setupCardHovers();
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Show AI loader when switching to certain tabs
  useEffect(() => {
    if (activeTab === 'analytics' || activeTab === 'interactive') {
      setShowAILoader(true);
    }
  }, [activeTab]);

  useEffect(() => {
    if (propSigner) {
      setSigner(propSigner);
      propSigner.getAddress().then(setWalletAddress);
    }
  }, [propSigner]);

  useEffect(() => {
    const mmProvider = getMetaMaskProvider();
    if (mmProvider) {
      const handleAccountsChanged = async (accounts) => {
        if (accounts.length > 0) {
          const provider = new BrowserProvider(mmProvider);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setSigner(signer);
          setWalletAddress(address);
        } else {
          setSigner(null);
          setWalletAddress(null);
        }
      };
      mmProvider.on("accountsChanged", handleAccountsChanged);
      return () => mmProvider.removeListener("accountsChanged", handleAccountsChanged);
    }
  }, []);

  const handleQRScan = (data, result) => {
    console.log('QR Scanned:', data);
    
    // Trigger Kafka flow visualization
    setKafkaFlowTrigger(Date.now());
    
    let productId = null;
    let productName = null;
    let location = null;
    let type = 'unknown';

    // Try to parse as JSON
    try {
      const parsed = JSON.parse(data);
      productId = parsed.productId || null;
      productName = parsed.productName || null;
      location = parsed.location || null;
      type = 'product';
    } catch (e) {
      // If not JSON, try to parse as delimited string: product-123|Widget|Warehouse A
      if (data.startsWith('product-')) {
        const parts = data.split('|');
        productId = parts[0].replace('product-', '');
        productName = parts[1] || null;
        location = parts[2] || null;
        type = 'product';
      }
    }

    // Auto-fill the form with scanned data
    if (productName && location) {
      setQrFormData({ name: productName, origin: location });
      setActiveTab('tracking'); // Switch to tracking tab to show the form
    }

    if (productId) {
      setSearch(productId);
    }

    // Add to scan history
    const scanHistory = JSON.parse(localStorage.getItem('qrScanHistory') || '[]');
    const newScan = {
      id: Date.now(),
      data,
      productId,
      productName,
      location,
      timestamp: new Date().toISOString(),
      type
    };
    localStorage.setItem('qrScanHistory', JSON.stringify([newScan, ...scanHistory].slice(0, 50)));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'tracking', label: 'Product Tracking', icon: '📦' },
    { id: 'analytics', label: 'AI Analytics', icon: '🤖' },
    { id: 'interactive', label: 'Interactive Dashboard', icon: '📈' },
    { id: 'qr-history', label: 'QR History', icon: '📱' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-walmart-blue-50">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full walmart-gradient animate-pulse flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-walmart-blue-800 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-walmart-yellow-400"></div>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-walmart-blue-500/30 animate-ping"></div>
          </div>
          <h1 className="mt-6 text-2xl font-bold text-walmart-blue-600">
            Loading Advanced Dashboard
          </h1>
          <p className="mt-2 text-walmart-gray-600">AI-Powered Blockchain Analytics</p>
        </div>
      </div>
    );
  }

  return (
    <KafkaSimProvider>
      <div className="min-h-screen bg-walmart-blue-50">
        {/* Kafka Components */}
        <KafkaStatusHUD />
        <KafkaToaster />
        <KafkaConsole />
        <KafkaFlowVisualizer trigger={kafkaFlowTrigger} />
        
        <div className="container-walmart px-4 py-8">
        {/* Enhanced Dashboard Header */}
        <div className="mb-8">
          <div className="walmart-card p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <div className="mb-6 lg:mb-0">
                <h1 className="text-3xl font-bold text-walmart-gray-900 mb-2">
                  Advanced Supply Chain Dashboard
                </h1>
                <p className="text-walmart-gray-700">
                  AI-powered analytics with QR scanning and real-time blockchain monitoring
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* QR Scanner Button */}
                <button
                  onClick={() => setShowQRScanner(true)}
                  className="walmart-btn-secondary flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 12h-4.01M12 12v4m6-4h.01M12 8h.01" />
                  </svg>
                  <span>Scan QR Code</span>
                </button>

                {/* Network Status */}
                <div className="flex items-center space-x-2 bg-walmart-blue-50 px-4 py-2 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm font-medium text-walmart-blue-700">Ethereum Network</span>
                </div>
                
                {/* Wallet Status */}
                {walletAddress ? (
                  <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-green-700">
                      {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={connectWallet}
                    className="walmart-btn-primary text-sm"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="walmart-card p-2">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-walmart-blue-600 text-white shadow-lg'
                      : 'text-walmart-gray-700 hover:bg-walmart-blue-50'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Form and Quick Stats */}
              <div className="lg:col-span-1 space-y-8">
                <TrackForm
                  contractAddress={CONTRACT_ADDRESS}
                  signer={signer}
                  onCreate={() => setRefreshKey((k) => k + 1)}
                />
                
                {/* Enhanced Quick Stats */}
                <div className="walmart-card p-6">
                  <h3 className="text-lg font-bold text-walmart-gray-900 mb-4">Real-time Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-walmart-gray-700">Products Tracked</span>
                      <span className="font-bold text-walmart-blue-600">1,247</span>
                    </div>
                    <div className="w-full bg-walmart-gray-200 rounded-full h-2">
                      <div className="bg-walmart-blue-600 h-2 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-walmart-gray-700">AI Predictions</span>
                      <span className="font-bold text-green-600">94.5%</span>
                    </div>
                    <div className="w-full bg-walmart-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-walmart-gray-700">QR Scans Today</span>
                      <span className="font-bold text-walmart-yellow-600">156</span>
                    </div>
                    <div className="w-full bg-walmart-gray-200 rounded-full h-2">
                      <div className="bg-walmart-yellow-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Blockchain Status */}
                <div className="walmart-card p-6">
                  <h3 className="text-lg font-bold text-walmart-gray-900 mb-4">Blockchain Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-walmart-gray-700">Contract Address</span>
                      <span className="text-xs font-mono text-walmart-blue-600">
                        {CONTRACT_ADDRESS.slice(0, 8)}...{CONTRACT_ADDRESS.slice(-6)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-walmart-gray-700">Network</span>
                      <span className="text-sm font-medium text-green-600">Ethereum</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-walmart-gray-700">Gas Price</span>
                      <span className="text-sm font-medium text-walmart-gray-900">12 Gwei</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Product List */}
              <div className="lg:col-span-2">
                <div className="walmart-card p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-walmart-gray-900">Product Tracking Overview</h2>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search by name or ID..."
                          className="walmart-input w-full md:w-64 pl-10"
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
                        {["All", "Created", "In Transit", "Delivered"].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <ProductList
                    key={refreshKey}
                    contractAddress={CONTRACT_ADDRESS}
                    signer={signer}
                    search={search}
                    filter={filter}
                    refreshKey={refreshKey}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tracking' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <TrackForm
                  contractAddress={CONTRACT_ADDRESS}
                  signer={signer}
                  onCreate={() => setRefreshKey((k) => k + 1)}
                  initialName={qrFormData.name}
                  initialOrigin={qrFormData.origin}
                />
              </div>
              <div className="lg:col-span-2">
                <div className="walmart-card p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-walmart-gray-900">Advanced Product Tracking</h2>
                    <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search by name or ID..."
                          className="walmart-input w-full md:w-64 pl-10"
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
                        {["All", "Created", "In Transit", "Delivered"].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <ProductList
                    key={refreshKey}
                    contractAddress={CONTRACT_ADDRESS}
                    signer={signer}
                    search={search}
                    filter={filter}
                    refreshKey={refreshKey}
                    onProductsUpdate={setProducts}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && <AIAnalytics />}
          
          {activeTab === 'interactive' && <InteractiveDashboard products={products} />}
          
          {activeTab === 'qr-history' && <QRHistory />}
        </div>

        {/* AI Loader */}
        <AILoader 
          isVisible={showAILoader}
          onComplete={() => setShowAILoader(false)}
          messages={[
            "Analyzing supply chain patterns...",
            "Processing blockchain data...",
            "Generating AI insights...",
            "Optimizing predictions..."
          ]}
        />

        {/* AI Assistant */}
        <AIAssistant />

        {/* QR Scanner Modal */}
        <QRScanner
          isActive={showQRScanner}
          onScan={handleQRScan}
          onClose={() => setShowQRScanner(false)}
        />
      </div>
      </div>
    </KafkaSimProvider>
  );
}