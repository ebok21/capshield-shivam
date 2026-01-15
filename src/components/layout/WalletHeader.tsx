import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WalletHeader() {
  return (
    <header className="h-14 bg-primary flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2">
        <span className="text-primary-foreground text-sm font-medium">
          CAPShield Dashboard
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-primary-foreground/10"
        >
          <Bell className="h-5 w-5" />
        </Button>
        
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
                        variant="secondary"
                        size="sm"
                        className="font-medium"
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
                        size="sm"
                      >
                        Wrong network
                      </Button>
                    );
                  }

                  return (
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={openChainModal}
                        variant="secondary"
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
                        {chain.name}
                      </Button>

                      <Button
                        onClick={openAccountModal}
                        variant="secondary"
                        size="sm"
                        className="font-medium"
                      >
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ""}
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
