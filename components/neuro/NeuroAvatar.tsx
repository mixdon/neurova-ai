"use client";

interface NeuroAvatarProps {
  size?: "sm" | "md" | "lg";
  expression?: "neutral" | "thinking" | "friendly";
  className?: string;
}

export default function NeuroAvatar({ size = "md", expression = "neutral", className = "" }: NeuroAvatarProps) {
  const dims = { sm: 40, md: 64, lg: 96 };
  const d = dims[size];

  return (
    <div
      className={`relative rounded-full neuro-glow overflow-hidden flex-shrink-0 ${className}`}
      style={{
        width: d, height: d,
        background: "radial-gradient(circle at 40% 35%, #1a0840 0%, #080818 60%, #020210 100%)",
        border: "1.5px solid rgba(138,43,226,0.5)",
      }}
    >
      <svg viewBox="0 0 64 64" width={d} height={d} xmlns="http://www.w3.org/2000/svg">
        {/* Background glow */}
        <defs>
          <radialGradient id="faceGlow" cx="50%" cy="45%" r="45%">
            <stop offset="0%" stopColor="#2a1060" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#020210" stopOpacity="1"/>
          </radialGradient>
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="1"/>
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.6"/>
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Face base */}
        <ellipse cx="32" cy="35" rx="18" ry="22" fill="url(#faceGlow)" opacity="0.9"/>

        {/* Hair — dark flowing */}
        <path d="M14 28 Q12 16 18 10 Q24 4 32 4 Q40 4 46 10 Q52 16 50 28 Q48 20 42 16 Q36 12 32 13 Q28 12 22 16 Q16 20 14 28Z" fill="#0d0d1a"/>
        <path d="M14 28 Q13 22 16 16 Q19 11 24 9 Q22 14 20 20Z" fill="#090912" opacity="0.8"/>
        <path d="M50 28 Q51 22 48 16 Q45 11 40 9 Q42 14 44 20Z" fill="#090912" opacity="0.8"/>
        {/* Hair strands */}
        <path d="M24 9 Q26 6 28 7" stroke="#1a1a2e" strokeWidth="1.5" fill="none"/>
        <path d="M32 4 Q33 2 35 3" stroke="#1a1a2e" strokeWidth="1" fill="none"/>

        {/* Face skin */}
        <ellipse cx="32" cy="36" rx="15" ry="18" fill="#c8b8f0" opacity="0.12"/>

        {/* Eyes */}
        {expression === "friendly" ? (
          <>
            {/* Happy curved eyes */}
            <path d="M23 30 Q26 27 29 30" stroke="url(#eyeGlow)" strokeWidth="1.5" fill="none" filter="url(#glow)"/>
            <path d="M35 30 Q38 27 41 30" stroke="url(#eyeGlow)" strokeWidth="1.5" fill="none" filter="url(#glow)"/>
          </>
        ) : expression === "thinking" ? (
          <>
            {/* One raised brow */}
            <ellipse cx="26" cy="30" rx="4" ry="3" fill="#000820"/>
            <ellipse cx="26" cy="29.5" rx="2.5" ry="1.8" fill="url(#eyeGlow)" opacity="0.9" filter="url(#glow)"/>
            <ellipse cx="38" cy="30" rx="4" ry="3" fill="#000820"/>
            <ellipse cx="38" cy="29.5" rx="2.5" ry="1.8" fill="url(#eyeGlow)" opacity="0.9" filter="url(#glow)"/>
            <path d="M23 27 Q26 25.5 29 27" stroke="rgba(200,190,255,0.4)" strokeWidth="0.8" fill="none"/>
            <path d="M35 26 Q38 27.5 41 26" stroke="rgba(200,190,255,0.4)" strokeWidth="0.8" fill="none"/>
          </>
        ) : (
          <>
            {/* Neutral sharp eyes */}
            <ellipse cx="26" cy="30" rx="4" ry="3.5" fill="#050515"/>
            <ellipse cx="26" cy="29.5" rx="2.8" ry="2.2" fill="url(#eyeGlow)" opacity="0.95" filter="url(#glow)"/>
            <ellipse cx="25.5" cy="28.8" rx="1" ry="0.8" fill="white" opacity="0.3"/>
            <ellipse cx="38" cy="30" rx="4" ry="3.5" fill="#050515"/>
            <ellipse cx="38" cy="29.5" rx="2.8" ry="2.2" fill="url(#eyeGlow)" opacity="0.95" filter="url(#glow)"/>
            <ellipse cx="37.5" cy="28.8" rx="1" ry="0.8" fill="white" opacity="0.3"/>
          </>
        )}

        {/* Nose */}
        <path d="M31 34 Q32 36 33 34" stroke="rgba(160,150,210,0.3)" strokeWidth="0.8" fill="none"/>

        {/* Mouth */}
        {expression === "friendly" ? (
          <path d="M27 40 Q32 43.5 37 40" stroke="rgba(200,190,255,0.6)" strokeWidth="1.2" fill="none"/>
        ) : expression === "thinking" ? (
          <path d="M28 40.5 Q32 39 36 40.5" stroke="rgba(200,190,255,0.4)" strokeWidth="1" fill="none"/>
        ) : (
          <path d="M28 40 Q32 41.5 36 40" stroke="rgba(200,190,255,0.5)" strokeWidth="1" fill="none"/>
        )}

        {/* Collar / jacket */}
        <path d="M17 58 Q20 50 26 48 L32 52 L38 48 Q44 50 47 58Z" fill="#0d0d1a"/>
        <path d="M26 48 L32 52 L38 48 Q36 54 32 56 Q28 54 26 48Z" fill="#12122a"/>

        {/* N logo on jacket */}
        <text x="29.5" y="55" fontSize="5" fill="rgba(138,43,226,0.6)" fontWeight="bold" fontFamily="sans-serif">N</text>

        {/* Cyan circuit lines on face */}
        <path d="M14 32 L17 32" stroke="rgba(0,229,255,0.3)" strokeWidth="0.5"/>
        <path d="M50 32 L47 32" stroke="rgba(0,229,255,0.3)" strokeWidth="0.5"/>

        {/* Status dot */}
        <circle cx="48" cy="16" r="3" fill="#00E5FF" opacity="0.9" filter="url(#glow)"/>
        <circle cx="48" cy="16" r="1.5" fill="white" opacity="0.8"/>
      </svg>
    </div>
  );
}
