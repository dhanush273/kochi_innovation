/**
 * AI Demo Attendee Profiles & SVG Avatar Generator
 * Used for "Fill with Demo (Random AI)" to generate instant, futuristic AI profiles
 * without relying on external network requests or hardcoded real person data.
 */

function createAiAvatarSvg({ bgGradient, accentColor, eyeGlow, visorColor, skinTone, hairColor, techDetail }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgGradient[0]}" />
        <stop offset="50%" stop-color="${bgGradient[1]}" />
        <stop offset="100%" stop-color="${bgGradient[2]}" />
      </linearGradient>
      <linearGradient id="visorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${visorColor[0]}" stop-opacity="0.95" />
        <stop offset="50%" stop-color="${visorColor[1]}" stop-opacity="0.8" />
        <stop offset="100%" stop-color="${visorColor[2]}" stop-opacity="0.95" />
      </linearGradient>
      <linearGradient id="suitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1e293b" />
        <stop offset="100%" stop-color="#090d16" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <!-- Background -->
    <rect width="512" height="512" fill="url(#bgGrad)" />

    <!-- Tech Grid & Circuit Patterns -->
    <g stroke="rgba(255,255,255,0.08)" stroke-width="1.5">
      <line x1="64" y1="0" x2="64" y2="512" />
      <line x1="128" y1="0" x2="128" y2="512" />
      <line x1="192" y1="0" x2="192" y2="512" />
      <line x1="256" y1="0" x2="256" y2="512" />
      <line x1="320" y1="0" x2="320" y2="512" />
      <line x1="384" y1="0" x2="384" y2="512" />
      <line x1="448" y1="0" x2="448" y2="512" />
      <line x1="0" y1="64" x2="512" y2="64" />
      <line x1="0" y1="128" x2="512" y2="128" />
      <line x1="0" y1="192" x2="512" y2="192" />
      <line x1="0" y1="256" x2="512" y2="256" />
      <line x1="0" y1="320" x2="512" y2="320" />
      <line x1="0" y1="384" x2="512" y2="384" />
      <line x1="0" y1="448" x2="512" y2="448" />
    </g>

    <!-- Outer Ambient Glow Ring -->
    <circle cx="256" cy="240" r="165" fill="none" stroke="${accentColor}" stroke-width="2.5" stroke-opacity="0.35" stroke-dasharray="8 6" />
    <circle cx="256" cy="240" r="180" fill="none" stroke="${accentColor}" stroke-width="1" stroke-opacity="0.2" />

    <!-- Cyber Innovator Shoulders & Collar (Suit) -->
    <path d="M 120 512 L 120 440 Q 120 380 185 365 L 230 355 L 256 385 L 282 355 L 327 365 Q 392 380 392 440 L 392 512 Z" fill="url(#suitGrad)" />
    
    <!-- Tech Accent Trim on Suit -->
    <path d="M 195 385 L 256 460 L 317 385" fill="none" stroke="${accentColor}" stroke-width="3" stroke-linecap="round" filter="url(#glow)" />
    <path d="M 235 360 L 256 385 L 277 360" fill="none" stroke="#ffffff" stroke-width="2" stroke-opacity="0.7" />

    <!-- Neck -->
    <rect x="226" y="300" width="60" height="75" rx="10" fill="${skinTone}" />
    <!-- Neck shadow -->
    <rect x="226" y="325" width="60" height="30" fill="rgba(0,0,0,0.18)" />

    <!-- Head / Face -->
    <ellipse cx="256" cy="235" rx="78" ry="95" fill="${skinTone}" />

    <!-- Ears -->
    <ellipse cx="176" cy="235" rx="10" ry="20" fill="${skinTone}" />
    <ellipse cx="336" cy="235" rx="10" ry="20" fill="${skinTone}" />
    
    <!-- Cyber Comm Ear Nodes -->
    <rect x="168" y="222" width="10" height="26" rx="4" fill="#0f172a" stroke="${accentColor}" stroke-width="2" />
    <rect x="334" y="222" width="10" height="26" rx="4" fill="#0f172a" stroke="${accentColor}" stroke-width="2" />
    <circle cx="173" cy="235" r="2.5" fill="${eyeGlow}" filter="url(#glow)" />
    <circle cx="339" cy="235" r="2.5" fill="${eyeGlow}" filter="url(#glow)" />

    <!-- Hair -->
    <path d="M 175 220 C 170 145 205 130 256 130 C 307 130 342 145 337 220 C 325 185 300 160 256 160 C 212 160 187 185 175 220 Z" fill="${hairColor}" />

    <!-- Futuristic Cyber Visor / Smart Optics -->
    <path d="M 188 205 Q 256 195 324 205 L 328 238 Q 256 250 184 238 Z" fill="url(#visorGrad)" stroke="${accentColor}" stroke-width="2.5" filter="url(#glow)" />
    
    <!-- Visor Glare / Reflection Line -->
    <path d="M 198 214 L 314 218" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.85" />
    <circle cx="225" cy="223" r="3" fill="#ffffff" />
    <circle cx="287" cy="223" r="3" fill="#ffffff" />

    <!-- Nose bridge hint -->
    <path d="M 256 250 L 252 268 L 260 268" fill="none" stroke="rgba(0,0,0,0.25)" stroke-width="2" stroke-linecap="round" />

    <!-- Confident subtle smile -->
    <path d="M 240 286 Q 256 295 272 286" fill="none" stroke="#991b1b" stroke-width="2.5" stroke-linecap="round" />

    <!-- Floating holographic badge / AI indicator -->
    <g transform="translate(390, 42)">
      <rect x="0" y="0" width="85" height="28" rx="14" fill="#0f172a" fill-opacity="0.85" stroke="${accentColor}" stroke-width="1.5" />
      <circle cx="15" cy="14" r="4.5" fill="${eyeGlow}" filter="url(#glow)" />
      <text x="28" y="19" font-family="sans-serif" font-size="11" font-weight="800" fill="#ffffff" letter-spacing="1">AI·2026</text>
    </g>

    <!-- Tech Detail Watermark / Circuit Accent -->
    <text x="24" y="490" font-family="sans-serif" font-size="12" font-weight="700" fill="rgba(255,255,255,0.4)" letter-spacing="2">
      // ${techDetail}
    </text>
  </svg>`;
}

export function svgToDataUri(svgString) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
}

export const AI_DEMO_PROFILES = [
  {
    fullName: "Aria Thorne",
    designation: "AI Design & Generative CAD Lead",
    companyName: "Conceptia Konnect",
    avatarConfig: {
      bgGradient: ["#0f172a", "#1e1b4b", "#312e81"],
      accentColor: "#38bdf8",
      eyeGlow: "#38bdf8",
      visorColor: ["#0284c7", "#38bdf8", "#0369a1"],
      skinTone: "#fcd34d",
      hairColor: "#1e293b",
      techDetail: "GENERATIVE_CAD_AI"
    }
  },
  {
    fullName: "Marcus Sterling",
    designation: "Robotics & Simulation Architect",
    companyName: "Synthetix Dynamics",
    avatarConfig: {
      bgGradient: ["#1c1917", "#431407", "#7c2d12"],
      accentColor: "#f97316",
      eyeGlow: "#fb923c",
      visorColor: ["#ea580c", "#fb923c", "#c2410c"],
      skinTone: "#f59e0b",
      hairColor: "#292524",
      techDetail: "ROBOTICS_SIM_ENGINE"
    }
  },
  {
    fullName: "Elena Rostova",
    designation: "Lead Autonomous Systems Engineer",
    companyName: "NovaTech AI Labs",
    avatarConfig: {
      bgGradient: ["#18181b", "#3b0764", "#581c87"],
      accentColor: "#c084fc",
      eyeGlow: "#e879f9",
      visorColor: ["#9333ea", "#c084fc", "#7e22ce"],
      skinTone: "#fbcfe8",
      hairColor: "#0f172a",
      techDetail: "AUTONOMOUS_NEURAL_NET"
    }
  },
  {
    fullName: "Kai Tanaka",
    designation: "Digital Twin & Smart Factory Specialist",
    companyName: "Apex Engineering",
    avatarConfig: {
      bgGradient: ["#022c22", "#064e3b", "#065f46"],
      accentColor: "#34d399",
      eyeGlow: "#6ee7b7",
      visorColor: ["#059669", "#34d399", "#047857"],
      skinTone: "#fed7aa",
      hairColor: "#111827",
      techDetail: "DIGITAL_TWIN_3D"
    }
  },
  {
    fullName: "Zoya Patel",
    designation: "Additive AI & Materials Specialist",
    companyName: "OmniDesign Technologies",
    avatarConfig: {
      bgGradient: ["#1e1b4b", "#4c0519", "#881337"],
      accentColor: "#fb7185",
      eyeGlow: "#fda4af",
      visorColor: ["#e11d48", "#fb7185", "#be123c"],
      skinTone: "#fde047",
      hairColor: "#172554",
      techDetail: "ADDITIVE_MATERIALS_AI"
    }
  },
  {
    fullName: "David Chen",
    designation: "Generative Automation Lead",
    companyName: "Quantum CAD Systems",
    avatarConfig: {
      bgGradient: ["#0c4a6e", "#1e3a8a", "#172554"],
      accentColor: "#60a5fa",
      eyeGlow: "#93c5fd",
      visorColor: ["#2563eb", "#60a5fa", "#1d4ed8"],
      skinTone: "#fed7aa",
      hairColor: "#020617",
      techDetail: "QUANTUM_CAD_FLOW"
    }
  }
];

let lastPickedIndex = -1;

export function getRandomAiProfile() {
  let newIndex = Math.floor(Math.random() * AI_DEMO_PROFILES.length);
  if (newIndex === lastPickedIndex && AI_DEMO_PROFILES.length > 1) {
    newIndex = (newIndex + 1) % AI_DEMO_PROFILES.length;
  }
  lastPickedIndex = newIndex;
  const profile = AI_DEMO_PROFILES[newIndex];
  const photoUrl = svgToDataUri(createAiAvatarSvg(profile.avatarConfig));
  return {
    fullName: profile.fullName,
    designation: profile.designation,
    companyName: profile.companyName,
    photoUrl
  };
}

export const DEFAULT_AI_AVATAR = svgToDataUri(createAiAvatarSvg(AI_DEMO_PROFILES[0].avatarConfig));
