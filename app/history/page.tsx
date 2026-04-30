"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Trash2, Zap, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import { HistoryEntry } from "@/lib/types";

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("neurova_history");
      if (raw) setHistory(JSON.parse(raw));
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  const deleteEntry = (id: string) => {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    localStorage.setItem("neurova_history", JSON.stringify(updated));
  };

  const clearAll = () => {
    setHistory([]);
    localStorage.removeItem("neurova_history");
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen grid-bg">
      <Navbar />

      <main className="relative z-10 pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-2">
                Saved Plans
              </p>
              <h1
                className="font-syne font-bold"
                style={{
                  fontSize: "clamp(24px, 4vw, 36px)",
                  background: "linear-gradient(135deg, #fff 0%, #C4B5FD 60%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Plan History
              </h1>
            </div>
            {history.length > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 px-3 py-2 text-[11px] tracking-widest uppercase border border-[rgba(239,68,68,0.25)] text-[rgba(252,165,165,0.7)] hover:border-[rgba(239,68,68,0.5)] hover:text-red-400 rounded-sm transition-all"
              >
                <Trash2 className="w-3 h-3" />
                Clear All
              </button>
            )}
          </div>

          {!loaded && (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-sm border border-[var(--border)] bg-[var(--card)] p-6">
                  <div className="shimmer h-4 w-3/4 rounded-sm mb-3" />
                  <div className="shimmer h-3 w-1/2 rounded-sm" />
                </div>
              ))}
            </div>
          )}

          {loaded && history.length === 0 && (
            <div className="text-center py-20">
              <Clock className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-4" />
              <p className="text-[15px] text-[var(--text-secondary)] mb-2">No plans yet</p>
              <p className="text-[13px] text-[var(--text-muted)] mb-6">
                Generated plans are saved here automatically.
              </p>
              <Link
                href="/app"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--purple-core)] text-white text-[12px] tracking-widest uppercase rounded-sm hover:bg-[#6d28d9] transition-all"
              >
                <Zap className="w-3.5 h-3.5" />
                Generate a Plan
              </Link>
            </div>
          )}

          {loaded && history.length > 0 && (
            <div className="space-y-3">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-sm border border-[var(--border)] bg-[var(--card)] p-5 hover:border-[var(--border-bright)] transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-[10px] tracking-[0.15em] uppercase border border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.08)] text-[var(--purple-bright)] px-2 py-0.5 rounded-sm">
                          {entry.plan.category}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(entry.createdAt)}
                        </span>
                      </div>
                      <h3 className="font-syne font-semibold text-[15px] text-[var(--text-primary)] mb-1.5 truncate">
                        {entry.plan.title}
                      </h3>
                      <p className="text-[12px] text-[var(--text-muted)] line-clamp-2 leading-relaxed font-light">
                        {entry.idea}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-[11px] text-[var(--text-muted)]">
                          {entry.plan.phases.length} phases
                        </span>
                        <span className="text-[11px] text-[var(--text-muted)]">
                          {entry.plan.totalDuration}
                        </span>
                        <span className={`text-[10px] tracking-wider uppercase px-1.5 py-0.5 rounded-sm badge-difficulty-${entry.plan.difficulty}`}>
                          {entry.plan.difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/app?idea=${encodeURIComponent(entry.idea)}`}
                        className="p-2 border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--cyan-arc)] hover:border-[rgba(34,211,238,0.3)] rounded-sm transition-all"
                        title="Re-generate"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="p-2 border border-[var(--border)] text-[var(--text-muted)] hover:text-red-400 hover:border-[rgba(239,68,68,0.3)] rounded-sm transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
