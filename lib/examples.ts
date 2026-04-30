export interface ExamplePrompt {
  label: string;
  icon: string;
  prompt: string;
}

export const EXAMPLE_PROMPTS: ExamplePrompt[] = [
  { label: "AI SaaS", icon: "⚡", prompt: "Build a SaaS tool that uses AI to generate social media content calendars for small businesses" },
  { label: "YouTube Channel", icon: "🎬", prompt: "Start a YouTube channel teaching programming to beginners and monetize within 6 months" },
  { label: "Freelance Agency", icon: "🏗️", prompt: "Launch a no-code web development agency targeting local businesses needing affordable websites" },
  { label: "Mobile App", icon: "📱", prompt: "Build and launch a habit tracking app using AI to suggest personalized routines based on user goals" },
  { label: "Newsletter", icon: "📬", prompt: "Build a paid newsletter about emerging AI tools reaching 10,000 subscribers in one year" },
  { label: "Learn to Code", icon: "💻", prompt: "Learn full-stack web development and land a junior developer job within 12 months" },
];
