import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TreasuryChart } from "@/components/dashboard/TreasuryChart";
import { ParticipationChart } from "@/components/dashboard/ParticipationChart";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  PieChart,
  Activity,
  Layers,
  Gift,
  ArrowLeftRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPie,
  Pie,
  Cell,
} from "recharts";

const monthlyData = [
  { month: "Jul", staked: 12000, rewards: 450, transactions: 34 },
  { month: "Aug", staked: 15000, rewards: 620, transactions: 42 },
  { month: "Sep", staked: 18500, rewards: 780, transactions: 51 },
  { month: "Oct", staked: 22000, rewards: 920, transactions: 48 },
  { month: "Nov", staked: 19500, rewards: 850, transactions: 55 },
  { month: "Dec", staked: 24000, rewards: 1100, transactions: 67 },
];

const distributionData = [
  { name: "Staking", value: 45, color: "hsl(var(--primary))" },
  { name: "Vesting", value: 25, color: "hsl(var(--capx-purple))" },
  { name: "Rewards", value: 18, color: "hsl(var(--capx-success))" },
  { name: "Available", value: 12, color: "hsl(var(--muted))" },
];

const analyticsStats = {
  totalVolume: "$45,230",
  volumeChange: 12.5,
  avgTransactionSize: "1,250 CAPX",
  transactionChange: -3.2,
  activeStakingDays: 145,
  rewardMultiplier: "1.8x",
};

export default function Analytics() {
  return (
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
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
                <Gift className="w-5 h-5 text-capx-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reward Multiplier</p>
                <p className="text-xl font-bold">{analyticsStats.rewardMultiplier}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TreasuryChart />
        <ParticipationChart />
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
                <Tooltip
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

      {/* Portfolio Distribution & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">CAPX Distribution</CardTitle>
              <PieChart className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
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
                    <Tooltip
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
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {distributionData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                  <span className="text-sm font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">ROI (All Time)</span>
                  <span className="text-lg font-bold text-capx-success">+24.5%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[75%] bg-gradient-to-r from-primary to-capx-success rounded-full" />
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Staking Efficiency</span>
                  <span className="text-lg font-bold text-capx-purple">92%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[92%] bg-gradient-to-r from-capx-purple to-capx-pink rounded-full" />
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Reward Capture Rate</span>
                  <span className="text-lg font-bold text-capx-warning">78%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[78%] bg-gradient-to-r from-capx-warning to-capx-success rounded-full" />
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Participation Score</span>
                  <span className="text-lg font-bold text-primary">85/100</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[85%] bg-gradient-to-r from-primary to-capx-cyan rounded-full" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
