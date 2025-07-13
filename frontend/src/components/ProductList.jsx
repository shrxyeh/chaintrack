import { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import SupplyChainABI from "../SupplyChain.json";
import { getMetaMaskProvider } from "../utils/ethProvider";
import { animateSuccess } from "../utils/animations";

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

export default function ProductList({ contractAddress, signer, search, filter, refreshKey }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [showUpdateToast, setShowUpdateToast] = useState(false);

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

  return (
    <div className="grid grid-cols-1 gap-4">
      {showUpdateToast && (
        <div className="update-toast fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-walmart-lg">
          Product list updated!
        </div>
      )}
      {filtered.map(p => (
        <div
          key={p.id}
          className="walmart-card p-5 transition-all duration-300 hover:shadow-walmart-lg"
        >
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
      ))}
    </div>
  );
}