import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ParticipationChart } from "@/components/dashboard/ParticipationChart";
import { Gift, TrendingUp, Clock, Coins, ExternalLink } from "lucide-react";

interface Reward {
  id: string;
  type: string;
  source: string;
  amount: string;
  status: "claimed" | "claimable" | "pending";
  date: string;
  txHash?: string;
}

const rewards: Reward[] = [
  {
    id: "1",
    type: "Staking Reward",
    source: "Crypto Pool",
    amount: "+125 CAPX",
    status: "claimable",
    date: "Today",
  },
  {
    id: "2",
    type: "Commission Reward",
    source: "Deal #1234 Exit",
    amount: "+350 CAPX",
    status: "claimed",
    date: "Yesterday",
    txHash: "0x1234...abcd",
  },
  {
    id: "3",
    type: "Success Fee",
    source: "Deal #1189",
    amount: "+500 CAPX",
    status: "pending",
    date: "2 days ago",
  },
  {
    id: "4",
    type: "Vesting Release",
    source: "Transaction Participation",
    amount: "+200 CAPX",
    status: "claimed",
    date: "3 days ago",
    txHash: "0x5678...efgh",
  },
  {
    id: "5",
    type: "Staking Reward",
    source: "Markets Pool",
    amount: "+85 CAPX",
    status: "claimed",
    date: "4 days ago",
    txHash: "0x9abc...ijkl",
  },
  {
    id: "6",
    type: "Referral Bonus",
    source: "New User Referral",
    amount: "+50 CAPX",
    status: "claimed",
    date: "1 week ago",
    txHash: "0xdefg...mnop",
  },
];

const rewardsSummary = {
  totalEarned: "1,950 CAPX",
  claimable: "450 CAPX",
  pending: "500 CAPX",
  thisMonth: "875 CAPX",
};

const getStatusBadge = (status: Reward["status"]) => {
  switch (status) {
    case "claimable":
      return <Badge className="bg-primary">Claimable</Badge>;
    case "claimed":
      return <Badge variant="secondary" className="bg-capx-success/10 text-capx-success">Claimed</Badge>;
    case "pending":
      return <Badge variant="secondary" className="bg-capx-warning/10 text-capx-warning">Pending</Badge>;
  }
};

export default function Rewards() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Rewards</h1>
          <p className="text-muted-foreground">
            Track and claim your earned rewards
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Gift className="w-4 h-4 mr-2" />
          Claim All ({rewardsSummary.claimable})
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Coins className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Earned</p>
                <p className="text-xl font-bold">{rewardsSummary.totalEarned}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-capx-success/10">
                <Gift className="w-5 h-5 text-capx-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Claimable</p>
                <p className="text-xl font-bold">{rewardsSummary.claimable}</p>
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
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-xl font-bold">{rewardsSummary.pending}</p>
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
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-xl font-bold">{rewardsSummary.thisMonth}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Participation Chart */}
      <ParticipationChart />

      {/* Rewards History */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Rewards History</CardTitle>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-capx-success/10 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-capx-success" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{reward.type}</p>
                      {getStatusBadge(reward.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{reward.source}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-capx-success">{reward.amount}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{reward.date}</span>
                    {reward.txHash && (
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        {reward.txHash}
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
