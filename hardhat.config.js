require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

const {
  RPC_URL_DEVNET,
  DEVNET_CHAIN_ID,
  RPC_URL_SEPOLIA,
  SEPOLIA_CHAIN_ID,
  PRIVATE_KEY
} = process.env;

if (
  !RPC_URL_DEVNET ||
  !DEVNET_CHAIN_ID ||
  !RPC_URL_SEPOLIA ||
  !SEPOLIA_CHAIN_ID ||
  !PRIVATE_KEY
) {
  throw new Error("⚠️  Please set RPC_URL_DEVNET, DEVNET_CHAIN_ID, RPC_URL_SEPOLIA, SEPOLIA_CHAIN_ID and PRIVATE_KEY in .env");
}

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    devnet: {
      url: RPC_URL_DEVNET,
      chainId: +DEVNET_CHAIN_ID,
      accounts: [PRIVATE_KEY]
    },
    sepolia: {
      url: RPC_URL_SEPOLIA,
      chainId: +SEPOLIA_CHAIN_ID,
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: "0.8.0"
};
