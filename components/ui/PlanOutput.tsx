"use client";

import { useState } from "react";
import { Copy, Check, Download, FileText, ChevronDown, ChevronUp, ExternalLink, Zap, Target, Clock, Wrench, Shield, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { ExecutionPlan } from "@/lib/types";
import { downloadText, downloadPDF } from "@/lib/export";

interface PlanOutputProps {
  plan: ExecutionPlan;
  idea: string;
  onReset: () => void;
}

export default function PlanOutput({ plan, idea, onReset }: PlanOutputProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState<Set<number>>(new Set([1]));
  const [showExport, setShowExport] = useState(false);

  const togglePhase = (n: number) => setExpanded(prev => { const s = new Set(prev); s.has(n) ? s.delete(n) : s.add(n); return s; });

  const copy = async () => {
    const { planToText } = await import("@/lib/export");
    await navigator.clipboard.writeText(planToText(plan, idea));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-3 mt-6 fade-up">

      {/* ── Overview ── */}
      <div className="rounded-sm border border-[var(--border)] bg-[var(--card)] p-6"
        style={{ boxShadow: "0 0 50px rgba(138,43,226,0.07)" }}>
        <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="badge border border-[rgba(138,43,226,0.3)] bg-[rgba(138,43,226,0.08)] text-[var(--purple-bright)]">{plan.category}</span>
              <span className={`badge badge-${plan.difficulty}`}>{plan.difficulty}</span>
            </div>
            <h2 className="font-syne font-bold text-[22px] sm:text-[28px] glow-text leading-tight mb-3">{plan.title}</h2>
            <p className="text-[14px] text-[var(--text-2)] font-light leading-relaxed max-w-2xl">{plan.overview}</p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
            <button onClick={copy} className="flex items-center gap-1.5 px-3 py-2 text-[11px] tracking-[0.1em] uppercase border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-glow)] text-[var(--text-2)] hover:text-[var(--text)] rounded-sm transition-all">
              {copied ? <><Check className="w-3 h-3 text-green-400"/>Copied</> : <><Copy className="w-3 h-3"/>Copy</>}
            </button>
            <div className="relative">
              <button onClick={() => setShowExport(v => !v)} className="flex items-center gap-1.5 px-3 py-2 text-[11px] tracking-[0.1em] uppercase border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-glow)] text-[var(--text-2)] hover:text-[var(--text)] rounded-sm transition-all">
                <Download className="w-3 h-3"/>Export
              </button>
              {showExport && (
                <div className="absolute right-0 top-10 z-20 rounded-sm border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-xl min-w-[140px]">
                  <button onClick={() => { downloadText(plan, idea); setShowExport(false); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-[12px] text-[var(--text-2)] hover:bg-[rgba(138,43,226,0.1)] hover:text-[var(--text)] transition-colors">
                    <FileText className="w-3.5 h-3.5"/>Export .txt
                  </button>
                  <button onClick={() => { downloadPDF(plan, idea); setShowExport(false); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-[12px] text-[var(--text-2)] hover:bg-[rgba(138,43,226,0.1)] hover:text-[var(--text)] transition-colors border-t border-[var(--border)]">
                    <Download className="w-3.5 h-3.5"/>Export PDF
                  </button>
                </div>
              )}
            </div>
            <button onClick={onReset} className="flex items-center gap-1.5 px-3 py-2 text-[11px] tracking-[0.1em] uppercase border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--purple-bright)] text-[var(--text-2)] hover:text-[var(--purple-bright)] rounded-sm transition-all">
              <Zap className="w-3 h-3"/>New Plan
            </button>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-5 py-4 border-t border-[var(--border)]">
          {[
            { icon: Clock, label: "Duration", val: plan.totalDuration },
            { icon: Target, label: "Phases", val: `${plan.phases.length} phases` },
            { icon: Wrench, label: "Tools", val: `${plan.tools.length} tools` },
          ].map(m => (
            <div key={m.label} className="flex items-center gap-2">
              <m.icon className="w-3.5 h-3.5 text-[var(--cyan)]"/>
              <span className="text-[12px] text-[var(--text-3)]">{m.label}:</span>
              <span className="text-[12px] text-[var(--text)] font-medium">{m.val}</span>
            </div>
          ))}
        </div>

        {/* First action */}
        <div className="mt-4 p-4 rounded-sm border border-[rgba(0,229,255,0.2)] bg-[rgba(0,229,255,0.04)]">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-sm border border-[rgba(0,229,255,0.35)] bg-[rgba(0,229,255,0.1)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Zap className="w-3 h-3 text-[var(--cyan)]"/>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.18em] uppercase text-[var(--cyan)] mb-1">Do This First — Today</p>
              <p className="text-[13px] text-[var(--text)] font-medium leading-snug">{plan.firstAction}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Phases ── */}
      {plan.phases.map(phase => (
        <div key={phase.phase} className="rounded-sm border border-[var(--border)] bg-[var(--card)] overflow-hidden">
          <button onClick={() => togglePhase(phase.phase)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-[rgba(138,43,226,0.04)] transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm border border-[var(--border-glow)] bg-[rgba(138,43,226,0.1)] flex items-center justify-center flex-shrink-0">
                <span className="font-syne font-bold text-[13px] text-[var(--purple-bright)]">{String(phase.phase).padStart(2,"0")}</span>
              </div>
              <div>
                <h3 className="font-syne font-semibold text-[15px] text-[var(--text)]">{phase.name}</h3>
                <span className="text-[11px] text-[var(--text-3)]">{phase.duration} · {phase.steps.length} steps</span>
              </div>
            </div>
            {expanded.has(phase.phase) ? <ChevronUp className="w-4 h-4 text-[var(--text-3)]"/> : <ChevronDown className="w-4 h-4 text-[var(--text-3)]"/>}
          </button>

          {expanded.has(phase.phase) && (
            <div className="border-t border-[var(--border)] divide-y divide-[var(--border)]">
              {phase.steps.map(step => (
                <div key={step.number} className="px-6 py-5 flex gap-4 hover:bg-[rgba(255,255,255,0.01)] transition-colors">
                  <div className="w-8 h-8 rounded-sm border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-mono text-[var(--text-3)]">{String(step.number).padStart(2,"0")}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1.5 flex-wrap">
                      <h4 className="text-[14px] font-medium text-[var(--text)] leading-snug">{step.title}</h4>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] text-[var(--text-3)]">{step.duration}</span>
                        <span className={`badge badge-${step.priority}`}>{step.priority}</span>
                      </div>
                    </div>
                    <p className="text-[13px] text-[var(--text-2)] font-light leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* ── Tools + Risks ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Tools */}
        <div className="rounded-sm border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="flex items-center gap-2 mb-5">
            <Wrench className="w-4 h-4 text-[var(--purple-bright)]"/>
            <h3 className="font-syne font-semibold text-[13px] tracking-[0.1em] uppercase text-[var(--text)]">Tools & Resources</h3>
          </div>
          <div className="space-y-2.5">
            {plan.tools.map(tool => (
              <div key={tool.name} className="flex items-start gap-3 p-3 rounded-sm border border-[var(--border)] bg-[var(--surface)]">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[13px] font-medium text-[var(--text)]">{tool.name}</span>
                    {tool.free && <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-sm bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.25)] text-green-400 tracking-wider">Free</span>}
                  </div>
                  <p className="text-[11px] text-[var(--text-3)] leading-snug">{tool.purpose}</p>
                </div>
                {tool.url && (
                  <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-[var(--text-3)] hover:text-[var(--cyan)] transition-colors flex-shrink-0">
                    <ExternalLink className="w-3.5 h-3.5"/>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Risks */}
        <div className="rounded-sm border border-[var(--border)] bg-[var(--card)] p-6">
          <div className="flex items-center gap-2 mb-5">
            <Shield className="w-4 h-4 text-[var(--cyan)]"/>
            <h3 className="font-syne font-semibold text-[13px] tracking-[0.1em] uppercase text-[var(--text)]">Risks & Mitigations</h3>
          </div>
          <div className="space-y-2.5">
            {plan.risks.map((risk, i) => (
              <div key={i} className="p-3 rounded-sm border border-[var(--border)] bg-[var(--surface)]">
                <div className="flex items-start gap-2 mb-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0 mt-0.5"/>
                  <div className="flex-1 flex items-start justify-between gap-2">
                    <span className="text-[12px] font-medium text-[var(--text)] leading-snug">{risk.risk}</span>
                    <span className={`badge badge-sev-${risk.severity} flex-shrink-0`}>{risk.severity}</span>
                  </div>
                </div>
                <p className="text-[11px] text-[var(--text-3)] leading-snug pl-5">{risk.mitigation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Success Metrics ── */}
      <div className="rounded-sm border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-4 h-4 text-[var(--cyan)]"/>
          <h3 className="font-syne font-semibold text-[13px] tracking-[0.1em] uppercase text-[var(--text)]">Success Metrics</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {plan.successMetrics.map((m, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-sm border border-[var(--border)] bg-[var(--surface)]">
              <CheckCircle2 className="w-4 h-4 text-[var(--purple-bright)] flex-shrink-0 mt-0.5"/>
              <p className="text-[12px] text-[var(--text-2)] leading-snug font-light">{m}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
