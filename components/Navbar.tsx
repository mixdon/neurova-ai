"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { History, Zap } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[rgba(5,5,5,0.85)] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded border border-[var(--purple-core)] flex items-center justify-center bg-[rgba(124,58,237,0.1)]">
            <Zap className="w-3.5 h-3.5 text-[var(--purple-bright)]" />
          </div>
          <span
            className="font-syne font-800 text-lg tracking-widest"
            style={{
              background: "linear-gradient(135deg,#fff 0%,#C4B5FD 50%,#818CF8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            NEUROVA
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          <Link
            href="/app"
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-widest uppercase rounded-sm transition-all ${
              pathname === "/app"
                ? "bg-[rgba(124,58,237,0.15)] text-[var(--purple-bright)] border border-[var(--border-bright)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.04)]"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Generator
          </Link>
          <Link
            href="/history"
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-widest uppercase rounded-sm transition-all ${
              pathname === "/history"
                ? "bg-[rgba(124,58,237,0.15)] text-[var(--purple-bright)] border border-[var(--border-bright)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.04)]"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            History
          </Link>
        </div>
      </div>
    </nav>
  );
}
