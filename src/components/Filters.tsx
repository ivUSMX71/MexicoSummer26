import { useState } from "react";
import type { Network, UnlimitedApp, Plan } from "../data/types";
import { ALL_NETWORKS, ALL_APPS, NETWORK_COLORS, carriers } from "../data/types";
import type { ValidityCategory, DataRange } from "../data/utils";
import { useLang } from "../lib/context";
import {
  ChevronDown,
  ArrowLeftRight,
  Wifi,
  CreditCard,
  Smartphone,
  Zap,
  Building2,
  RadioTower,
  CalendarRange,
  Database,
} from "lucide-react";

export interface FilterState {
  networks: Set<Network>;
  carriers: Set<string>;
  maxPrice: number | null;
  budgetActive: boolean;
  simFilter: "all" | "esim" | "physical";
  acquisition: "all" | "recarga" | "portabilidad";
  validity: Set<ValidityCategory>;
  dataRanges: Set<DataRange | "unlimited">;
  requiredApps: Set<UnlimitedApp>;
}

export type SortKey = "price_asc" | "data_desc" | "apps_desc" | "value";

interface Props {
  state: FilterState;
  sort: SortKey;
  autopay: boolean;
  onStateChange: (s: FilterState) => void;
  onSortChange: (s: SortKey) => void;
  onAutopayChange: (v: boolean) => void;
  allPlans: Plan[];
}

function Toggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200"
      style={{ backgroundColor: active ? "var(--accent)" : "var(--border)" }}
      aria-pressed={active}
    >
      <span
        className="inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform duration-200"
        style={{ transform: active ? "translateX(19px)" : "translateX(2px)" }}
      />
    </button>
  );
}

function Section({
  icon,
  title,
  badge,
  children,
  defaultOpen = false,
}: {
  icon: React.ReactNode;
  title: string;
  badge?: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface-2)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-3 py-2.5"
      >
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
          {icon}
          {title}
          {badge ? (
            <span
              className="rounded-full px-1.5 py-0.5 text-[10px] font-bold"
              style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
            >
              {badge}
            </span>
          ) : null}
        </span>
        <ChevronDown size={15} style={{ color: "var(--text-dim)", transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
      </button>
      {open && <div className="px-3 pb-3">{children}</div>}
    </div>
  );
}

function Chip({ active, color, onClick, children }: { active: boolean; color?: string; onClick: () => void; children: React.ReactNode }) {
  const c = color ?? "var(--accent)";
  return (
    <button
      onClick={onClick}
      className="rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all duration-150"
      style={{
        borderColor: active ? c : "var(--border)",
        color: active ? c : "var(--text-dim)",
        backgroundColor: active ? `${typeof c === "string" && c.startsWith("#") ? c + "14" : "var(--accent-soft)"}` : "transparent",
      }}
    >
      {children}
    </button>
  );
}

function planCountForNetwork(network: Network, allPlans: Plan[]): number {
  return allPlans.filter((p) => carriers.find((c) => c.id === p.carrierId)?.network === network).length;
}

export default function Filters({ state, sort, autopay, onStateChange, onSortChange, onAutopayChange, allPlans }: Props) {
  const { t } = useLang();

  function toggleSet<K>(set: Set<K>, id: K): Set<K> {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  }

  const carriersVisible = carriers.filter(
    (c) => (state.networks.size === 0 || state.networks.has(c.network)) && allPlans.some((p) => p.carrierId === c.id),
  );

  const validityOpts: { key: ValidityCategory; label: string }[] = [
    { key: "weekly", label: t.val_weekly },
    { key: "monthly", label: t.val_monthly },
    { key: "bimonthly", label: t.val_bimonthly },
    { key: "semester", label: t.val_semester },
    { key: "annual", label: t.val_annual },
  ];

  const dataOpts: { key: DataRange | "unlimited"; label: string }[] = [
    { key: "0-2", label: "0–2 GB" },
    { key: "2-5", label: "2–5 GB" },
    { key: "5-10", label: "5–10 GB" },
    { key: "10-25", label: "10–25 GB" },
    { key: "25+", label: "25+ GB" },
    { key: "unlimited", label: t.data_unlimited },
  ];

  return (
    <div
      className="rounded-2xl border p-3 space-y-3"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
    >
      {/* Top bar: sort dropdown + autopay + budget toggle */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-dim)" }}>
            {t.sortBy}
          </label>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortKey)}
              className="rounded-lg border pl-3 pr-8 py-1.5 text-sm font-semibold outline-none"
              style={{ backgroundColor: "var(--surface-2)", borderColor: "var(--border)", color: "var(--text)" }}
            >
              <option value="price_asc">{t.sort_price_asc}</option>
              <option value="data_desc">{t.sort_data_desc}</option>
              <option value="apps_desc">{t.sort_apps_desc}</option>
              <option value="value">{t.sort_value}</option>
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" style={{ color: "var(--text-dim)" }} />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Zap size={14} style={{ color: autopay ? "var(--accent)" : "var(--text-dim)" }} />
            <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{t.autopay}</span>
            <Toggle active={autopay} onToggle={() => onAutopayChange(!autopay)} />
          </div>
        </div>
      </div>

      {/* Budget */}
      <div className="rounded-xl border p-3" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface-2)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{t.budget}</span>
            {state.budgetActive && (
              <span className="rounded-md px-2 py-0.5 text-xs font-bold" style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}>
                ${state.maxPrice ?? 500}
              </span>
            )}
          </div>
          <Toggle active={state.budgetActive} onToggle={() => onStateChange({ ...state, budgetActive: !state.budgetActive })} />
        </div>
        {state.budgetActive && (
          <input
            type="range"
            min={10}
            max={3000}
            step={10}
            value={state.maxPrice ?? 500}
            onChange={(e) => onStateChange({ ...state, maxPrice: Number(e.target.value) })}
            className="mt-3 w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: "var(--accent)" }}
          />
        )}
      </div>

      {/* Collapsible sections grid — keeps panel short */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {/* Operador */}
        <Section icon={<Building2 size={13} />} title={t.operator} badge={state.carriers.size}>
          <div className="flex flex-wrap gap-1.5">
            {carriersVisible.map((c) => (
              <Chip
                key={c.id}
                active={state.carriers.has(c.id)}
                onClick={() => onStateChange({ ...state, carriers: toggleSet(state.carriers, c.id) })}
              >
                {c.name}
              </Chip>
            ))}
          </div>
        </Section>

        {/* Red (Torres) */}
        <Section icon={<RadioTower size={13} />} title={t.network} badge={state.networks.size}>
          <div className="flex flex-wrap gap-1.5">
            {ALL_NETWORKS.map((n) => (
              <Chip
                key={n}
                active={state.networks.has(n)}
                color={NETWORK_COLORS[n]}
                onClick={() => onStateChange({ ...state, networks: toggleSet(state.networks, n) })}
              >
                {n} <span style={{ opacity: 0.7 }}>· {planCountForNetwork(n, allPlans)}</span>
              </Chip>
            ))}
          </div>
        </Section>

        {/* Vigencia */}
        <Section icon={<CalendarRange size={13} />} title={t.validity} badge={state.validity.size}>
          <div className="flex flex-wrap gap-1.5">
            {validityOpts.map((v) => (
              <Chip
                key={v.key}
                active={state.validity.has(v.key)}
                onClick={() => onStateChange({ ...state, validity: toggleSet(state.validity, v.key) })}
              >
                {v.label}
              </Chip>
            ))}
          </div>
        </Section>

        {/* Data range */}
        <Section icon={<Database size={13} />} title={t.dataRange} badge={state.dataRanges.size}>
          <div className="flex flex-wrap gap-1.5">
            {dataOpts.map((d) => (
              <Chip
                key={d.key}
                active={state.dataRanges.has(d.key)}
                onClick={() => onStateChange({ ...state, dataRanges: toggleSet(state.dataRanges, d.key) })}
              >
                {d.label}
              </Chip>
            ))}
          </div>
        </Section>
      </div>

      {/* SIM + Acquisition row */}
      <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide mb-1.5" style={{ color: "var(--text-dim)" }}>{t.simType}</p>
          <div className="inline-flex rounded-lg border overflow-hidden" style={{ borderColor: "var(--border)" }}>
            {(["all", "esim", "physical"] as const).map((s) => {
              const active = state.simFilter === s;
              const labels = { all: t.allSims, esim: t.esim, physical: t.physical };
              const icons = { all: <Smartphone size={12} />, esim: <Wifi size={12} />, physical: <CreditCard size={12} /> };
              return (
                <button
                  key={s}
                  onClick={() => onStateChange({ ...state, simFilter: s })}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium"
                  style={active
                    ? { backgroundColor: "var(--accent-soft)", color: "var(--accent)" }
                    : { backgroundColor: "transparent", color: "var(--text-dim)" }}
                >
                  {icons[s]}
                  {labels[s]}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-wide mb-1.5 flex items-center gap-1" style={{ color: "var(--text-dim)" }}>
            <ArrowLeftRight size={11} /> {t.acquisition}
          </p>
          <div className="inline-flex rounded-lg border overflow-hidden" style={{ borderColor: "var(--border)" }}>
            {(["all", "recarga", "portabilidad"] as const).map((s) => {
              const active = state.acquisition === s;
              const labels = { all: t.acq_any, recarga: t.acq_recarga, portabilidad: t.acq_porta };
              return (
                <button
                  key={s}
                  onClick={() => onStateChange({ ...state, acquisition: s })}
                  className="px-2.5 py-1.5 text-xs font-medium"
                  style={active
                    ? { backgroundColor: "var(--accent-soft)", color: "var(--accent)" }
                    : { backgroundColor: "transparent", color: "var(--text-dim)" }}
                >
                  {labels[s]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Required apps */}
      <Section icon={<Smartphone size={13} />} title={t.requiredApps} badge={state.requiredApps.size}>
        <div className="flex flex-wrap gap-1.5">
          {ALL_APPS.map((a) => (
            <Chip
              key={a}
              active={state.requiredApps.has(a)}
              onClick={() => onStateChange({ ...state, requiredApps: toggleSet(state.requiredApps, a) })}
            >
              {a}
            </Chip>
          ))}
        </div>
      </Section>
    </div>
  );
}
