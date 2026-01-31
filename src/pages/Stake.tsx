import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Layers,
  Loader2,
  CheckCircle2,
  XCircle,
  Lock,
  Unlock,
  TrendingUp,
  RefreshCw,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useWalletState } from "@/hooks/useWalletState";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { ConnectWalletPrompt, EmptyState } from "@/components/ui/connect-wallet-prompt";

interface LockOption {
  id: string;
  label: string;
  days: number;
  apr: string;
}

interface UserPosition {
  id: string;
  lockType: string;
  lockDays: number;
  stakedAmount: string;
  stakedAmountUsd: string;
  claimableRewards: string;
  claimableRewardsUsd: string;
  apr: string;
  unlockDate?: string;
  isLocked: boolean;
}

const lockOptions: LockOption[] = [
  { id: "flexible", label: "Flexible", days: 0, apr: "8.5%" },
  { id: "30day", label: "30 Days", days: 30, apr: "12.5%" },
  { id: "90day", label: "90 Days", days: 90, apr: "17.0%" },
  { id: "180day", label: "180 Days", days: 180, apr: "25.5%" },
];

const mockUserPositions: UserPosition[] = [
  {
    id: "1",
    lockType: "flexible",
    lockDays: 0,
    stakedAmount: "5,000 CAPX",
    stakedAmountUsd: "$2,000",
    claimableRewards: "42 CAPX",
    claimableRewardsUsd: "$16.80",
    apr: "8.5%",
    isLocked: false,
  },
  {
    id: "2",
    lockType: "90day",
    lockDays: 90,
    stakedAmount: "10,000 CAPX",
    stakedAmountUsd: "$4,000",
    claimableRewards: "125 CAPX",
    claimableRewardsUsd: "$50.00",
    apr: "17.0%",
    unlockDate: "Apr 15, 2024",
    isLocked: true,
  },
];

type TxStatus = "idle" | "pending" | "success" | "failed";
type TxAction = "stake" | "claim" | "compound" | "unstake";

export default function Stake() {
  const { isConnected } = useWalletState();
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [selectedLock, setSelectedLock] = useState<string | null>(null);
  const [userPositions] = useState<UserPosition[]>(mockUserPositions);

  const [modalOpen, setModalOpen] = useState(false);
  const [txStatus, setTxStatus] = useState<TxStatus>("idle");
  const [txAction, setTxAction] = useState<TxAction>("stake");
  const [txAmount, setTxAmount] = useState("");

  const availableBalance = "12,450 CAPX";

  // Lock types that user already has positions in
  const activeLockTypes = userPositions.map((p) => p.lockType);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const selectedOption = lockOptions.find((o) => o.id === selectedLock);

  const handleStake = () => {
    if (!amount || !selectedLock) return;
    setTxAction("stake");
    setTxAmount(amount);
    setTxStatus("pending");
    setModalOpen(true);

    setTimeout(() => {
      const success = Math.random() > 0.2;
      setTxStatus(success ? "success" : "failed");
    }, 2000);
  };

  const handlePositionAction = (action: TxAction, position: UserPosition) => {
    setTxAction(action);
    setTxAmount(
      action === "unstake"
        ? `${position.stakedAmount} + ${position.claimableRewards}`
        : position.claimableRewards
    );
    setTxStatus("pending");
    setModalOpen(true);

    setTimeout(() => {
      const success = Math.random() > 0.2;
      setTxStatus(success ? "success" : "failed");
    }, 2000);
  };

  const resetModal = () => {
    setModalOpen(false);
    setTxStatus("idle");
    setTxAmount("");
  };

  const getLockLabel = (lockDays: number) => {
    if (lockDays === 0) return "Flexible";
    return `${lockDays} Day Lock`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Stake</h1>
          <p className="text-muted-foreground">Stake your CAPX tokens</p>
        </div>
        <SkeletonCard />
        <SkeletonCard />
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
          {/* Staking Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stake CAPX</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount Input */}
              <div>
                <Label className="mb-2 block">Amount</Label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="pr-20 text-lg"
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

              {/* APR Display */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <span className="text-muted-foreground">Estimated APR</span>
                <span className="text-2xl font-bold text-primary">
                  {selectedOption?.apr || "—"}
                </span>
              </div>

              {/* Lock Options */}
              <div>
                <Label className="mb-3 block">Lock Period</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {lockOptions.map((option) => {
                    const isActive = activeLockTypes.includes(option.id);
                    const isSelected = selectedLock === option.id;

                    return (
                      <button
                        key={option.id}
                        onClick={() => !isActive && setSelectedLock(option.id)}
                        disabled={isActive}
                        className={cn(
                          "relative p-4 rounded-lg border-2 transition-all text-left",
                          isActive
                            ? "border-border bg-muted/50 opacity-50 cursor-not-allowed"
                            : isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50 cursor-pointer"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {option.days === 0 ? (
                            <Unlock className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <Lock className="w-4 h-4 text-muted-foreground" />
                          )}
                          <span className="font-medium">{option.label}</span>
                        </div>
                        <p className="text-lg font-bold text-primary">
                          {option.apr}
                        </p>
                        {isActive && (
                          <span className="absolute top-2 right-2 text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                            Active
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stake Button */}
              <Button
                className="w-full"
                size="lg"
                disabled={!amount || !selectedLock}
                onClick={handleStake}
              >
                <Layers className="w-4 h-4 mr-2" />
                Stake CAPX
              </Button>
            </CardContent>
          </Card>

          {/* Active Positions */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Your Positions</h2>

            {userPositions.length === 0 ? (
              <EmptyState
                icon={<Layers className="w-6 h-6" />}
                title="No active positions"
                description="Stake CAPX tokens above to start earning rewards"
              />
            ) : (
              <div className="space-y-4">
                {userPositions.map((position) => (
                  <Card key={position.id}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        {/* Position Info */}
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            {position.lockDays === 0 ? (
                              <Unlock className="w-6 h-6 text-primary" />
                            ) : (
                              <Lock className="w-6 h-6 text-primary" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-lg">
                              {getLockLabel(position.lockDays)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              APR:{" "}
                              <span className="text-primary font-medium">
                                {position.apr}
                              </span>
                              {position.unlockDate && (
                                <> • Unlocks: {position.unlockDate}</>
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Staked & Rewards */}
                        <div className="flex flex-wrap gap-6 lg:gap-12">
                          <div>
                            <p className="text-sm text-muted-foreground">Staked</p>
                            <p className="text-xl font-bold">
                              {position.stakedAmount}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {position.stakedAmountUsd}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Claimable Rewards
                            </p>
                            <p className="text-xl font-bold text-primary">
                              {position.claimableRewards}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {position.claimableRewardsUsd}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 lg:ml-auto">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePositionAction("claim", position)}
                          >
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Claim
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handlePositionAction("compound", position)
                            }
                          >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Compound
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handlePositionAction("unstake", position)
                            }
                            disabled={position.isLocked}
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Unstake
                          </Button>
                        </div>
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
            <DialogTitle>
              {txAction === "stake" && "Stake CAPX"}
              {txAction === "claim" && "Claim Rewards"}
              {txAction === "compound" && "Compound Rewards"}
              {txAction === "unstake" && "Unstake CAPX"}
            </DialogTitle>
            <DialogDescription>
              {txStatus === "pending" && "Processing your transaction..."}
              {txStatus === "success" && "Transaction completed successfully"}
              {txStatus === "failed" && "Transaction failed"}
            </DialogDescription>
          </DialogHeader>

          {txStatus === "pending" && (
            <div className="flex flex-col items-center py-8">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Please wait...</p>
            </div>
          )}

          {txStatus === "success" && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Success!</h3>
                <p className="text-sm text-muted-foreground">
                  {txAction === "stake" && `Staked ${txAmount} CAPX`}
                  {txAction === "claim" && `Claimed ${txAmount}`}
                  {txAction === "compound" && `Compounded ${txAmount}`}
                  {txAction === "unstake" && `Unstaked ${txAmount}`}
                </p>
              </div>
              <Button onClick={resetModal} className="w-full">
                Close
              </Button>
            </div>
          )}

          {txStatus === "failed" && (
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
                  Close
                </Button>
                <Button
                  onClick={() => setTxStatus("pending")}
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
