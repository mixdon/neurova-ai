"use client";

import { useEffect, useState } from "react";

const LOADING_MESSAGES = [
  "Analyzing your idea...",
  "Mapping execution phases...",
  "Identifying critical steps...",
  "Selecting tools & resources...",
  "Calculating risk factors...",
  "Calibrating timelines...",
  "Finalizing your execution plan...",
];

export default function LoadingState() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 animate-fade-up">
      {/* Status bar */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[var(--purple-bright)]"
              style={{
                animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </div>
        <span className="text-[13px] text-[var(--text-secondary)] transition-all">
          {LOADING_MESSAGES[msgIndex]}
        </span>
      </div>

      {/* Skeleton cards */}
      <div className="space-y-3">
        {/* Overview skeleton */}
        <div className="rounded-sm border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="shimmer h-7 w-64 rounded-sm mb-4" />
          <div className="shimmer h-4 w-full rounded-sm mb-2" />
          <div className="shimmer h-4 w-5/6 rounded-sm mb-2" />
          <div className="shimmer h-4 w-4/6 rounded-sm" />
        </div>

        {/* Phase skeletons */}
        {[1, 2].map((p) => (
          <div key={p} className="rounded-sm border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="shimmer h-5 w-40 rounded-sm mb-5" />
            <div className="space-y-3">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex gap-4">
                  <div className="shimmer w-8 h-8 rounded-sm flex-shrink-0" />
                  <div className="flex-1">
                    <div className="shimmer h-4 w-48 rounded-sm mb-2" />
                    <div className="shimmer h-3 w-full rounded-sm mb-1" />
                    <div className="shimmer h-3 w-3/4 rounded-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Tools/risks row */}
        <div className="grid grid-cols-2 gap-3">
          {[1, 2].map((c) => (
            <div key={c} className="rounded-sm border border-[var(--border)] bg-[var(--card)] p-6">
              <div className="shimmer h-4 w-24 rounded-sm mb-4" />
              {[1, 2, 3].map((r) => (
                <div key={r} className="shimmer h-3 w-full rounded-sm mb-2" />
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
