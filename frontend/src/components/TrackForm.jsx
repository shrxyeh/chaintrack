import { useState, useEffect } from "react";
import { Contract } from "ethers";
import SupplyChainABI from "../SupplyChain.json";
import { animateFormError, animateSuccess } from "../utils/animations";

export default function TrackForm({ contractAddress, signer, onCreate, initialName = "", initialOrigin = "" }) {
  const [name, setName] = useState(initialName);
  const [origin, setOrigin] = useState(initialOrigin);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Update form when initial values change (from QR scan)
  useEffect(() => {
    if (initialName) setName(initialName);
    if (initialOrigin) setOrigin(initialOrigin);
  }, [initialName, initialOrigin]);

  async function handleCreate() {
    if (!signer) {
      const errorMsg = { type: "error", message: "Wallet not connected" };
      setStatusMessage(errorMsg);
      animateFormError(document.querySelector('.track-form'));
      return;
    }
    if (!name.trim() || !origin.trim()) {
      const errorMsg = { type: "error", message: "Please fill in all fields" };
      setStatusMessage(errorMsg);
      animateFormError(document.querySelector('.track-form'));
      return;
    }

    setIsLoading(true);
    setStatusMessage({ type: "info", message: "Processing transaction on blockchain..." });

    try {
      const contract = new Contract(contractAddress, SupplyChainABI.abi, signer);
      const tx = await contract.createProduct(name, origin);
      setStatusMessage({ type: "info", message: "Waiting for transaction confirmation..." });
      await tx.wait();
      const successMsg = { type: "success", message: "✅ Product created successfully!" };
      setStatusMessage(successMsg);
      animateSuccess(document.querySelector('.success-message'));
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
    error: "bg-red-50 border-red-200 text-red-700",
    info: "bg-walmart-blue-50 border-walmart-blue-200 text-walmart-blue-700",
    success: "bg-green-50 border-green-200 text-green-700"
  };

  return (
    <div className="track-form walmart-card p-6">
      <div className="flex items-center mb-6">
        <div className="mr-3">
          <div className="w-10 h-10 rounded-lg walmart-gradient flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-bold text-walmart-gray-900">Add New Product</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-walmart-gray-800 mb-2">Product Name</label>
          <input
            className="walmart-input"
            placeholder="Enter product name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-walmart-gray-800 mb-2">Origin</label>
          <input
            className="walmart-input"
            placeholder="Enter origin location"
            value={origin}
            onChange={e => setOrigin(e.target.value)}
          />
        </div>

        <button
          onClick={handleCreate}
          disabled={isLoading || !signer}
          className="walmart-btn-primary w-full py-3 flex items-center justify-center disabled:opacity-70"
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
        <div className={`mt-4 p-3 rounded-lg border ${statusColors[statusMessage.type]} transition-all ${statusMessage.type === 'success' ? 'success-message' : ''}`}>
          {statusMessage.message}
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-walmart-gray-200">
        <h4 className="text-sm font-semibold text-walmart-gray-800 mb-3">How it works</h4>
        <ul className="space-y-2 text-sm text-walmart-gray-700">
          <li className="flex items-start">
            <div className="mt-1 mr-2 w-2 h-2 rounded-full bg-walmart-blue-600"></div>
            <span>Each product is registered on the blockchain</span>
          </li>
          <li className="flex items-start">
            <div className="mt-1 mr-2 w-2 h-2 rounded-full bg-walmart-blue-600"></div>
            <span>Status updates are recorded permanently</span>
          </li>
          <li className="flex items-start">
            <div className="mt-1 mr-2 w-2 h-2 rounded-full bg-walmart-blue-600"></div>
            <span>All data is transparent and tamper-proof</span>
          </li>
        </ul>
      </div>
    </div>
  );
}