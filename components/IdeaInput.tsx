"use client";

import { useState } from "react";
import { Zap, Loader2 } from "lucide-react";
import { EXAMPLE_PROMPTS } from "@/lib/examples";

interface IdeaInputProps {
  onGenerate: (idea: string) => void;
  isLoading: boolean;
}

export default function IdeaInput({ onGenerate, isLoading }: IdeaInputProps) {
  const [idea, setIdea] = useState("");
  const charLimit = 500;

  const handleSubmit = () => {
    if (!idea.trim() || isLoading) return;
    onGenerate(idea.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Input card */}
      <div
        className="rounded-sm border border-[var(--border)] bg-[var(--card)] overflow-hidden"
        style={{ boxShadow: "0 0 60px rgba(124,58,237,0.08)" }}
      >
        {/* Header strip */}
        <div className="px-5 py-3.5 border-b border-[var(--border)] bg-[rgba(124,58,237,0.04)] flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--cyan-arc)] animate-pulse" />
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--text-muted)]">
            Execution Engine · Ready
          </span>
        </div>

        {/* Textarea */}
        <div className="p-5">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value.slice(0, charLimit))}
            onKeyDown={handleKeyDown}
            placeholder="Describe your idea in detail. The more context you provide, the more precise your execution plan will be..."
            className="w-full bg-transparent resize-none outline-none text-[var(--text-primary)] placeholder-[var(--text-muted)] text-[15px] leading-relaxed font-light"
            rows={5}
            disabled={isLoading}
          />
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 flex items-center justify-between gap-4">
          <span
            className={`text-[11px] tabular-nums ${
              idea.length > charLimit * 0.85
                ? "text-yellow-400"
                : "text-[var(--text-muted)]"
            }`}
          >
            {idea.length}/{charLimit}
          </span>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[var(--text-muted)] hidden sm:block">
              ⌘ + Enter to generate
            </span>
            <button
              onClick={handleSubmit}
              disabled={!idea.trim() || isLoading}
              className="flex items-center gap-2 px-6 py-2.5 bg-[var(--purple-core)] hover:bg-[#6d28d9] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-medium tracking-widest uppercase rounded-sm transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" />
                  Generate Plan
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Example prompts */}
      <div className="mt-6">
        <p className="text-[11px] text-[var(--text-muted)] tracking-widest uppercase mb-3">
          Example ideas →
        </p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((ex) => (
            <button
              key={ex.label}
              onClick={() => setIdea(ex.prompt)}
              disabled={isLoading}
              className="flex items-center gap-2 px-3 py-1.5 text-[12px] text-[var(--text-secondary)] border border-[var(--border)] rounded-sm bg-[var(--card)] hover:border-[var(--border-bright)] hover:text-[var(--purple-bright)] transition-all disabled:opacity-40"
            >
              <span>{ex.icon}</span>
              {ex.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
