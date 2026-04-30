// ─── NEUROVA Example Prompts ─────────────────────────────

export interface ExamplePrompt {
  label: string;
  icon: string;
  prompt: string;
  category: string;
}

export const EXAMPLE_PROMPTS: ExamplePrompt[] = [
  {
    label: "AI SaaS Product",
    icon: "⚡",
    prompt: "Build a SaaS tool that uses AI to automatically generate social media content calendars for small businesses",
    category: "Tech Product",
  },
  {
    label: "YouTube Channel",
    icon: "🎬",
    prompt: "Start a YouTube channel teaching programming concepts to absolute beginners and monetize it within 6 months",
    category: "Content",
  },
  {
    label: "Freelance Agency",
    icon: "🏗️",
    prompt: "Launch a no-code web development agency targeting local businesses that need affordable websites",
    category: "Business",
  },
  {
    label: "Mobile App",
    icon: "📱",
    prompt: "Build and launch a habit tracking app that uses AI to suggest personalized routines based on user goals",
    category: "Tech Product",
  },
  {
    label: "Newsletter Business",
    icon: "📬",
    prompt: "Build a paid newsletter about emerging AI tools and trends, reaching 10,000 subscribers in one year",
    category: "Content",
  },
  {
    label: "Learn to Code",
    icon: "💻",
    prompt: "Learn full-stack web development from scratch and land a junior developer job within 12 months",
    category: "Personal Growth",
  },
];
