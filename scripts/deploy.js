const { ethers } = require("hardhat");

async function main() {
  const SupplyChain = await ethers.getContractFactory("SupplyChain");
  const contract = await SupplyChain.deploy();
  await contract.deployed();
  console.log("SupplyChain deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});