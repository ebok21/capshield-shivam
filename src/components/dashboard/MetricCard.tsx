import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  subValue?: string;
  change?: {
    value: number;
    period: string;
  };
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({
  title,
  value,
  subValue,
  change,
  icon,
  className,
}: MetricCardProps) {
  const isPositive = change ? change.value >= 0 : true;

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{value}</span>
              {subValue && (
                <span className="text-sm text-muted-foreground">{subValue}</span>
              )}
            </div>
            {change && (
              <div
                className={cn(
                  "flex items-center gap-1 text-sm",
                  isPositive ? "text-capx-success" : "text-destructive"
                )}
              >
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>
                  {isPositive ? "+" : ""}
                  {change.value}% {change.period}
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
