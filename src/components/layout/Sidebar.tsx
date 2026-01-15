import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Shield,
  Lightbulb,
  Coins,
  Clock,
  Landmark,
  PieChart,
  BarChart3,
  Layers,
  Gift,
  ArrowLeftRight,
  Vote,
  FileText,
  Settings,
  HelpCircle,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { label: "Overview", icon: LayoutDashboard, path: "/" },
  { label: "Protocol", icon: Shield, path: "/protocol" },
  { label: "Use cases", icon: Lightbulb, path: "/use-cases" },
  { label: "Mint", icon: Coins, path: "/mint" },
  { label: "Vesting", icon: Clock, path: "/vesting" },
  { label: "Treasury", icon: Landmark, path: "/treasury" },
  { label: "Portfolio", icon: PieChart, path: "/portfolio" },
  { label: "Analytics", icon: BarChart3, path: "/analytics" },
  { label: "Stake", icon: Layers, path: "/stake" },
  { label: "Rewards", icon: Gift, path: "/rewards" },
  { label: "Transactions", icon: ArrowLeftRight, path: "/transactions" },
  { label: "Governance", icon: Vote, path: "/governance" },
  { label: "Documents", icon: FileText, path: "/documents" },
  { label: "Settings", icon: Settings, path: "/settings" },
  { label: "Help", icon: HelpCircle, path: "/help" },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-card border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none">CAPShield</h1>
              <span className="text-[10px] text-muted-foreground leading-none">
                Always-On Ecosystem
              </span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn("h-8 w-8", collapsed && "hidden")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Expand button when collapsed */}
      {collapsed && (
        <div className="p-2 border-t border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="w-full h-8"
          >
            <ChevronLeft className="h-4 w-4 rotate-180" />
          </Button>
        </div>
      )}
    </aside>
  );
}
