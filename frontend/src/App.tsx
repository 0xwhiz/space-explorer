import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Astronomy from "./pages/Astronomy";
import Mars from "./pages/Mars";
import NearEarth from "./pages/NearEarth";
import Earth from "./pages/Earth";
import NotFound from "./pages/NotFound";
import { SpaceDataProvider } from "@/components/SpaceDataContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SpaceDataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/astronomy" element={<Astronomy />} />
            <Route path="/mars" element={<Mars />} />
            <Route path="/near-earth" element={<NearEarth />} />
            <Route path="/earth" element={<Earth />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SpaceDataProvider>
  </QueryClientProvider>
);

export default App;
