import { useMemo, useState } from "react";
import { plans, carriers } from "./data/types";
import type { FilterState, SortKey } from "./components/Filters";
import FilterPanel from "./components/Filters";
import PlanCard from "./components/PlanCard";
import PostpaidSection from "./components/PostpaidSection";
import { Signal, Zap } from "lucide-react";
import { getCarrier, formatData, mxnPerGB } from "./data/utils";

const emptyFilters: FilterState = {
  networks: new Set(),
  carriers: new Set(),
  maxPrice: null,
  simFilter: "all",
  requiredApps: new Set(),
  portabilidadOnly: false,
  budgetActive: false,
};

type Tab = "prepaid" | "postpaid";

export default function App() {
  const [tab, setTab] = useState<Tab>("prepaid");
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [sort, setSort] = useState<SortKey>("price_asc");

  const filtered = useMemo(() => {
    let result = plans.filter((p) => {
      if (p.planType !== "prepaid") return false;
      const carrier = carriers.find((c) => c.id === p.carrierId);
      if (!carrier) return false;

      if (filters.networks.size > 0 && !filters.networks.has(carrier.network)) return false;
      if (filters.carriers.size > 0 && !filters.carriers.has(p.carrierId)) return false;
      if (filters.budgetActive && filters.maxPrice !== null && p.price > filters.maxPrice) return false;
      if (filters.portabilidadOnly && !p.portabilidad) return false;
      if (filters.simFilter === "esim" && p.simType === "physical") return false;
      if (filters.simFilter === "physical" && p.simType === "esim") return false;
      if (filters.requiredApps.size > 0) {
        for (const app of filters.requiredApps) {
          if (!p.unlimitedApps.includes(app)) return false;
        }
      }
      return true;
    });

    result = result.sort((a, b) => {
      switch (sort) {
        case "price_asc": return a.price - b.price;
        case "data_desc": {
          const av = a.dataGB === "unlimited" ? Infinity : a.dataGB;
          const bv = b.dataGB === "unlimited" ? Infinity : b.dataGB;
          return bv - av;
        }
        case "apps_desc": return b.unlimitedApps.length - a.unlimitedApps.length;
      }
    });

    return result;
  }, [filters, sort]);

  const reset = () => setFilters(emptyFilters);

  // Best value plan: lowest MXN per GB (normalized to 30 days)
  const bestValue = useMemo(() => {
    if (filtered.length === 0) return null;
    return filtered.reduce((acc, p) => {
      const av = mxnPerGB(acc) ?? -1; // unlimited → null → -1 (best)
      const pv = mxnPerGB(p) ?? -1;
      return pv < av ? p : acc;
    });
  }, [filtered]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a1628", color: "#e2e8f0" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-20 border-b"
        style={{ backgroundColor: "#0d1e35", borderColor: "#1e3a5f" }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <Signal size={18} className="text-cyan-400" />
            <span className="text-base font-bold text-cyan-400 tracking-tight">Compara MX</span>
          </div>
          <div className="flex items-center gap-3">
            {tab === "prepaid" && (
              <span className="text-xs font-medium" style={{ color: "#64748b" }}>
                {filtered.length} planes
              </span>
            )}
            <div
              className="flex rounded-lg overflow-hidden border text-xs font-medium"
              style={{ borderColor: "#1e3a5f" }}
            >
              <button
                onClick={() => setTab("prepaid")}
                className="px-3 py-1.5 transition-colors"
                style={tab === "prepaid" ? { backgroundColor: "#22d3ee22", color: "#22d3ee" } : { color: "#64748b" }}
              >
                Prepago
              </button>
              <button
                onClick={() => setTab("postpaid")}
                className="px-3 py-1.5 transition-colors"
                style={tab === "postpaid" ? { backgroundColor: "#22d3ee22", color: "#22d3ee" } : { color: "#64748b" }}
              >
                Pospago
              </button>
            </div>
          </div>
        </div>
      </header>

      {tab === "prepaid" ? (
        <main className="mx-auto max-w-5xl px-4 py-5 sm:px-6 space-y-5">
          <FilterPanel
            state={filters}
            sort={sort}
            onStateChange={setFilters}
            onSortChange={setSort}
            allPlans={plans.filter((p) => p.planType === "prepaid")}
          />

          {/* Best value banner */}
          {bestValue && (
            <div
              className="flex items-start gap-3 rounded-xl px-4 py-3 border"
              style={{ backgroundColor: "#0e2a4a", borderColor: "#1e4a7a" }}
            >
              <Zap size={16} className="mt-0.5 shrink-0 text-cyan-400" />
              <div>
                <p className="text-sm font-semibold text-cyan-400">Mejor valor por tu presupuesto</p>
                <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>
                  {(() => {
                    const c = getCarrier(bestValue.carrierId);
                    const gb = formatData(bestValue.dataGB);
                    return `${c?.name ?? ""} ${bestValue.name} te da ${gb} por $${bestValue.price} MXN.`;
                  })()}
                </p>
              </div>
            </div>
          )}

          {filtered.length === 0 ? (
            <div
              className="flex h-48 flex-col items-center justify-center rounded-2xl border border-dashed text-center"
              style={{ borderColor: "#1e3a5f" }}
            >
              <p className="text-sm font-medium" style={{ color: "#64748b" }}>No hay planes que coincidan</p>
              <button onClick={reset} className="mt-2 text-xs font-medium text-cyan-400 underline">
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          )}
        </main>
      ) : (
        <main className="mx-auto max-w-5xl px-4 py-5 sm:px-6">
          <PostpaidSection />
        </main>
      )}

      <footer className="border-t mt-8 py-5 text-center text-xs" style={{ borderColor: "#1e3a5f", color: "#475569" }}>
        Datos recopilados manualmente · Precios en MXN · Verifica disponibilidad con cada compañía
      </footer>
    </div>
  );
}
