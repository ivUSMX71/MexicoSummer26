import { useMemo, useState } from "react";
import { plans, carriers } from "./data/types";
import type { FilterState, SortKey } from "./components/Filters";
import FilterPanel from "./components/Filters";
import PlanCard from "./components/PlanCard";
import PostpaidSection from "./components/PostpaidSection";
import { useLang, useTheme } from "./lib/context";
import {
  getCarrier,
  formatData,
  mxnPerGB,
  validityCategory,
  dataRangeOf,
  effectivePrice,
} from "./data/utils";
import { Signal, Zap, Sun, Moon } from "lucide-react";

const emptyFilters: FilterState = {
  networks: new Set(),
  carriers: new Set(),
  maxPrice: null,
  budgetActive: false,
  simFilter: "all",
  acquisition: "all",
  validity: new Set(),
  dataRanges: new Set(),
  requiredApps: new Set(),
};

type Tab = "prepaid" | "postpaid";

export default function App() {
  const { t, lang, setLang } = useLang();
  const { mode, toggle } = useTheme();
  const [tab, setTab] = useState<Tab>("prepaid");
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [sort, setSort] = useState<SortKey>("price_asc");
  const [autopay, setAutopay] = useState(false);

  const prepaidPlans = useMemo(() => plans.filter((p) => p.planType === "prepaid"), []);

  const filtered = useMemo(() => {
    let result = prepaidPlans.filter((p) => {
      const carrier = carriers.find((c) => c.id === p.carrierId);
      if (!carrier) return false;

      if (filters.networks.size > 0 && !filters.networks.has(carrier.network)) return false;
      if (filters.carriers.size > 0 && !filters.carriers.has(p.carrierId)) return false;

      const price = effectivePrice(p, autopay);
      if (filters.budgetActive && filters.maxPrice !== null && price > filters.maxPrice) return false;

      if (filters.simFilter === "esim" && p.simType === "physical") return false;
      if (filters.simFilter === "physical" && p.simType === "esim") return false;

      if (filters.acquisition === "portabilidad" && !p.portabilidad) return false;
      if (filters.acquisition === "recarga" && /portabilidad/i.test(p.name)) return false;

      if (filters.validity.size > 0 && !filters.validity.has(validityCategory(p.validityDays))) return false;
      if (filters.dataRanges.size > 0 && !filters.dataRanges.has(dataRangeOf(p))) return false;

      if (filters.requiredApps.size > 0) {
        for (const app of filters.requiredApps) {
          const has = p.unlimitedApps.includes(app) || p.socialApps?.includes(app) || p.videoApps?.includes(app);
          if (!has) return false;
        }
      }
      return true;
    });

    result = [...result].sort((a, b) => {
      switch (sort) {
        case "price_asc":
          return effectivePrice(a, autopay) - effectivePrice(b, autopay);
        case "data_desc": {
          const av = a.dataGB === "unlimited" ? Infinity : a.dataGB;
          const bv = b.dataGB === "unlimited" ? Infinity : b.dataGB;
          return bv - av;
        }
        case "apps_desc":
          return b.unlimitedApps.length - a.unlimitedApps.length;
        case "value": {
          const av = mxnPerGB(a) ?? -1; // unlimited = best
          const bv = mxnPerGB(b) ?? -1;
          return av - bv;
        }
      }
    });

    return result;
  }, [prepaidPlans, filters, sort, autopay]);

  const reset = () => setFilters(emptyFilters);

  const bestValue = useMemo(() => {
    if (filtered.length === 0) return null;
    return filtered.reduce((acc, p) => {
      const av = mxnPerGB(acc) ?? -1;
      const pv = mxnPerGB(p) ?? -1;
      return pv < av ? p : acc;
    });
  }, [filtered]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <header className="sticky top-0 z-20 border-b" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <Signal size={18} style={{ color: "var(--accent)" }} />
            <span className="text-base font-extrabold tracking-tight" style={{ color: "var(--accent)" }}>{t.appName}</span>
          </div>

          <div className="flex items-center gap-2">
            {tab === "prepaid" && (
              <span className="hidden sm:inline text-xs font-medium" style={{ color: "var(--text-dim)" }}>
                {filtered.length} {t.plans}
              </span>
            )}

            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="flex h-8 w-8 items-center justify-center rounded-lg border"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              aria-label="Toggle theme"
            >
              {mode === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Language toggle */}
            <div className="flex rounded-lg overflow-hidden border text-xs font-bold" style={{ borderColor: "var(--border)" }}>
              {(["es", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-2.5 py-1.5 uppercase transition-colors"
                  style={lang === l ? { backgroundColor: "var(--accent-soft)", color: "var(--accent)" } : { color: "var(--text-dim)" }}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Prepaid / Postpaid */}
            <div className="flex rounded-lg overflow-hidden border text-xs font-medium" style={{ borderColor: "var(--border)" }}>
              <button
                onClick={() => setTab("prepaid")}
                className="px-3 py-1.5 transition-colors"
                style={tab === "prepaid" ? { backgroundColor: "var(--accent-soft)", color: "var(--accent)" } : { color: "var(--text-dim)" }}
              >
                {t.prepaid}
              </button>
              <button
                onClick={() => setTab("postpaid")}
                className="px-3 py-1.5 transition-colors"
                style={tab === "postpaid" ? { backgroundColor: "var(--accent-soft)", color: "var(--accent)" } : { color: "var(--text-dim)" }}
              >
                {t.postpaid}
              </button>
            </div>
          </div>
        </div>
      </header>

      {tab === "prepaid" ? (
        <main className="mx-auto max-w-6xl px-4 py-4 sm:px-6 space-y-4">
          <FilterPanel
            state={filters}
            sort={sort}
            autopay={autopay}
            onStateChange={setFilters}
            onSortChange={setSort}
            onAutopayChange={setAutopay}
            allPlans={prepaidPlans}
          />

          {bestValue && (
            <div className="flex items-start gap-3 rounded-xl px-4 py-3 border" style={{ backgroundColor: "var(--surface-3)", borderColor: "var(--border)" }}>
              <Zap size={16} className="mt-0.5 shrink-0" style={{ color: "var(--accent)" }} />
              <div>
                <p className="text-sm font-bold" style={{ color: "var(--accent)" }}>{t.bestValueTitle}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {t.bestValueDesc(
                    getCarrier(bestValue.carrierId)?.name ?? "",
                    bestValue.name,
                    formatData(bestValue.dataGB),
                    effectivePrice(bestValue, autopay),
                  )}
                </p>
              </div>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="flex h-48 flex-col items-center justify-center rounded-2xl border border-dashed text-center" style={{ borderColor: "var(--border)" }}>
              <p className="text-sm font-medium" style={{ color: "var(--text-dim)" }}>{t.noResults}</p>
              <button onClick={reset} className="mt-2 text-xs font-medium underline" style={{ color: "var(--accent)" }}>
                {t.clearFilters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((plan) => (
                <PlanCard key={plan.id} plan={plan} autopay={autopay} />
              ))}
            </div>
          )}
        </main>
      ) : (
        <main className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <PostpaidSection />
        </main>
      )}

      <footer className="border-t mt-8 py-5 text-center text-xs" style={{ borderColor: "var(--border)", color: "var(--text-dim)" }}>
        {t.footer}
      </footer>
    </div>
  );
}
