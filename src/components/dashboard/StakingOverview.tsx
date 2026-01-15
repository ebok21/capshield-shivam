import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Pool {
  id: string;
  name: string;
  staked: string;
  apy: string;
  fillPercentage: number;
}

const mockPools: Pool[] = [
  { id: "1", name: "Crypto Pool", staked: "5,000 CAPX", apy: "12.5%", fillPercentage: 78 },
  { id: "2", name: "Markets Pool", staked: "3,200 CAPX", apy: "10.2%", fillPercentage: 65 },
  { id: "3", name: "Real Assets Pool", staked: "2,800 CAPX", apy: "8.8%", fillPercentage: 52 },
  { id: "4", name: "Innovation Pool", staked: "1,500 CAPX", apy: "15.0%", fillPercentage: 35 },
  { id: "5", name: "Business Pool", staked: "2,000 CAPX", apy: "9.5%", fillPercentage: 45 },
  { id: "6", name: "Lifestyle Pool", staked: "1,200 CAPX", apy: "7.2%", fillPercentage: 28 },
];

export function StakingOverview() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Stake (Escrow) Overview</CardTitle>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Explore Staking
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockPools.map((pool) => (
            <div
              key={pool.id}
              className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-sm">{pool.name}</h4>
                <span className="text-xs text-capx-success font-semibold">
                  {pool.apy} APY
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Staked</span>
                  <span className="font-medium">{pool.staked}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Pool Fill</span>
                    <span className="text-muted-foreground">{pool.fillPercentage}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full gradient-progress rounded-full transition-all"
                      style={{ width: `${pool.fillPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
