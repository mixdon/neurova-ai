"use client";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorDisplay({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="rounded-sm border border-[rgba(239,68,68,0.3)] bg-[rgba(239,68,68,0.05)] p-5 mt-4 fade-up">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"/>
        <div className="flex-1">
          <p className="text-[13px] font-medium text-red-300 mb-1">Generation Failed</p>
          <p className="text-[12px] text-[rgba(252,165,165,0.7)] leading-relaxed">{error}</p>
        </div>
        <button onClick={onRetry} className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] tracking-widest uppercase border border-[rgba(239,68,68,0.3)] text-red-400 hover:bg-[rgba(239,68,68,0.1)] rounded-sm transition-all flex-shrink-0">
          <RefreshCw className="w-3 h-3"/>Retry
        </button>
      </div>
    </div>
  );
}
