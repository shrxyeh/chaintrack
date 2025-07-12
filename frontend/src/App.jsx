import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";
import { getMetaMaskProvider } from "./utils/ethProvider";
import TrackForm from "./components/TrackForm";
import ProductList from "./components/ProductList";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
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
      const signer = await provider.getSigner(); // Await the signer
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

    const timer = setTimeout(() => setIsLoading(false), 2000);
    const welcomeTimer = setTimeout(() => setShowWelcome(false), 3500);
    return () => {
      clearTimeout(timer);
      clearTimeout(welcomeTimer);
    };
  }, []);

  useEffect(() => {
    const mmProvider = getMetaMaskProvider();
    if (mmProvider) {
      const handleAccountsChanged = async (accounts) => {
        if (accounts.length > 0) {
          const provider = new BrowserProvider(mmProvider);
          const signer = await provider.getSigner(); // Await the signer
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950/70 to-violet-900/30">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 animate-pulse-slow flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-indigo-800 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"></div>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-violet-500/30 animate-ping"></div>
          </div>
          <h1 className="mt-6 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-indigo-300">
            Loading Supply Chain Tracker
          </h1>
          <p className="mt-2 text-gray-400">Powered by Blockchain Technology</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-violet-900/20 blur-3xl"></div>
        <div className="absolute top-2/3 right-1/3 w-48 h-48 rounded-full bg-indigo-900/20 blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-32 h-32 rounded-full bg-purple-900/20 blur-3xl"></div>
      </div>

      <div className="fixed inset-0 -z-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-violet-700/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-indigo-300">
              Supply Chain Tracker
            </h1>
            <p className="text-gray-400 mt-1">
              Transparent, immutable product tracking on the blockchain
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="glass-card p-2 px-4 rounded-lg flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse" />
              <span className="text-sm">Ethereum Devnet</span>
            </div>

            <button
              className="glass-card p-2 px-4 rounded-lg flex items-center hover:bg-violet-900/30 transition-colors"
              onClick={() => window.location.reload()}
              title="Refresh"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Refresh
            </button>

            {walletAddress ? (
              <div className="glass-card p-2 px-4 rounded-lg flex items-center">
                <span className="text-sm">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
                <button
                  onClick={disconnectWallet}
                  className="ml-2 text-red-500 hover:text-red-400"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="glass-card p-2 px-4 rounded-lg flex items-center hover:bg-violet-900/30 transition-colors"
              >
                Connect Wallet
              </button>
            )}

            <a
              href="https://github.com/iAmReal-dev/Brainwave_Matrix__Intern"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-2 px-4 rounded-lg flex items-center hover:bg-gray-900/30 transition-colors"
              title="View on GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.612-4.042-1.612-.546-1.385-1.333-1.754-1.333-1.754-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.335-5.466-5.93 0-1.31.467-2.382 1.235-3.222-.124-.303-.535-1.525.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.042.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.651.242 2.873.118 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.218.694.825.576C20.565 21.795 24 17.297 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </header>

        {showWelcome && (
          <div className="glass-card p-6 mb-8 rounded-xl animate-fade">
            <div className="flex items-center">
              <div className="mr-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Welcome to Supply Chain Tracker</h2>
                <p className="text-gray-400 mt-1">Track your products transparently on the blockchain</p>
              </div>
            </div>
          </div>
        )}

        {/* Blockchain Showcase Section */}
        <div className="glass-card p-6 mb-8 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-indigo-300">
                Blockchain Integration
              </h2>
              <p className="text-gray-400 mt-1">Live blockchain data and smart contract information</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-green-400">Connected</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-violet-400 mb-2">
                {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}
              </div>
              <p className="text-sm text-gray-400">Contract Address</p>
            </div>
            
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-indigo-400 mb-2">
                Ethereum
              </div>
              <p className="text-sm text-gray-400">Network</p>
            </div>
            
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-400 mb-2">
                Live
              </div>
              <p className="text-sm text-gray-400">Status</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-violet-900/30 to-indigo-900/30 rounded-lg border border-violet-500/20">
            <h3 className="text-lg font-semibold text-violet-300 mb-3">Smart Contract Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-300">Product Creation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-300">Status Updates</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-300">History Tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-300">Immutable Records</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TrackForm
              contractAddress={CONTRACT_ADDRESS}
              signer={signer}
              onCreate={() => setRefreshKey((k) => k + 1)}
            />
            <div className="glass-card mt-8 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Network Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Products Tracked</span>
                    <span>24</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-violet-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Active Users</span>
                    <span>18</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Transactions</span>
                    <span>142</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="glass-card p-6 rounded-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Product Tracking</h2>
                <div className="flex space-x-4 mt-4 md:mt-0">
                  <div className="relative w-full md:w-64">
                    <input
                      type="text"
                      placeholder="Search by name or ID..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <select
                    className="bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
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

        <footer className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Supply Chain Tracker. All rights reserved.</p>
          <p className="mt-1">Transparent tracking powered by blockchain technology</p>
        </footer>
      </div>
    </div>
  );
}