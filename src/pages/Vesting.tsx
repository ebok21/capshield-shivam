import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Clock, Lock, Unlock, TrendingUp, Calendar, AlertCircle, ExternalLink, CheckCircle2, Loader2 } from "lucide-react";
import { useWalletState } from "@/hooks/useWalletState";
import { SkeletonCard, SkeletonList } from "@/components/ui/skeleton-card";
import { ConnectWalletPrompt } from "@/components/ui/connect-wallet-prompt";

interface VestingSchedule {
  id: string;
  type: string;
  source: string;
  totalAmount: string;
  totalAmountUsd: string;
  vestedAmount: string;
  claimableAmount: string;
  claimedAmount: string;
  dealDate: string;
  cliffEnds: string;
  vestingEnds: string;
  startDate: string;
  progress: number;
  status: "cliff" | "vesting" | "completed" | "claimable" | "revoked";
  txHistory: { type: string; amount: string; date: string; txHash: string }[];
}

const vestingSchedules: VestingSchedule[] = [
  {
    id: "1",
    type: "Transaction Participation",
    source: "Deal #1234 – Tech Startup",
    totalAmount: "10,000 CAPX",
    totalAmountUsd: "$4,000",
    vestedAmount: "4,500 CAPX",
    claimableAmount: "1,200 CAPX",
    claimedAmount: "3,300 CAPX",
    dealDate: "Jan 15, 2024",
    startDate: "Jan 15, 2024",
    cliffEnds: "Jul 15, 2024",
    vestingEnds: "Jan 15, 2025",
    progress: 45,
    status: "vesting",
    txHistory: [
      { type: "Claimed", amount: "1,000 CAPX", date: "Mar 15, 2024", txHash: "0x1234...abcd" },
      { type: "Claimed", amount: "2,300 CAPX", date: "Apr 20, 2024", txHash: "0x5678...efgh" },
    ],
  },
  {
    id: "2",
    type: "Service Fee Share",
    source: "Platform Rewards Q1",
    totalAmount: "5,000 CAPX",
    totalAmountUsd: "$2,000",
    vestedAmount: "1,500 CAPX",
    claimableAmount: "500 CAPX",
    claimedAmount: "1,000 CAPX",
    dealDate: "Mar 1, 2024",
    startDate: "Mar 1, 2024",
    cliffEnds: "Sep 1, 2024",
    vestingEnds: "Mar 1, 2025",
    progress: 30,
    status: "cliff",
    txHistory: [
      { type: "Claimed", amount: "1,000 CAPX", date: "Jun 1, 2024", txHash: "0x9abc...ijkl" },
    ],
  },
  {
    id: "3",
    type: "Spending Rewards",
    source: "Card Rewards Program",
    totalAmount: "2,500 CAPX",
    totalAmountUsd: "$1,000",
    vestedAmount: "500 CAPX",
    claimableAmount: "500 CAPX",
    claimedAmount: "0 CAPX",
    dealDate: "Apr 10, 2024",
    startDate: "Apr 10, 2024",
    cliffEnds: "N/A",
    vestingEnds: "Apr 10, 2025",
    progress: 20,
    status: "claimable",
    txHistory: [],
  },
  {
    id: "4",
    type: "Success Fee Reward",
    source: "Deal #1189 – Real Estate",
    totalAmount: "8,000 CAPX",
    totalAmountUsd: "$3,200",
    vestedAmount: "8,000 CAPX",
    claimableAmount: "8,000 CAPX",
    claimedAmount: "0 CAPX",
    dealDate: "Nov 20, 2023",
    startDate: "Nov 20, 2023",
    cliffEnds: "May 20, 2024",
    vestingEnds: "Nov 20, 2024",
    progress: 100,
    status: "completed",
    txHistory: [],
  },
];

const vestingSummary = {
  totalVesting: "25,500 CAPX",
  totalVestingUsd: "$10,200",
  totalVested: "14,500 CAPX",
  totalClaimable: "10,200 CAPX",
  activeSchedules: 4,
};

const getStatusBadge = (status: VestingSchedule["status"]) => {
  switch (status) {
    case "cliff":
      return <Badge variant="secondary" className="bg-capx-warning/10 text-capx-warning">Cliff Period</Badge>;
    case "vesting":
      return <Badge variant="secondary" className="bg-capx-purple/10 text-capx-purple">Vesting</Badge>;
    case "completed":
      return <Badge variant="secondary" className="bg-capx-success/10 text-capx-success">Completed</Badge>;
    case "claimable":
      return <Badge variant="default" className="bg-primary">Claimable</Badge>;
    case "revoked":
      return <Badge variant="secondary" className="bg-capx-error/10 text-capx-error">Revoked</Badge>;
  }
};

type ClaimStatus = "idle" | "pending" | "success" | "failed";

export default function Vesting() {
  const { isConnected } = useWalletState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSchedule, setSelectedSchedule] = useState<VestingSchedule | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [claimStatus, setClaimStatus] = useState<ClaimStatus>("idle");
  const [claimingId, setClaimingId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClaim = async (scheduleId: string) => {
    setClaimingId(scheduleId);
    setClaimStatus("pending");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setClaimStatus("success");
    setTimeout(() => {
      setClaimStatus("idle");
      setClaimingId(null);
    }, 2000);
  };

  const handleClaimAll = async () => {
    setClaimingId("all");
    setClaimStatus("pending");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setClaimStatus("success");
    setTimeout(() => {
      setClaimStatus("idle");
      setClaimingId(null);
    }, 2000);
  };

  const openDetails = (schedule: VestingSchedule) => {
    setSelectedSchedule(schedule);
    setDetailsOpen(true);
  };

  const hasClaimable = parseInt(vestingSummary.totalClaimable.replace(/,/g, "")) > 0;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Vesting</h1>
            <p className="text-muted-foreground">Track and manage your vesting schedules</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
        <SkeletonList rows={4} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Vesting</h1>
          <p className="text-muted-foreground">
            Track and manage your vesting schedules
          </p>
        </div>
        {isConnected && hasClaimable && (
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={handleClaimAll}
            disabled={claimStatus === "pending" && claimingId === "all"}
          >
            {claimStatus === "pending" && claimingId === "all" ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : claimStatus === "success" && claimingId === "all" ? (
              <CheckCircle2 className="w-4 h-4 mr-2" />
            ) : (
              <Unlock className="w-4 h-4 mr-2" />
            )}
            {claimStatus === "success" && claimingId === "all" ? "Claimed!" : "Claim All Available"}
          </Button>
        )}
      </div>

      {!isConnected ? (
        <ConnectWalletPrompt 
          title="Connect wallet to view vesting"
          description="Connect your wallet to see your vesting schedules and claim available tokens"
        />
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Vesting</p>
                    <p className="text-xl font-bold">{vestingSummary.totalVesting}</p>
                    <p className="text-xs text-muted-foreground">{vestingSummary.totalVestingUsd}</p>
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
                    <p className="text-sm text-muted-foreground">Total Vested</p>
                    <p className="text-xl font-bold">{vestingSummary.totalVested}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-capx-success/10">
                    <Unlock className="w-5 h-5 text-capx-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Claimable Now</p>
                    <p className="text-xl font-bold text-capx-success">{vestingSummary.totalClaimable}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-capx-warning/10">
                    <Calendar className="w-5 h-5 text-capx-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Schedules</p>
                    <p className="text-xl font-bold">{vestingSummary.activeSchedules}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vesting Schedules */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Vesting Schedules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vestingSchedules.map((schedule) => (
                  <Card key={schedule.id} className="border border-border">
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        {/* Left side - Info */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold">{schedule.source}</h4>
                                {getStatusBadge(schedule.status)}
                              </div>
                              <p className="text-sm text-muted-foreground">{schedule.type}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold">{schedule.totalAmount}</p>
                              <p className="text-xs text-muted-foreground">{schedule.totalAmountUsd}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-xs text-muted-foreground">Deal Date</p>
                              <p className="font-medium">{schedule.dealDate}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Cliff Ends</p>
                              <p className="font-medium">{schedule.cliffEnds}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Vesting Ends</p>
                              <p className="font-medium">{schedule.vestingEnds}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Claimable</p>
                              <p className="font-medium text-capx-success">{schedule.claimableAmount}</p>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Vesting Progress</span>
                              <span className="text-muted-foreground">{schedule.progress}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full gradient-participation rounded-full transition-all"
                                style={{ width: `${schedule.progress}%` }}
                              />
                            </div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>Vested: {schedule.vestedAmount}</span>
                              <span>Remaining: {parseInt(schedule.totalAmount.replace(/,/g, "")) - parseInt(schedule.vestedAmount.replace(/,/g, ""))} CAPX</span>
                            </div>
                          </div>
                        </div>

                        {/* Right side - Actions */}
                        <div className="flex lg:flex-col gap-2 lg:w-32">
                          <Button
                            size="sm"
                            className="flex-1"
                            disabled={
                              schedule.status === "cliff" || 
                              schedule.claimableAmount === "0 CAPX" ||
                              (claimStatus === "pending" && claimingId === schedule.id)
                            }
                            onClick={() => handleClaim(schedule.id)}
                          >
                            {claimStatus === "pending" && claimingId === schedule.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : claimStatus === "success" && claimingId === schedule.id ? (
                              "Claimed!"
                            ) : (
                              "Claim"
                            )}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => openDetails(schedule)}
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Info Section */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Understanding Vesting</h4>
                  <p className="text-sm text-muted-foreground">
                    Tokens vest linearly after the cliff period ends. During the cliff, no tokens can be claimed. 
                    Once vesting begins, tokens unlock proportionally until the vesting end date. 
                    Claimable tokens can be withdrawn at any time.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Vesting Details Modal */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Vesting Details</DialogTitle>
            <DialogDescription>
              {selectedSchedule?.source}
            </DialogDescription>
          </DialogHeader>
          {selectedSchedule && (
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Status:</span>
                {getStatusBadge(selectedSchedule.status)}
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">Total Allocation</p>
                  <p className="font-semibold">{selectedSchedule.totalAmount}</p>
                  <p className="text-xs text-muted-foreground">{selectedSchedule.totalAmountUsd}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">Claimed So Far</p>
                  <p className="font-semibold">{selectedSchedule.claimedAmount}</p>
                </div>
                <div className="p-3 rounded-lg bg-capx-success/10">
                  <p className="text-xs text-muted-foreground mb-1">Claimable Now</p>
                  <p className="font-semibold text-capx-success">{selectedSchedule.claimableAmount}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">Vested</p>
                  <p className="font-semibold">{selectedSchedule.vestedAmount}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Timeline</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Start Date</span>
                    <span>{selectedSchedule.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cliff End</span>
                    <span>{selectedSchedule.cliffEnds}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vesting End</span>
                    <span>{selectedSchedule.vestingEnds}</span>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{selectedSchedule.progress}%</span>
                </div>
                <Progress value={selectedSchedule.progress} className="h-2" />
              </div>

              {/* Transaction History */}
              {selectedSchedule.txHistory.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Transaction History</h4>
                  <div className="space-y-2">
                    {selectedSchedule.txHistory.map((tx, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 text-sm">
                        <div>
                          <p className="font-medium">{tx.type}</p>
                          <p className="text-xs text-muted-foreground">{tx.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-capx-success">{tx.amount}</p>
                          <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                            {tx.txHash}
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action */}
              <Button 
                className="w-full" 
                disabled={selectedSchedule.status === "cliff" || selectedSchedule.claimableAmount === "0 CAPX"}
              >
                Claim {selectedSchedule.claimableAmount}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
