"use client";

import { useState } from "react";
import {
  CheckCircle2, AlertTriangle, Wrench, Target,
  Clock, Zap, Copy, Check, ExternalLink,
  TrendingUp, Shield, ChevronDown, ChevronUp
} from "lucide-react";
import { ExecutionPlan } from "@/lib/types";

interface PlanOutputProps {
  plan: ExecutionPlan;
  idea: string;
  onReset: () => void;
}

export default function PlanOutput({ plan, idea, onReset }: PlanOutputProps) {
  const [copied, setCopied] = useState(false);
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(
    new Set([1])
  );

  const togglePhase = (phase: number) => {
    setExpandedPhases((prev) => {
      const next = new Set(prev);
      if (next.has(phase)) next.delete(phase);
      else next.add(phase);
      return next;
    });
  };

  const copyToClipboard = async () => {
    const text = formatPlanAsText(plan);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 space-y-3 animate-fade-up">

      {/* ─── Header ─────────────────────────────────── */}
      <div
        className="rounded-sm border border-[var(--border)] bg-[var(--card)] p-6"
        style={{ boxShadow: "0 0 40px rgba(124,58,237,0.06)" }}
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-[10px] tracking-[0.2em] uppercase border border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.08)] text-[var(--purple-bright)] px-2.5 py-1 rounded-sm">
                {plan.category}
              </span>
              <span className={`text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-sm badge-difficulty-${plan.difficulty}`}>
                {plan.difficulty}
              </span>
            </div>
            <h2 className="plan-title mb-2">{plan.title}</h2>
            <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed font-light max-w-2xl">
              {plan.overview}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-3 py-2 text-[11px] tracking-widest uppercase border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-bright)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-sm transition-all"
            >
              {copied ? (
                <><Check className="w-3 h-3 text-green-400" /> Copied</>
              ) : (
                <><Copy className="w-3 h-3" /> Copy</>
              )}
            </button>
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-2 text-[11px] tracking-widest uppercase border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--purple-bright)] text-[var(--text-secondary)] hover:text-[var(--purple-bright)] rounded-sm transition-all"
            >
              <Zap className="w-3 h-3" />
              New Plan
            </button>
          </div>
        </div>

        {/* Meta stats */}
        <div className="mt-5 pt-5 border-t border-[var(--border)] flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[var(--cyan-arc)]" />
            <span className="text-[12px] text-[var(--text-muted)]">Total duration:</span>
            <span className="text-[12px] text-[var(--text-primary)] font-medium">{plan.totalDuration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-3.5 h-3.5 text-[var(--cyan-arc)]" />
            <span className="text-[12px] text-[var(--text-muted)]">Phases:</span>
            <span className="text-[12px] text-[var(--text-primary)] font-medium">{plan.phases.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <Wrench className="w-3.5 h-3.5 text-[var(--cyan-arc)]" />
            <span className="text-[12px] text-[var(--text-muted)]">Tools:</span>
            <span className="text-[12px] text-[var(--text-primary)] font-medium">{plan.tools.length}</span>
          </div>
        </div>

        {/* First action */}
        <div className="mt-4 p-4 rounded-sm border border-[rgba(34,211,238,0.2)] bg-[rgba(34,211,238,0.04)]">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-sm bg-[rgba(34,211,238,0.15)] border border-[rgba(34,211,238,0.3)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Zap className="w-3 h-3 text-[var(--cyan-arc)]" />
            </div>
            <div>
              <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--cyan-arc)] mb-1">Do This First — Today</p>
              <p className="text-[13px] text-[var(--text-primary)] font-medium leading-snug">{plan.firstAction}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Phases ─────────────────────────────────── */}
      {plan.phases.map((phase) => (
        <div
          key={phase.phase}
          className="rounded-sm border border-[var(--border)] bg-[var(--card)] overflow-hidden"
        >
          {/* Phase header */}
          <button
            onClick={() => togglePhase(phase.phase)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-[rgba(124,58,237,0.04)] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm border border-[var(--border-bright)] bg-[rgba(124,58,237,0.1)] flex items-center justify-center flex-shrink-0">
                <span className="text-[12px] font-syne font-bold text-[var(--purple-bright)]">{String(phase.phase).padStart(2, "0")}</span>
              </div>
              <div>
                <h3 className="font-syne font-semibold text-[15px] text-[var(--text-primary)]">{phase.name}</h3>
                <span className="text-[11px] text-[var(--text-muted)]">{phase.duration} · {phase.steps.length} steps</span>
              </div>
            </div>
            {expandedPhases.has(phase.phase)
              ? <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" />
              : <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
            }
          </button>

          {/* Phase steps */}
          {expandedPhases.has(phase.phase) && (
            <div className="border-t border-[var(--border)] divide-y divide-[var(--border)]">
              {phase.steps.map((step) => (
                <div key={step.number} className="px-6 py-5 flex gap-4 hover:bg-[rgba(255,255,255,0.01)] transition-colors">
                  <div className="flex-shrink-0 pt-0.5">
                    <div className="w-7 h-7 rounded-sm bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center">
                      <span className="text-[11px] font-mono text-[var(--text-muted)]">
                        {String(step.number).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                      <h4 className="text-[14px] font-medium text-[var(--text-primary)] leading-snug">{step.title}</h4>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] text-[var(--text-muted)]">{step.duration}</span>
                        <span className={`text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-sm badge-${step.priority}`}>
                          {step.priority}
                        </span>
                      </div>
                    </div>
                    <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* ─── Tools + Risks row ───────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Tools */}
        <div className="rounded-sm border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="flex items-center gap-2 mb-5">
            <Wrench className="w-4 h-4 text-[var(--purple-bright)]" />
            <h3 className="font-syne font-semibold text-[14px] tracking-wide uppercase text-[var(--text-primary)]">
              Tools & Resources
            </h3>
          </div>
          <div className="space-y-3">
            {plan.tools.map((tool) => (
              <div key={tool.name} className="flex items-start gap-3 p-3 rounded-sm bg-[var(--surface)] border border-[var(--border)]">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[13px] font-medium text-[var(--text-primary)]">{tool.name}</span>
                    {tool.free && (
                      <span className="text-[9px] tracking-wider uppercase px-1.5 py-0.5 rounded-sm bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.25)] text-green-400">
                        Free
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-[var(--text-muted)] leading-snug">{tool.purpose}</p>
                </div>
                {tool.url && (
                  <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-[var(--text-muted)] hover:text-[var(--cyan-arc)] transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Risks */}
        <div className="rounded-sm border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-4 h-4 text-[var(--cyan-arc)]" />
            <h3 className="font-syne font-semibold text-[14px] tracking-wide uppercase text-[var(--text-primary)]">
              Risks & Mitigations
            </h3>
          </div>
          <div className="space-y-3">
            {plan.risks.map((risk, i) => (
              <div key={i} className="p-3 rounded-sm bg-[var(--surface)] border border-[var(--border)]">
                <div className="flex items-start gap-2 mb-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0 flex items-start justify-between gap-2">
                    <span className="text-[12px] font-medium text-[var(--text-primary)] leading-snug">{risk.risk}</span>
                    <span className={`text-[9px] tracking-wider uppercase px-1.5 py-0.5 rounded-sm flex-shrink-0 badge-severity-${risk.severity}`}>
                      {risk.severity}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] leading-snug pl-5">{risk.mitigation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Success Metrics ─────────────────────────── */}
      <div className="rounded-sm border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-4 h-4 text-[var(--cyan-arc)]" />
          <h3 className="font-syne font-semibold text-[14px] tracking-wide uppercase text-[var(--text-primary)]">
            Success Metrics
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {plan.successMetrics.map((metric, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-sm bg-[var(--surface)] border border-[var(--border)]">
              <CheckCircle2 className="w-4 h-4 text-[var(--purple-bright)] flex-shrink-0 mt-0.5" />
              <p className="text-[13px] text-[var(--text-secondary)] leading-snug font-light">{metric}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── Plain-text export ─────────────────────────────────────
function formatPlanAsText(plan: ExecutionPlan): string {
  let out = `NEUROVA EXECUTION PLAN\n${"=".repeat(50)}\n\n`;
  out += `TITLE: ${plan.title}\n`;
  out += `CATEGORY: ${plan.category} | DIFFICULTY: ${plan.difficulty} | DURATION: ${plan.totalDuration}\n\n`;
  out += `OVERVIEW\n${plan.overview}\n\n`;
  out += `FIRST ACTION\n${plan.firstAction}\n\n`;
  plan.phases.forEach((phase) => {
    out += `PHASE ${phase.phase}: ${phase.name} (${phase.duration})\n`;
    phase.steps.forEach((step) => {
      out += `  ${step.number}. ${step.title} [${step.priority}] · ${step.duration}\n`;
      out += `     ${step.description}\n`;
    });
    out += "\n";
  });
  out += `TOOLS\n`;
  plan.tools.forEach((t) => { out += `  • ${t.name}${t.url ? ` (${t.url})` : ""} — ${t.purpose}\n`; });
  out += `\nRISKS\n`;
  plan.risks.forEach((r) => { out += `  • [${r.severity}] ${r.risk}\n    ↳ ${r.mitigation}\n`; });
  out += `\nSUCCESS METRICS\n`;
  plan.successMetrics.forEach((m) => { out += `  ✓ ${m}\n`; });
  return out;
}
