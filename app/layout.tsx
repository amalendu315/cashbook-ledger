import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Enterprise Cashbook",
  description: "Modern financial management and cashbook application",
  manifest: "/manifest.json", // For PWA
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}
      >
        {children}
        {/* Toaster component for notifications will go here */}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
