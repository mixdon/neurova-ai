export interface ExecutionStep {
  number: number;
  title: string;
  description: string;
  duration: string;
  priority: "critical" | "high" | "medium";
}

export interface ExecutionPhase {
  phase: number;
  name: string;
  duration: string;
  steps: ExecutionStep[];
}

export interface Tool {
  name: string;
  purpose: string;
  url?: string;
  free: boolean;
}

export interface Risk {
  risk: string;
  mitigation: string;
  severity: "high" | "medium" | "low";
}

export interface ExecutionPlan {
  title: string;
  overview: string;
  category: string;
  totalDuration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  phases: ExecutionPhase[];
  tools: Tool[];
  risks: Risk[];
  successMetrics: string[];
  firstAction: string;
}

export interface HistoryEntry {
  id: string;
  idea: string;
  plan: ExecutionPlan;
  createdAt: string;
}

export type PersonaMode = "founder" | "creator" | "student" | "professional";

export interface Persona {
  id: PersonaMode;
  label: string;
  icon: string;
  description: string;
  focus: string;
}
