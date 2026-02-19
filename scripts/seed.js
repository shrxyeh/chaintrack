require("dotenv").config();
const { ethers } = require("ethers");
const ABI = require("../frontend/src/SupplyChain.json").abi;

const CONTRACT_ADDRESS = "0x92944F0b9cb0633801D9094f9765B294C1A606e6";

// Status enum: 0 = Created, 1 = InTransit, 2 = Delivered
const Status = { Created: 0, InTransit: 1, Delivered: 2 };

const products = [
  // Delivered
  { name: "Organic Coffee Beans", origin: "Coorg, Karnataka, India", finalStatus: Status.Delivered },
  { name: "Industrial OLED Displays", origin: "Samsung Fab, Suwon, South Korea", finalStatus: Status.Delivered },
  { name: "Pharmaceutical Grade Insulin", origin: "Novo Nordisk Plant, Bagsvaerd, Denmark", finalStatus: Status.Delivered },
  { name: "Cold-Pressed Olive Oil", origin: "Jaén Cooperative, Andalusia, Spain", finalStatus: Status.Delivered },

  // In Transit
  { name: "Lithium-Ion Battery Packs", origin: "CATL Factory, Ningde, China", finalStatus: Status.InTransit },
  { name: "Merino Wool Fabric Rolls", origin: "South Island Mills, Canterbury, New Zealand", finalStatus: Status.InTransit },
  { name: "Arabica Coffee Beans — Single Origin", origin: "Yirgacheffe Farm, Sidama, Ethiopia", finalStatus: Status.InTransit },

  // Created
  { name: "Stainless Steel Surgical Instruments", origin: "Sialkot Precision Mfg, Punjab, Pakistan", finalStatus: Status.Created },
  { name: "Organic Basmati Rice", origin: "Punjab Agri Hub, Amritsar, India", finalStatus: Status.Created },
  { name: "Electric Vehicle Charging Modules", origin: "BYD Assembly, Shenzhen, China", finalStatus: Status.Created },
];

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL_SEPOLIA);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  console.log(`\nConnected wallet: ${wallet.address}`);
  console.log(`Contract: ${CONTRACT_ADDRESS}`);
  console.log(`Seeding ${products.length} products on Sepolia...\n`);

  const ids = [];

  for (const p of products) {
    process.stdout.write(`  Creating "${p.name}"... `);
    const tx = await contract.createProduct(p.name, p.origin);
    const receipt = await tx.wait();
    const id = ids.length; // 0-indexed, matches nextId before call
    ids.push(id);
    console.log(`✓ ID #${id} (tx: ${receipt.transactionHash.slice(0, 12)}...)`);
    await sleep(1500);
  }

  console.log("\nUpdating statuses...\n");

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const id = ids[i];

    if (p.finalStatus === Status.InTransit || p.finalStatus === Status.Delivered) {
      process.stdout.write(`  #${id} "${p.name}" → In Transit... `);
      const tx = await contract.updateStatus(id, Status.InTransit);
      const receipt = await tx.wait();
      console.log(`✓ (tx: ${receipt.transactionHash.slice(0, 12)}...)`);
      await sleep(1500);
    }

    if (p.finalStatus === Status.Delivered) {
      process.stdout.write(`  #${id} "${p.name}" → Delivered... `);
      const tx = await contract.updateStatus(id, Status.Delivered);
      const receipt = await tx.wait();
      console.log(`✓ (tx: ${receipt.transactionHash.slice(0, 12)}...)`);
      await sleep(1500);
    }
  }

  console.log(`\n✅ Done! ${products.length} products seeded on-chain.`);
  console.log(`   View on Etherscan: https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
