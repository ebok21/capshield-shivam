import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Lock, Unlock, TrendingUp, Calendar, AlertCircle } from "lucide-react";

interface VestingSchedule {
  id: string;
  type: string;
  source: string;
  totalAmount: string;
  vestedAmount: string;
  claimableAmount: string;
  dealDate: string;
  cliffEnds: string;
  vestingEnds: string;
  progress: number;
  status: "cliff" | "vesting" | "completed" | "claimable";
}

const vestingSchedules: VestingSchedule[] = [
  {
    id: "1",
    type: "Transaction Participation",
    source: "Deal #1234 - Tech Startup",
    totalAmount: "10,000 CAPX",
    vestedAmount: "4,500 CAPX",
    claimableAmount: "1,200 CAPX",
    dealDate: "Jan 15, 2024",
    cliffEnds: "Jul 15, 2024",
    vestingEnds: "Jan 15, 2025",
    progress: 45,
    status: "vesting",
  },
  {
    id: "2",
    type: "Service Fee Share",
    source: "Platform Rewards Q1",
    totalAmount: "5,000 CAPX",
    vestedAmount: "1,500 CAPX",
    claimableAmount: "500 CAPX",
    dealDate: "Mar 1, 2024",
    cliffEnds: "Sep 1, 2024",
    vestingEnds: "Mar 1, 2025",
    progress: 30,
    status: "cliff",
  },
  {
    id: "3",
    type: "Spending Rewards",
    source: "Card Rewards Program",
    totalAmount: "2,500 CAPX",
    vestedAmount: "500 CAPX",
    claimableAmount: "500 CAPX",
    dealDate: "Apr 10, 2024",
    cliffEnds: "N/A",
    vestingEnds: "Apr 10, 2025",
    progress: 20,
    status: "claimable",
  },
  {
    id: "4",
    type: "Success Fee Reward",
    source: "Deal #1189 - Real Estate",
    totalAmount: "8,000 CAPX",
    vestedAmount: "8,000 CAPX",
    claimableAmount: "8,000 CAPX",
    dealDate: "Nov 20, 2023",
    cliffEnds: "May 20, 2024",
    vestingEnds: "Nov 20, 2024",
    progress: 100,
    status: "completed",
  },
];

const vestingSummary = {
  totalVesting: "25,500 CAPX",
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
  }
};

export default function Vesting() {
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
        <Button className="bg-primary hover:bg-primary/90">
          <Unlock className="w-4 h-4 mr-2" />
          Claim All Available
        </Button>
      </div>

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
                <p className="text-xl font-bold">{vestingSummary.totalClaimable}</p>
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
                            <h4 className="font-semibold">{schedule.type}</h4>
                            {getStatusBadge(schedule.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{schedule.source}</p>
                        </div>
                        <p className="text-xl font-bold">{schedule.totalAmount}</p>
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

                    {/* Right side - Action */}
                    <div className="flex lg:flex-col gap-2 lg:w-32">
                      <Button
                        size="sm"
                        className="flex-1"
                        disabled={schedule.status === "cliff" || schedule.claimableAmount === "0 CAPX"}
                      >
                        Claim
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
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
    </div>
  );
}
