import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Building2,
  Coins,
  Flame,
  Lock,
  TrendingUp,
  Users,
  DollarSign,
  Info,
  ExternalLink,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
} from "recharts";
import { SkeletonCard, SkeletonChart } from "@/components/ui/skeleton-card";

const supplyTrendData = [
  { month: "Jul", minted: 100000000, burned: 500000 },
  { month: "Aug", minted: 100000000, burned: 1200000 },
  { month: "Sep", minted: 100000000, burned: 2100000 },
  { month: "Oct", minted: 100000000, burned: 3500000 },
  { month: "Nov", minted: 100000000, burned: 5200000 },
  { month: "Dec", minted: 100000000, burned: 7800000 },
];

const priceTrendData = [
  { date: "Jan 1", price: 0.35 },
  { date: "Jan 5", price: 0.38 },
  { date: "Jan 10", price: 0.42 },
  { date: "Jan 15", price: 0.40 },
  { date: "Jan 18", price: 0.45 },
];

const treasuryFlowData = [
  { month: "Jul", inflow: 150000, outflow: 80000 },
  { month: "Aug", inflow: 220000, outflow: 95000 },
  { month: "Sep", inflow: 180000, outflow: 120000 },
  { month: "Oct", inflow: 310000, outflow: 150000 },
  { month: "Nov", inflow: 280000, outflow: 110000 },
  { month: "Dec", inflow: 350000, outflow: 140000 },
];

const stakingTvlData = [
  { month: "Jul", tvl: 1200000 },
  { month: "Aug", tvl: 1450000 },
  { month: "Sep", tvl: 1800000 },
  { month: "Oct", tvl: 2100000 },
  { month: "Nov", tvl: 1950000 },
  { month: "Dec", tvl: 2450000 },
];

const burnHistoryData = [
  { date: "Jan 12", burned: 15000 },
  { date: "Jan 13", burned: 22000 },
  { date: "Jan 14", burned: 18000 },
  { date: "Jan 15", burned: 25000 },
  { date: "Jan 16", burned: 20000 },
  { date: "Jan 17", burned: 12000 },
  { date: "Jan 18", burned: 13000 },
];

const protocolMetrics = {
  availableTreasury: "$2.34M",
  totalMinted: "100,000,000 CAPX",
  totalBurned: "12,500,000 CAPX",
  lockedVesting: "25,000,000 CAPX",
  circulatingSupply: "62,500,000 CAPX",
  activeWallets30d: "4,521",
  marketPrice: "$0.45",
  maxSupply: "100,000,000 CAPX",
  burned7d: "125,000 CAPX",
  burnRate30d: "0.25%",
};

interface MetricCardProps {
  title: string;
  value: string;
  subValue?: string;
  icon: React.ReactNode;
  tooltip?: string;
}

function MetricCard({ title, value, subValue, icon, tooltip }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">{icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <p className="text-sm text-muted-foreground">{title}</p>
              {tooltip && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3 h-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <p className="text-xl font-bold">{value}</p>
            {subValue && (
              <p className="text-xs text-muted-foreground">{subValue}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Protocol() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Protocol</h1>
            <p className="text-muted-foreground">Protocol metrics and analytics</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <SkeletonChart />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Protocol</h1>
          <p className="text-muted-foreground">
            Protocol-wide metrics and analytics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" asChild>
            <a
              href="https://sepolia.etherscan.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Explorer
            </a>
          </Button>
        </div>
      </div>

      {/* KPI Cards - Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Available Treasury"
          value={protocolMetrics.availableTreasury}
          icon={<Building2 className="w-5 h-5 text-primary" />}
          tooltip="Total funds available in the protocol treasury"
        />
        <MetricCard
          title="Total CAPX Minted"
          value={protocolMetrics.totalMinted}
          icon={<Coins className="w-5 h-5 text-primary" />}
          tooltip="Maximum supply of CAPX tokens ever created"
        />
        <MetricCard
          title="Total CAPX Burned"
          value={protocolMetrics.totalBurned}
          icon={<Flame className="w-5 h-5 text-primary" />}
          tooltip="Total tokens permanently removed from supply"
        />
        <MetricCard
          title="Locked CAPX (Vesting)"
          value={protocolMetrics.lockedVesting}
          icon={<Lock className="w-5 h-5 text-primary" />}
          tooltip="Tokens locked in vesting schedules"
        />
      </div>

      {/* KPI Cards - Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Circulating CAPX"
          value={protocolMetrics.circulatingSupply}
          icon={<TrendingUp className="w-5 h-5 text-primary" />}
          tooltip="Tokens currently in circulation"
        />
        <MetricCard
          title="Active Wallets (30D)"
          value={protocolMetrics.activeWallets30d}
          icon={<Users className="w-5 h-5 text-primary" />}
          tooltip="Unique wallets with activity in last 30 days"
        />
        <MetricCard
          title="CAPX Market Price"
          value={protocolMetrics.marketPrice}
          icon={<DollarSign className="w-5 h-5 text-primary" />}
          tooltip="Current market price of CAPX"
        />
        <MetricCard
          title="CAPX Max Supply"
          value={protocolMetrics.maxSupply}
          icon={<Coins className="w-5 h-5 text-primary" />}
          tooltip="Maximum possible supply of CAPX tokens"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CAPX Supply Trend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">CAPX Supply Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Total Supply</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-muted-foreground">Burned</span>
              </div>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={supplyTrendData}>
                  <defs>
                    <linearGradient id="supplyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area type="monotone" dataKey="minted" stroke="hsl(var(--primary))" fill="url(#supplyGradient)" />
                  <Area type="monotone" dataKey="burned" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* CAPX Price Trend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">CAPX Price Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-2xl font-bold">{protocolMetrics.marketPrice}</p>
              <p className="text-xs text-muted-foreground">Current price</p>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceTrendData}>
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
                  <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Treasury Net Flow */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Treasury Net Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Inflow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                <span className="text-muted-foreground">Outflow</span>
              </div>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={treasuryFlowData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="inflow" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="outflow" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Staking TVL Over Time */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Staking TVL Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-2xl font-bold">$2.45M</p>
              <p className="text-xs text-muted-foreground">Current TVL</p>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stakingTvlData}>
                  <defs>
                    <linearGradient id="tvlGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, "TVL"]}
                  />
                  <Area type="monotone" dataKey="tvl" stroke="hsl(var(--primary))" fill="url(#tvlGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Burn Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Flame className="w-5 h-5 text-destructive" />
            Burn Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Burn Metrics */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground">Total Burned</p>
                <p className="text-2xl font-bold">{protocolMetrics.totalBurned}</p>
                <p className="text-xs text-muted-foreground">Since launch</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground">Burned (7D)</p>
                <p className="text-2xl font-bold">{protocolMetrics.burned7d}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground">Burn Rate (30D)</p>
                <p className="text-2xl font-bold">{protocolMetrics.burnRate30d}</p>
                <p className="text-xs text-muted-foreground">Of current supply</p>
              </div>
            </div>

            {/* Burn History Chart */}
            <div className="lg:col-span-2">
              <p className="text-sm font-medium mb-4">Burn History (7D)</p>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={burnHistoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value.toLocaleString()} CAPX`, "Burned"]}
                    />
                    <Bar dataKey="burned" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
