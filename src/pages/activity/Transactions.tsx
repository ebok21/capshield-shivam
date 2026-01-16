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
  Filter,
  Download,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "stake" | "unstake" | "claim" | "vest" | "transfer" | "swap";
  description: string;
  amount: string;
  amountUsd?: string;
  status: "completed" | "pending" | "failed";
  timestamp: string;
  txHash: string;
  from?: string;
  to?: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    type: "stake",
    description: "Staked to Crypto Pool",
    amount: "-1,000 CAPX",
    amountUsd: "$400",
    status: "completed",
    timestamp: "Today, 2:45 PM",
    txHash: "0x1234...abcd",
    to: "Crypto Pool",
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
    from: "Rewards Pool",
  },
  {
    id: "3",
    type: "vest",
    description: "Vesting release",
    amount: "+200 CAPX",
    amountUsd: "$80",
    status: "completed",
    timestamp: "Yesterday, 4:00 PM",
    txHash: "0x9abc...ijkl",
    from: "Vesting Contract",
  },
  {
    id: "4",
    type: "transfer",
    description: "Transfer to wallet",
    amount: "-500 CAPX",
    amountUsd: "$200",
    status: "completed",
    timestamp: "2 days ago",
    txHash: "0xdefg...mnop",
    to: "0x7890...qrst",
  },
  {
    id: "5",
    type: "unstake",
    description: "Unstaked from Markets Pool",
    amount: "+2,000 CAPX",
    amountUsd: "$800",
    status: "completed",
    timestamp: "3 days ago",
    txHash: "0xhijk...uvwx",
    from: "Markets Pool",
  },
  {
    id: "6",
    type: "stake",
    description: "Staked to Innovation Pool",
    amount: "-500 CAPX",
    amountUsd: "$200",
    status: "pending",
    timestamp: "3 days ago",
    txHash: "0xlmno...yzab",
    to: "Innovation Pool",
  },
  {
    id: "7",
    type: "swap",
    description: "Swapped ETH for CAPX",
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
    case "swap":
      return <ArrowLeftRight className="w-4 h-4" />;
    default:
      return <ArrowLeftRight className="w-4 h-4" />;
  }
};

const getTypeBadge = (type: Transaction["type"]) => {
  const colors: Record<Transaction["type"], string> = {
    stake: "bg-capx-purple/10 text-capx-purple",
    unstake: "bg-capx-warning/10 text-capx-warning",
    claim: "bg-capx-success/10 text-capx-success",
    vest: "bg-primary/10 text-primary",
    transfer: "bg-muted text-muted-foreground",
    swap: "bg-capx-cyan/10 text-capx-cyan",
  };
  return (
    <Badge variant="secondary" className={colors[type]}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Badge>
  );
};

const getStatusBadge = (status: Transaction["status"]) => {
  switch (status) {
    case "completed":
      return <Badge variant="secondary" className="bg-capx-success/10 text-capx-success">Completed</Badge>;
    case "pending":
      return <Badge variant="secondary" className="bg-capx-warning/10 text-capx-warning">Pending</Badge>;
    case "failed":
      return <Badge variant="secondary" className="bg-capx-error/10 text-capx-error">Failed</Badge>;
  }
};

export default function Transactions() {
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
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="pl-9" />
            </div>
            <Select defaultValue="all">
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
                <SelectItem value="swap">Swap</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
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
            <Select defaultValue="7d">
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
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.amount.startsWith("+")
                        ? "bg-capx-success/10 text-capx-success"
                        : "bg-capx-error/10 text-capx-error"
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
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        {tx.txHash}
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      tx.amount.startsWith("+") ? "text-capx-success" : "text-capx-error"
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
              Showing 1-7 of 156 transactions
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
