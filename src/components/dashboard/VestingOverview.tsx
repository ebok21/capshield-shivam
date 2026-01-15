import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface VestingSchedule {
  id: string;
  type: string;
  dealDate: string;
  cliffEnds: string;
  amount: string;
  fullUnlock: string;
  progress: number;
  hasCliff: boolean;
}

const mockSchedules: VestingSchedule[] = [
  {
    id: "1",
    type: "Transaction Participation",
    dealDate: "Jan 15, 2024",
    cliffEnds: "Jul 15, 2024",
    amount: "10,000 CAPX",
    fullUnlock: "Jan 15, 2025",
    progress: 45,
    hasCliff: true,
  },
  {
    id: "2",
    type: "Service Fee Share",
    dealDate: "Mar 1, 2024",
    cliffEnds: "Sep 1, 2024",
    amount: "5,000 CAPX",
    fullUnlock: "Mar 1, 2025",
    progress: 30,
    hasCliff: true,
  },
  {
    id: "3",
    type: "Spending Rewards",
    dealDate: "Apr 10, 2024",
    cliffEnds: "N/A",
    amount: "2,500 CAPX",
    fullUnlock: "Apr 10, 2025",
    progress: 20,
    hasCliff: false,
  },
];

export function VestingOverview() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Vesting & Locked Rewards</CardTitle>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockSchedules.map((schedule) => (
            <div
              key={schedule.id}
              className="p-4 rounded-lg border border-border"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{schedule.type}</h4>
                    {schedule.hasCliff && (
                      <Badge variant="secondary" className="text-xs">
                        Cliff Period
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg font-bold">{schedule.amount}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Deal Date</p>
                  <p className="font-medium">{schedule.dealDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Cliff Ends</p>
                  <p className="font-medium">{schedule.cliffEnds}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Full Unlock</p>
                  <p className="font-medium">{schedule.fullUnlock}</p>
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
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
