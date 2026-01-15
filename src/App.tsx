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
import Rewards from "./pages/Rewards";
import Transactions from "./pages/Transactions";
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
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/transactions" element={<Transactions />} />
                {/* Placeholder routes for other sections */}
                <Route path="/protocol" element={<PlaceholderPage />} />
                <Route path="/use-cases" element={<PlaceholderPage />} />
                <Route path="/mint" element={<PlaceholderPage />} />
                <Route path="/treasury" element={<PlaceholderPage />} />
                <Route path="/portfolio" element={<PlaceholderPage />} />
                <Route path="/analytics" element={<PlaceholderPage />} />
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
