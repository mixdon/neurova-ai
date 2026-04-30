"use client";

import { useState, useEffect } from "react";
import NeuroAvatar from "./NeuroAvatar";

interface NeuroPanelProps {
  state: "idle" | "loading" | "result" | "error";
  ideaLength?: number;
}

const IDLE_MSGS = [
  "Ready to architect your plan. What's the idea?",
  "Describe your vision — I'll build the execution roadmap.",
  "Every great execution starts with a clear idea. Let's hear yours.",
];

const LOADING_MSGS = [
  "Analyzing your idea and market context...",
  "Mapping the execution phases...",
  "Identifying critical dependencies...",
  "Selecting the right tools for your stack...",
  "Calculating risk factors...",
  "Finalizing your roadmap...",
];

const RESULT_MSGS = [
  "Plan complete. Start with the first action — today.",
  "Your execution roadmap is ready. Time to build.",
  "I've mapped every phase. The path is clear.",
];

const ERROR_MSGS = [
  "Something went wrong. Let's try again.",
  "Hit a wall. Retry and I'll get it right.",
];

export default function NeuroPanel({ state, ideaLength = 0 }: NeuroPanelProps) {
  const [msgIdx, setMsgIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const getMessages = () => {
    if (state === "loading") return LOADING_MSGS;
    if (state === "result") return RESULT_MSGS;
    if (state === "error") return ERROR_MSGS;
    return IDLE_MSGS;
  };

  const getExpression = () => {
    if (state === "loading") return "thinking" as const;
    if (state === "result") return "friendly" as const;
    return "neutral" as const;
  };

  // Cycle messages
  useEffect(() => {
    const msgs = getMessages();
    setMsgIdx(0);
    if (state === "loading") {
      const iv = setInterval(() => setMsgIdx(i => (i + 1) % msgs.length), 1800);
      return () => clearInterval(iv);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // Typewriter effect
  useEffect(() => {
    const msgs = getMessages();
    const target = msgs[msgIdx % msgs.length];
    setDisplayText("");
    setIsTyping(true);
    let i = 0;
    const iv = setInterval(() => {
      setDisplayText(target.slice(0, i + 1));
      i++;
      if (i >= target.length) { setIsTyping(false); clearInterval(iv); }
    }, 22);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgIdx, state]);

  return (
    <div className="flex items-start gap-3 p-4 rounded-sm border border-[var(--border)] bg-[rgba(15,15,40,0.8)] backdrop-blur-sm">
      <NeuroAvatar size="md" expression={getExpression()} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-syne font-bold text-[13px] text-[var(--text)] tracking-wide">NEURO</span>
          <span className="text-[9px] tracking-[0.15em] uppercase text-[var(--cyan)] border border-[rgba(0,229,255,0.25)] px-1.5 py-0.5 rounded-sm">
            {state === "loading" ? "Processing" : state === "result" ? "Complete" : state === "error" ? "Error" : "Ready"}
          </span>
          {state === "loading" && (
            <div className="flex gap-1 ml-1">
              {[0,1,2].map(i => (
                <div key={i} className="w-1 h-1 rounded-full bg-[var(--purple-bright)]"
                  style={{ animation: `bounce 1s ease-in-out ${i*0.2}s infinite` }}/>
              ))}
            </div>
          )}
        </div>
        <p className="text-[13px] text-[var(--text-2)] font-light leading-snug">
          {displayText}
          {isTyping && <span className="cursor"/>}
        </p>
        {state === "idle" && ideaLength > 0 && (
          <p className="text-[11px] text-[var(--text-3)] mt-1">{ideaLength} characters · Press ⌘+Enter to generate</p>
        )}
      </div>
      <style jsx>{`
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
      `}</style>
    </div>
  );
}
