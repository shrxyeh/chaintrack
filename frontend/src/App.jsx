import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserProvider } from "ethers";
import { getMetaMaskProvider } from "./utils/ethProvider";
import WalmartHeader from "./components/WalmartHeader";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import FeaturesPage from "./pages/FeaturesPage";
import HowItWorksPage from "./pages/HowItWorksPage";

export default function App() {
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

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <WalmartHeader 
          walletAddress={walletAddress}
          onConnectWallet={connectWallet}
          onDisconnectWallet={disconnectWallet}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard signer={signer} />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
        </Routes>
      </div>
    </Router>
  );
}