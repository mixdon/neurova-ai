"use client";

import { useState } from "react";
import { Zap, Loader2 } from "lucide-react";
import { EXAMPLE_PROMPTS } from "@/lib/examples";

interface IdeaInputProps {
  onGenerate: (idea: string) => void;
  onIdeaChange?: (len: number) => void;
  isLoading: boolean;
}

export default function IdeaInput({ onGenerate, onIdeaChange, isLoading }: IdeaInputProps) {
  const [idea, setIdea] = useState("");
  const MAX = 500;

  const set = (v: string) => {
    setIdea(v.slice(0, MAX));
    onIdeaChange?.(v.length);
  };

  const submit = () => { if (idea.trim() && !isLoading) onGenerate(idea.trim()); };
  const onKey = (e: React.KeyboardEvent) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit(); };

  return (
    <div className="space-y-4">
      {/* Textarea card */}
      <div className="rounded-sm border border-[var(--border)] bg-[var(--card)] overflow-hidden border-pulse"
        style={{ boxShadow: "0 0 40px rgba(138,43,226,0.06)" }}>
        <div className="px-5 py-3 border-b border-[var(--border)] bg-[rgba(138,43,226,0.04)] flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--cyan)]" style={{ animation: "pulse 2s ease-in-out infinite" }}/>
          <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-3)]">Input · Idea</span>
          <span className="ml-auto text-[10px] text-[var(--text-3)]">⌘+Enter to generate</span>
        </div>
        <textarea
          value={idea} onChange={e => set(e.target.value)} onKeyDown={onKey}
          placeholder="Describe your idea in detail. What are you building, for whom, and what problem does it solve? The more context, the more precise the plan."
          className="w-full bg-transparent resize-none outline-none text-[var(--text)] placeholder-[var(--text-3)] text-[14px] leading-relaxed font-light p-5"
          rows={5} disabled={isLoading}
        />
        <div className="px-5 pb-4 flex items-center justify-between">
          <span className={`text-[11px] tabular-nums ${idea.length > MAX * 0.85 ? "text-yellow-400" : "text-[var(--text-3)]"}`}>
            {idea.length}/{MAX}
          </span>
          <button onClick={submit} disabled={!idea.trim() || isLoading}
            className="flex items-center gap-2 px-6 py-2.5 bg-[var(--purple)] hover:bg-[#7a25d0] disabled:opacity-40 disabled:cursor-not-allowed text-white text-[12px] font-medium tracking-[0.1em] uppercase rounded-sm transition-all"
            style={idea.trim() && !isLoading ? { boxShadow: "0 0 20px rgba(138,43,226,0.4)" } : {}}>
            {isLoading ? <><Loader2 className="w-3.5 h-3.5 animate-spin"/>Generating...</> : <><Zap className="w-3.5 h-3.5"/>Generate Plan</>}
          </button>
        </div>
      </div>

      {/* Examples */}
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-3)] mb-2.5">Quick start →</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map(ex => (
            <button key={ex.label} onClick={() => set(ex.prompt)} disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-[var(--text-2)] border border-[var(--border)] rounded-sm bg-[var(--card)] hover:border-[var(--border-glow)] hover:text-[var(--purple-bright)] transition-all disabled:opacity-40">
              <span>{ex.icon}</span>{ex.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
