import { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import SupplyChainABI from "../SupplyChain.json";
import { getMetaMaskProvider } from "../utils/ethProvider";
import { animateSuccess } from "../utils/animations";
import AIPredictionCard from "./AI/AIPredictionCard";
import DisruptionAlert from "./AI/DisruptionAlert";

const StatusNames = ["Created", "In Transit", "Delivered"];
const StatusColors = ["bg-walmart-blue-600", "bg-walmart-yellow-500", "bg-green-600"];
const StatusIcons = [
  <svg key="created" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>,
  <svg key="transit" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>,
  <svg key="delivered" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
];

export default function ProductList({ contractAddress, signer, search, filter, refreshKey, onProductsUpdate }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [showUpdateToast, setShowUpdateToast] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDisruption, setShowDisruption] = useState(true);
  const [selectedProductForAI, setSelectedProductForAI] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      const mmProvider = getMetaMaskProvider();
      if (!mmProvider) {
        console.error("MetaMask not detected");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const provider = new BrowserProvider(mmProvider);
        const contract = new Contract(contractAddress, SupplyChainABI.abi, provider);
        const total = Number(await contract.nextId());
        const items = [];

        for (let i = 0; i < total; i++) {
          const p = await contract.products(i);
          const [statuses, times] = await contract.getHistory(i);
          items.push({
            id: Number(p.id),
            name: p.name,
            origin: p.origin,
            createdAt: Number(p.createdAt),
            status: Number(p.currentStatus),
            history: statuses.map((s, idx) => ({
              status: Number(s),
              timestamp: Number(times[idx]),
            })),
          });
        }
        setProducts(items);
        onProductsUpdate?.(items);
        if (refreshKey > 0) {
          setShowUpdateToast(true);
          animateSuccess(document.querySelector('.update-toast'));
          setTimeout(() => setShowUpdateToast(false), 2500);
        }
      } catch (e) {
        console.error("Error fetching products:", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [contractAddress, refreshKey]); // Added refreshKey to dependency array

  async function changeStatus(id, newStatus) {
    if (!signer) {
      alert("Wallet not connected");
      return;
    }
    setUpdatingId(id);
    try {
      const contract = new Contract(contractAddress, SupplyChainABI.abi, signer);
      const tx = await contract.updateStatus(id, newStatus);
      await tx.wait();
      
      // Update the product in state and also update history
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === id) {
            const newHistory = [...p.history, {
              status: newStatus,
              timestamp: Math.floor(Date.now() / 1000) // Current timestamp
            }];
            return { ...p, status: newStatus, history: newHistory };
          }
          return p;
        })
      );
    } catch (e) {
      console.error("Status update failed:", e);
      alert("Failed to update status. Check the console for details.");
    } finally {
      setUpdatingId(null);
    }
  }

  const filtered = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toString() === search;
    const matchesFilter =
      filter === "All" || StatusNames[p.status] === filter;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-walmart-blue-500"></div>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block p-4 rounded-full bg-walmart-gray-100 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-walmart-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-walmart-gray-700">No products found</h3>
        <p className="text-walmart-gray-500 mt-2">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  const generateProductQR = (product) => {
    const trackingData = {
      productId: product.id.toString(),
      productName: product.name,
      location: product.origin,
      currentStatus: StatusNames[product.status],
      createdAt: new Date(product.createdAt * 1000).toISOString(),
      contractAddress: contractAddress,
      history: product.history.map(h => ({
        status: StatusNames[h.status],
        timestamp: new Date(h.timestamp * 1000).toISOString()
      }))
    };
    
    return JSON.stringify(trackingData);
  };

  const showQRCode = (product) => {
    setSelectedProduct(product);
    setShowQRModal(true);
  };

  const downloadQRCode = async (product) => {
    const qrData = generateProductQR(product);
    
    // Create QR code using a simple approach (you might want to use a QR library)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`;
    
    // Create a temporary link to download the QR code
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `product_${product.id}_${product.name.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {showUpdateToast && (
        <div className="update-toast fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-walmart-lg">
          Product list updated!
        </div>
      )}
      
      {/* Disruption Alert */}
      {showDisruption && (
        <DisruptionAlert onDismiss={() => setShowDisruption(false)} />
      )}
      
      {/* QR Modal */}
      {showQRModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-walmart-gray-900">Product QR Code</h3>
              <button
                onClick={() => setShowQRModal(false)}
                className="text-walmart-gray-500 hover:text-walmart-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="text-center">
              <div className="mb-4">
                <h4 className="font-semibold text-walmart-gray-900">{selectedProduct.name}</h4>
                <p className="text-sm text-walmart-gray-600">ID: {selectedProduct.id}</p>
                <p className="text-sm text-walmart-gray-600">Status: {StatusNames[selectedProduct.status]}</p>
              </div>
              {/* QR Code Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(generateProductQR(selectedProduct))}`}
                  alt="Product QR Code"
                  className="mx-auto rounded border bg-white"
                  width={180}
                  height={180}
                />
              </div>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-xs text-gray-600 mb-2">QR Code contains:</p>
                {/* Render details as key-value pairs */}
                <div className="text-left text-xs bg-white p-2 rounded border mb-2">
                  <div><b>Product ID:</b> {selectedProduct.id}</div>
                  <div><b>Product Name:</b> {selectedProduct.name}</div>
                  <div><b>Location:</b> {selectedProduct.origin}</div>
                  <div><b>Status:</b> {StatusNames[selectedProduct.status]}</div>
                  <div><b>Created At:</b> {new Date(selectedProduct.createdAt * 1000).toLocaleString()}</div>
                  <div><b>Contract Address:</b> <span className="font-mono">{contractAddress}</span></div>
                  <div className="mt-2"><b>History:</b></div>
                  <ul className="ml-4 list-disc">
                    {selectedProduct.history.map((h, idx) => (
                      <li key={idx}>
                        <span className="font-medium">{StatusNames[h.status]}</span> at {new Date(h.timestamp * 1000).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Still show the JSON for reference, but wrapped */}
                <div className="text-left text-xs bg-white p-2 rounded border overflow-x-auto break-all whitespace-pre-wrap">
                  <pre className="break-all whitespace-pre-wrap">{generateProductQR(selectedProduct)}</pre>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => downloadQRCode(selectedProduct)}
                  className="walmart-btn-primary flex-1"
                >
                  Download QR
                </button>
                <button
                  onClick={() => setShowQRModal(false)}
                  className="walmart-btn-secondary flex-1"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {filtered.map(p => (
        <div key={p.id} className="space-y-4">
          <div className="walmart-card p-5 transition-all duration-300 hover:shadow-walmart-lg">
            <div className="flex justify-between items-start flex-wrap gap-5">
              <div className="flex items-start">
                <div className={`p-2 rounded-lg ${StatusColors[p.status]} mr-4`}>
                  {StatusIcons[p.status]}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{p.name}
                    <span className="text-walmart-gray-500 ml-2 font-normal">#{p.id.toString().padStart(4, '0')}</span>
                  </h3>
                  <p className="text-sm text-walmart-gray-600 mt-1">Origin: {p.origin}</p>
                  <p className="text-xs text-walmart-gray-500 mt-1">
                    Created: {new Date(p.createdAt * 1e3).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${StatusColors[p.status]}`}>
                  {StatusNames[p.status]}
                </span>

                {/* AI Predictions Button */}
                <button
                  onClick={() => setSelectedProductForAI(selectedProductForAI === p.id ? null : p.id)}
                  className="p-2 text-walmart-blue-600 hover:text-walmart-blue-800 hover:bg-walmart-blue-50 rounded-lg transition-colors"
                  title="AI Predictions"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </button>

                {/* QR Code Button */}
                <button
                  onClick={() => showQRCode(p)}
                  className="p-2 text-walmart-blue-600 hover:text-walmart-blue-800 hover:bg-walmart-blue-50 rounded-lg transition-colors"
                  title="Generate QR Code"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 12h-4.01M12 12v4m6-4h.01M12 8h.01" />
                  </svg>
                </button>

                <div className="relative">
                  <select
                    className="bg-white border border-walmart-gray-300 rounded-lg py-2 pl-3 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-walmart-blue-500 focus:border-transparent text-sm"
                    value={p.status}
                    onChange={e => changeStatus(p.id, Number(e.target.value))}
                    disabled={updatingId === p.id || !signer}
                  >
                    {StatusNames.map((name, idx) => (
                      <option key={idx} value={idx}>{name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-walmart-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 relative">
              <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-walmart-gray-300 z-0"></div>
              <div className="relative pl-8 space-y-4">
                {p.history.map((h, idx) => (
                  <div key={idx} className="relative z-10">
                    <div className="absolute top-[2px] left-[-20px] w-4 h-4 rounded-full bg-white border-2 border-walmart-gray-300 flex items-center justify-center">
                      <div className={`w-2 h-2 rounded-full ${h.status === 0 ? "bg-walmart-blue-500" :
                        h.status === 1 ? "bg-walmart-yellow-500" : "bg-green-500"}`}></div>
                    </div>
                    <div className="text-sm">
                      <span className={`font-medium ${h.status === 0 ? "text-walmart-blue-600" :
                        h.status === 1 ? "text-walmart-yellow-600" : "text-green-600"}`}>
                        {StatusNames[h.status]}
                      </span>
                      <span className="text-walmart-gray-500 ml-2">
                        {new Date(h.timestamp * 1e3).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {updatingId === p.id && (
              <div className="mt-4 text-center py-2 bg-walmart-blue-50 rounded-lg text-walmart-blue-600 text-sm">
                Updating status on blockchain...
              </div>
            )}
          </div>
          
          {/* AI Prediction Card */}
          {selectedProductForAI === p.id && (
            <AIPredictionCard 
              productId={p.id}
              productName={p.name}
              status={p.status}
            />
          )}
        </div>
      ))}
    </div>
  );
}