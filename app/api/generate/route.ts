import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompts";
import { PersonaMode, ExecutionPlan } from "@/lib/types";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { idea, persona = "founder" } = await req.json();

    if (!idea || typeof idea !== "string" || idea.trim().length < 5) {
      return NextResponse.json({ error: "Please provide a valid idea (at least 5 characters)." }, { status: 400 });
    }
    if (idea.length > 1000) {
      return NextResponse.json({ error: "Idea too long. Keep it under 1000 characters." }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OPENROUTER_API_KEY is not configured. Add it to your .env.local file." }, { status: 500 });
    }

    const plan = await callOpenRouter(idea, persona as PersonaMode, apiKey);
    return NextResponse.json({ plan });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function callOpenRouter(idea: string, persona: PersonaMode, apiKey: string): Promise<ExecutionPlan> {
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
      model: "openai/gpt-4o-mini",
      messages: [
        { role: "system", content: buildSystemPrompt(persona) },
        { role: "user", content: buildUserPrompt(idea) },
      ],
      temperature: 0.7,
      max_tokens: 400,
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const content: string = data.choices[0].message.content;
  return parseResponse(content);
}

function parseResponse(content: string): ExecutionPlan {
  const cleaned = content
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned);
    if (!parsed.title || !parsed.phases || !parsed.tools) {
      throw new Error("Incomplete plan structure");
    }
    return parsed as ExecutionPlan;
  } catch {
    throw new Error("AI returned invalid format. Please try again.");
  }
}
