"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, History } from "lucide-react";
import NeuroAvatar from "@/components/neuro/NeuroAvatar";

export default function Navbar() {
  const pathname = usePathname();
  const isApp = pathname === "/app";
  const isHistory = pathname === "/history";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[rgba(5,5,5,0.88)] backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-6 h-[60px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <NeuroAvatar size="sm" expression="neutral" />
          <div>
            <span className="font-syne font-extrabold text-[17px] tracking-[0.15em] glow-text">NEUROVA</span>
            <span className="hidden sm:block text-[9px] tracking-[0.2em] uppercase text-[var(--text-3)] -mt-0.5">AI Business Strategist</span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          <Link href="/app" className={`flex items-center gap-2 px-4 py-2 text-[11px] font-medium tracking-[0.12em] uppercase rounded-sm transition-all ${isApp ? "bg-[rgba(138,43,226,0.15)] text-[var(--purple-bright)] border border-[var(--border-glow)]" : "text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[rgba(255,255,255,0.04)]"}`}>
            <Zap className="w-3.5 h-3.5" />Generator
          </Link>
          <Link href="/history" className={`flex items-center gap-2 px-4 py-2 text-[11px] font-medium tracking-[0.12em] uppercase rounded-sm transition-all ${isHistory ? "bg-[rgba(138,43,226,0.15)] text-[var(--purple-bright)] border border-[var(--border-glow)]" : "text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[rgba(255,255,255,0.04)]"}`}>
            <History className="w-3.5 h-3.5" />History
          </Link>
        </div>
      </div>
    </nav>
  );
}
