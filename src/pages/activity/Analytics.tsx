import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  BarChart3,
  TrendingUp,
  TrendingDown,
  PieChart,
  Activity,
  ArrowLeftRight,
  Flame,
  Info,
  Clock,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  PieChart as RechartsPie,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { useWalletState } from "@/hooks/useWalletState";
import { SkeletonCard, SkeletonChart } from "@/components/ui/skeleton-card";
import { ConnectWalletPrompt } from "@/components/ui/connect-wallet-prompt";

const monthlyData = [
  { month: "Jul", staked: 12000, rewards: 450 },
  { month: "Aug", staked: 15000, rewards: 620 },
  { month: "Sep", staked: 18500, rewards: 780 },
  { month: "Oct", staked: 22000, rewards: 920 },
  { month: "Nov", staked: 19500, rewards: 850 },
  { month: "Dec", staked: 24000, rewards: 1100 },
];

const distributionData = [
  { name: "Wallet", value: 12, color: "hsl(var(--muted-foreground))" },
  { name: "Staked", value: 45, color: "hsl(var(--primary))" },
  { name: "Vesting Locked", value: 25, color: "hsl(var(--capx-purple))" },
  { name: "Claimable Rewards", value: 18, color: "hsl(var(--capx-success))" },
];

const analyticsStats = {
  totalVolume: "$45,230",
  volumeChange: 12.5,
  avgTransactionSize: "1,250 CAPX",
  transactionChange: -3.2,
  activeStakingDays: 145,
  roi: "+24.5%",
};

// Burn Dashboard Data
const burnData = {
  totalBurned: "12,500,000 CAPX",
  totalBurnedUsd: "$5.0M",
  burned7d: "125,000 CAPX",
  burned7dUsd: "$50K",
  burnRate7d: "0.25%",
  lastBurnTimestamp: "2 hours ago",
};

const burnHistory = [
  { date: "Jan 12", burned: 15000 },
  { date: "Jan 13", burned: 22000 },
  { date: "Jan 14", burned: 18000 },
  { date: "Jan 15", burned: 25000 },
  { date: "Jan 16", burned: 20000 },
  { date: "Jan 17", burned: 12000 },
  { date: "Jan 18", burned: 13000 },
];

export default function Analytics() {
  const { isConnected } = useWalletState();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Insights into your CAPX activity</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
        <SkeletonChart />
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">
              Insights into your CAPX activity and performance
            </p>
          </div>
          <Select defaultValue="30d">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="burn">Burn Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {!isConnected ? (
              <ConnectWalletPrompt 
                title="Connect wallet to view analytics"
                description="Connect your wallet to see your personal analytics and performance metrics"
              />
            ) : (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <BarChart3 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="text-sm text-muted-foreground">Total Volume</p>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="w-3 h-3 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Total USD volume of all your transactions</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-xl font-bold">{analyticsStats.totalVolume}</p>
                            <span className="text-xs text-capx-success flex items-center">
                              <TrendingUp className="w-3 h-3 mr-0.5" />
                              {analyticsStats.volumeChange}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-capx-purple/10">
                          <ArrowLeftRight className="w-5 h-5 text-capx-purple" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Avg Transaction</p>
                          <div className="flex items-center gap-2">
                            <p className="text-xl font-bold">{analyticsStats.avgTransactionSize}</p>
                            <span className="text-xs text-capx-error flex items-center">
                              <TrendingDown className="w-3 h-3 mr-0.5" />
                              {Math.abs(analyticsStats.transactionChange)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-capx-success/10">
                          <Activity className="w-5 h-5 text-capx-success" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Active Staking Days</p>
                          <p className="text-xl font-bold">{analyticsStats.activeStakingDays}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-capx-warning/10">
                          <TrendingUp className="w-5 h-5 text-capx-warning" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="text-sm text-muted-foreground">ROI (All Time)</p>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="w-3 h-3 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Total return on investment from staking rewards</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <p className="text-xl font-bold text-capx-success">{analyticsStats.roi}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Monthly Activity Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Monthly Activity</CardTitle>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          <span className="text-muted-foreground">Staked</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-capx-success" />
                          <span className="text-muted-foreground">Rewards</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData}>
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
                          <Bar dataKey="staked" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="rewards" fill="hsl(var(--capx-success))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Distribution */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">CAPX Distribution</CardTitle>
                      <PieChart className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                      <div className="h-[250px] w-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPie>
                            <Pie
                              data={distributionData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {distributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <RechartsTooltip
                              contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                              }}
                              formatter={(value: number) => [`${value}%`, "Allocation"]}
                            />
                          </RechartsPie>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        {distributionData.map((item) => (
                          <div key={item.name} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <div>
                              <p className="text-sm text-muted-foreground">{item.name}</p>
                              <p className="text-lg font-semibold">{item.value}%</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="burn" className="space-y-6 mt-6">
            {/* Burn Dashboard - Public data, no wallet required */}
            
            {/* Burn Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-capx-error/10">
                      <Flame className="w-5 h-5 text-capx-error" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-sm text-muted-foreground">Total Burned</p>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-3 h-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Total CAPX permanently removed from supply since launch</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <p className="text-xl font-bold">{burnData.totalBurned}</p>
                      <p className="text-xs text-muted-foreground">{burnData.totalBurnedUsd}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-capx-warning/10">
                      <Flame className="w-5 h-5 text-capx-warning" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-sm text-muted-foreground">Burned (7D)</p>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-3 h-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Total CAPX burned in the last 7 days</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <p className="text-xl font-bold">{burnData.burned7d}</p>
                      <p className="text-xs text-muted-foreground">{burnData.burned7dUsd}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-capx-purple/10">
                      <TrendingDown className="w-5 h-5 text-capx-purple" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-sm text-muted-foreground">Burn Rate</p>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-3 h-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Burned CAPX as percentage of current supply (7D)</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <p className="text-xl font-bold">{burnData.burnRate7d}</p>
                      <p className="text-xs text-muted-foreground">of current supply</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Burn Chart */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">Burn History (7D)</CardTitle>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>Last updated: {burnData.lastBurnTimestamp}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-capx-error" />
                    <span className="text-sm text-muted-foreground">CAPX Burned</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={burnHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`${value.toLocaleString()} CAPX`, "Burned"]}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="burned" 
                        stroke="hsl(var(--capx-error))" 
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--capx-error))", strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Burn Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Flame className="w-5 h-5 text-capx-error mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">CAPX Deflationary Mechanism</h4>
                    <p className="text-sm text-muted-foreground">
                      CAPX tokens are permanently removed from circulation through protocol fees and scheduled burns. 
                      This reduces the total supply over time, contributing to the token's deflationary nature. 
                      All burn transactions are verifiable on-chain.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
}
