// src/utils/ethProvider.js
export function getMetaMaskProvider() {
  const { ethereum } = window;
  if (!ethereum) return null;

  // If multiple wallets injected, ethereum.providers holds them
  const providers = ethereum.providers ?? [ethereum];
  return providers.find(p => p.isMetaMask) ?? null;
}
