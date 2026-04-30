"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/ui/Navbar";
import IdeaInput from "@/components/ui/IdeaInput";
import LoadingState from "@/components/ui/LoadingState";
import PlanOutput from "@/components/ui/PlanOutput";
import ErrorDisplay from "@/components/ui/ErrorDisplay";
import NeuroPanel from "@/components/neuro/NeuroPanel";
import PersonaSelector from "@/components/ui/PersonaSelector";
import { ExecutionPlan, PersonaMode } from "@/lib/types";

type AppState = "idle" | "loading" | "result" | "error";

export default function AppPage() {
  const [state, setState] = useState<AppState>("idle");
  const [plan, setPlan] = useState<ExecutionPlan | null>(null);
  const [idea, setIdea] = useState("");
  const [error, setError] = useState("");
  const [persona, setPersona] = useState<PersonaMode>("founder");
  const [ideaLen, setIdeaLen] = useState(0);

  const generate = useCallback(async (input: string) => {
    setState("loading");
    setIdea(input);
    setError("");
    setPlan(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: input, persona }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Generation failed.");
      setPlan(data.plan);
      setState("result");
      saveHistory(input, data.plan);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }, [persona]);

  const reset = () => { setState("idle"); setPlan(null); setIdea(""); setError(""); setIdeaLen(0); };
  const retry = () => { if (idea) generate(idea); };

  return (
    <div className="min-h-screen grid-bg">
      <Navbar />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[5%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(138,43,226,0.05) 0%, transparent 65%)" }}/>
      </div>

      <main className="relative z-10 pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Page header */}
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--text-3)] mb-2">Execution Engine</p>
            <h1 className="font-syne font-bold glow-text mb-2" style={{ fontSize: "clamp(28px, 5vw, 48px)" }}>
              Idea → Execution Plan
            </h1>
            <p className="text-[14px] text-[var(--text-2)] font-light">
              Describe your idea. Neuro generates your complete roadmap.
            </p>
          </div>

          {/* Neuro panel */}
          <div className="mb-5">
            <NeuroPanel state={state} ideaLength={ideaLen} />
          </div>

          {/* Persona selector — only in idle/error */}
          {(state === "idle" || state === "error") && (
            <div className="mb-5 rounded-sm border border-[var(--border)] bg-[var(--card)] p-5">
              <PersonaSelector selected={persona} onChange={setPersona} disabled={state === "loading" as boolean}/>
            </div>
          )}

          {/* Input */}
          {(state === "idle" || state === "loading" || state === "error") && (
            <IdeaInput onGenerate={generate} onIdeaChange={setIdeaLen} isLoading={state === "loading"}/>
          )}

          {/* States */}
          {state === "loading" && <LoadingState />}
          {state === "error" && <ErrorDisplay error={error} onRetry={retry}/>}
          {state === "result" && plan && <PlanOutput plan={plan} idea={idea} onReset={reset}/>}
        </div>
      </main>
    </div>
  );
}

function saveHistory(idea: string, plan: ExecutionPlan) {
  try {
    const existing = JSON.parse(localStorage.getItem("neurova_history") || "[]");
    const entry = { id: Date.now().toString(), idea, plan, createdAt: new Date().toISOString() };
    localStorage.setItem("neurova_history", JSON.stringify([entry, ...existing].slice(0, 20)));
  } catch { /* ignore */ }
}
