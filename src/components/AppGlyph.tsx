// Flat 2D brand glyphs — one solid shape per app, brand color, no gradients.
export function AppGlyph({ label }: { label: string }) {
  const common = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none" as const };

  switch (label) {
    case "WhatsApp":
      return (
        <svg {...common}>
          <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2z" fill="#25D366" />
          <path d="M8.5 7.5c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.2-.7.4-.3.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.9 4.5 4 2.2.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.4-.3-.2-1.5-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.2-.7-.7-1.2-1.5-1.4-1.8-.1-.3 0-.4.1-.5.1-.1.3-.3.4-.5.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.2-.6-1.4-.8-1.9z" fill="#fff" />
        </svg>
      );
    case "Facebook":
      return (
        <svg {...common}>
          <path d="M12 2a10 10 0 00-1.8 19.8v-7H7.5V12h2.7V9.8c0-2.7 1.6-4.2 4-4.2 1.2 0 2.4.2 2.4.2v2.7h-1.3c-1.3 0-1.7.8-1.7 1.6V12h2.9l-.5 2.8h-2.4v7A10 10 0 0012 2z" fill="#1877F2" />
        </svg>
      );
    case "Messenger":
      return (
        <svg {...common}>
          <path d="M12 2a9.5 9.5 0 00-9.5 9.5c0 2.8 1.2 5.3 3.1 7v3.3l3-1.6c1 .3 2.1.4 3.4.4a9.5 9.5 0 100-18.6z" fill="#00B2FF" />
          <path d="M7 14.5l2.5-2.7 2 1.4 2.8-3 2.2 2.3-1.5-4.5-2.8 2.8-2-1.4-2.7 2.6z" fill="#fff" />
        </svg>
      );
    case "Instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" fill="#E1306C" />
          <circle cx="12" cy="12" r="4" fill="none" stroke="#fff" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
        </svg>
      );
    case "Twitter/X":
      return (
        <svg {...common}>
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#000" />
          <path d="M6 6h2.7l3 4 3.6-4H18l-4.7 5.1L18.5 18H15.8l-3.2-4.3L8.7 18H6l5-5.5L6 6z" fill="#fff" />
        </svg>
      );
    case "TikTok":
      return (
        <svg {...common}>
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#000" />
          <path d="M14 6v6.3a2.3 2.3 0 11-1.6-2.2V8a4 4 0 103.4 4V9.6a4.3 4.3 0 002.2.6V8.1a2.4 2.4 0 01-2.3-2.1H14z" fill="#fff" />
        </svg>
      );
    case "YouTube":
      return (
        <svg {...common}>
          <rect x="2" y="5" width="20" height="14" rx="4" fill="#FF0000" />
          <path d="M10 9l5 3-5 3V9z" fill="#fff" />
        </svg>
      );
    case "Google Maps":
      return (
        <svg {...common}>
          <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7z" fill="#EA4335" />
          <circle cx="12" cy="9" r="2.5" fill="#fff" />
        </svg>
      );
    case "Apple Maps":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" fill="#34C759" />
          <path d="M16 7l-2.5 8-1.6-3.4L8 10l8-3z" fill="#fff" />
        </svg>
      );
    case "Waze":
      return (
        <svg {...common}>
          <circle cx="12" cy="11" r="8" fill="#33CCFF" />
          <circle cx="9.5" cy="10" r="1.1" fill="#fff" />
          <circle cx="14.5" cy="10" r="1.1" fill="#fff" />
          <path d="M9 13.5c.8 1 2 1.5 3 1.5s2.2-.5 3-1.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <path d="M8 18l1.5-2M16 18l-1.5-2" stroke="#33CCFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "Spotify":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" fill="#1DB954" />
          <path d="M7 10c3-1 7-1 10 1M7.5 13c2.5-.8 6-.8 8.5.8M8 16c2-.5 4.5-.5 6.5.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "Amazon Music":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" fill="#25D1DA" />
          <path d="M8 14V9l2.5 3L13 9v5" stroke="#0B1B34" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="15.5" cy="13.5" r="1.4" fill="#0B1B34" />
        </svg>
      );
    case "Apple Music":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" fill="#FA243C" />
          <path d="M15 7l-5 1.2V14a1.8 1.8 0 11-1.2-1.7V8.6L15 7.3z" fill="#fff" />
        </svg>
      );
    case "Netflix":
      return (
        <svg {...common}>
          <path d="M6 3v18h3.5l5.5-9V21H18V3h-3.5L9 12V3H6z" fill="#E50914" />
        </svg>
      );
    case "Prime Video":
      return (
        <svg {...common}>
          <rect x="2" y="4" width="20" height="16" rx="3" fill="#1399FF" />
          <path d="M8 9l4 2.5L8 14V9z" fill="#fff" />
        </svg>
      );
    case "Max":
      return (
        <svg {...common}>
          <rect x="2" y="5" width="20" height="14" rx="3" fill="#0026FF" />
          <text x="12" y="15.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">MAX</text>
        </svg>
      );
    case "Claro Música":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" fill="#DA291C" />
          <path d="M9 15V9l5 3-5 3z" fill="#fff" />
        </svg>
      );
    case "Telegram":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" fill="#229ED9" />
          <path d="M7 12l9-3.5-1.5 7-2.5-2-1.5 1.5L10 14l-3-2z" fill="#fff" />
        </svg>
      );
    case "Snapchat":
      return (
        <svg {...common}>
          <path d="M12 3c2.5 0 4 2 4 4.5 0 1 0 1.8-.2 2.5.5.2 1 .2 1.5 0 .8-.3 1.5.8.7 1.3-.5.3-1.5.5-1.7 1 0 .5.5 1.5 1.7 2.3.5.3.3 1-.3 1.2-.5.2-1.5.2-2 .5-.3.5.2 1.5-1 1.7-.8.2-1.8-.5-3-.5s-2.2.7-3 .5c-1.2-.2-.7-1.2-1-1.7-.5-.3-1.5-.3-2-.5-.8-.2-1-.9-.3-1.2 1.2-.8 1.7-1.8 1.7-2.3-.2-.5-1.2-.7-1.7-1-.8-.5-.1-1.6.7-1.3.5.2 1 .2 1.5 0C8 9.3 8 8.5 8 7.5 8 5 9.5 3 12 3z" fill="#FFFC00" stroke="#0B1B34" strokeWidth="0.5" />
        </svg>
      );
    case "Threads":
      return (
        <svg {...common}>
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#000" />
          <path d="M12 7c2.5 0 4 1.6 4 4s-1.6 4-3.5 4c-1 0-1.8-.5-1.8-1.4 0-.8.6-1.2 1.4-1.2.7 0 1 .3 1 .6 0 .4.4.4.7.3.4-.2.6-.7.6-1.3 0-1.4-1.2-2.3-2.6-2.3S9 10.3 9 12s1.4 2.8 3 2.8" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="3" fill="#0A66C2" />
          <path d="M7 10v7M7 7v.5M11 17v-4c0-1.5 1-2.5 2.5-2.5S16 11.5 16 13v4" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "Discord":
      return (
        <svg {...common}>
          <rect x="2" y="4" width="20" height="16" rx="4" fill="#5865F2" />
          <circle cx="9.5" cy="12" r="1.3" fill="#fff" />
          <circle cx="14.5" cy="12" r="1.3" fill="#fff" />
        </svg>
      );
    case "Zoom":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="13" height="12" rx="3" fill="#2D8CFF" />
          <path d="M16 10l5-3v10l-5-3v-4z" fill="#2D8CFF" />
        </svg>
      );
    case "VIX":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="3" fill="#FF5C00" />
          <text x="12" y="15.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">VIX</text>
        </svg>
      );
    case "MVS":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="3" fill="#E11D48" />
          <text x="12" y="15.5" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#fff">MVS</text>
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" fill="#1e3a5f" />
          <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#94a3b8">
            {label.slice(0, 1)}
          </text>
        </svg>
      );
  }
}

export function AppIcon({ label }: { label: string }) {
  return (
    <div
      title={label}
      className="flex h-7 w-7 items-center justify-center rounded-full"
      style={{ backgroundColor: "var(--surface-2)", border: "1px solid var(--border)" }}
    >
      <AppGlyph label={label} />
    </div>
  );
}
