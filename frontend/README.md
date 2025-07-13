# Supply Chain Tracker Frontend

A modern, blockchain-powered supply chain tracking dashboard with QR code integration, analytics, and real-time product management.

## Features
- **Product Registration:** Add new products with name and origin, stored on the blockchain.
- **Product Tracking:** View, search, and filter all tracked products. See their status and history.
- **QR Code Integration:**
  - Scan QR codes to auto-fill product forms.
  - Generate and download QR codes for each product, containing full tracking details.
  - QR codes can be scanned to retrieve product and tracking info.
- **AI Analytics & Dashboard:** Visualize supply chain metrics and analytics.
- **History:** View all QR scans and their details.
- **Modern UI:** Responsive, clean, and user-friendly interface.

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Install Dependencies
```bash
cd frontend
npm install
# or
yarn install
```

### Start the Development Server
```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

## QR Code Usage
- **Scan QR:** Use the "Scan QR Code" button to auto-fill the product form with product name and location from a QR code.
- **Product QR:** Each product card has a QR icon. Click it to view and download a QR code containing all tracking details for that product.
- **QR History:** All scans are saved and viewable in the QR History tab.

## Customization
- **Favicon:** Located at `public/favicon.svg`. Replace with your own SVG or PNG if desired.
- **Theme:** Tailwind CSS is used for styling. Edit `tailwind.config.js` and CSS files for custom branding.
- **QR Code API:** QR codes are generated using [api.qrserver.com](https://goqr.me/api/). You can swap this for a local library if needed.

## Project Structure
- `src/components/` — All React components (ProductList, TrackForm, QRScanner, etc.)
- `src/pages/` — Main page layouts
- `src/utils/` — Utility functions (blockchain, animations, etc.)
- `public/` — Static assets (favicon, etc.)

## Backend/Smart Contract
- The frontend expects a deployed SupplyChain smart contract. See the root `README.md` for backend setup and deployment instructions.

## Python QR Code Generator (Optional)
A script is provided at the project root to generate sample QR codes for testing:
```bash
pip install -r requirements.txt
python generate_qr_codes.py
```
Output will be in the `qr_codes/` directory.

## License
MIT
