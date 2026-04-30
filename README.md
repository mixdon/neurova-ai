# NEUROVA — AI Execution Engine

> Transform vague ideas into structured, actionable execution plans powered by AI.

![NEUROVA Banner](https://neurova-ai.vercel.app)

## Overview

NEUROVA is a production-ready AI-powered web application that takes a raw idea and generates:

- **Structured execution phases** with timelines
- **Step-by-step action plans** with priorities and durations  
- **Tool recommendations** with links
- **Risk analysis** with specific mitigations
- **Success metrics** for tracking progress
- **Plan history** saved locally

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI Provider | OpenRouter (GPT-4o) / OpenAI / Anthropic Claude |
| Fonts | Syne + DM Sans (Google Fonts) |
| Icons | Lucide React |
| Deployment | Vercel |

---

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/username/neurova-ai.git
cd neurova-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and add your API key:

```env
# Option A — OpenRouter (recommended, access to GPT-4o + Claude + many more)
# Get your key at: https://openrouter.ai/keys
OPENROUTER_API_KEY=sk-or-...

# Option B — Direct OpenAI
# OPENAI_API_KEY=sk-...

# Option C — Direct Anthropic
# ANTHROPIC_API_KEY=sk-ant-...

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Only one key is required. The app detects which provider to use automatically.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
neurova/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts       # AI API route (OpenRouter/OpenAI/Anthropic)
│   ├── app/
│   │   └── page.tsx           # Main generator page
│   ├── history/
│   │   └── page.tsx           # Plan history page
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout with fonts
│   └── page.tsx               # Landing page
├── components/
│   ├── Navbar.tsx             # Navigation bar
│   ├── IdeaInput.tsx          # Idea input with examples
│   ├── LoadingState.tsx       # Animated skeleton loader
│   ├── PlanOutput.tsx         # Full plan display with copy
│   └── ErrorDisplay.tsx       # Error state
├── lib/
│   ├── types.ts               # TypeScript interfaces
│   ├── prompts.ts             # AI system prompt + prompt builder
│   └── examples.ts            # Example idea prompts
├── .env.local.example         # Environment variable template
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## Deploying to Vercel

### Option A — Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts, then add environment variables:
vercel env add OPENROUTER_API_KEY
vercel env add NEXT_PUBLIC_SITE_URL

# Deploy to production
vercel --prod
```

### Option B — Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your repository
4. Add environment variables in **Settings → Environment Variables**:
   - `OPENROUTER_API_KEY` = your key
   - `NEXT_PUBLIC_SITE_URL` = `https://your-app.vercel.app`
5. Click **Deploy**

### Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENROUTER_API_KEY` | Yes* | OpenRouter API key |
| `OPENAI_API_KEY` | Yes* | OpenAI API key (if not using OpenRouter) |
| `ANTHROPIC_API_KEY` | Yes* | Anthropic API key (if not using OpenRouter) |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Your deployed URL |

*At least one AI API key is required.

---

## AI Integration Details

### API Route: `/api/generate`

**Request:**
```json
POST /api/generate
{ "idea": "Build a SaaS tool for social media scheduling" }
```

**Response:**
```json
{
  "plan": {
    "title": "...",
    "overview": "...",
    "category": "Tech Product",
    "totalDuration": "4-6 months",
    "difficulty": "intermediate",
    "phases": [...],
    "tools": [...],
    "risks": [...],
    "successMetrics": [...],
    "firstAction": "..."
  }
}
```

### Prompt Engineering

The AI is given a highly specific system prompt that enforces:
- JSON-only output
- Concrete, specific actions (not vague advice)
- Realistic timelines
- Named tools with URLs
- Measurable success metrics

See `lib/prompts.ts` for the full prompt.

---

## Features

- ✅ Real AI API integration (OpenRouter / OpenAI / Anthropic)
- ✅ Structured JSON output with type safety
- ✅ Phase-based execution plans with collapsible UI
- ✅ Copy-to-clipboard (plain text export)
- ✅ Plan history (localStorage, last 20 plans)
- ✅ Example prompts
- ✅ Loading skeleton with status messages
- ✅ Error handling with retry
- ✅ Responsive design
- ✅ Vercel Edge Runtime for fast API

---

## License

MIT
