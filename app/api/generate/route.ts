import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompts";
import { ExecutionPlan } from "@/lib/types";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json();

    if (!idea || typeof idea !== "string" || idea.trim().length < 5) {
      return NextResponse.json(
        { error: "Please provide a valid idea (at least 5 characters)." },
        { status: 400 }
      );
    }

    if (idea.length > 1000) {
      return NextResponse.json(
        { error: "Idea is too long. Please keep it under 1000 characters." },
        { status: 400 }
      );
    }

    // ─── Determine API provider ────────────────────────────
    const openrouterKey = process.env.OPENROUTER_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    let plan: ExecutionPlan;

    if (openrouterKey) {
      plan = await callOpenRouter(idea, openrouterKey);
    } else if (openaiKey) {
      plan = await callOpenAI(idea, openaiKey);
    } else if (anthropicKey) {
      plan = await callAnthropic(idea, anthropicKey);
    } else {
      return NextResponse.json(
        {
          error:
            "No AI API key configured. Please add OPENROUTER_API_KEY, OPENAI_API_KEY, or ANTHROPIC_API_KEY to your .env.local file.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ plan });
  } catch (err: unknown) {
    console.error("[NEUROVA API Error]", err);
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ─── OpenRouter (preferred) ────────────────────────────────
async function callOpenRouter(idea: string, apiKey: string): Promise<ExecutionPlan> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://neurova-ai.vercel.app";

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": siteUrl,
      "X-Title": "NEUROVA",
    },
    body: JSON.stringify({
      model: "openai/gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(idea) },
      ],
      temperature: 0.7,
      max_tokens: 3000,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return parseAIResponse(data.choices[0].message.content);
}

// ─── OpenAI (fallback) ─────────────────────────────────────
async function callOpenAI(idea: string, apiKey: string): Promise<ExecutionPlan> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(idea) },
      ],
      temperature: 0.7,
      max_tokens: 3000,
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return parseAIResponse(data.choices[0].message.content);
}

// ─── Anthropic Claude (fallback) ──────────────────────────
async function callAnthropic(idea: string, apiKey: string): Promise<ExecutionPlan> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 3000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildUserPrompt(idea) }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Anthropic API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return parseAIResponse(data.content[0].text);
}

// ─── Parse AI JSON response ────────────────────────────────
function parseAIResponse(content: string): ExecutionPlan {
  // Strip markdown code fences if present
  const cleaned = content
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned);
    validatePlan(parsed);
    return parsed as ExecutionPlan;
  } catch {
    throw new Error("AI returned invalid JSON. Please try again.");
  }
}

// ─── Validate plan structure ───────────────────────────────
function validatePlan(plan: unknown): void {
  if (typeof plan !== "object" || plan === null) {
    throw new Error("Invalid plan structure");
  }
  const p = plan as Record<string, unknown>;
  const required = ["title", "overview", "phases", "tools", "risks", "successMetrics", "firstAction"];
  for (const key of required) {
    if (!p[key]) throw new Error(`Missing required field: ${key}`);
  }
}
