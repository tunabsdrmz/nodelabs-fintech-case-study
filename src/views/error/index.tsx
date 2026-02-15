"use client";
import { useRouter } from "next/navigation";

interface ErrorPageViewProps {
  reset: () => void;
}

export default function ErrorPageView({ reset }: ErrorPageViewProps) {
  const router = useRouter();
  return (
    <main
      id="main-content"
      role="main"
      aria-label="Error page"
      className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <section
        aria-labelledby="error-boundary-heading"
        className="flex flex-col items-center max-w-md">
        <h1
          id="error-boundary-heading"
          className="text-2xl font-semibold text-gray-900 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-500 mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 cursor-pointer transition"
            aria-label="Try again">
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
      </section>
    </main>
  );
}
