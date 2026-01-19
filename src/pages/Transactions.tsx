import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeftRight,
  ArrowUpRight,
  ArrowDownLeft,
  ExternalLink,
  Search,
  Download,
  Vote,
} from "lucide-react";
import { useWalletState } from "@/hooks/useWalletState";
import { SkeletonList } from "@/components/ui/skeleton-card";
import { ConnectWalletPrompt, EmptyState } from "@/components/ui/connect-wallet-prompt";

interface Transaction {
  id: string;
  type: "stake" | "unstake" | "claim" | "vest" | "transfer" | "vote";
  description: string;
  amount: string;
  amountUsd?: string;
  status: "completed" | "pending" | "failed";
  timestamp: string;
  txHash: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    type: "stake",
    description: "Staked CAPX (30 day lock)",
    amount: "-1,000 CAPX",
    amountUsd: "$400",
    status: "completed",
    timestamp: "Today, 2:45 PM",
    txHash: "0x1234...abcd",
  },
  {
    id: "2",
    type: "claim",
    description: "Claimed staking rewards",
    amount: "+125 CAPX",
    amountUsd: "$50",
    status: "completed",
    timestamp: "Today, 11:30 AM",
    txHash: "0x5678...efgh",
  },
  {
    id: "3",
    type: "vest",
    description: "Vesting release - Deal #1234",
    amount: "+200 CAPX",
    amountUsd: "$80",
    status: "completed",
    timestamp: "Yesterday, 4:00 PM",
    txHash: "0x9abc...ijkl",
  },
  {
    id: "4",
    type: "transfer",
    description: "Transfer to external wallet",
    amount: "-500 CAPX",
    amountUsd: "$200",
    status: "completed",
    timestamp: "2 days ago",
    txHash: "0xdefg...mnop",
  },
  {
    id: "5",
    type: "unstake",
    description: "Unstaked CAPX (flexible)",
    amount: "+2,000 CAPX",
    amountUsd: "$800",
    status: "completed",
    timestamp: "3 days ago",
    txHash: "0xhijk...uvwx",
  },
  {
    id: "6",
    type: "vote",
    description: "Voted on CAP-12 proposal",
    amount: "—",
    status: "completed",
    timestamp: "4 days ago",
    txHash: "0xlmno...yzab",
  },
  {
    id: "7",
    type: "claim",
    description: "Claimed vesting tokens",
    amount: "+1,500 CAPX",
    amountUsd: "$600",
    status: "completed",
    timestamp: "1 week ago",
    txHash: "0xcdef...ghij",
  },
];

const getTypeIcon = (type: Transaction["type"]) => {
  switch (type) {
    case "stake":
    case "transfer":
      return <ArrowUpRight className="w-4 h-4" />;
    case "unstake":
    case "claim":
    case "vest":
      return <ArrowDownLeft className="w-4 h-4" />;
    case "vote":
      return <Vote className="w-4 h-4" />;
    default:
      return <ArrowLeftRight className="w-4 h-4" />;
  }
};

const getTypeBadge = (type: Transaction["type"]) => {
  const labels: Record<Transaction["type"], string> = {
    stake: "Stake",
    unstake: "Unstake",
    claim: "Claim",
    vest: "Vesting",
    transfer: "Transfer",
    vote: "Vote",
  };

  const colors: Record<Transaction["type"], string> = {
    stake: "bg-primary/10 text-primary",
    unstake: "bg-muted text-muted-foreground",
    claim: "bg-primary/10 text-primary",
    vest: "bg-primary/10 text-primary",
    transfer: "bg-muted text-muted-foreground",
    vote: "bg-accent/10 text-accent",
  };

  return (
    <Badge variant="secondary" className={colors[type]}>
      {labels[type]}
    </Badge>
  );
};

const getStatusBadge = (status: Transaction["status"]) => {
  switch (status) {
    case "completed":
      return (
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          Completed
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="secondary" className="bg-muted text-muted-foreground">
          Pending
        </Badge>
      );
    case "failed":
      return (
        <Badge variant="secondary" className="bg-destructive/10 text-destructive">
          Failed
        </Badge>
      );
  }
};

export default function Transactions() {
  const { isConnected } = useWalletState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("30d");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || tx.type === typeFilter;
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Transactions</h1>
            <p className="text-muted-foreground">View your transaction history</p>
          </div>
        </div>
        <SkeletonList rows={7} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">
            View your complete transaction history
          </p>
        </div>
        {isConnected && (
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        )}
      </div>

      {!isConnected ? (
        <ConnectWalletPrompt
          title="Connect wallet to view transactions"
          description="Connect your wallet to see your complete transaction history"
        />
      ) : (
        <>
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="stake">Stake</SelectItem>
                    <SelectItem value="unstake">Unstake</SelectItem>
                    <SelectItem value="claim">Claim</SelectItem>
                    <SelectItem value="vest">Vesting</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                    <SelectItem value="vote">Vote</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={periodFilter} onValueChange={setPeriodFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Last 24 hours</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="all">All time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Transactions List */}
          {filteredTransactions.length === 0 ? (
            <EmptyState
              icon={<ArrowLeftRight className="w-6 h-6" />}
              title="No transactions found"
              description="No transactions match your current filters."
            />
          ) : (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tx.amount.startsWith("+")
                              ? "bg-primary/10 text-primary"
                              : tx.amount === "—"
                              ? "bg-accent/10 text-accent"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {getTypeIcon(tx.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{tx.description}</p>
                            {getTypeBadge(tx.type)}
                            {getStatusBadge(tx.status)}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{tx.timestamp}</span>
                            <span>•</span>
                            <Button
                              variant="link"
                              size="sm"
                              className="h-auto p-0 text-xs"
                              asChild
                            >
                              <a
                                href={`https://sepolia.etherscan.io/tx/${tx.txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {tx.txHash}
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-bold ${
                            tx.amount.startsWith("+")
                              ? "text-primary"
                              : tx.amount === "—"
                              ? "text-muted-foreground"
                              : "text-foreground"
                          }`}
                        >
                          {tx.amount}
                        </p>
                        {tx.amountUsd && (
                          <p className="text-xs text-muted-foreground">{tx.amountUsd}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Showing 1-{filteredTransactions.length} of {filteredTransactions.length} transactions
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
