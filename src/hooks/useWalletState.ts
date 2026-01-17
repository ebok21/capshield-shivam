import { useAccount } from "wagmi";

export function useWalletState() {
  const { isConnected, isConnecting, address } = useAccount();

  return {
    isConnected,
    isConnecting,
    isDisconnected: !isConnected && !isConnecting,
    address,
  };
}
