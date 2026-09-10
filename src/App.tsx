
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./store";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Monitoring from "./pages/Monitoring";
import Clinical from "./pages/Clinical";
import SelfManagement from "./pages/SelfManagement";
import Transition from "./pages/Transition";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MentorPortal from "./pages/MentorPortal";
import ChildrenMode from "./pages/ChildrenMode";
import PTSDSupport from "./pages/PTSDSupport";
import PrivateRoute from "./components/PrivateRoute";

// Create a QueryClient for React Query
const queryClient = new QueryClient();

const App = () => {
  // Remove the useEffect hook that's causing the issue
  // The body class can be added in the MainLayout component instead

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Public feature routes — no login required */}
                <Route path="/children" element={<ChildrenMode />} />
                <Route path="/ptsd" element={<PTSDSupport />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/monitoring" element={<PrivateRoute><Monitoring /></PrivateRoute>} />
                <Route path="/clinical" element={<PrivateRoute><Clinical /></PrivateRoute>} />
                <Route path="/self-management" element={<PrivateRoute><SelfManagement /></PrivateRoute>} />
                <Route path="/transition" element={<PrivateRoute><Transition /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/mentor" element={<PrivateRoute><MentorPortal /></PrivateRoute>} />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
