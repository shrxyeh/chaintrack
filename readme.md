# ChainTrack.ai

A blockchain-powered supply chain tracking platform for transparent, tamper-proof product management. Built with Solidity smart contracts on Ethereum, a React frontend, QR code integration, and AI-powered analytics.

---

## Live Demo

- **Frontend:** Deployed via Vercel
- **Smart Contract:** [`0x92944F0b9cb0633801D9094f9765B294C1A606e6`](https://sepolia.etherscan.io/address/0x92944F0b9cb0633801D9094f9765B294C1A606e6) on Ethereum Sepolia testnet

---

## Features

- **On-chain Product Registration** — Register products with name and origin; stored permanently on Ethereum
- **Status Tracking** — Three-stage lifecycle: `Created → In Transit → Delivered`
- **Immutable Audit Trail** — Every status change is recorded on-chain with a timestamp
- **QR Code Integration** — Scan QR codes to auto-fill forms; generate and download QR codes per product
- **AI Analytics Dashboard** — Predictive insights, demand forecasting, and disruption alerts
- **MetaMask Wallet Integration** — Connect your wallet to sign transactions
- **Progressive Web App (PWA)** — Installable on desktop and mobile with offline support

---

## Architecture

```
[User Browser]
     │
     ├── React Frontend (Vite + Tailwind CSS)
     │        │
     │        ├── MetaMask / ethers.js  ──► Ethereum Sepolia
     │        │                                    │
     │        └── QR Scanner (html5-qrcode)        └── SupplyChain.sol
     │
     └── Vercel (Static Hosting)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Smart Contract | Solidity 0.8.0, Hardhat |
| Blockchain | Ethereum (Sepolia testnet) |
| Frontend | React 19, Vite 6, React Router 7 |
| Styling | Tailwind CSS |
| Animations | GSAP |
| Charts | Chart.js |
| QR Scanning | html5-qrcode |
| Wallet | ethers.js v6, MetaMask |
| Hosting | Vercel |

---

## Smart Contract

**Location:** `contracts/SupplyChain.sol`

```solidity
enum Status { Created, InTransit, Delivered }

// Create a new product (stored on-chain)
function createProduct(string name, string origin) external

// Update product status — appends to history
function updateStatus(uint256 id, Status status) external

// Read full status history for a product
function getHistory(uint256 id) external view returns (Status[], uint256[])
```

All product data and status history is immutable and publicly verifiable on Etherscan.

---

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask browser extension
- Sepolia testnet ETH (for transactions) — get free ETH from [sepoliafaucet.com](https://sepoliafaucet.com)

### 1. Clone and install

```bash
git clone https://github.com/shrxyeh/ChainTrack.git
cd ChainTrack
npm install
cd frontend && npm install
```

### 2. Run the frontend

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Connect MetaMask to the Sepolia testnet.

---

## Deploying the Smart Contract

> **Security note:** The deployment private key is only needed for the one-time deploy script and should never be committed to version control. Use a **dedicated deployment wallet** funded with just enough Sepolia ETH for gas — never use a wallet that holds real funds.

### 1. Create `.env` in the project root

```env
RPC_URL_SEPOLIA=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
SEPOLIA_CHAIN_ID=11155111
PRIVATE_KEY=your_deployment_wallet_private_key
```

> The `.env` file is listed in `.gitignore` and will never be committed.

### 2. Compile and deploy

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

The contract address will be printed to the console. Update `CONTRACT_ADDRESS` in `frontend/src/pages/Dashboard.jsx`.

### 3. (Optional) Seed demo data

```bash
node scripts/seed.js
```

This creates 10 realistic products across all three status stages for demonstration.

---

## Seeded Demo Products

The contract is pre-populated with 10 on-chain products:

| Product | Origin | Status |
|---|---|---|
| Organic Coffee Beans | Coorg, Karnataka, India | Delivered |
| Industrial OLED Displays | Samsung Fab, South Korea | Delivered |
| Pharmaceutical Grade Insulin | Novo Nordisk, Denmark | Delivered |
| Cold-Pressed Olive Oil | Andalusia, Spain | Delivered |
| Lithium-Ion Battery Packs | CATL Factory, China | In Transit |
| Merino Wool Fabric Rolls | Canterbury, New Zealand | In Transit |
| Arabica Coffee Beans | Yirgacheffe, Ethiopia | In Transit |
| Stainless Steel Surgical Instruments | Sialkot, Pakistan | Created |
| Organic Basmati Rice | Amritsar, India | Created |
| Electric Vehicle Charging Modules | BYD Assembly, China | Created |

---

## Project Structure

```
chaintrack/
├── contracts/
│   └── SupplyChain.sol          # Solidity smart contract
├── scripts/
│   ├── deploy.js                # Hardhat deploy script
│   └── seed.js                  # Demo data seeding script
├── frontend/
│   ├── public/                  # Static assets and PWA icons
│   └── src/
│       ├── components/          # React components
│       │   ├── AI/              # AI analytics components
│       │   ├── Analytics/       # Charts and dashboard components
│       │   ├── Header.jsx       # Navigation header
│       │   ├── ProductList.jsx  # Product tracking list
│       │   ├── TrackForm.jsx    # Product registration form
│       │   ├── QRScanner.jsx    # QR code scanner
│       │   └── QRHistory.jsx    # QR scan history
│       ├── pages/               # Route-level pages
│       ├── utils/               # Ethereum provider, animations
│       ├── App.jsx              # Root component with routing
│       └── SupplyChain.json     # Contract ABI
├── hardhat.config.js
├── .env.example                 # Environment variable template
└── vercel.json                  # Vercel deployment config
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `RPC_URL_SEPOLIA` | Deploy only | Alchemy or Infura RPC endpoint for Sepolia |
| `SEPOLIA_CHAIN_ID` | Deploy only | `11155111` |
| `PRIVATE_KEY` | Deploy only | Private key of deployment wallet |

The frontend requires **no environment variables** — it uses MetaMask for all signing and the contract address is hardcoded in `Dashboard.jsx`.

---

## Security Notes

- **Private key in `.env`** is for the Hardhat deploy script only. It is never exposed to the frontend or bundled into any build artifact.
- Use a **dedicated wallet** for deployment — fund it with only the ETH needed for gas.
- After deploying, you can safely delete the `.env` file. The deployed contract address is all the frontend needs.
- Alternatively, use a hardware wallet with `npx hardhat --ledger` for signing deployment transactions.

---

## License

MIT
