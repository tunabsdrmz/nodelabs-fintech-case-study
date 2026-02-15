"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { queryClient } from "@/lib/react-query";
import { AuthProvider } from "@/context/AuthContext";
import { RequireAuth } from "@/lib/RequireAuth";
import { ApiStatusBanner } from "./components/ApiStatusBanner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ApiStatusBanner />
        <RequireAuth>{children}</RequireAuth>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: { background: "#363a3f", color: "#fff" },
            success: { iconTheme: { primary: "#c8ee44", secondary: "#fff" } },
            error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}
