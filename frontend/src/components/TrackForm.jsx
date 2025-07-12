import { useState } from "react";
import { Contract } from "ethers";
import SupplyChainABI from "../SupplyChain.json";

export default function TrackForm({ contractAddress, signer, onCreate }) {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  async function handleCreate() {
    if (!signer) {
      setStatusMessage({ type: "error", message: "Wallet not connected" });
      return;
    }
    if (!name.trim() || !origin.trim()) {
      setStatusMessage({ type: "error", message: "Please fill in all fields" });
      return;
    }

    setIsLoading(true);
    setStatusMessage({ type: "info", message: "Processing transaction on blockchain..." });

    try {
      const contract = new Contract(contractAddress, SupplyChainABI.abi, signer);
      const tx = await contract.createProduct(name, origin);
      setStatusMessage({ type: "info", message: "Waiting for transaction confirmation..." });
      await tx.wait();
      setStatusMessage({ type: "success", message: "✅ Product created successfully!" });
      setName("");
      setOrigin("");
      onCreate?.();
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (e) {
      console.error("Transaction failed:", e);
      setStatusMessage({
        type: "error",
        message: "Transaction failed. See console for details."
      });
    } finally {
      setIsLoading(false);
    }
  }

  const statusColors = {
    error: "bg-red-900/30 border-red-700 text-red-400",
    info: "bg-blue-900/30 border-blue-700 text-blue-400",
    success: "bg-green-900/30 border-green-700 text-green-400"
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center mb-6">
        <div className="mr-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold">Add New Product</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Product Name</label>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            placeholder="Enter product name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Origin</label>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            placeholder="Enter origin location"
            value={origin}
            onChange={e => setOrigin(e.target.value)}
          />
        </div>

        <button
          onClick={handleCreate}
          disabled={isLoading || !signer}
          className="glow-effect w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-lg flex items-center justify-center transition-all hover:from-violet-700 hover:to-indigo-700 disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </>
          ) : (
            "Create Product"
          )}
        </button>
      </div>

      {statusMessage && (
        <div className={`mt-4 p-3 rounded-lg border ${statusColors[statusMessage.type]} transition-all fade-in`}>
          {statusMessage.message}
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-gray-800">
        <h4 className="text-sm font-semibold text-gray-400 mb-3">How it works</h4>
        <ul className="space-y-2 text-sm text-gray-500">
          <li className="flex items-start">
            <div className="mt-1 mr-2 w-2 h-2 rounded-full bg-violet-600"></div>
            <span>Each product is registered on the blockchain</span>
          </li>
          <li className="flex items-start">
            <div className="mt-1 mr-2 w-2 h-2 rounded-full bg-violet-600"></div>
            <span>Status updates are recorded permanently</span>
          </li>
          <li className="flex items-start">
            <div className="mt-1 mr-2 w-2 h-2 rounded-full bg-violet-600"></div>
            <span>All data is transparent and tamper-proof</span>
          </li>
        </ul>
      </div>
    </div>
  );
}