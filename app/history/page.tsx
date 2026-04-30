"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Trash2, Zap, RotateCcw } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import NeuroAvatar from "@/components/neuro/NeuroAvatar";
import { HistoryEntry } from "@/lib/types";

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try { setHistory(JSON.parse(localStorage.getItem("neurova_history") || "[]")); }
    catch { /* ignore */ }
    setLoaded(true);
  }, []);

  const del = (id: string) => {
    const u = history.filter(h => h.id !== id);
    setHistory(u);
    localStorage.setItem("neurova_history", JSON.stringify(u));
  };

  const clear = () => { setHistory([]); localStorage.removeItem("neurova_history"); };

  const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit"
  });

  return (
    <div className="min-h-screen grid-bg">
      <Navbar />
      <main className="relative z-10 pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">

          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--text-3)] mb-2">Saved Plans</p>
              <h1 className="font-syne font-bold glow-text" style={{ fontSize: "clamp(24px, 4vw, 40px)" }}>
                Plan History
              </h1>
            </div>
            {history.length > 0 && (
              <button onClick={clear} className="flex items-center gap-1.5 px-3 py-2 text-[11px] tracking-widest uppercase border border-[rgba(239,68,68,0.25)] text-[rgba(252,165,165,0.7)] hover:border-[rgba(239,68,68,0.5)] hover:text-red-400 rounded-sm transition-all">
                <Trash2 className="w-3 h-3"/>Clear All
              </button>
            )}
          </div>

          {!loaded && (
            <div className="space-y-3">
              {[1,2,3].map(i => <div key={i} className="shimmer rounded-sm border border-[var(--border)] h-28"/>)}
            </div>
          )}

          {loaded && history.length === 0 && (
            <div className="text-center py-24 flex flex-col items-center gap-4">
              <NeuroAvatar size="lg" expression="thinking"/>
              <div>
                <p className="text-[15px] text-[var(--text-2)] mb-1">No plans yet</p>
                <p className="text-[13px] text-[var(--text-3)] mb-6">Generated plans are saved here automatically.</p>
              </div>
              <Link href="/app" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--purple)] text-white text-[12px] tracking-widest uppercase rounded-sm hover:bg-[#7a25d0] transition-all">
                <Zap className="w-3.5 h-3.5"/>Generate a Plan
              </Link>
            </div>
          )}

          {loaded && history.length > 0 && (
            <div className="space-y-3">
              {history.map(entry => (
                <div key={entry.id} className="rounded-sm border border-[var(--border)] bg-[var(--card)] p-5 hover:border-[var(--border-glow)] transition-all group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="badge border border-[rgba(138,43,226,0.3)] bg-[rgba(138,43,226,0.08)] text-[var(--purple-bright)]">{entry.plan.category}</span>
                        <span className={`badge badge-${entry.plan.difficulty}`}>{entry.plan.difficulty}</span>
                        <span className="text-[10px] text-[var(--text-3)] flex items-center gap-1">
                          <Clock className="w-3 h-3"/>{fmt(entry.createdAt)}
                        </span>
                      </div>
                      <h3 className="font-syne font-semibold text-[15px] text-[var(--text)] mb-1.5 truncate">{entry.plan.title}</h3>
                      <p className="text-[12px] text-[var(--text-3)] line-clamp-2 font-light leading-relaxed">{entry.idea}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-[11px] text-[var(--text-3)]">{entry.plan.phases.length} phases</span>
                        <span className="text-[11px] text-[var(--text-3)]">{entry.plan.totalDuration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/app`} title="New plan"
                        className="p-2 border border-[var(--border)] text-[var(--text-3)] hover:text-[var(--cyan)] hover:border-[rgba(0,229,255,0.3)] rounded-sm transition-all">
                        <RotateCcw className="w-3.5 h-3.5"/>
                      </Link>
                      <button onClick={() => del(entry.id)} title="Delete"
                        className="p-2 border border-[var(--border)] text-[var(--text-3)] hover:text-red-400 hover:border-[rgba(239,68,68,0.3)] rounded-sm transition-all">
                        <Trash2 className="w-3.5 h-3.5"/>
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
