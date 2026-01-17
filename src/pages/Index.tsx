import { Wallet, Layers, Gift, Building2 } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TreasuryChart } from "@/components/dashboard/TreasuryChart";
import { ParticipationChart } from "@/components/dashboard/ParticipationChart";
import { useWalletState } from "@/hooks/useWalletState";

export default function Index() {
  const { isConnected } = useWalletState();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Overview</h1>
        <p className="text-muted-foreground">
          Welcome back to your CAPShield dashboard
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="My CAPX Balance"
          value="12,450 CAPX"
          subValue="≈ $4,980"
          icon={<Wallet className="w-5 h-5" />}
          requiresWallet
          isWalletConnected={isConnected}
          tooltip="Your current CAPX token balance"
        />
        <MetricCard
          title="Currently Staked"
          value="22,000 CAPX"
          icon={<Layers className="w-5 h-5" />}
          requiresWallet
          isWalletConnected={isConnected}
          tooltip="Total CAPX tokens you have staked across all pools"
        />
        <MetricCard
          title="Rewards Earned"
          value="1,950 CAPX"
          subValue="Claimable: 450 CAPX"
          icon={<Gift className="w-5 h-5" />}
          requiresWallet
          isWalletConnected={isConnected}
          tooltip="Total rewards earned from staking"
        />
        <MetricCard
          title="Treasury Size"
          value="$2.34M"
          subValue="Protocol-wide"
          icon={<Building2 className="w-5 h-5" />}
          tooltip="Total value locked in the protocol treasury"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TreasuryChart />
        <ParticipationChart isWalletConnected={isConnected} />
      </div>
    </div>
  );
}
