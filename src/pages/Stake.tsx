import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layers, TrendingUp, Clock, AlertCircle, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useWalletState } from "@/hooks/useWalletState";
import { SkeletonCard, SkeletonList } from "@/components/ui/skeleton-card";
import { ConnectWalletPrompt } from "@/components/ui/connect-wallet-prompt";

interface Pool {
  id: string;
  name: string;
  description: string;
  totalStaked: string;
  myStake: string;
  apy: string;
  lockPeriod: string;
  minStake: string;
  status: "active" | "full" | "coming-soon";
}

const pools: Pool[] = [
  {
    id: "1",
    name: "Crypto Pool",
    description: "Stake to back crypto-focused deals",
    totalStaked: "1,250,000 CAPX",
    myStake: "5,000 CAPX",
    apy: "12.5%",
    lockPeriod: "30 days",
    minStake: "100 CAPX",
    status: "active",
  },
  {
    id: "2",
    name: "Markets Pool",
    description: "Participate in traditional market opportunities",
    totalStaked: "890,000 CAPX",
    myStake: "3,200 CAPX",
    apy: "10.2%",
    lockPeriod: "60 days",
    minStake: "250 CAPX",
    status: "active",
  },
  {
    id: "3",
    name: "Real Assets Pool",
    description: "Back real-world asset tokenization",
    totalStaked: "560,000 CAPX",
    myStake: "2,800 CAPX",
    apy: "8.8%",
    lockPeriod: "90 days",
    minStake: "500 CAPX",
    status: "active",
  },
  {
    id: "4",
    name: "Innovation Pool",
    description: "High-risk, high-reward emerging tech deals",
    totalStaked: "320,000 CAPX",
    myStake: "1,500 CAPX",
    apy: "15.0%",
    lockPeriod: "14 days",
    minStake: "100 CAPX",
    status: "active",
  },
  {
    id: "5",
    name: "Business Pool",
    description: "Support SME financing initiatives",
    totalStaked: "445,000 CAPX",
    myStake: "2,000 CAPX",
    apy: "9.5%",
    lockPeriod: "45 days",
    minStake: "200 CAPX",
    status: "active",
  },
  {
    id: "6",
    name: "Lifestyle Pool",
    description: "Consumer and lifestyle brand partnerships",
    totalStaked: "180,000 CAPX",
    myStake: "1,200 CAPX",
    apy: "7.2%",
    lockPeriod: "21 days",
    minStake: "50 CAPX",
    status: "active",
  },
];

const myStakingSummary = {
  totalStaked: "15,700 CAPX",
  totalStakedUsd: "$6,280",
  totalRewards: "1,245 CAPX",
  claimableRewards: "312 CAPX",
  averageApy: "10.8%",
};

type TxStatus = "idle" | "pending" | "success" | "failed";

export default function Stake() {
  const { isConnected } = useWalletState();
  const [isLoading, setIsLoading] = useState(true);
  const [stakeModalOpen, setStakeModalOpen] = useState(false);
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [modalMode, setModalMode] = useState<"stake" | "unstake">("stake");
  const [amount, setAmount] = useState("");
  const [txStatus, setTxStatus] = useState<TxStatus>("idle");

  const availableBalance = "12,450 CAPX";

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const openStakeModal = (pool: Pool, mode: "stake" | "unstake") => {
    setSelectedPool(pool);
    setModalMode(mode);
    setAmount("");
    setTxStatus("idle");
    setStakeModalOpen(true);
  };

  const handleTransaction = async () => {
    setTxStatus("pending");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Simulate success/failure
    const success = Math.random() > 0.2;
    setTxStatus(success ? "success" : "failed");
  };

  const resetModal = () => {
    setStakeModalOpen(false);
    setAmount("");
    setTxStatus("idle");
    setSelectedPool(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Stake</h1>
            <p className="text-muted-foreground">Stake your CAPX tokens to earn rewards</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
        <SkeletonList rows={6} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Stake</h1>
          <p className="text-muted-foreground">
            Stake your CAPX tokens to earn rewards and back deals
          </p>
        </div>
        {isConnected && (
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={() => {
              setSelectedPool(pools[0]);
              setModalMode("stake");
              setStakeModalOpen(true);
            }}
          >
            <Layers className="w-4 h-4 mr-2" />
            Quick Stake
          </Button>
        )}
      </div>

      {!isConnected ? (
        <ConnectWalletPrompt 
          title="Connect wallet to stake"
          description="Connect your wallet to stake CAPX tokens and earn rewards"
        />
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Layers className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Staked</p>
                    <p className="text-xl font-bold">{myStakingSummary.totalStaked}</p>
                    <p className="text-xs text-muted-foreground">{myStakingSummary.totalStakedUsd}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-capx-success/10">
                    <TrendingUp className="w-5 h-5 text-capx-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Rewards</p>
                    <p className="text-xl font-bold">{myStakingSummary.totalRewards}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-capx-warning/10">
                    <Clock className="w-5 h-5 text-capx-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Claimable Rewards</p>
                    <p className="text-xl font-bold text-capx-success">{myStakingSummary.claimableRewards}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-capx-purple/10">
                    <TrendingUp className="w-5 h-5 text-capx-purple" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Average APY</p>
                    <p className="text-xl font-bold">{myStakingSummary.averageApy}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Staking Pools */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Staking Pools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {pools.map((pool) => (
                  <Card key={pool.id} className="border border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{pool.name}</h4>
                            <Badge
                              variant={pool.status === "active" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {pool.status === "active" ? "Active" : pool.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{pool.description}</p>
                        </div>
                        <span className="text-lg font-bold text-capx-success">{pool.apy}</span>
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground">My Stake</p>
                            <p className="font-medium">{pool.myStake}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Lock Period</p>
                            <p className="font-medium">{pool.lockPeriod}</p>
                          </div>
                        </div>

                        <div className="text-sm">
                          <p className="text-xs text-muted-foreground">Total in Pool</p>
                          <p className="font-medium">{pool.totalStaked}</p>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => openStakeModal(pool, "stake")}
                          >
                            Stake
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => openStakeModal(pool, "unstake")}
                          >
                            Unstake
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="stake" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="stake">Stake CAPX</TabsTrigger>
                  <TabsTrigger value="unstake">Unstake CAPX</TabsTrigger>
                </TabsList>
                <TabsContent value="stake" className="mt-4">
                  <div className="max-w-md space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Amount to Stake</label>
                      <div className="relative">
                        <Input type="number" placeholder="0.00" className="pr-20" />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 text-xs"
                        >
                          MAX
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Available: {availableBalance}
                      </p>
                    </div>
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                      <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <p className="text-xs text-muted-foreground">
                        Staked tokens will be locked for the pool's duration. Early unstaking may incur penalties.
                      </p>
                    </div>
                    <Button className="w-full">Stake CAPX</Button>
                  </div>
                </TabsContent>
                <TabsContent value="unstake" className="mt-4">
                  <div className="max-w-md space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Amount to Unstake</label>
                      <div className="relative">
                        <Input type="number" placeholder="0.00" className="pr-20" />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 text-xs"
                        >
                          MAX
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Available to unstake: 8,200 CAPX
                      </p>
                    </div>
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-capx-warning/10">
                      <AlertCircle className="w-4 h-4 text-capx-warning mt-0.5" />
                      <p className="text-xs text-capx-warning">
                        Some tokens are still locked. Check individual pool lock periods.
                      </p>
                    </div>
                    <Button variant="outline" className="w-full">Unstake CAPX</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}

      {/* Stake/Unstake Modal */}
      <Dialog open={stakeModalOpen} onOpenChange={resetModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {modalMode === "stake" ? "Stake CAPX" : "Unstake CAPX"}
            </DialogTitle>
            <DialogDescription>
              {selectedPool?.name} • {selectedPool?.apy} APY • {selectedPool?.lockPeriod} lock
            </DialogDescription>
          </DialogHeader>

          {txStatus === "idle" || txStatus === "pending" ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Amount</label>
                <div className="relative">
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="pr-20 text-lg"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={txStatus === "pending"}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 text-xs"
                    onClick={() => setAmount(modalMode === "stake" ? "12450" : "5000")}
                    disabled={txStatus === "pending"}
                  >
                    MAX
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Available: {modalMode === "stake" ? availableBalance : selectedPool?.myStake}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-muted/30 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lock Period</span>
                  <span>{selectedPool?.lockPeriod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">APY</span>
                  <span className="text-capx-success">{selectedPool?.apy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Min Stake</span>
                  <span>{selectedPool?.minStake}</span>
                </div>
              </div>

              {modalMode === "stake" && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                  <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Staked tokens will be locked for {selectedPool?.lockPeriod}. Early unstaking may incur penalties.
                  </p>
                </div>
              )}

              <Button 
                className="w-full" 
                onClick={handleTransaction}
                disabled={!amount || txStatus === "pending"}
              >
                {txStatus === "pending" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Confirming...
                  </>
                ) : (
                  `${modalMode === "stake" ? "Stake" : "Unstake"} CAPX`
                )}
              </Button>
            </div>
          ) : txStatus === "success" ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-capx-success/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-capx-success" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Transaction Successful!</h3>
                <p className="text-sm text-muted-foreground">
                  You have {modalMode === "stake" ? "staked" : "unstaked"} {amount} CAPX
                </p>
              </div>
              <Button onClick={resetModal} className="w-full">Done</Button>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-capx-error/10 flex items-center justify-center mx-auto">
                <XCircle className="w-8 h-8 text-capx-error" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Transaction Failed</h3>
                <p className="text-sm text-muted-foreground">
                  Something went wrong. Please try again.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={resetModal} className="flex-1">Cancel</Button>
                <Button onClick={() => setTxStatus("idle")} className="flex-1">Try Again</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
