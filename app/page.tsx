import Link from "next/link";
import { Zap, Map, Shield, TrendingUp, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const FEATURES = [
  {
    icon: Zap,
    color: "text-[var(--purple-bright)]",
    bg: "bg-[rgba(124,58,237,0.1)] border-[rgba(124,58,237,0.2)]",
    title: "Execution Engine",
    desc: "AI converts your raw idea into phases, steps, and timelines — not vague suggestions.",
  },
  {
    icon: Map,
    color: "text-[var(--cyan-arc)]",
    bg: "bg-[rgba(34,211,238,0.08)] border-[rgba(34,211,238,0.2)]",
    title: "Structured Output",
    desc: "Every plan is broken into concrete phases with numbered steps, durations, and priorities.",
  },
  {
    icon: Shield,
    color: "text-yellow-400",
    bg: "bg-[rgba(234,179,8,0.08)] border-[rgba(234,179,8,0.2)]",
    title: "Risk Analysis",
    desc: "Proactive risk identification with specific mitigations so you execute without surprises.",
  },
  {
    icon: TrendingUp,
    color: "text-green-400",
    bg: "bg-[rgba(34,197,94,0.08)] border-[rgba(34,197,94,0.2)]",
    title: "Success Metrics",
    desc: "Measurable outcomes defined upfront so you know exactly what winning looks like.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen grid-bg">
      <Navbar />

      {/* Glow orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[20%] left-[15%] w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-[60%] right-[10%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)" }}
        />
      </div>

      <main className="relative z-10 pt-32 pb-24 px-6">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-[var(--purple-bright)]" />
            <span className="text-[11px] tracking-[0.25em] uppercase text-[var(--cyan-arc)] font-medium">
              AI Execution Engine
            </span>
            <div className="h-px w-8 bg-[var(--purple-bright)]" />
          </div>

          <h1
            className="font-syne font-extrabold leading-[0.95] mb-6"
            style={{
              fontSize: "clamp(52px, 9vw, 100px)",
              background: "linear-gradient(135deg, #FFFFFF 0%, #C4B5FD 40%, #818CF8 80%, #6366F1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            NEUROVA
          </h1>

          <p
            className="font-syne font-normal tracking-[0.4em] uppercase mb-8"
            style={{
              fontSize: "clamp(13px, 2vw, 20px)",
              color: "var(--text-secondary)",
            }}
          >
            Turn Ideas Into Execution
          </p>

          <p className="text-[16px] leading-relaxed text-[var(--text-secondary)] font-light max-w-xl mx-auto mb-12">
            Stop planning. Start executing. Neurova&apos;s AI breaks down any idea into a
            structured, actionable roadmap with phases, steps, tools, and risk analysis — in seconds.
          </p>

          <div className="flex items-center gap-4 justify-center flex-wrap">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--purple-core)] hover:bg-[#6d28d9] text-white text-[13px] font-medium tracking-widest uppercase rounded-sm transition-all"
              style={{ boxShadow: "0 0 30px rgba(124,58,237,0.3)" }}
            >
              <Zap className="w-4 h-4" />
              Start Building
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mt-28">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-3">
              What You Get
            </p>
            <h2 className="font-syne font-bold text-[28px] text-[var(--text-primary)]">
              Built for Execution, Not Conversation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-sm border border-[var(--border)] bg-[var(--card)] p-6 hover:border-[var(--border-bright)] hover:bg-[var(--card-hover)] transition-all group"
              >
                <div className={`w-10 h-10 rounded-sm border ${f.bg} flex items-center justify-center mb-4`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-syne font-semibold text-[16px] text-[var(--text-primary)] mb-2">
                  {f.title}
                </h3>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed font-light">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-2xl mx-auto mt-24 text-center">
          <div
            className="rounded-sm border border-[var(--border)] bg-[var(--card)] p-10"
            style={{ boxShadow: "0 0 60px rgba(124,58,237,0.08)" }}
          >
            <h2 className="font-syne font-bold text-[28px] mb-3 text-[var(--text-primary)]">
              Ready to Execute?
            </h2>
            <p className="text-[14px] text-[var(--text-secondary)] font-light mb-8">
              Describe your idea and get a complete execution plan in under 30 seconds.
            </p>
            <Link
              href="/app"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--purple-core)] hover:bg-[#6d28d9] text-white text-[13px] font-medium tracking-widest uppercase rounded-sm transition-all"
            >
              <Zap className="w-4 h-4" />
              Generate My Plan
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
