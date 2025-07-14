# Supply Chain Tracker

A modern, blockchain-powered supply chain tracking platform for transparent product management, built with Solidity smart contracts, a React frontend, and QR code integration.

## Project Overview
This project enables secure, transparent tracking of products across a supply chain using Ethereum smart contracts. It features:
- **Smart Contract Backend:** Solidity contract for product registration and tracking, deployed to Ethereum (Sepolia or local Hardhat).
- **React Frontend:** User-friendly dashboard for product management, QR code scanning, analytics, and real-time updates.
- **QR Code Integration:** Generate, scan, and manage QR codes for product tracking.
- **Python QR Code Generator:** Script to create sample QR codes for testing/demo.

---

## Features
- **Product Registration:** Add new products with name and origin, stored on-chain.
- **Product Tracking:** View, search, and filter all tracked products. See their status and history.
- **QR Code Integration:**
  - Scan QR codes to auto-fill product forms.
  - Generate and download QR codes for each product, containing full tracking details.
  - QR codes can be scanned to retrieve product and tracking info.
- **Analytics & Dashboard:** Visualize supply chain metrics and analytics.
- **History:** View all QR scans and their details.
- **Modern UI:** Responsive, clean, and user-friendly interface.

---

## Architecture
```
[User] ⇄ [React Frontend (frontend/)] ⇄ [Ethereum Smart Contract (contracts/SupplyChain.sol)]
                                      ⇄ [Python QR Generator (generate_qr_codes.py)]
```

---

## Backend / Smart Contract
- **Location:** `contracts/SupplyChain.sol`
- **Tech:** Solidity 0.8.x, Hardhat
- **Networks:** Local Hardhat, Sepolia (Ethereum testnet)

### Setup & Deployment
1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
2. **Configure environment variables:**
   Create a `.env` file in the root with:
   ```env
   RPC_URL_SEPOLIA=YOUR_SEPOLIA_RPC_URL
   SEPOLIA_CHAIN_ID=11155111
   PRIVATE_KEY=YOUR_WALLET_PRIVATE_KEY
   ```
3. **Compile contracts:**
   ```bash
   npx hardhat compile
   ```
4. **Deploy to Sepolia:**
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```
   The deployed contract address will be output in the terminal. Update the frontend config with this address.

---

## Frontend
- **Location:** `frontend/`
- **Tech:** React, Tailwind CSS, ethers.js

### Setup & Run
1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   # or
   yarn install
   ```
2. **Start development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Visit [http://localhost:5173](http://localhost:5173) in your browser.

### QR Code Usage
- **Scan QR:** Use the "Scan QR Code" button to auto-fill the product form with product name and location from a QR code.
- **Product QR:** Each product card has a QR icon. Click it to view and download a QR code containing all tracking details for that product.
- **QR History:** All scans are saved and viewable in the QR History tab.

### Customization
- **Favicon:** Located at `frontend/public/favicon.svg`. Replace with your own SVG or PNG if desired.
- **Theme:** Tailwind CSS is used for styling. Edit `frontend/tailwind.config.js` and CSS files for custom branding.
- **QR Code API:** QR codes are generated using [api.qrserver.com](https://goqr.me/api/). You can swap this for a local library if needed.

---

## Progressive Web App (PWA) Support

This project is fully PWA-enabled! You can install it on your device for an app-like experience, including offline support and home screen icons.

### Features
- **Installable** on desktop and mobile (Android/iOS).
- **Offline support** via service worker.
- **Custom app icons** for all platforms.
- **Manifest and meta tags** for best PWA compliance.

### How to Use

#### Local Development
1. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```
2. Open the app in Chrome or Edge.
3. Click the install icon in the address bar, or use the browser menu to "Add to Home Screen".

#### Production/Deployment
- The PWA will work automatically on your deployed site.
- Make sure the following files exist in `frontend/public/`:
  - `pwa-192x192.png`
  - `pwa-512x512.png`
  - `manifest.webmanifest`
- The manifest and icons are referenced in `index.html` and `vite.config.js`.

#### Troubleshooting
- If the app icon does not update, clear your browser cache, uninstall the PWA, and reinstall.
- For iOS, the icon may appear rounded or with a gloss effect (this is normal).

---

## Python QR Code Generator (Optional)
A script is provided at the project root to generate sample QR codes for testing:
```bash
pip install -r requirements.txt
python generate_qr_codes.py
```
Output will be in the `qr_codes/` directory.

---

## Project Structure
- `contracts/` — Solidity smart contracts (main: SupplyChain.sol)
- `frontend/` — React frontend app
- `scripts/` — Deployment and utility scripts
- `qr_codes/` — Sample/generated QR codes
- `generate_qr_codes.py` — Python QR code generator script

---

## License
MIT



