import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Copy,
  ExternalLink,
  Shield,
  Vote,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
} from "recharts";
import { useWalletState } from "@/hooks/useWalletState";
import { useToast } from "@/hooks/use-toast";
import { SkeletonCard, SkeletonList } from "@/components/ui/skeleton-card";
import { ConnectWalletPrompt } from "@/components/ui/connect-wallet-prompt";

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: "active" | "passed" | "rejected" | "pending";
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  quorum: number;
  endDate: string;
  proposer: string;
}

const proposals: Proposal[] = [
  {
    id: "CAP-12",
    title: "Treasury Allocation for Q1 2024",
    description: "Allocate 500,000 CAPX from the treasury to fund ecosystem development grants and community initiatives for Q1 2024.",
    status: "active",
    votesFor: 1250000,
    votesAgainst: 320000,
    totalVotes: 1570000,
    quorum: 2000000,
    endDate: "Jan 25, 2024",
    proposer: "0x1234...abcd",
  },
  {
    id: "CAP-11",
    title: "Increase Staking Rewards by 2%",
    description: "Proposal to increase staking rewards from 8% to 10% APY to incentivize long-term token holding.",
    status: "passed",
    votesFor: 2100000,
    votesAgainst: 450000,
    totalVotes: 2550000,
    quorum: 2000000,
    endDate: "Jan 15, 2024",
    proposer: "0x5678...efgh",
  },
  {
    id: "CAP-10",
    title: "Add New Vesting Schedule Type",
    description: "Introduce a new 6-month linear vesting schedule option for partnership deals.",
    status: "rejected",
    votesFor: 800000,
    votesAgainst: 1200000,
    totalVotes: 2000000,
    quorum: 2000000,
    endDate: "Jan 10, 2024",
    proposer: "0x9abc...ijkl",
  },
];

const shieldDistribution = [
  { name: "Community", value: 40, color: "hsl(var(--primary))" },
  { name: "Team", value: 15, color: "hsl(var(--muted-foreground))" },
  { name: "Investors", value: 20, color: "hsl(var(--accent))" },
  { name: "Treasury", value: 15, color: "hsl(var(--destructive))" },
  { name: "Rewards", value: 10, color: "hsl(142, 76%, 50%)" },
];

const governanceStats = {
  shieldBalance: "2,450 SHIELD",
  totalShieldSupply: "10,000,000 SHIELD",
  votingPower: "0.0245%",
  activeProposals: 1,
};

const addresses = [
  {
    label: "Owner / Multisig",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    description: "Protocol owner with admin privileges",
  },
  {
    label: "Treasury",
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    description: "Main treasury holding protocol funds",
  },
  {
    label: "DAO",
    address: "0x567890abcdef1234567890abcdef1234567890ab",
    description: "Governance contract for voting",
  },
];

export default function Governance() {
  const { isConnected } = useWalletState();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied",
      description: "Address has been copied to clipboard",
    });
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getStatusBadge = (status: Proposal["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Clock className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case "passed":
        return (
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Passed
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-muted text-muted-foreground">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Governance</h1>
          <p className="text-muted-foreground">Protocol governance and voting</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <SkeletonList rows={3} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Governance</h1>
        <p className="text-muted-foreground">Protocol governance and voting</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">SHIELD Balance</p>
                {isConnected ? (
                  <p className="text-xl font-bold">{governanceStats.shieldBalance}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">Connect wallet</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total SHIELD Supply</p>
                <p className="text-xl font-bold">{governanceStats.totalShieldSupply}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Vote className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Voting Power</p>
                {isConnected ? (
                  <p className="text-xl font-bold">{governanceStats.votingPower}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">Connect wallet</p>
                )}
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
                <p className="text-sm text-muted-foreground">Active Proposals</p>
                <p className="text-xl font-bold">{governanceStats.activeProposals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SHIELD Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">SHIELD Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="h-[200px] w-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={shieldDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {shieldDistribution.map((entry, index) => (
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
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {shieldDistribution.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <p className="text-sm text-muted-foreground">{item.name}</p>
                    <p className="font-semibold">{item.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Proposals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Proposals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {proposals.map((proposal) => {
            const forPercentage = (proposal.votesFor / proposal.totalVotes) * 100;

            return (
              <div
                key={proposal.id}
                className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-mono text-muted-foreground">
                        {proposal.id}
                      </span>
                      {getStatusBadge(proposal.status)}
                    </div>
                    <h4 className="font-medium">{proposal.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {proposal.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedProposal(proposal)}
                  >
                    View
                  </Button>
                </div>

                {/* Voting Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-primary">
                        <ThumbsUp className="w-3 h-3" />
                        {(proposal.votesFor / 1000000).toFixed(2)}M
                      </span>
                      <span className="flex items-center gap-1 text-destructive">
                        <ThumbsDown className="w-3 h-3" />
                        {(proposal.votesAgainst / 1000000).toFixed(2)}M
                      </span>
                    </div>
                    <span className="text-muted-foreground">
                      Ends: {proposal.endDate}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${forPercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>For: {forPercentage.toFixed(1)}%</span>
                    <span>
                      Quorum: {((proposal.totalVotes / proposal.quorum) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Vote Buttons (only for active proposals) */}
                {proposal.status === "active" && isConnected && (
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="flex-1">
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Vote For
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <ThumbsDown className="w-4 h-4 mr-2" />
                      Vote Against
                    </Button>
                  </div>
                )}

                {proposal.status === "active" && !isConnected && (
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    Connect wallet to vote
                  </p>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Protocol Addresses */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Protocol Addresses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {addresses.map((item, index) => (
            <div key={item.label}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                    {truncateAddress(item.address)}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyAddress(item.address)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <a
                      href={`https://sepolia.etherscan.io/address/${item.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
              {index < addresses.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Proposal Detail Modal */}
      <Dialog open={!!selectedProposal} onOpenChange={() => setSelectedProposal(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedProposal?.id}
              {selectedProposal && getStatusBadge(selectedProposal.status)}
            </DialogTitle>
            <DialogDescription>{selectedProposal?.title}</DialogDescription>
          </DialogHeader>

          {selectedProposal && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Description</p>
                <p className="text-sm text-muted-foreground">
                  {selectedProposal.description}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/30 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Proposer</span>
                  <span className="font-mono">{selectedProposal.proposer}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">End Date</span>
                  <span>{selectedProposal.endDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Votes</span>
                  <span>{(selectedProposal.totalVotes / 1000000).toFixed(2)}M SHIELD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Quorum Required</span>
                  <span>{(selectedProposal.quorum / 1000000).toFixed(2)}M SHIELD</span>
                </div>
              </div>

              {selectedProposal.status === "active" && isConnected && (
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Vote For
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <ThumbsDown className="w-4 h-4 mr-2" />
                    Vote Against
                  </Button>
                </div>
              )}

              {selectedProposal.status === "active" && !isConnected && (
                <ConnectWalletPrompt
                  title="Connect to vote"
                  description="Connect your wallet to participate in governance"
                />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
