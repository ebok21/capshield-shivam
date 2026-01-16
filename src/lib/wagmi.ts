import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'CAPShield',
  projectId: 'capshield-dashboard', // WalletConnect project ID - users can replace with their own
  chains: [sepolia],
  ssr: false,
});
