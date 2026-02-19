# ChainTrack.ai

ChainTrack.ai is a blockchain-powered supply chain tracking platform built on Ethereum. Every product registration, status update, and delivery is recorded on-chain, making the entire history publicly verifiable and permanent.

## What it does

Supply chain fraud and counterfeiting are massive problems. ChainTrack solves this by putting product history on the blockchain so any stakeholder can verify it independently, without relying on a central authority.

Products move through three stages: **Created → In Transit → Delivered**. Each transition is timestamped and recorded permanently. Anyone with the product ID or QR code can look up the full history.

## Features

- Register products with name and origin
- Track status changes with on-chain timestamps
- Scan QR codes to pull up product history instantly
- Generate and download QR codes for any tracked product
- AI analytics dashboard with demand forecasting and route insights
- MetaMask wallet integration for transaction signing
- Works as a Progressive Web App on desktop and mobile

## Tech Stack

| Layer | Technology |
|---|---|
| Blockchain | Ethereum (Sepolia testnet) |
| Frontend | React 19, Vite 6, React Router 7 |
| Styling | Tailwind CSS |
| Animations | GSAP |
| Data Viz | Chart.js |
| QR Scanning | html5-qrcode |
| Wallet | ethers.js v6, MetaMask |
| Hosting | Vercel |

## Running locally

You need [Foundry](https://getfoundry.sh), Node.js 18+, and the MetaMask extension.

Install Foundry first if you don't have it:

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

Then clone and run:

```bash
git clone https://github.com/shrxyeh/ChainTrack.git
cd ChainTrack
forge install
cd frontend && npm install && cd ..
npm run dev
```

Open [http://localhost:5173](http://localhost:5173), connect MetaMask to Sepolia, and you're good to go. You can get free Sepolia ETH at [sepoliafaucet.com](https://sepoliafaucet.com).

## Deploying your own instance

Create a `.env` file in the project root:

```env
RPC_URL_SEPOLIA=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=your_deployment_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

Use a dedicated wallet with just enough ETH for gas. This file is gitignored and never committed. For production, use a hardware wallet with the `--ledger` flag instead.

Build and deploy:

```bash
forge build

forge script script/Deploy.s.sol:DeploySupplyChain \
  --rpc-url $RPC_URL_SEPOLIA \
  --private-key $PRIVATE_KEY \
  --broadcast
```

Verify on Etherscan:

```bash
forge verify-contract <DEPLOYED_ADDRESS> \
  contracts/SupplyChain.sol:SupplyChain \
  --chain sepolia \
  --etherscan-api-key $ETHERSCAN_API_KEY \
  --watch
```

After deploying, update `CONTRACT_ADDRESS` in `frontend/src/pages/Dashboard.jsx` with the new address.

## Project structure

```
chaintrack/
├── contracts/
│   └── SupplyChain.sol
├── script/
│   └── Deploy.s.sol
├── scripts/
│   └── seed.js
├── lib/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── utils/
│       ├── App.jsx
│       └── SupplyChain.json
├── foundry.toml
├── .env.example
└── vercel.json
```

## License

MIT
