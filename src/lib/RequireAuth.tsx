"use client";

import { type ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { isAuthPath, isPublicPath } from "@/lib/auth-routes";

interface RequireAuthProps {
  children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isAuthReady } = useAuth();

  const publicRoute = isPublicPath(pathname ?? "");
  const authPage = isAuthPath(pathname ?? "");
  const shouldRedirectToLogin =
    isAuthReady && !publicRoute && !isAuthenticated;
  const shouldRedirectToDashboard =
    isAuthReady && isAuthenticated && authPage;

  useEffect(() => {
    if (shouldRedirectToLogin) {
      router.replace("/login");
    }
  }, [shouldRedirectToLogin, router]);

  useEffect(() => {
    if (shouldRedirectToDashboard) {
      router.replace("/");
    }
  }, [shouldRedirectToDashboard, router]);

  if (!publicRoute && !isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">Redirecting to login...</p>
      </div>
    );
  }

  if (shouldRedirectToLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">Redirecting to login...</p>
      </div>
    );
  }

  if (shouldRedirectToDashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">Redirecting...</p>
      </div>
    );
  }

  return <>{children}</>;
}
