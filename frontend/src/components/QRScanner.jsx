import { useState, useRef, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useKafkaSimulation } from "./Kafka/KafkaSimContext";

export default function QRScanner({ onScan, isActive, onClose }) {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState(null);
  const scannerRef = useRef(null);
  const { publishEvent } = useKafkaSimulation();

  useEffect(() => {
    if (isActive && !scanning) {
      startScanner();
    } else if (!isActive && scanning) {
      stopScanner();
    }
  }, [isActive]);

  const startScanner = () => {
    try {
      setError(null);
      setScanning(true);

      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        false
      );

      scanner.render(
        (decodedText, decodedResult) => {
          console.log("QR Code detected:", decodedText);
          
          // Publish Kafka event for QR scan
          publishEvent('QR_SCAN', {
            qrData: decodedText,
            topic: 'chaintrack.events.qr_scans',
            source: 'qr-scanner'
          });
          
          onScan(decodedText, decodedResult);
          stopScanner();
          onClose();
        },
        (errorMessage) => {
          // Ignore errors during scanning
          console.log("QR Scanner error:", errorMessage);
        }
      );

      scannerRef.current = scanner;
    } catch (err) {
      console.error("Failed to start QR scanner:", err);
      setError("Failed to start camera. Please check permissions.");
      setScanning(false);
    }
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      try {
        scannerRef.current.clear();
        scannerRef.current = null;
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
    setScanning(false);
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  if (!isActive) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-walmart-gray-900">Scan QR Code</h3>
          <button
            onClick={onClose}
            className="text-walmart-gray-500 hover:text-walmart-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error ? (
          <div className="text-center py-8">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-red-600 font-medium">{error}</p>
            <button
              onClick={() => {
                setError(null);
                startScanner();
              }}
              className="mt-4 walmart-btn-primary"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center text-sm text-walmart-gray-600 mb-4">
              Position the QR code within the frame to scan
            </div>
            <div id="qr-reader" className="w-full"></div>
            <div className="text-center">
              <button
                onClick={onClose}
                className="walmart-btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}