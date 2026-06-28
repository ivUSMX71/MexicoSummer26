import { useState } from "react";
import type { Network, UnlimitedApp, Plan } from "../data/types";
import { ALL_NETWORKS, ALL_APPS, NETWORK_COLORS, carriers } from "../data/types";
import { ChevronDown, ChevronUp, ArrowLeftRight, Wifi, CreditCard, Smartphone } from "lucide-react";

export interface FilterState {
  networks: Set<Network>;
  carriers: Set<string>;
  maxPrice: number | null;
  simFilter: "all" | "esim" | "physical";
  requiredApps: Set<UnlimitedApp>;
  portabilidadOnly: boolean;
  budgetActive: boolean;
}

export type SortKey = "price_asc" | "data_desc" | "apps_desc";

interface Props {
  state: FilterState;
  sort: SortKey;
  onStateChange: (s: FilterState) => void;
  onSortChange: (s: SortKey) => void;
  allPlans: Plan[];
}

function Toggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200"
      style={{ backgroundColor: active ? "#22d3ee" : "#1e3a5f" }}
    >
      <span
        className="inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200"
        style={{ transform: active ? "translateX(22px)" : "translateX(2px)" }}
      />
    </button>
  );
}

function planCountForNetwork(network: Network, allPlans: Plan[]): number {
  return allPlans.filter((p) => {
    const c = carriers.find((c) => c.id === p.carrierId);
    return c?.network === network;
  }).length;
}

export default function Filters({ state, sort, onStateChange, onSortChange, allPlans }: Props) {
  const [appsOpen, setAppsOpen] = useState(false);

  const toggle = <K extends string>(set: Set<K>, id: K): Set<K> => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  };

  const carriersVisible = carriers.filter(
    (c) => state.networks.size === 0 || state.networks.has(c.network),
  );

  const divider = <div className="h-px w-full" style={{ backgroundColor: "#1e3a5f" }} />;

  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{ backgroundColor: "#0d1e35", borderColor: "#1e3a5f" }}
    >
      {/* Budget row */}
      <div className="px-6 pt-5 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold" style={{ color: "#e2e8f0" }}>Presupuesto Máximo</span>
            {state.budgetActive && (
              <span
                className="rounded-md px-2 py-0.5 text-sm font-bold"
                style={{ backgroundColor: "#0e2a4a", color: "#22d3ee" }}
              >
                ${state.maxPrice ?? 500} MXN
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: "#64748b" }}>Activar</span>
            <Toggle
              active={state.budgetActive}
              onToggle={() => onStateChange({ ...state, budgetActive: !state.budgetActive })}
            />
          </div>
        </div>
        {state.budgetActive && (
          <>
            <input
              type="range"
              min={10}
              max={2500}
              step={10}
              value={state.maxPrice ?? 500}
              onChange={(e) => onStateChange({ ...state, maxPrice: Number(e.target.value) })}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: "#22d3ee" }}
            />
            <div className="flex justify-between mt-1 text-[11px]" style={{ color: "#475569" }}>
              <span>$10</span>
              <span>$2500+</span>
            </div>
          </>
        )}
      </div>

      {divider}

      {/* Plan type */}
      <div className="px-6 py-4">
        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "#64748b" }}>
          Tipo de Plan
        </p>
        <div className="flex items-center gap-2">
          <button
            className="rounded-lg border px-4 py-1.5 text-sm font-semibold transition-colors"
            style={{ borderColor: "#22d3ee", color: "#22d3ee", backgroundColor: "transparent" }}
          >
            Prepago
          </button>
          <button
            className="rounded-lg border px-4 py-1.5 text-sm font-semibold cursor-not-allowed flex items-center gap-1.5"
            style={{ borderColor: "#1e3a5f", color: "#475569", backgroundColor: "transparent" }}
            disabled
          >
            Pospago
            <span
              className="rounded text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wide"
              style={{ backgroundColor: "#1e3a5f", color: "#64748b" }}
            >
              Próximo
            </span>
          </button>
        </div>
      </div>

      {divider}

      {/* Network chips */}
      <div className="px-6 py-4">
        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "#64748b" }}>
          Red (Torres)
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {ALL_NETWORKS.map((n) => {
            const active = state.networks.has(n);
            const count = planCountForNetwork(n, allPlans);
            const color = NETWORK_COLORS[n];
            return (
              <button
                key={n}
                onClick={() => onStateChange({ ...state, networks: toggle(state.networks, n) })}
                className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-semibold transition-all duration-150"
                style={{
                  borderColor: active ? color : "#1e3a5f",
                  color: active ? color : "#475569",
                  backgroundColor: "transparent",
                }}
              >
                {active && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {n}
                <span
                  className="rounded text-[10px] font-bold px-1 min-w-[18px] text-center"
                  style={{ backgroundColor: active ? `${color}22` : "#0a1628", color: active ? color : "#475569" }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        {carriersVisible.length > 0 && (
          <p className="text-[11px]" style={{ color: "#475569" }}>
            {carriersVisible.map((c) => c.name).join(" · ")}
          </p>
        )}
      </div>

      {divider}

      {/* SIM type + Portabilidad */}
      <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "#64748b" }}>
            Tipo de SIM
          </p>
          <div
            className="inline-flex rounded-lg border overflow-hidden"
            style={{ borderColor: "#1e3a5f" }}
          >
            {(["all", "esim", "physical"] as const).map((s) => {
              const active = state.simFilter === s;
              const labels: Record<string, string> = { all: "Todas las SIMs", esim: "eSIM", physical: "SIM Física" };
              const icons: Record<string, React.ReactNode> = {
                all: <Smartphone size={13} />,
                esim: <Wifi size={13} />,
                physical: <CreditCard size={13} />,
              };
              return (
                <button
                  key={s}
                  onClick={() => onStateChange({ ...state, simFilter: s })}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors"
                  style={
                    active
                      ? { backgroundColor: "#0a1628", color: "#e2e8f0", borderRight: "1px solid #1e3a5f" }
                      : { backgroundColor: "transparent", color: "#475569", borderRight: "1px solid #1e3a5f" }
                  }
                >
                  {icons[s]}
                  {labels[s]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="flex items-center gap-1.5 mb-0.5">
              <ArrowLeftRight size={13} style={{ color: "#22d3ee" }} />
              <span className="text-sm font-bold" style={{ color: "#e2e8f0" }}>Portabilidad</span>
            </div>
            <p className="text-[11px]" style={{ color: "#475569" }}>Solo planes al traer tu número</p>
          </div>
          <Toggle
            active={state.portabilidadOnly}
            onToggle={() => onStateChange({ ...state, portabilidadOnly: !state.portabilidadOnly })}
          />
        </div>
      </div>

      {divider}

      {/* Apps ilimitadas requeridas */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#64748b" }}>
            Apps Ilimitadas Requeridas
            {state.requiredApps.size > 0 && (
              <span
                className="ml-2 rounded-full px-1.5 py-0.5 text-[10px]"
                style={{ backgroundColor: "#22d3ee22", color: "#22d3ee" }}
              >
                {state.requiredApps.size}
              </span>
            )}
          </p>
          <button
            onClick={() => setAppsOpen(!appsOpen)}
            className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400"
          >
            {appsOpen ? "Ocultar" : "Mostrar"}
            {appsOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        </div>
        {appsOpen && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {ALL_APPS.map((a) => {
              const active = state.requiredApps.has(a);
              return (
                <button
                  key={a}
                  onClick={() => onStateChange({ ...state, requiredApps: toggle(state.requiredApps, a) })}
                  className="rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-150"
                  style={{
                    borderColor: active ? "#22d3ee" : "#1e3a5f",
                    color: active ? "#22d3ee" : "#475569",
                    backgroundColor: active ? "#22d3ee11" : "transparent",
                  }}
                >
                  {a}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {divider}

      {/* Sort bar */}
      <div
        className="grid grid-cols-3 text-sm font-semibold"
        style={{ backgroundColor: "#0a1628" }}
      >
        {(["price_asc", "data_desc", "apps_desc"] as SortKey[]).map((s) => {
          const labels: Record<SortKey, string> = {
            price_asc: "Menor Precio",
            data_desc: "Más Datos",
            apps_desc: "Más Apps",
          };
          const active = sort === s;
          return (
            <button
              key={s}
              onClick={() => onSortChange(s)}
              className="py-3.5 text-center transition-colors"
              style={
                active
                  ? { backgroundColor: "#0d1e35", color: "#e2e8f0", borderTop: "2px solid #22d3ee" }
                  : { color: "#475569", borderTop: "2px solid transparent" }
              }
            >
              {labels[s]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
