import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Copy, ExternalLink, Shield, Pause, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddressInfo {
  label: string;
  address: string;
  description: string;
}

const addresses: AddressInfo[] = [
  { 
    label: "Owner / Multisig", 
    address: "0x1234567890abcdef1234567890abcdef12345678",
    description: "Protocol owner with admin privileges"
  },
  { 
    label: "Treasury", 
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    description: "Main treasury holding protocol funds"
  },
  { 
    label: "DAO", 
    address: "0x567890abcdef1234567890abcdef1234567890ab",
    description: "Governance contract for voting"
  },
];

const feeSettings = [
  { label: "Burn %", value: "2%", description: "Percentage of fees burned" },
  { label: "Treasury %", value: "3%", description: "Percentage of fees sent to treasury" },
  { label: "Stakers %", value: "5%", description: "Percentage of fees distributed to stakers" },
];

export default function Governance() {
  const { toast } = useToast();
  const isPaused = false;

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied",
      description: "Address has been copied to clipboard",
    });
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Governance</h1>
        <p className="text-muted-foreground">Protocol governance information and settings</p>
      </div>

      {/* Protocol Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Protocol Status
            </CardTitle>
            <Badge 
              className={isPaused 
                ? "bg-destructive/10 text-destructive border-destructive/20" 
                : "bg-capx-success/10 text-capx-success border-capx-success/20"
              }
            >
              {isPaused ? (
                <>
                  <Pause className="w-3 h-3 mr-1" />
                  Paused
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 mr-1" />
                  Active
                </>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The protocol is currently {isPaused ? "paused. All staking and claiming operations are temporarily disabled." : "active and operating normally."}
          </p>
        </CardContent>
      </Card>

      {/* Protocol Addresses */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Protocol Addresses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {addresses.map((item, index) => (
            <div key={item.label}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                    {truncateAddress(item.address)}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyAddress(item.address)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    asChild
                  >
                    <a 
                      href={`https://sepolia.etherscan.io/address/${item.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
              {index < addresses.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Fee Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Fee Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {feeSettings.map((fee) => (
              <div key={fee.label} className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">{fee.label}</p>
                <p className="text-2xl font-bold">{fee.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{fee.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
