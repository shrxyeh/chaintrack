import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";
import { getMetaMaskProvider } from "../utils/ethProvider";
import TrackForm from "../components/TrackForm";
import ProductList from "../components/ProductList";
import { setupCardHovers } from "../utils/animations";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState(null);
  const [signer, setSigner] = useState(null);

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
    connectWallet();
    setupCardHovers();
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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
            Loading Dashboard
          </h1>
          <p className="mt-2 text-walmart-gray-600">Powered by Blockchain Technology</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-walmart-blue-50">
      <div className="container-walmart px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="walmart-card p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <div className="mb-6 lg:mb-0">
                <h1 className="text-3xl font-bold text-walmart-gray-900 mb-2">
                  Supply Chain Dashboard
                </h1>
                <p className="text-walmart-gray-700">
                  Monitor and manage your blockchain-powered supply chain operations
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
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

        {/* Blockchain Info Section */}
        <div className="mb-8">
          <div className="walmart-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-walmart-gray-900">
                  Blockchain Integration
                </h2>
                <p className="text-walmart-gray-700 mt-1">Live smart contract information</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">Connected</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-walmart-blue-50 rounded-lg">
                <div className="text-lg font-bold text-walmart-blue-600 mb-2">
                  {CONTRACT_ADDRESS.slice(0, 8)}...{CONTRACT_ADDRESS.slice(-6)}
                </div>
                <p className="text-sm text-walmart-gray-600">Smart Contract</p>
              </div>
              
              <div className="text-center p-4 bg-walmart-blue-50 rounded-lg">
                <div className="text-lg font-bold text-walmart-blue-600 mb-2">
                  Ethereum
                </div>
                <p className="text-sm text-walmart-gray-600">Network</p>
              </div>
              
              <div className="text-center p-4 bg-walmart-blue-50 rounded-lg">
                <div className="text-lg font-bold text-walmart-blue-600 mb-2">
                  Active
                </div>
                <p className="text-sm text-walmart-gray-600">Status</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form and Stats */}
          <div className="lg:col-span-1 space-y-8">
            <TrackForm
              contractAddress={CONTRACT_ADDRESS}
              signer={signer}
              onCreate={() => setRefreshKey((k) => k + 1)}
            />
            
            {/* Quick Stats */}
            <div className="walmart-card p-6">
              <h3 className="text-lg font-bold text-walmart-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-walmart-gray-700">Products Tracked</span>
                  <span className="font-bold text-walmart-blue-600">24</span>
                </div>
                <div className="w-full bg-walmart-gray-200 rounded-full h-2">
                  <div className="bg-walmart-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-walmart-gray-700">Active Shipments</span>
                  <span className="font-bold text-walmart-yellow-600">8</span>
                </div>
                <div className="w-full bg-walmart-gray-200 rounded-full h-2">
                  <div className="bg-walmart-yellow-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-walmart-gray-700">Completed</span>
                  <span className="font-bold text-green-600">16</span>
                </div>
                <div className="w-full bg-walmart-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product List */}
          <div className="lg:col-span-2">
            <div className="walmart-card p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-walmart-gray-900">Product Tracking</h2>
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
      </div>
    </div>
  );
}