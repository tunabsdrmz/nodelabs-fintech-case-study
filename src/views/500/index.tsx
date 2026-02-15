"use client";
import { useRouter } from "next/navigation";

export default function ServerErrorPageView() {
  const router = useRouter();
  return (
    <section
      aria-labelledby="error-500-heading"
      className="flex flex-col items-center justify-center bg-white px-6 text-center min-h-screen min-[1600px]:px-12">
      <h1
        id="error-500-heading"
        className="text-6xl font-bold text-gray-900 mb-4 min-[1600px]:text-8xl min-[1600px]:mb-6"
        aria-label="Error 500 - Server error">
        <span aria-hidden="true">500</span>
      </h1>

      <h2 className="text-2xl font-semibold text-gray-700 mb-2 min-[1600px]:text-4xl min-[1600px]:mb-4">
        Internal Server Error
      </h2>

      <p className="text-gray-500 max-w-md mb-6 min-[1600px]:max-w-xl min-[1600px]:text-xl min-[1600px]:mb-10">
        Something went wrong on our side. Please try again later.
      </p>

      <button
        type="button"
        onClick={() => router.push("/")}
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 cursor-pointer transition min-[1600px]:px-10 min-[1600px]:py-4 min-[1600px]:text-lg min-[1600px]:rounded-xl"
        aria-label="Go to home page">
        Go Home
      </button>
    </section>
  );
}
