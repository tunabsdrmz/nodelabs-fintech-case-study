"use client";
import { useRouter } from "next/navigation";
interface GlobalErrorProps {
  reset: () => void;
}
export default function GlobalErrorPageView({ reset }: GlobalErrorProps) {
  const router = useRouter();
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center font-sans antialiased">
        <main
          role="main"
          className="flex flex-col items-center max-w-md">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-500 mb-6">
            A critical error occurred. Please refresh the page or go home.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              aria-label="Try again"
              type="button"
              onClick={() => reset()}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 cursor-pointer transition">
              Try again
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 cursor-pointer transition"
              aria-label="Go to home page">
              Go home
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
