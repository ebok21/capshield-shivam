import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Gift, Clock, Percent } from "lucide-react";

type ActivityType =
  | "reward_earned"
  | "staked"
  | "commission"
  | "vesting_released"
  | "success_fee";

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  amount: string;
  isPositive: boolean;
  timestamp: string;
  address?: string;
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "reward_earned",
    title: "Reward Earned",
    description: "Weekly staking reward for Crypto Pool",
    amount: "+24.5 CAPX",
    isPositive: true,
    timestamp: "2 hours ago",
    address: "0x1234...5678",
  },
  {
    id: "2",
    type: "staked",
    title: "CAPX Staked",
    description: "Staked to Markets Pool",
    amount: "-500 CAPX",
    isPositive: false,
    timestamp: "5 hours ago",
    address: "0x1234...5678",
  },
  {
    id: "3",
    type: "commission",
    title: "Commission Reward",
    description: "Referral commission from network",
    amount: "+12.3 CAPX",
    isPositive: true,
    timestamp: "1 day ago",
    address: "0x1234...5678",
  },
  {
    id: "4",
    type: "vesting_released",
    title: "Vesting Released",
    description: "Monthly vesting unlock",
    amount: "+100 CAPX",
    isPositive: true,
    timestamp: "2 days ago",
    address: "0x1234...5678",
  },
  {
    id: "5",
    type: "success_fee",
    title: "Success Fee Reward",
    description: "Performance bonus from Real Assets Pool",
    amount: "+45.8 CAPX",
    isPositive: true,
    timestamp: "3 days ago",
    address: "0x1234...5678",
  },
];

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case "reward_earned":
      return <Gift className="w-4 h-4" />;
    case "staked":
      return <ArrowDownRight className="w-4 h-4" />;
    case "commission":
      return <Percent className="w-4 h-4" />;
    case "vesting_released":
      return <Clock className="w-4 h-4" />;
    case "success_fee":
      return <ArrowUpRight className="w-4 h-4" />;
    default:
      return <Gift className="w-4 h-4" />;
  }
};

const getActivityColor = (type: ActivityType, isPositive: boolean) => {
  if (type === "staked" || !isPositive) {
    return "bg-capx-warning/10 text-capx-warning";
  }
  return "bg-capx-success/10 text-capx-success";
};

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Recent Activity</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                  getActivityColor(activity.type, activity.isPositive)
                )}
              >
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "text-sm font-semibold whitespace-nowrap",
                      activity.isPositive ? "text-capx-success" : "text-capx-warning"
                    )}
                  >
                    {activity.amount}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </span>
                  {activity.address && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {activity.address}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
