import type { Plan } from "../data/types";
import { getCarrier, getNetworkColor, carrierGradient, formatData, formatMinutes, formatMXNperGB } from "../data/utils";
import { Wifi, CreditCard, Smartphone } from "lucide-react";

// Simple flat 2D SVG icons — one solid shape per app, brand color, no gradients.
function AppGlyph({ label }: { label: string }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none" as const,
  };

  switch (label) {
    case "WhatsApp":
      return (
        <svg {...common}>
          <path
            d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2z"
            fill="#25D366"
          />
          <path
            d="M8.5 7.5c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.2-.7.4-.3.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.9 4.5 4 2.2.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.4-.3-.2-1.5-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.2-.7-.7-1.2-1.5-1.4-1.8-.1-.3 0-.4.1-.5.1-.1.3-.3.4-.5.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5-.1-.2-.6-1.4-.8-1.9z"
            fill="#fff"
          />
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
          <path d="M3 3h4.5l4 5.5L16 3h3l-6 8 6.5 10H16l-4.5-6.2L6 21H3l6.5-9L3 3z" fill="#fff" />
        </svg>
      );
    case "TikTok":
      return (
        <svg {...common}>
          <path d="M14 3v9.5a3 3 0 11-2-2.8V7.5a6 6 0 105 5.9V8.8a7 7 0 003 1.2V6.5a4 4 0 01-3-3.5h-3z" fill="#fff" />
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
    case "Spotify":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" fill="#1DB954" />
          <path d="M7 10c3-1 7-1 10 1M7.5 13c2.5-.8 6-.8 8.5.8M8 16c2-.5 4.5-.5 6.5.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "Netflix":
      return (
        <svg {...common}>
          <path d="M6 3v18h3.5l5.5-9V21H18V3h-3.5L9 12V3H6z" fill="#E50914" />
        </svg>
      );
    case "Zoom":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="13" height="12" rx="3" fill="#2D8CFF" />
          <path d="M16 10l5-3v10l-5-3v-4z" fill="#2D8CFF" />
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
          <path d="M12 3c2.5 0 4 2 4 4.5 0 1 0 1.8-.2 2.5.5.2 1 .2 1.5 0 .8-.3 1.5.8.7 1.3-.5.3-1.5.5-1.7 1 0 .5.5 1.5 1.7 2.3.5.3.3 1-.3 1.2-.5.2-1.5.2-2 .5-.3.5.2 1.5-1 1.7-.8.2-1.8-.5-3-.5s-2.2.7-3 .5c-1.2-.2-.7-1.2-1-1.7-.5-.3-1.5-.3-2-.5-.8-.2-1-.9-.3-1.2 1.2-.8 1.7-1.8 1.7-2.3-.2-.5-1.2-.7-1.7-1-.8-.5-.1-1.6.7-1.3.5.2 1 .2 1.5 0C8 9.3 8 8.5 8 7.5 8 5 9.5 3 12 3z" fill="#FFFC00" />
        </svg>
      );
    case "Threads":
      return (
        <svg {...common}>
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 4c3 0 5 2 5 5s-2 5-4 5c-1 0-2-.5-2-1.5 0-1 .5-1.5 1.5-1.5s1 .3 1 .5c0 .5.5.5 1 .5.5 0 1-.5 1-1.5 0-2-2-3.5-4-3.5S8 10 8 12s2 3.5 4 3.5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
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
          <path d="M8 5c-2 0-4 1.5-5 4 1 4 3 7 5 7l1-2c-1 0-2-1-2.5-2M16 5c2 0 4 1.5 5 4-1 4-3 7-5 7l-1-2c1 0 2-1 2.5-2" fill="#5865F2" />
          <circle cx="9.5" cy="12" r="1.3" fill="#fff" />
          <circle cx="14.5" cy="12" r="1.3" fill="#fff" />
        </svg>
      );
    case "VIX":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="3" fill="#A020F0" />
          <path d="M8 9l4 6 4-6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );
    case "MVS":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="3" fill="#E11D48" />
          <text x="12" y="15" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#fff">MVS</text>
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

function AppIcon({ label }: { label: string }) {
  return (
    <div
      title={label}
      className="flex h-8 w-8 items-center justify-center rounded-full"
      style={{ backgroundColor: "#0a1628", border: "1px solid #1e3a5f" }}
    >
      <AppGlyph label={label} />
    </div>
  );
}

function NetworkBadge({ network, color }: { network: string; color: string }) {
  return (
    <span
      className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded"
      style={{ backgroundColor: `${color}22`, color }}
    >
      RED {network.toUpperCase()}
    </span>
  );
}

function SimBadge({ simType }: { simType: string }) {
  const icon =
    simType === "esim" ? <Wifi size={10} /> : simType === "physical" ? <CreditCard size={10} /> : <Smartphone size={10} />;
  const label =
    simType === "esim" ? "eSIM" : simType === "physical" ? "SIM Física" : "eSIM + Física";
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded"
      style={{ backgroundColor: "#1e3a5f", color: "#94a3b8" }}
    >
      {icon}
      {label}
    </span>
  );
}

export default function PlanCard({ plan }: { plan: Plan }) {
  const carrier = getCarrier(plan.carrierId);
  if (!carrier) return null;
  const color = getNetworkColor(carrier.network);
  const gradient = carrierGradient(plan.carrierId, carrier.network);

  return (
    <div
      className="flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
      style={{ backgroundColor: "#0d1e35", borderColor: "#1e3a5f" }}
    >
      {/* Top accent line — carrier→network gradient */}
      <div className="h-1 w-full" style={{ background: gradient }} />

      <div className="flex flex-col gap-3.5 p-5">
        {/* Carrier + Price */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {carrier.name}
            </p>
            <div className="flex flex-wrap items-center gap-1">
              <NetworkBadge network={carrier.network} color={color} />
              <SimBadge simType={plan.simType} />
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-2xl font-bold leading-none" style={{ color: "#f1f5f9" }}>
              ${plan.price}
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: "#475569" }}>
              MXN / {plan.validityDays} D
            </p>
          </div>
        </div>

        {/* Plan name */}
        <p className="text-base font-bold" style={{ color: "#e2e8f0" }}>
          {plan.name}
        </p>

        {/* Data + Cost per GB */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#475569" }}>
              Datos
            </p>
            <p className="text-lg font-bold" style={{ color: "#f1f5f9" }}>
              {formatData(plan.dataGB)}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#475569" }}>
              MXN/GB
            </p>
            <p className="text-sm font-bold" style={{ color: "#22d3ee" }}>
              {formatMXNperGB(plan)}
            </p>
          </div>
        </div>

        {/* Calls + SMS */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#475569" }}>
            Llamadas / SMS
          </p>
          <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
            {formatMinutes(plan.callMinutes) === "Ilimitado" && plan.sms === "unlimited"
              ? "Ilimitados"
              : `${formatMinutes(plan.callMinutes)} / ${plan.sms === "unlimited" ? "Ilimitado" : `${plan.sms} SMS`}`}
          </p>
        </div>

        {/* Unlimited apps */}
        {plan.unlimitedApps.length > 0 && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#475569" }}>
              Apps Incluidas
            </p>
            <div className="flex flex-wrap gap-1.5">
              {plan.unlimitedApps.map((a) => (
                <AppIcon key={a} label={a} />
              ))}
            </div>
          </div>
        )}

        {/* Portabilidad badge */}
        {plan.portabilidad && (
          <span
            className="self-start rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{ backgroundColor: "#16303f", color: "#22d3ee" }}
          >
            Portabilidad
          </span>
        )}

        {/* Notes + subscriptions */}
        {(plan.notes || (plan.includedSubscriptions && plan.includedSubscriptions.length > 0)) && (
          <p className="text-[11px] italic leading-relaxed" style={{ color: "#475569" }}>
            {[
              plan.includedSubscriptions?.length
                ? `Incluye ${plan.includedSubscriptions.join(", ")}`
                : null,
              plan.notes,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}
      </div>
    </div>
  );
}
