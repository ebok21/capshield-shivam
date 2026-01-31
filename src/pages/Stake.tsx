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
import {
  Layers,
  Lock,
  Unlock,
  Shield,
  Loader2,
  CheckCircle2,
  XCircle,
  TrendingUp,
  RotateCcw,
  Coins,
} from "lucide-react";
import { useWalletState } from "@/hooks/useWalletState";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { ConnectWalletPrompt, EmptyState } from "@/components/ui/connect-wallet-prompt";

interface StakingOption {
  id: string;
  name: string;
  lockDays: number;
  apy: string;
  shieldMultiplier: string;
  icon: React.ReactNode;
}

interface UserPosition {
  id: string;
  optionId: string;
  optionName: string;
  lockDays: number;
  stakedAmount: string;
  stakedAmountRaw: number;
  rewards: string;
  rewardsRaw: number;
  shieldEarned: string;
  stakedDate: string;
  unlockDate: string | null;
  canUnstake: boolean;
}

const stakingOptions: StakingOption[] = [
  {
    id: "flexible",
    name: "Flexible",
    lockDays: 0,
    apy: "8.5%",
    shieldMultiplier: "0x",
    icon: <Unlock className="w-5 h-5" />,
  },
  {
    id: "30day",
    name: "30 Day Lock",
    lockDays: 30,
    apy: "12.8%",
    shieldMultiplier: "1x",
    icon: <Lock className="w-5 h-5" />,
  },
  {
    id: "90day",
    name: "90 Day Lock",
    lockDays: 90,
    apy: "17.0%",
    shieldMultiplier: "2x",
    icon: <Lock className="w-5 h-5" />,
  },
  {
    id: "180day",
    name: "180 Day Lock",
    lockDays: 180,
    apy: "25.5%",
    shieldMultiplier: "4x",
    icon: <Lock className="w-5 h-5" />,
  },
];

const mockUserPositions: UserPosition[] = [
  {
    id: "1",
    optionId: "flexible",
    optionName: "Flexible",
    lockDays: 0,
    stakedAmount: "5,000 CAPX",
    stakedAmountRaw: 5000,
    rewards: "42.5 CAPX",
    rewardsRaw: 42.5,
    shieldEarned: "—",
    stakedDate: "Jan 10, 2024",
    unlockDate: null,
    canUnstake: true,
  },
  {
    id: "2",
    optionId: "30day",
    optionName: "30 Day Lock",
    lockDays: 30,
    stakedAmount: "8,000 CAPX",
    stakedAmountRaw: 8000,
    rewards: "85.3 CAPX",
    rewardsRaw: 85.3,
    shieldEarned: "85 SHIELD",
    stakedDate: "Jan 5, 2024",
    unlockDate: "Feb 4, 2024",
    canUnstake: true,
  },
  {
    id: "3",
    optionId: "90day",
    optionName: "90 Day Lock",
    lockDays: 90,
    stakedAmount: "12,000 CAPX",
    stakedAmountRaw: 12000,
    rewards: "170.0 CAPX",
    rewardsRaw: 170,
    shieldEarned: "340 SHIELD",
    stakedDate: "Dec 20, 2023",
    unlockDate: "Mar 19, 2024",
    canUnstake: false,
  },
];

type TxStatus = "idle" | "pending" | "success" | "failed";
type TxAction = "stake" | "claim" | "compound" | "unstake";

export default function Stake() {
  const { isConnected } = useWalletState();
  const [isLoading, setIsLoading] = useState(true);
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [userPositions, setUserPositions] = useState<UserPosition[]>(mockUserPositions);
  const [modalOpen, setModalOpen] = useState(false);
  const [txStatus, setTxStatus] = useState<TxStatus>("idle");
  const [txAction, setTxAction] = useState<TxAction>("stake");
  const [txDetails, setTxDetails] = useState<{ amount: string; option: string }>({
    amount: "",
    option: "",
  });

  const availableBalance = "12,450 CAPX";

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAmountChange = (optionId: string, value: string) => {
    setAmounts((prev) => ({ ...prev, [optionId]: value }));
  };

  const hasExistingPosition = (optionId: string) => {
    return userPositions.some((p) => p.optionId === optionId);
  };

  const handleStake = async (option: StakingOption) => {
    const amount = amounts[option.id];
    if (!amount) return;

    setTxAction("stake");
    setTxDetails({ amount: `${amount} CAPX`, option: option.name });
    setModalOpen(true);
    setTxStatus("pending");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    const success = Math.random() > 0.2;
    setTxStatus(success ? "success" : "failed");

    if (success) {
      setAmounts((prev) => ({ ...prev, [option.id]: "" }));
    }
  };

  const handleClaim = async (position: UserPosition) => {
    setTxAction("claim");
    setTxDetails({ amount: position.rewards, option: position.optionName });
    setModalOpen(true);
    setTxStatus("pending");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setTxStatus(Math.random() > 0.2 ? "success" : "failed");
  };

  const handleCompound = async (position: UserPosition) => {
    setTxAction("compound");
    setTxDetails({ amount: position.rewards, option: position.optionName });
    setModalOpen(true);
    setTxStatus("pending");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setTxStatus(Math.random() > 0.2 ? "success" : "failed");
  };

  const handleUnstake = async (position: UserPosition) => {
    const totalAmount = `${(position.stakedAmountRaw + position.rewardsRaw).toLocaleString()} CAPX`;
    setTxAction("unstake");
    setTxDetails({ amount: totalAmount, option: position.optionName });
    setModalOpen(true);
    setTxStatus("pending");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setTxStatus(Math.random() > 0.2 ? "success" : "failed");
  };

  const resetModal = () => {
    setModalOpen(false);
    setTxStatus("idle");
  };

  const getTxTitle = () => {
    switch (txAction) {
      case "stake":
        return "Stake CAPX";
      case "claim":
        return "Claim Rewards";
      case "compound":
        return "Compound Rewards";
      case "unstake":
        return "Unstake CAPX";
    }
  };

  const getTxSuccessMessage = () => {
    switch (txAction) {
      case "stake":
        return `Successfully staked ${txDetails.amount} in ${txDetails.option}`;
      case "claim":
        return `Successfully claimed ${txDetails.amount}`;
      case "compound":
        return `Successfully compounded ${txDetails.amount}`;
      case "unstake":
        return `Successfully unstaked ${txDetails.amount}`;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Stake</h1>
          <p className="text-muted-foreground">Stake your CAPX tokens</p>
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
      <div>
        <h1 className="text-2xl font-bold">Stake</h1>
        <p className="text-muted-foreground">
          Stake your CAPX tokens to earn rewards
        </p>
      </div>

      {!isConnected ? (
        <ConnectWalletPrompt
          title="Connect wallet to stake"
          description="Connect your wallet to stake CAPX tokens and earn rewards"
        />
      ) : (
        <>
          {/* Available Balance */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Available to stake:</span>
            <span className="font-medium">{availableBalance}</span>
          </div>

          {/* Staking Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stakingOptions.map((option) => {
              const hasPosition = hasExistingPosition(option.id);
              const amount = amounts[option.id] || "";

              return (
                <Card key={option.id} className="relative">
                  {hasPosition && (
                    <Badge
                      className="absolute -top-2 -right-2 bg-primary text-primary-foreground"
                    >
                      Active
                    </Badge>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          {option.icon}
                        </div>
                        <CardTitle className="text-base">{option.name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Stats */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">APY</span>
                        <span className="font-semibold text-primary">{option.apy}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">SHIELD</span>
                        <span className="font-medium">{option.shieldMultiplier}</span>
                      </div>
                      {option.lockDays > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Lock</span>
                          <span className="font-medium">{option.lockDays} days</span>
                        </div>
                      )}
                    </div>

                    {/* Amount Input */}
                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => handleAmountChange(option.id, e.target.value)}
                          className="pr-16"
                          disabled={hasPosition}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 text-xs"
                          onClick={() => handleAmountChange(option.id, "12450")}
                          disabled={hasPosition}
                        >
                          MAX
                        </Button>
                      </div>

                      <Button
                        className="w-full"
                        disabled={!amount || hasPosition}
                        onClick={() => handleStake(option)}
                      >
                        {hasPosition ? "Position Active" : "Stake"}
                      </Button>

                      {hasPosition && (
                        <p className="text-xs text-muted-foreground text-center">
                          You already have a {option.name.toLowerCase()} position
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* User Positions */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Your Positions</h2>

            {userPositions.length === 0 ? (
              <EmptyState
                icon={<Layers className="w-6 h-6" />}
                title="No active positions"
                description="Stake CAPX tokens above to start earning rewards"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userPositions.map((position) => (
                  <Card key={position.id}>
                    <CardContent className="pt-6">
                      {/* Position Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            {position.lockDays === 0 ? (
                              <Unlock className="w-4 h-4" />
                            ) : (
                              <Lock className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{position.optionName}</p>
                            <p className="text-xs text-muted-foreground">
                              Staked {position.stakedDate}
                            </p>
                          </div>
                        </div>
                        {!position.canUnstake && (
                          <Badge variant="secondary" className="text-xs">
                            Locked
                          </Badge>
                        )}
                      </div>

                      {/* Position Stats */}
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Staked</span>
                          <span className="font-semibold">{position.stakedAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Rewards</span>
                          <span className="font-semibold text-primary">{position.rewards}</span>
                        </div>
                        {position.shieldEarned !== "—" && (
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Shield className="w-3 h-3" />
                              SHIELD
                            </span>
                            <span className="font-medium">{position.shieldEarned}</span>
                          </div>
                        )}
                        {position.unlockDate && (
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Unlocks</span>
                            <span className="text-sm">{position.unlockDate}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleClaim(position)}
                          disabled={position.rewardsRaw === 0}
                        >
                          <Coins className="w-4 h-4 mr-1" />
                          Claim
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleCompound(position)}
                          disabled={position.rewardsRaw === 0}
                        >
                          <RotateCcw className="w-4 h-4 mr-1" />
                          Compound
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleUnstake(position)}
                          disabled={!position.canUnstake}
                        >
                          <TrendingUp className="w-4 h-4 mr-1" />
                          Unstake
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Transaction Modal */}
      <Dialog open={modalOpen} onOpenChange={resetModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{getTxTitle()}</DialogTitle>
            <DialogDescription>
              {txDetails.option} • {txDetails.amount}
            </DialogDescription>
          </DialogHeader>

          {txStatus === "pending" ? (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
              <p className="text-muted-foreground">Processing transaction...</p>
            </div>
          ) : txStatus === "success" ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Success!</h3>
                <p className="text-sm text-muted-foreground">{getTxSuccessMessage()}</p>
              </div>
              <Button onClick={resetModal} className="w-full">
                Close
              </Button>
            </div>
          ) : txStatus === "failed" ? (
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
                <Button onClick={() => setTxStatus("pending")} className="flex-1">
                  Try Again
                </Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
