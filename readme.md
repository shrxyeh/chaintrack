# ChainTrack.ai

A production-grade, blockchain-powered supply chain tracking platform. ChainTrack.ai enables end-to-end product traceability using Ethereum smart contracts — every registration, status change, and delivery is recorded permanently on-chain, publicly verifiable, and tamper-proof.

---

## Overview

Supply chain fraud, counterfeiting, and lack of transparency cost businesses billions annually. ChainTrack.ai solves this by anchoring product history to the Ethereum blockchain — creating an immutable ledger that any stakeholder can verify independently, with no trusted intermediary required.

---

## Features

- **On-chain Product Registration** — Register products with name and origin, permanently stored on Ethereum
- **Three-stage Status Lifecycle** — `Created → In Transit → Delivered`, each transition recorded with a block timestamp
- **Immutable Audit Trail** — Complete, tamper-proof history of every status change per product
- **QR Code Integration** — Scan QR codes to retrieve product data; generate and download QR codes linked to on-chain records
- **AI Analytics Dashboard** — Demand forecasting, route optimization insights, and disruption alerts
- **MetaMask Integration** — Browser wallet connection for transaction signing; no custodial keys
- **Progressive Web App** — Installable on desktop and mobile; works offline for read-only views

---

## Architecture

```
[User Browser]
     │
     ├── React Frontend  (Vite · Tailwind CSS · ethers.js)
     │        │
     │        ├── MetaMask ──────────────────► Ethereum Sepolia
     │        │                                      │
     │        └── QR Scanner (html5-qrcode)    SupplyChain.sol
     │
     └── Vercel (Static CDN)
```

The frontend is a fully static build — no backend server, no database. All state lives on-chain.

---

## Smart Contract

**Deployed:** [`0x92944F0b9cb0633801D9094f9765B294C1A606e6`](https://sepolia.etherscan.io/address/0x92944F0b9cb0633801D9094f9765B294C1A606e6) — Ethereum Sepolia
**Verified:** [View source on Etherscan](https://sepolia.etherscan.io/address/0x92944F0b9cb0633801D9094f9765B294C1A606e6#code)
**Source:** `contracts/SupplyChain.sol`

```solidity
enum Status { Created, InTransit, Delivered }

function createProduct(string name, string origin) external
function updateStatus(uint256 id, Status status) external
function getHistory(uint256 id) external view returns (Status[], uint256[])
```

All writes emit on-chain events (`ProductCreated`, `StatusUpdated`) and are permanently indexed by Etherscan.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Smart Contract | Solidity 0.8, Foundry |
| Blockchain | Ethereum (Sepolia testnet) |
| Frontend | React 19, Vite 6, React Router 7 |
| Styling | Tailwind CSS |
| Animations | GSAP |
| Data Viz | Chart.js |
| QR Scanning | html5-qrcode |
| Wallet | ethers.js v6, MetaMask |
| Hosting | Vercel |

---

## Getting Started

### Prerequisites

- [Foundry](https://getfoundry.sh) — smart contract toolchain
- Node.js 18+
- MetaMask browser extension
- Sepolia ETH for transactions — available free at [sepoliafaucet.com](https://sepoliafaucet.com)

### Install Foundry

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### Install and run locally

```bash
git clone https://github.com/shrxyeh/ChainTrack.git
cd ChainTrack
forge install                        # install Solidity dependencies
cd frontend && npm install && cd ..
npm run dev
```

Open [http://localhost:5173](http://localhost:5173), connect MetaMask to the Sepolia network, and start tracking.

---

## Deploying Your Own Contract

### 1. Set up environment

Create a `.env` file in the project root:

```env
RPC_URL_SEPOLIA=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=your_deployment_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

> Use a dedicated deployment wallet with only enough ETH for gas. The `.env` file is gitignored and never committed. For production deployments, use a hardware wallet with `--ledger` flag instead of a software key.

### 2. Compile

```bash
forge build
```

### 3. Deploy

```bash
forge script script/Deploy.s.sol:DeploySupplyChain \
  --rpc-url $RPC_URL_SEPOLIA \
  --private-key $PRIVATE_KEY \
  --broadcast
```

### 4. Verify on Etherscan

```bash
forge verify-contract <DEPLOYED_ADDRESS> \
  contracts/SupplyChain.sol:SupplyChain \
  --chain sepolia \
  --etherscan-api-key $ETHERSCAN_API_KEY \
  --watch
```

Copy the deployed address into `CONTRACT_ADDRESS` in `frontend/src/pages/Dashboard.jsx`, then update `frontend/src/SupplyChain.json` with the ABI from `out/SupplyChain.sol/SupplyChain.json`.

---

## Project Structure

```
chaintrack/
├── contracts/
│   └── SupplyChain.sol          # Core Solidity contract
├── script/
│   └── Deploy.s.sol             # Foundry deployment script
├── scripts/
│   └── seed.js                  # Node.js script to populate on-chain data
├── lib/                         # Foundry dependencies (forge-std)
├── frontend/
│   ├── public/                  # PWA icons and static assets
│   └── src/
│       ├── components/
│       │   ├── AI/              # Analytics and prediction components
│       │   ├── Analytics/       # Charts and dashboard widgets
│       │   ├── Header.jsx
│       │   ├── ProductList.jsx
│       │   ├── TrackForm.jsx
│       │   ├── QRScanner.jsx
│       │   └── QRHistory.jsx
│       ├── pages/               # Dashboard, Landing, Features, HowItWorks
│       ├── utils/               # ethProvider.js, animations.js
│       ├── App.jsx
│       └── SupplyChain.json     # Contract ABI
├── foundry.toml
├── .env.example
└── vercel.json
```

---

## Security

- The deployment private key is used solely by the Foundry deploy script and is never bundled into the frontend build
- The frontend uses MetaMask for all transaction signing — no private keys are ever held by the application
- All contract interactions are read-only unless the user explicitly approves a transaction in MetaMask
- For production deployments, use a hardware wallet with `--ledger` flag rather than a software key in `.env`

---

## License

MIT
