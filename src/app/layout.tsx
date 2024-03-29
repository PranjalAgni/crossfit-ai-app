import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AI } from "./action";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Crossfit Coach",
  description: "AI powered crossfit coach and a booking assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-zinc-100">
      <body className={inter.className}>
        <AI>{children}</AI>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";
