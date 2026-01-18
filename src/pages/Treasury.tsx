import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TreasuryChart } from "@/components/dashboard/TreasuryChart";
import {
  Landmark,
  TrendingUp,
  TrendingDown,
  PieChart,
  ExternalLink,
  Shield,
  Coins,
  BarChart3,
  Info,
} from "lucide-react";
import { SkeletonCard, SkeletonChart, SkeletonList } from "@/components/ui/skeleton-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TreasuryAsset {
  id: string;
  name: string;
  symbol: string;
  amount: string;
  value: string;
  percentage: number;
  change24h: number;
  explorerUrl: string;
}

const treasuryAssets: TreasuryAsset[] = [
  {
    id: "1",
    name: "CAPX Token",
    symbol: "CAPX",
    amount: "5,000,000",
    value: "$1,500,000",
    percentage: 64.1,
    change24h: 2.3,
    explorerUrl: "https://etherscan.io/token/",
  },
  {
    id: "2",
    name: "Ethereum",
    symbol: "ETH",
    amount: "245.5",
    value: "$490,000",
    percentage: 20.9,
    change24h: -1.2,
    explorerUrl: "https://etherscan.io/token/",
  },
  {
    id: "3",
    name: "USDC",
    symbol: "USDC",
    amount: "250,000",
    value: "$250,000",
    percentage: 10.7,
    change24h: 0.0,
    explorerUrl: "https://etherscan.io/token/",
  },
  {
    id: "4",
    name: "USDT",
    symbol: "USDT",
    amount: "100,000",
    value: "$100,000",
    percentage: 4.3,
    change24h: 0.0,
    explorerUrl: "https://etherscan.io/token/",
  },
];

const treasuryStats = {
  totalValue: "$2.34M",
  totalValueCapx: "5,850,000 CAPX",
  change24h: 1.8,
  stakingTvl: "$1.2M",
  stakingTvlCapx: "3,000,000 CAPX",
  vestingLocked: "$450K",
  vestingLockedCapx: "1,125,000 CAPX",
  rewardsPool: "875,000 CAPX",
  rewardsPoolUsd: "$350K",
};

interface TreasuryOperation {
  id: string;
  type: "Reward Distribution" | "Treasury Transfer" | "Fee Collected" | "Staking Deposit";
  amount: string;
  timestamp: string;
  txHash: string;
}

const recentOperations: TreasuryOperation[] = [
  {
    id: "1",
    type: "Reward Distribution",
    amount: "-25,000 CAPX",
    timestamp: "2 hours ago",
    txHash: "0x1234...abcd",
  },
  {
    id: "2",
    type: "Staking Deposit",
    amount: "+100,000 CAPX",
    timestamp: "5 hours ago",
    txHash: "0x5678...efgh",
  },
  {
    id: "3",
    type: "Fee Collected",
    amount: "+5,000 CAPX",
    timestamp: "1 day ago",
    txHash: "0x9abc...ijkl",
  },
  {
    id: "4",
    type: "Treasury Transfer",
    amount: "-50,000 CAPX",
    timestamp: "2 days ago",
    txHash: "0xdefg...mnop",
  },
];

const getOperationBadge = (type: TreasuryOperation["type"]) => {
  const styles: Record<TreasuryOperation["type"], string> = {
    "Reward Distribution": "bg-capx-purple/10 text-capx-purple",
    "Treasury Transfer": "bg-capx-warning/10 text-capx-warning",
    "Fee Collected": "bg-capx-success/10 text-capx-success",
    "Staking Deposit": "bg-primary/10 text-primary",
  };
  return <Badge variant="secondary" className={styles[type]}>{type}</Badge>;
};

export default function Treasury() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Treasury</h1>
            <p className="text-muted-foreground">On-chain transparent treasury management</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
        <SkeletonChart />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonList rows={4} />
          <SkeletonList rows={4} />
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Treasury</h1>
            <p className="text-muted-foreground">
              On-chain transparent treasury management
            </p>
          </div>
          <Button variant="outline" asChild>
            <a href="https://etherscan.io" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Explorer
            </a>
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Landmark className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-3 h-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Total USD value of all treasury assets</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-bold">{treasuryStats.totalValue}</p>
                    <span className="text-xs text-capx-success flex items-center">
                      <TrendingUp className="w-3 h-3 mr-0.5" />
                      {treasuryStats.change24h}%
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
                  <Shield className="w-5 h-5 text-capx-purple" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Staking TVL</p>
                  <p className="text-xl font-bold">{treasuryStats.stakingTvl}</p>
                  <p className="text-xs text-muted-foreground">{treasuryStats.stakingTvlCapx}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-capx-warning/10">
                  <Coins className="w-5 h-5 text-capx-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vesting Locked</p>
                  <p className="text-xl font-bold">{treasuryStats.vestingLocked}</p>
                  <p className="text-xs text-muted-foreground">{treasuryStats.vestingLockedCapx}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-capx-success/10">
                  <BarChart3 className="w-5 h-5 text-capx-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rewards Pool</p>
                  <p className="text-xl font-bold">{treasuryStats.rewardsPool}</p>
                  <p className="text-xs text-muted-foreground">{treasuryStats.rewardsPoolUsd}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Treasury Chart */}
        <TreasuryChart />

        {/* Assets & Operations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Treasury Assets */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Treasury Assets</CardTitle>
                <PieChart className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {treasuryAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">
                          {asset.symbol.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{asset.name}</p>
                          <a 
                            href={asset.explorerUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ExternalLink className="w-3 h-3 text-muted-foreground hover:text-primary" />
                          </a>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {asset.amount} {asset.symbol}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{asset.value}</p>
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs text-muted-foreground">
                          {asset.percentage}%
                        </span>
                        {asset.change24h !== 0 && (
                          <span
                            className={`text-xs flex items-center ${
                              asset.change24h > 0 ? "text-capx-success" : "text-capx-error"
                            }`}
                          >
                            {asset.change24h > 0 ? (
                              <TrendingUp className="w-3 h-3 mr-0.5" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-0.5" />
                            )}
                            {Math.abs(asset.change24h)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Operations */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Operations</CardTitle>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentOperations.map((op) => (
                  <div
                    key={op.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                  >
                    <div className="space-y-1">
                      {getOperationBadge(op.type)}
                      <p className="text-xs text-muted-foreground">{op.timestamp}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-medium ${
                          op.amount.startsWith("+") ? "text-capx-success" : "text-capx-error"
                        }`}
                      >
                        {op.amount}
                      </p>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                        <a href={`https://etherscan.io/tx/${op.txHash}`} target="_blank" rel="noopener noreferrer">
                          {op.txHash}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transparency Note */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Transparent Treasury Management</h4>
                <p className="text-sm text-muted-foreground">
                  All treasury operations are executed on-chain and can be verified by anyone. 
                  Balances on-chain • Pricing via oracle/API.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
