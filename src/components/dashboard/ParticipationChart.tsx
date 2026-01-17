import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkeletonChart } from "@/components/ui/skeleton-card";
import { ConnectWalletPrompt } from "@/components/ui/connect-wallet-prompt";

const mockData = [
  { month: "Jan", staked: 5000, rewards: 200 },
  { month: "Feb", staked: 8000, rewards: 450 },
  { month: "Mar", staked: 12000, rewards: 800 },
  { month: "Apr", staked: 15000, rewards: 1100 },
  { month: "May", staked: 18000, rewards: 1500 },
  { month: "Jun", staked: 22000, rewards: 1950 },
];

interface ParticipationChartProps {
  isLoading?: boolean;
  isWalletConnected?: boolean;
  summaryStats?: {
    totalStaked: string;
    totalRewards: string;
    rewardRate: string;
    claimableNow: string;
  };
}

export function ParticipationChart({
  isLoading = false,
  isWalletConnected = true,
  summaryStats = {
    totalStaked: "22,000 CAPX",
    totalRewards: "1,950 CAPX",
    rewardRate: "8.86%",
    claimableNow: "450 CAPX",
  },
}: ParticipationChartProps) {
  if (isLoading) {
    return <SkeletonChart />;
  }

  if (!isWalletConnected) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">My Participation vs Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[250px]">
            <ConnectWalletPrompt 
              title="Connect wallet to view"
              description="Connect your wallet to see your staking participation and rewards"
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">My Participation vs Rewards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData}>
              <defs>
                <linearGradient id="stakedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="rewardsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(271, 91%, 65%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(271, 91%, 65%)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                className="text-xs fill-muted-foreground"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                className="text-xs fill-muted-foreground"
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value.toLocaleString()} CAPX`,
                  name === "staked" ? "Staked" : "Rewards",
                ]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="staked"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#stakedGradient)"
              />
              <Area
                type="monotone"
                dataKey="rewards"
                stroke="hsl(271, 91%, 65%)"
                strokeWidth={2}
                fill="url(#rewardsGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">My Staked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: "hsl(271, 91%, 65%)" }} />
            <span className="text-sm text-muted-foreground">My Rewards</span>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Total Staked</p>
            <p className="text-sm font-semibold">{summaryStats.totalStaked}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Rewards</p>
            <p className="text-sm font-semibold">{summaryStats.totalRewards}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Reward Rate</p>
            <p className="text-sm font-semibold text-primary">
              {summaryStats.rewardRate}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Claimable Now</p>
            <p className="text-sm font-semibold text-capx-warning">
              {summaryStats.claimableNow}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
