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
import Transactions from "./pages/Transactions";
import Protocol from "./pages/Protocol";
import Governance from "./pages/Governance";
import Documents from "./pages/Documents";
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
                <Route path="/vesting" element={<Vesting />} />
                <Route path="/stake" element={<Stake />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/protocol" element={<Protocol />} />
                <Route path="/governance" element={<Governance />} />
                <Route path="/documents" element={<Documents />} />
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
