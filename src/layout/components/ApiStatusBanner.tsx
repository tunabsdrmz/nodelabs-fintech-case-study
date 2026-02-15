"use client";
import { useApiAvailability } from "@/hooks/useApiAvailability";

export const ApiStatusBanner = () => {
  const isOnline = useApiAvailability();

  if (isOnline) return null;

  return (
    <div
      aria-label="API status banner"
      className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50">
      <p>API is currently unavailable. Please check your connection.</p>
    </div>
  );
};
