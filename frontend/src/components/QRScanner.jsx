import { useState, useRef, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function QRScanner({ onScan, isActive, onClose }) {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const scannerRef = useRef(null);
  const html5QrcodeScannerRef = useRef(null);

  useEffect(() => {
    if (isActive && scannerRef.current) {
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        disableFlip: false,
      };

      html5QrcodeScannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        config,
        false
      );

      html5QrcodeScannerRef.current.render(
        (decodedText, decodedResult) => {
          setScanResult(decodedText);
          setError(null);
          onScan?.(decodedText, decodedResult);
          
          // Auto-close scanner after successful scan
          setTimeout(() => {
            html5QrcodeScannerRef.current?.clear();
            onClose?.();
          }, 1000);
        },
        (error) => {
          // Handle scan errors silently for better UX
          console.debug('QR scan error:', error);
        }
      );
    }

    return () => {
      if (html5QrcodeScannerRef.current) {
        html5QrcodeScannerRef.current.clear().catch(console.error);
      }
    };
  }, [isActive, onScan, onClose]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-walmart-gray-900">Scan QR Code</h3>
          <button
            onClick={onClose}
            className="text-walmart-gray-500 hover:text-walmart-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div id="qr-reader" ref={scannerRef} className="w-full"></div>

        {scanResult && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm">
              <strong>Scanned:</strong> {scanResult}
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="mt-4 text-center">
          <p className="text-sm text-walmart-gray-600">
            Position the QR code within the frame to scan
          </p>
        </div>
      </div>
    </div>
  );
}