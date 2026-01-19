import { useState, useEffect } from "react";
import { Wallet, Layers, Clock, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  LineChart,
  Line,
} from "recharts";
import { useWalletState } from "@/hooks/useWalletState";
import { SkeletonCard, SkeletonChart } from "@/components/ui/skeleton-card";
import { ConnectWalletPrompt } from "@/components/ui/connect-wallet-prompt";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const stakingRewardsData = [
  { month: "Jul", staked: 12000, rewards: 450 },
  { month: "Aug", staked: 15000, rewards: 620 },
  { month: "Sep", staked: 18500, rewards: 780 },
  { month: "Oct", staked: 22000, rewards: 920 },
  { month: "Nov", staked: 19500, rewards: 850 },
  { month: "Dec", staked: 24000, rewards: 1100 },
];

const capxPriceData = [
  { date: "Jan 1", price: 0.35 },
  { date: "Jan 5", price: 0.38 },
  { date: "Jan 10", price: 0.42 },
  { date: "Jan 15", price: 0.40 },
  { date: "Jan 18", price: 0.45 },
];

interface MetricCardProps {
  title: string;
  value: string;
  subValue?: string;
  secondaryLine?: string;
  icon: React.ReactNode;
  requiresWallet?: boolean;
  isWalletConnected?: boolean;
}

function MetricCard({
  title,
  value,
  subValue,
  secondaryLine,
  icon,
  requiresWallet = false,
  isWalletConnected = false,
}: MetricCardProps) {
  const showPlaceholder = requiresWallet && !isWalletConnected;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">{icon}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">{title}</p>
            {showPlaceholder ? (
              <p className="text-sm text-muted-foreground italic">
                Connect wallet to view
              </p>
            ) : (
              <>
                <p className="text-xl font-bold">{value}</p>
                {subValue && (
                  <p className="text-xs text-muted-foreground">{subValue}</p>
                )}
                {secondaryLine && (
                  <p className="text-xs text-primary">{secondaryLine}</p>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Index() {
  const { isConnected } = useWalletState();
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState("7d");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Portfolio</h1>
          <p className="text-muted-foreground">Your CAPShield portfolio overview</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonChart />
          <SkeletonChart />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <p className="text-muted-foreground">
          Your CAPShield portfolio overview
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="My CAPX Balance"
          value="12,450 CAPX"
          subValue="≈ $4,980"
          icon={<Wallet className="w-5 h-5 text-primary" />}
          requiresWallet
          isWalletConnected={isConnected}
        />
        <MetricCard
          title="Currently Staked"
          value="22,000 CAPX"
          subValue="≈ $8,800"
          secondaryLine="Claimable: 450 CAPX"
          icon={<Layers className="w-5 h-5 text-primary" />}
          requiresWallet
          isWalletConnected={isConnected}
        />
        <MetricCard
          title="Currently Vested"
          value="1,500 CAPX"
          subValue="≈ $600"
          secondaryLine="Vested: 8,500 CAPX"
          icon={<Clock className="w-5 h-5 text-primary" />}
          requiresWallet
          isWalletConnected={isConnected}
        />
        <MetricCard
          title="SHIELD Balance"
          value="2,450 SHIELD"
          subValue="Governance token"
          icon={<Shield className="w-5 h-5 text-primary" />}
          requiresWallet
          isWalletConnected={isConnected}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Staking Rewards Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Staking Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            {!isConnected ? (
              <ConnectWalletPrompt
                title="Connect wallet"
                description="Connect your wallet to view staking rewards"
              />
            ) : (
              <>
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-muted-foreground">Staked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--capx-success))" }} />
                    <span className="text-muted-foreground">Rewards</span>
                  </div>
                </div>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stakingRewardsData}>
                      <defs>
                        <linearGradient id="stakedGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="rewardsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--capx-success))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--capx-success))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <RechartsTooltip
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
                        fill="url(#stakedGradient)"
                      />
                      <Area
                        type="monotone"
                        dataKey="rewards"
                        stroke="hsl(var(--capx-success))"
                        fill="url(#rewardsGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* CAPX Price Chart */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">CAPX Price</CardTitle>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-24 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7D</SelectItem>
                  <SelectItem value="30d">30D</SelectItem>
                  <SelectItem value="90d">90D</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-2xl font-bold">$0.45</p>
              <p className="text-xs text-muted-foreground">Current price</p>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={capxPriceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={["auto", "auto"]} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
