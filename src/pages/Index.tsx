import { Wallet, TrendingUp, Gift, Landmark } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TreasuryChart } from "@/components/dashboard/TreasuryChart";
import { ParticipationChart } from "@/components/dashboard/ParticipationChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { StakingOverview } from "@/components/dashboard/StakingOverview";
import { VestingOverview } from "@/components/dashboard/VestingOverview";

export default function Index() {
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
          change={{ value: 5.2, period: "this week" }}
          icon={<Wallet className="w-5 h-5" />}
        />
        <MetricCard
          title="My Contribution"
          value="22,000 CAPX"
          change={{ value: 12.3, period: "this month" }}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <MetricCard
          title="Rewards Earned"
          value="1,950 CAPX"
          subValue="450 claimable"
          change={{ value: 8.7, period: "this week" }}
          icon={<Gift className="w-5 h-5" />}
        />
        <MetricCard
          title="Treasury Size"
          value="$2.34M"
          subValue="On-chain transparent"
          change={{ value: 3.1, period: "this week" }}
          icon={<Landmark className="w-5 h-5" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TreasuryChart />
        <ParticipationChart />
      </div>

      {/* Recent Activity */}
      <RecentActivity />

      {/* Staking Overview */}
      <StakingOverview />

      {/* Vesting Overview */}
      <VestingOverview />
    </div>
  );
}
