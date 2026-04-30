import Link from "next/link";
import { Zap, Map, Shield, TrendingUp, ArrowRight, Brain, Target } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import NeuroAvatar from "@/components/neuro/NeuroAvatar";

const FEATURES = [
  { icon: Zap, color: "text-[var(--purple-bright)]", bg: "bg-[rgba(138,43,226,0.1)] border-[rgba(138,43,226,0.2)]", title: "Execution Engine", desc: "AI converts raw ideas into phased, milestone-based plans — not generic advice." },
  { icon: Map, color: "text-[var(--cyan)]", bg: "bg-[rgba(0,229,255,0.08)] border-[rgba(0,229,255,0.2)]", title: "Structured Output", desc: "Every plan includes phases, steps, durations, priorities, and dependencies." },
  { icon: Shield, color: "text-yellow-400", bg: "bg-[rgba(234,179,8,0.08)] border-[rgba(234,179,8,0.2)]", title: "Risk Analysis", desc: "Proactive risk identification with specific mitigations built into every plan." },
  { icon: TrendingUp, color: "text-green-400", bg: "bg-[rgba(34,197,94,0.08)] border-[rgba(34,197,94,0.2)]", title: "Success Metrics", desc: "Measurable outcomes defined upfront so you know what winning looks like." },
  { icon: Brain, color: "text-[var(--purple-bright)]", bg: "bg-[rgba(138,43,226,0.1)] border-[rgba(138,43,226,0.2)]", title: "Persona Mode", desc: "Plans adapt to your role — Founder, Creator, Student, or Professional." },
  { icon: Target, color: "text-[var(--cyan)]", bg: "bg-[rgba(0,229,255,0.08)] border-[rgba(0,229,255,0.2)]", title: "Export & Share", desc: "Download your plan as .txt or print-to-PDF for offline use." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen grid-bg">
      <Navbar />

      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[10%] w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(138,43,226,0.07) 0%, transparent 65%)" }}/>
        <div className="absolute top-[55%] right-[5%] w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 65%)" }}/>
        <div className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(79,70,229,0.05) 0%, transparent 65%)" }}/>
      </div>

      <main className="relative z-10 pt-28 pb-24 px-6">

        {/* ── HERO ── */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16 py-16">

            {/* Left: Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-sm border border-[rgba(0,229,255,0.2)] bg-[rgba(0,229,255,0.04)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" style={{ animation: "pulse 2s ease-in-out infinite" }}/>
                <span className="text-[11px] tracking-[0.2em] uppercase text-[var(--cyan)]">AI Business Strategist</span>
              </div>

              <h1 className="font-syne font-extrabold glow-text leading-[0.95] mb-6"
                style={{ fontSize: "clamp(56px, 10vw, 108px)" }}>
                NEUROVA
              </h1>
              <p className="font-syne font-light tracking-[0.35em] uppercase text-[var(--text-2)] mb-8"
                style={{ fontSize: "clamp(13px, 2vw, 18px)" }}>
                Plan Smart. Build Real.
              </p>
              <p className="text-[16px] leading-relaxed text-[var(--text-2)] font-light max-w-lg mb-12">
                Stop staring at blank pages. Neurova&apos;s AI transforms your raw idea into a 
                complete, structured execution plan — phases, steps, tools, risks — in seconds.
              </p>

              <div className="flex items-center gap-4 justify-center lg:justify-start flex-wrap">
                <Link href="/app" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--purple)] hover:bg-[#7a25d0] text-white text-[13px] font-medium tracking-[0.1em] uppercase rounded-sm transition-all"
                  style={{ boxShadow: "0 0 35px rgba(138,43,226,0.35)" }}>
                  <Zap className="w-4 h-4"/>Start Building<ArrowRight className="w-4 h-4"/>
                </Link>
              </div>
            </div>

            {/* Right: Neuro character card */}
            <div className="flex-shrink-0 relative">
              <div className="relative w-[280px] rounded-sm border border-[rgba(138,43,226,0.3)] bg-[var(--card)] overflow-hidden scanline"
                style={{ boxShadow: "0 0 80px rgba(138,43,226,0.15), inset 0 1px 0 rgba(255,255,255,0.05)" }}>

                {/* Card header */}
                <div className="px-5 py-3 border-b border-[var(--border)] bg-[rgba(138,43,226,0.06)] flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-3)]">AI Agent · Active</span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" style={{ animation: "pulse 2s ease-in-out infinite" }}/>
                  </div>
                </div>

                {/* Neuro display */}
                <div className="p-8 flex flex-col items-center gap-5">
                  <NeuroAvatar size="lg" expression="friendly" />
                  <div className="text-center">
                    <p className="font-syne font-bold text-[20px] tracking-[0.1em] glow-text">NEURO</p>
                    <p className="text-[11px] text-[var(--text-3)] tracking-[0.12em] uppercase mt-1">AI Business Strategist</p>
                  </div>
                </div>

                {/* Traits */}
                <div className="px-5 pb-5 space-y-2">
                  {[
                    { label: "Specialty", val: "Business Planning & Strategy" },
                    { label: "Personality", val: "Calm, Intelligent, Focused" },
                    { label: "Mission", val: "Turn ideas into real impact" },
                  ].map(t => (
                    <div key={t.label} className="flex items-start gap-2 text-[11px]">
                      <span className="text-[var(--cyan)] flex-shrink-0 w-20">{t.label}</span>
                      <span className="text-[var(--text-2)] font-light">{t.val}</span>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <div className="mx-5 mb-5 p-3 rounded-sm border border-[rgba(138,43,226,0.2)] bg-[rgba(138,43,226,0.05)]">
                  <p className="text-[12px] text-[var(--text-2)] font-light italic text-center leading-snug">
                    &ldquo;You dream it. I&apos;ll build the plan.&rdquo;
                  </p>
                  <p className="text-[10px] text-[var(--text-3)] text-center mt-1">— Neuro</p>
                </div>
              </div>

              {/* Decorative circuits */}
              <div className="absolute -right-3 top-1/3 w-6 h-px bg-[var(--cyan)] opacity-30"/>
              <div className="absolute -left-3 top-2/3 w-6 h-px bg-[var(--purple-bright)] opacity-30"/>
            </div>
          </div>
        </div>

        {/* ── FEATURES ── */}
        <div className="max-w-5xl mx-auto mt-20">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--text-3)] mb-3">What You Get</p>
            <h2 className="font-syne font-bold text-[28px] sm:text-[36px] glow-text">Built for Execution</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FEATURES.map(f => (
              <div key={f.title} className="rounded-sm border border-[var(--border)] bg-[var(--card)] p-6 hover:border-[var(--border-glow)] hover:bg-[var(--card-hover)] transition-all group">
                <div className={`w-10 h-10 rounded-sm border ${f.bg} flex items-center justify-center mb-4`}>
                  <f.icon className={`w-5 h-5 ${f.color}`}/>
                </div>
                <h3 className="font-syne font-semibold text-[15px] text-[var(--text)] mb-2">{f.title}</h3>
                <p className="text-[13px] text-[var(--text-2)] font-light leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="max-w-2xl mx-auto mt-24 text-center">
          <div className="rounded-sm border border-[var(--border)] bg-[var(--card)] p-12 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, rgba(138,43,226,0.1) 0%, transparent 60%)" }}/>
            <div className="relative">
              <NeuroAvatar size="md" expression="friendly" className="mx-auto mb-5"/>
              <h2 className="font-syne font-bold text-[28px] glow-text mb-3">Ready to Execute?</h2>
              <p className="text-[14px] text-[var(--text-2)] font-light mb-8">Describe your idea and get a complete execution plan in under 30 seconds.</p>
              <Link href="/app" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--purple)] hover:bg-[#7a25d0] text-white text-[13px] font-medium tracking-[0.1em] uppercase rounded-sm transition-all"
                style={{ boxShadow: "0 0 30px rgba(138,43,226,0.3)" }}>
                <Zap className="w-4 h-4"/>Generate My Plan
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
