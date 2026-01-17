import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  subValue?: string;
  icon?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  tooltip?: string;
  requiresWallet?: boolean;
  isWalletConnected?: boolean;
}

export function MetricCard({
  title,
  value,
  subValue,
  icon,
  className,
  isLoading = false,
  tooltip,
  requiresWallet = false,
  isWalletConnected = true,
}: MetricCardProps) {
  if (isLoading) {
    return (
      <Card className={cn("", className)}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-7 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="w-10 h-10 rounded-lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const showConnectPrompt = requiresWallet && !isWalletConnected;

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <p className="text-sm text-muted-foreground">{title}</p>
              {tooltip && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3.5 h-3.5 text-muted-foreground/60" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">{tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              {showConnectPrompt ? (
                <span className="text-sm text-muted-foreground">Connect wallet to view</span>
              ) : (
                <>
                  <span className="text-2xl font-bold">{value}</span>
                  {subValue && (
                    <span className="text-sm text-muted-foreground">{subValue}</span>
                  )}
                </>
              )}
            </div>
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
