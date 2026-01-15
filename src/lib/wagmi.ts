import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { bsc } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'CAPShield',
  projectId: 'capshield-dashboard', // WalletConnect project ID - users can replace with their own
  chains: [bsc],
  ssr: false,
});
