import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mockData = {
  "7D": [
    { date: "Mon", value: 2100000 },
    { date: "Tue", value: 2150000 },
    { date: "Wed", value: 2120000 },
    { date: "Thu", value: 2180000 },
    { date: "Fri", value: 2220000 },
    { date: "Sat", value: 2250000 },
    { date: "Sun", value: 2340560 },
  ],
  "30D": [
    { date: "Week 1", value: 1950000 },
    { date: "Week 2", value: 2050000 },
    { date: "Week 3", value: 2150000 },
    { date: "Week 4", value: 2340560 },
  ],
  "90D": [
    { date: "Jan", value: 1500000 },
    { date: "Feb", value: 1800000 },
    { date: "Mar", value: 2340560 },
  ],
  All: [
    { date: "2023 Q4", value: 500000 },
    { date: "2024 Q1", value: 1000000 },
    { date: "2024 Q2", value: 1500000 },
    { date: "2024 Q3", value: 1800000 },
    { date: "2024 Q4", value: 2340560 },
  ],
};

const timeFilters = ["7D", "30D", "90D", "All"] as const;
type TimeFilter = (typeof timeFilters)[number];

const summaryStats = {
  startingValue: "$1,500,000",
  currentValue: "$2,340,560",
  netGrowth: "+$840,560 (+56.04%)",
  onChain: "100%",
};

export function TreasuryChart() {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>("30D");

  const data = mockData[activeFilter];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-lg">Treasury Growth Over Time</CardTitle>
          <div className="flex gap-1 bg-muted p-1 rounded-lg">
            {timeFilters.map((filter) => (
              <Button
                key={filter}
                variant="ghost"
                size="sm"
                className={cn(
                  "px-3 py-1 h-7 text-xs font-medium",
                  activeFilter === filter && "bg-background shadow-sm"
                )}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="treasuryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(271, 91%, 65%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(187, 92%, 69%)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                className="text-xs fill-muted-foreground"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => `$${(val / 1000000).toFixed(1)}M`}
                className="text-xs fill-muted-foreground"
              />
              <Tooltip
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "Treasury",
                ]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(271, 91%, 65%)"
                strokeWidth={2}
                fill="url(#treasuryGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Starting Value</p>
            <p className="text-sm font-semibold">{summaryStats.startingValue}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Current Value</p>
            <p className="text-sm font-semibold">{summaryStats.currentValue}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Net Growth</p>
            <p className="text-sm font-semibold text-capx-success">
              {summaryStats.netGrowth}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">On-Chain</p>
            <p className="text-sm font-semibold">{summaryStats.onChain}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
