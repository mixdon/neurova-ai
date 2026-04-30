"use client";

import { PERSONAS } from "@/lib/personas";
import { PersonaMode } from "@/lib/types";

interface PersonaSelectorProps {
  selected: PersonaMode;
  onChange: (p: PersonaMode) => void;
  disabled?: boolean;
}

export default function PersonaSelector({ selected, onChange, disabled }: PersonaSelectorProps) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-3)] mb-2.5">I am a...</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {PERSONAS.map((p) => (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
            disabled={disabled}
            className={`flex flex-col items-start gap-1.5 p-3 rounded-sm border text-left transition-all disabled:opacity-50 ${
              selected === p.id
                ? "border-[var(--purple)] bg-[rgba(138,43,226,0.12)] text-[var(--text)]"
                : "border-[var(--border)] bg-[var(--card)] text-[var(--text-2)] hover:border-[var(--border-glow)] hover:text-[var(--text)]"
            }`}
          >
            <span className="text-lg">{p.icon}</span>
            <span className="font-syne font-bold text-[13px] tracking-wide">{p.label}</span>
            <span className="text-[10px] opacity-70 leading-tight">{p.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
