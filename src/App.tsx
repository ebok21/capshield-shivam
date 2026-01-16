import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { config } from "@/lib/wagmi";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";
import Stake from "./pages/Stake";
import Vesting from "./pages/Vesting";
import Treasury from "./pages/Treasury";
import ActivityRewards from "./pages/activity/Rewards";
import ActivityTransactions from "./pages/activity/Transactions";
import ActivityAnalytics from "./pages/activity/Analytics";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/stake" element={<Stake />} />
                <Route path="/vesting" element={<Vesting />} />
                <Route path="/treasury" element={<Treasury />} />
                <Route path="/portfolio" element={<PlaceholderPage />} />
                {/* Activity section */}
                <Route path="/activity/rewards" element={<ActivityRewards />} />
                <Route path="/activity/transactions" element={<ActivityTransactions />} />
                <Route path="/activity/analytics" element={<ActivityAnalytics />} />
                {/* Other sections */}
                <Route path="/governance" element={<PlaceholderPage />} />
                <Route path="/documents" element={<PlaceholderPage />} />
                <Route path="/settings" element={<PlaceholderPage />} />
                <Route path="/help" element={<PlaceholderPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DashboardLayout>
          </BrowserRouter>
        </TooltipProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default App;
