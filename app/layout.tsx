import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({ subsets: ["latin"], weight: ["400","600","700","800"], variable: "--font-syne", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300","400","500"], variable: "--font-dm", display: "swap" });

export const metadata: Metadata = {
  title: "NEUROVA — AI Business Strategist",
  description: "Transform your ideas into structured execution plans. Powered by Neuro, your AI business strategist.",
  keywords: ["AI", "business strategy", "execution plan", "startup", "productivity"],
  openGraph: {
    title: "NEUROVA — AI Business Strategist",
    description: "Transform ideas into execution. Powered by Neuro AI.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
