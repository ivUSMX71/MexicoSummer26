import type { Plan } from "../data/types";
import {
  getCarrier,
  getNetworkColor,
  carrierGradient,
  formatData,
  formatMinutes,
  formatMXNperGB,
  formatGBperDay,
  effectivePrice,
} from "../data/utils";
import { useLang } from "../lib/context";
import { AppIcon } from "./AppGlyph";
import { Wifi, CreditCard, Smartphone, Share2, Sparkles, Gift } from "lucide-react";

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

function SimBadge({ simType, label }: { simType: string; label: string }) {
  const icon =
    simType === "esim" ? <Wifi size={10} /> : simType === "physical" ? <CreditCard size={10} /> : <Smartphone size={10} />;
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded"
      style={{ backgroundColor: "var(--surface-3)", color: "var(--text-muted)" }}
    >
      {icon}
      {label}
    </span>
  );
}

function DataPool({
  title,
  amount,
  apps,
  accent,
}: {
  title: string;
  amount: string;
  apps?: string[];
  accent: string;
}) {
  return (
    <div
      className="rounded-lg p-2.5"
      style={{ backgroundColor: "var(--surface-2)", border: "1px solid var(--border-soft)" }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-dim)" }}>
          {title}
        </p>
        <span className="text-xs font-bold" style={{ color: accent }}>{amount}</span>
      </div>
      {apps && apps.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {apps.map((a) => (
            <AppIcon key={a} label={a} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function PlanCard({ plan, autopay }: { plan: Plan; autopay: boolean }) {
  const { t } = useLang();
  const carrier = getCarrier(plan.carrierId);
  if (!carrier) return null;
  const color = getNetworkColor(carrier.network);
  const gradient = carrierGradient(plan.carrierId, carrier.network);
  const price = effectivePrice(plan, autopay);
  const showAutopay = autopay && plan.autopayPrice != null;

  const simLabel =
    plan.simType === "esim" ? t.esim : plan.simType === "physical" ? t.physical : t.bothSim;

  return (
    <div
      className="flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
    >
      {/* Brand gradient accent */}
      <div className="h-1.5 w-full" style={{ background: gradient }} />

      <div className="flex flex-col gap-3 p-4">
        {/* Carrier + Price */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p
              className="text-[11px] font-extrabold uppercase tracking-widest mb-1"
              style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              {carrier.name}
            </p>
            <div className="flex flex-wrap items-center gap-1">
              <NetworkBadge network={carrier.network} color={color} />
              <SimBadge simType={plan.simType} label={simLabel} />
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="flex items-baseline justify-end gap-1.5">
              {showAutopay && (
                <span className="text-sm font-medium line-through" style={{ color: "var(--text-dim)" }}>
                  ${plan.price}
                </span>
              )}
              <p className="text-2xl font-extrabold leading-none" style={{ color: "var(--text)" }}>
                ${price}
              </p>
            </div>
            <p className="text-[10px] mt-0.5" style={{ color: "var(--text-dim)" }}>
              {showAutopay ? t.autopayPrice : t.perValidity(plan.validityDays)}
            </p>
          </div>
        </div>

        {/* Plan name */}
        <p className="text-sm font-bold" style={{ color: "var(--text)" }}>
          {plan.name}
        </p>

        {/* Data / $ per GB / GB per day */}
        <div className="grid grid-cols-3 gap-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "var(--text-dim)" }}>
              {plan.hotspot ? t.libres : t.data}
            </p>
            <p className="text-lg font-extrabold" style={{ color: "var(--text)" }}>
              {formatData(plan.dataGB)}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "var(--text-dim)" }}>
              {t.perGB}
            </p>
            <p className="text-sm font-bold leading-tight pt-1" style={{ color: "var(--accent)" }}>
              {formatMXNperGB(plan)}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "var(--text-dim)" }}>
              {t.perDay}
            </p>
            <p className="text-sm font-bold leading-tight pt-1" style={{ color: "var(--text-muted)" }}>
              {formatGBperDay(plan)}
            </p>
          </div>
        </div>

        {/* Calls + SMS */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "var(--text-dim)" }}>
            {t.callsSms}
          </p>
          <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
            {formatMinutes(plan.callMinutes) === "Ilimitado" && plan.sms === "unlimited"
              ? t.unlimitedBoth
              : `${formatMinutes(plan.callMinutes)} / ${plan.sms === "unlimited" ? t.unlimited : `${plan.sms} SMS`}`}
          </p>
        </div>

        {/* Unlimited apps */}
        {plan.unlimitedApps.length > 0 && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--text-dim)" }}>
              {t.unlimitedApps}
            </p>
            <div className="flex flex-wrap gap-1">
              {plan.unlimitedApps.map((a) => (
                <AppIcon key={a} label={a} />
              ))}
            </div>
          </div>
        )}

        {/* Social data pool (not unlimited) */}
        {plan.socialGB != null && plan.socialApps && plan.socialApps.length > 0 && (
          <DataPool title={t.socialData} amount={formatData(plan.socialGB)} apps={plan.socialApps} accent={color} />
        )}

        {/* Video / streaming data pool */}
        {plan.videoGB != null && plan.videoApps && plan.videoApps.length > 0 && (
          <DataPool title={t.videoData} amount={formatData(plan.videoGB)} apps={plan.videoApps} accent="var(--accent)" />
        )}

        {/* Hotspot */}
        {plan.hotspot && (
          <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
            <Share2 size={13} style={{ color: "var(--accent)" }} />
            {t.hotspot}: {t.hotspotYes}
          </div>
        )}

        {/* Badges row: promo + portabilidad */}
        {(plan.promo || plan.portabilidad) && (
          <div className="flex flex-wrap gap-1.5">
            {plan.promo && (
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold"
                style={{ backgroundColor: `${color}1f`, color }}
              >
                <Sparkles size={11} />
                {plan.promo} GB Promo
              </span>
            )}
            {plan.portabilidad && (
              <span
                className="self-start rounded-full px-2.5 py-1 text-[11px] font-semibold"
                style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
              >
                {t.porta}
              </span>
            )}
          </div>
        )}

        {/* Included subscriptions */}
        {plan.includedSubscriptions && plan.includedSubscriptions.length > 0 && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--text-dim)" }}>
              {t.includes}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {plan.includedSubscriptions.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold"
                  style={{ backgroundColor: "var(--surface-3)", color: "var(--text)" }}
                >
                  <Gift size={11} style={{ color: "var(--accent)" }} />
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Notes — readable, not faint */}
        {plan.notes && (
          <p
            className="text-xs leading-relaxed rounded-lg px-2.5 py-2"
            style={{ color: "var(--text-muted)", backgroundColor: "var(--surface-2)" }}
          >
            {plan.notes}
          </p>
        )}
      </div>
    </div>
  );
}
