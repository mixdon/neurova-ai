"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import IdeaInput from "@/components/IdeaInput";
import LoadingState from "@/components/LoadingState";
import PlanOutput from "@/components/PlanOutput";
import ErrorDisplay from "@/components/ErrorDisplay";
import { ExecutionPlan } from "@/lib/types";

type AppState = "idle" | "loading" | "result" | "error";

export default function AppPage() {
  const [state, setState] = useState<AppState>("idle");
  const [plan, setPlan] = useState<ExecutionPlan | null>(null);
  const [currentIdea, setCurrentIdea] = useState("");
  const [error, setError] = useState("");

  const generate = useCallback(async (idea: string) => {
    setState("loading");
    setCurrentIdea(idea);
    setError("");
    setPlan(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Generation failed. Please try again.");
      }

      setPlan(data.plan);
      setState("result");

      // Save to history in localStorage
      saveToHistory(idea, data.plan);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
      setState("error");
    }
  }, []);

  const reset = () => {
    setState("idle");
    setPlan(null);
    setCurrentIdea("");
    setError("");
  };

  const retry = () => {
    if (currentIdea) generate(currentIdea);
  };

  return (
    <div className="min-h-screen grid-bg">
      <Navbar />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[30%] left-[5%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)" }}
        />
      </div>

      <main className="relative z-10 pt-28 pb-20 px-6">
        {/* Page header */}
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-muted)] mb-2">
            Execution Engine
          </p>
          <h1
            className="font-syne font-bold mb-3"
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              background: "linear-gradient(135deg, #fff 0%, #C4B5FD 60%, #818CF8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Idea → Execution Plan
          </h1>
          <p className="text-[14px] text-[var(--text-secondary)] font-light">
            Describe your idea. AI generates a complete, structured execution plan.
          </p>
        </div>

        {/* Input — always visible until result */}
        {(state === "idle" || state === "loading" || state === "error") && (
          <IdeaInput onGenerate={generate} isLoading={state === "loading"} />
        )}

        {/* States */}
        {state === "loading" && <LoadingState />}

        {state === "error" && (
          <ErrorDisplay error={error} onRetry={retry} />
        )}

        {state === "result" && plan && (
          <PlanOutput plan={plan} idea={currentIdea} onReset={reset} />
        )}
      </main>
    </div>
  );
}

// ─── Persist to localStorage ───────────────────────────────
function saveToHistory(idea: string, plan: ExecutionPlan) {
  try {
    const existing = JSON.parse(localStorage.getItem("neurova_history") || "[]");
    const entry = {
      id: Date.now().toString(),
      idea,
      plan,
      createdAt: new Date().toISOString(),
    };
    const updated = [entry, ...existing].slice(0, 20); // Keep last 20
    localStorage.setItem("neurova_history", JSON.stringify(updated));
  } catch {
    // localStorage might not be available
  }
}
