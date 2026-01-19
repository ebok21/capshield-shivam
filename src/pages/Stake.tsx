import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Layers,
  TrendingUp,
  Clock,
  AlertCircle,
  Loader2,
  CheckCircle2,
  XCircle,
  Shield,
  Lock,
  Unlock,
} from "lucide-react";
import { useWalletState } from "@/hooks/useWalletState";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { ConnectWalletPrompt } from "@/components/ui/connect-wallet-prompt";

const stakingData = {
  totalStaked: "15,700 CAPX",
  totalStakedUsd: "$6,280",
  claimableRewards: "312 CAPX",
  claimableRewardsUsd: "$125",
  shieldEarned: "1,245 SHIELD",
  currentApy: "8.5%",
  lockedApy: "12.5%",
  poolTvl: "2,450,000 CAPX",
};

const lockDurations = [
  { value: "7", label: "7 days", apyBoost: "1.2x", shieldMultiplier: "0.5x" },
  { value: "30", label: "30 days", apyBoost: "1.5x", shieldMultiplier: "1x" },
  { value: "90", label: "90 days", apyBoost: "2x", shieldMultiplier: "2x" },
  { value: "180", label: "180 days", apyBoost: "3x", shieldMultiplier: "4x" },
];

type TxStatus = "idle" | "pending" | "success" | "failed";

export default function Stake() {
  const { isConnected } = useWalletState();
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"stake" | "unstake">("stake");
  const [amount, setAmount] = useState("");
  const [lockTokens, setLockTokens] = useState(false);
  const [lockDuration, setLockDuration] = useState("30");
  const [txStatus, setTxStatus] = useState<TxStatus>("idle");

  const availableBalance = "12,450 CAPX";

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const openModal = (mode: "stake" | "unstake") => {
    setModalMode(mode);
    setAmount("");
    setTxStatus("idle");
    setLockTokens(false);
    setModalOpen(true);
  };

  const handleTransaction = async () => {
    setTxStatus("pending");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const success = Math.random() > 0.2;
    setTxStatus(success ? "success" : "failed");
  };

  const resetModal = () => {
    setModalOpen(false);
    setAmount("");
    setTxStatus("idle");
    setLockTokens(false);
  };

  const selectedLock = lockDurations.find((d) => d.value === lockDuration);
  const estimatedApy = lockTokens
    ? `${(8.5 * parseFloat(selectedLock?.apyBoost || "1")).toFixed(1)}%`
    : stakingData.currentApy;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Stake</h1>
            <p className="text-muted-foreground">Stake your CAPX tokens</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
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
            Stake your CAPX tokens to earn rewards
          </p>
        </div>
        {isConnected && (
          <Button
            className="bg-primary hover:bg-primary/90"
            onClick={() => openModal("stake")}
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
                    <p className="text-xl font-bold">{stakingData.totalStaked}</p>
                    <p className="text-xs text-muted-foreground">{stakingData.totalStakedUsd}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Claimable Rewards</p>
                    <p className="text-xl font-bold text-primary">{stakingData.claimableRewards}</p>
                    <p className="text-xs text-muted-foreground">{stakingData.claimableRewardsUsd}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">SHIELD Earned</p>
                    <p className="text-xl font-bold">{stakingData.shieldEarned}</p>
                    <p className="text-xs text-muted-foreground">From locked staking</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pool TVL</p>
                    <p className="text-xl font-bold">{stakingData.poolTvl}</p>
                    <p className="text-xs text-muted-foreground">Total value locked</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Staking Interface */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">CAPX Staking Pool</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="stake" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="stake">Stake CAPX</TabsTrigger>
                  <TabsTrigger value="unstake">Unstake CAPX</TabsTrigger>
                </TabsList>

                <TabsContent value="stake" className="mt-6">
                  <div className="max-w-lg space-y-6">
                    {/* Amount Input */}
                    <div>
                      <Label className="mb-2 block">Amount to Stake</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="0.00"
                          className="pr-20"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 text-xs"
                          onClick={() => setAmount("12450")}
                        >
                          MAX
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Available: {availableBalance}
                      </p>
                    </div>

                    {/* Lock Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        {lockTokens ? (
                          <Lock className="w-5 h-5 text-primary" />
                        ) : (
                          <Unlock className="w-5 h-5 text-muted-foreground" />
                        )}
                        <div>
                          <p className="font-medium">Lock tokens?</p>
                          <p className="text-xs text-muted-foreground">
                            {lockTokens
                              ? "Higher APY + earn SHIELD governance tokens"
                              : "Lower APY, withdraw anytime"}
                          </p>
                        </div>
                      </div>
                      <Switch checked={lockTokens} onCheckedChange={setLockTokens} />
                    </div>

                    {/* Lock Duration (only if lock enabled) */}
                    {lockTokens && (
                      <div>
                        <Label className="mb-2 block">Lock Duration</Label>
                        <Select value={lockDuration} onValueChange={setLockDuration}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {lockDurations.map((duration) => (
                              <SelectItem key={duration.value} value={duration.value}>
                                {duration.label} ({duration.apyBoost} APY, {duration.shieldMultiplier} SHIELD)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Summary */}
                    <div className="p-4 rounded-lg bg-muted/30 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mode</span>
                        <span className="flex items-center gap-1">
                          {lockTokens ? (
                            <>
                              <Lock className="w-3 h-3" />
                              Locked ({selectedLock?.label})
                            </>
                          ) : (
                            <>
                              <Unlock className="w-3 h-3" />
                              Flexible
                            </>
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Estimated APY</span>
                        <span className="text-primary font-medium">{estimatedApy}</span>
                      </div>
                      {lockTokens && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">SHIELD Multiplier</span>
                          <span className="font-medium">{selectedLock?.shieldMultiplier}</span>
                        </div>
                      )}
                    </div>

                    {lockTokens && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                        <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                          Locked tokens cannot be withdrawn until the lock period ends.
                        </p>
                      </div>
                    )}

                    <Button className="w-full" disabled={!amount}>
                      Stake CAPX
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="unstake" className="mt-6">
                  <div className="max-w-lg space-y-6">
                    <div>
                      <Label className="mb-2 block">Amount to Unstake</Label>
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
                        Available to unstake: 8,200 CAPX (flexible)
                      </p>
                    </div>

                    <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                      <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <p className="text-xs text-muted-foreground">
                        7,500 CAPX is currently locked and cannot be unstaked until the lock period ends.
                      </p>
                    </div>

                    <Button variant="outline" className="w-full">
                      Unstake CAPX
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Claim Rewards */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">Claimable Rewards</p>
                  <p className="text-2xl font-bold text-primary">{stakingData.claimableRewards}</p>
                  <p className="text-sm text-muted-foreground">{stakingData.claimableRewardsUsd}</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  Claim Rewards
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Stake Modal */}
      <Dialog open={modalOpen} onOpenChange={resetModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {modalMode === "stake" ? "Stake CAPX" : "Unstake CAPX"}
            </DialogTitle>
            <DialogDescription>
              {modalMode === "stake"
                ? "Enter the amount to stake"
                : "Enter the amount to unstake"}
            </DialogDescription>
          </DialogHeader>

          {txStatus === "idle" || txStatus === "pending" ? (
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">Amount</Label>
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
                    onClick={() => setAmount("12450")}
                    disabled={txStatus === "pending"}
                  >
                    MAX
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Available: {availableBalance}
                </p>
              </div>

              <Button
                className="w-full"
                onClick={handleTransaction}
                disabled={!amount || txStatus === "pending"}
              >
                {txStatus === "pending" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : modalMode === "stake" ? (
                  "Stake CAPX"
                ) : (
                  "Unstake CAPX"
                )}
              </Button>
            </div>
          ) : txStatus === "success" ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Transaction Successful!</h3>
                <p className="text-sm text-muted-foreground">
                  {modalMode === "stake"
                    ? `You've staked ${amount} CAPX`
                    : `You've unstaked ${amount} CAPX`}
                </p>
              </div>
              <Button onClick={resetModal} className="w-full">
                Close
              </Button>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
                <XCircle className="w-8 h-8 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Transaction Failed</h3>
                <p className="text-sm text-muted-foreground">
                  Something went wrong. Please try again.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={resetModal} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={() => setTxStatus("idle")}
                  className="flex-1"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
