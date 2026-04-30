# NEUROVA — AI Business Strategist

> Meet **Neuro** — your AI business strategist who transforms raw ideas into structured, actionable execution plans.

---

## Features

- 🤖 **Neuro AI Agent** — character-based AI with typewriter responses
- 🎭 **Persona Mode** — Founder / Creator / Student / Professional
- 📋 **Structured Plans** — phases, steps, tools, risks, metrics
- 📥 **Export** — download as `.txt` or print-to-PDF
- 📋 **Copy to Clipboard** — one-click copy of full plan
- 🕐 **History** — last 20 plans saved in localStorage
- ⚡ **Example Prompts** — 6 quick-start templates
- 🌑 **Dark Futuristic UI** — purple/cyan neon design system

---

## Quick Start

```bash
# 1. Install
npm install

# 2. Configure
cp .env.local.example .env.local
# Add: OPENROUTER_API_KEY=sk-or-v1-your-key

# 3. Run
npm run dev
```

Open http://localhost:3000

---

## Deploy to Vercel

```bash
npm i -g vercel
vercel
vercel env add OPENROUTER_API_KEY
vercel env add NEXT_PUBLIC_SITE_URL
vercel --prod
```

Or push to GitHub → import in [vercel.com](https://vercel.com) → add env vars.

---

## Project Structure

```
app/
  api/generate/route.ts   ← AI API (OpenRouter)
  app/page.tsx            ← Generator + Neuro panel
  history/page.tsx        ← Saved plans
  page.tsx                ← Landing page
components/
  neuro/
    NeuroAvatar.tsx       ← SVG character
    NeuroPanel.tsx        ← Typewriter AI messages
  ui/
    Navbar.tsx
    IdeaInput.tsx         ← Input + examples
    PersonaSelector.tsx   ← Persona mode picker
    PlanOutput.tsx        ← Full plan display
    LoadingState.tsx      ← Skeleton loader
    ErrorDisplay.tsx
lib/
  types.ts                ← TypeScript types
  prompts.ts              ← Persona-aware AI prompts
  personas.ts             ← Persona definitions
  examples.ts             ← Example ideas
  export.ts               ← .txt and PDF export
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `OPENROUTER_API_KEY` | ✅ | Your OpenRouter key |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Your deployed URL |

Get your key: https://openrouter.ai/keys

---

NEUROVA · Plan Smart. Build Real.
