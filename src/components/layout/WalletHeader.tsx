import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Bell, Moon, Sun, Vote, Clock, Gift, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Proposal Live",
    description: "CAP-12: Treasury Allocation Vote",
    time: "2 hours ago",
    icon: <Vote className="w-4 h-4" />,
    read: false,
  },
  {
    id: "2",
    title: "Vesting Unlocked",
    description: "500 CAPX now available to claim",
    time: "5 hours ago",
    icon: <Clock className="w-4 h-4" />,
    read: false,
  },
  {
    id: "3",
    title: "Rewards Updated",
    description: "Your staking rewards increased",
    time: "1 day ago",
    icon: <Gift className="w-4 h-4" />,
    read: true,
  },
];

export function WalletHeader() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const [notifications, setNotifications] = useState(mockNotifications);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-end px-4 lg:px-6">
      {/* Right side - Theme, Notifications & Wallet */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                  onClick={markAllAsRead}
                >
                  Mark all read
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex items-start gap-3 p-3 cursor-pointer"
                  onClick={() => markAsRead(notification.id)}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      notification.read
                        ? "bg-muted text-muted-foreground"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        className={`text-sm font-medium ${
                          notification.read ? "text-muted-foreground" : ""
                        }`}
                      >
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {notification.time}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            const ready = mounted && authenticationStatus !== "loading";
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus || authenticationStatus === "authenticated");

            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <Button
                        onClick={openConnectModal}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Connect Wallet
                      </Button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <Button
                        onClick={openChainModal}
                        variant="destructive"
                      >
                        Wrong network
                      </Button>
                    );
                  }

                  return (
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={openChainModal}
                        variant="outline"
                        size="sm"
                        className="hidden sm:flex items-center gap-2"
                      >
                        {chain.hasIcon && (
                          <div
                            className="w-4 h-4 rounded-full overflow-hidden"
                            style={{ background: chain.iconBackground }}
                          >
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                                className="w-4 h-4"
                              />
                            )}
                          </div>
                        )}
                        <span className="hidden md:inline">{chain.name}</span>
                      </Button>

                      <Button
                        onClick={openAccountModal}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <span className="hidden sm:inline mr-2">
                          {account.displayBalance ?? ""}
                        </span>
                        <span className="font-mono">
                          {account.displayName}
                        </span>
                      </Button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </header>
  );
}
