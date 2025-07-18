import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function WalmartHeader({ walletAddress, onConnectWallet, onDisconnectWallet }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/features', label: 'Features' },
    { path: '/how-it-works', label: 'How It Works' }
  ];
  
  return (
    <header className="bg-white shadow-walmart border-b border-walmart-blue-100 sticky top-0 z-50">
      <div className="container-walmart">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 walmart-gradient rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-walmart-blue-600">ChainTrack.ai</h1>
              <p className="text-xs text-walmart-gray-600 -mt-1">AI Supply Chain Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`font-medium transition-all duration-300 ${
                  isActive(item.path) 
                    ? 'text-walmart-blue-700 border-b-2 border-walmart-blue-700 pb-1' 
                    : 'text-walmart-gray-800 hover:text-walmart-blue-700 hover:border-b-2 hover:border-walmart-blue-300 pb-1'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Wallet Connection & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Network Status */}
            <div className="hidden sm:flex items-center space-x-2 bg-walmart-blue-50 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-walmart-blue-700 font-medium">Ethereum</span>
            </div>

            {/* Wallet Connection */}
            {walletAddress ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:block bg-green-50 px-3 py-1 rounded-full">
                  <span className="text-sm text-green-700 font-medium">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                </div>
                <button
                  onClick={onDisconnectWallet}
                  className="text-walmart-gray-600 hover:text-red-600 transition-colors"
                  title="Disconnect Wallet"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={onConnectWallet}
                className="walmart-btn-primary text-sm"
              >
                Connect Wallet
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-walmart-gray-600 hover:text-walmart-blue-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-walmart-gray-200 bg-white">
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`block font-medium transition-colors ${
                    isActive(item.path) ? 'text-walmart-blue-700' : 'text-walmart-gray-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}