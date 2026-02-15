import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/layout/Providers";

const kumbhSans = Kumbh_Sans({
  variable: "--font-kumbh-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nodelabs",
  description: "Nodelabs Fintech Case Study - by Serdar Tuna Boşdurmaz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kumbhSans.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
