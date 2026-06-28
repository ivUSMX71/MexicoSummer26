import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/* ────────────────────────────── Theme ────────────────────────────── */

type Mode = "dark" | "light";

interface ThemeCtx {
  mode: Mode;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeCtx | null>(null);

/* ───────────────────────────── Language ──────────────────────────── */

export type Lang = "es" | "en";

const STRINGS = {
  es: {
    appName: "Planes MX",
    tagline: "Comparador de planes prepago en México",
    prepaid: "Prepago",
    postpaid: "Pospago",
    plans: "planes",
    // filters
    filters: "Filtros",
    sortBy: "Ordenar por",
    sort_price_asc: "Menor precio",
    sort_data_desc: "Más datos",
    sort_apps_desc: "Más apps",
    sort_value: "Mejor valor (precio/GB)",
    operator: "Operador",
    network: "Red (Torres)",
    simType: "Tipo de SIM",
    allSims: "Todas",
    esim: "eSIM",
    physical: "SIM Física",
    bothSim: "eSIM + Física",
    acquisition: "Cómo lo obtienes",
    acq_any: "Cualquiera",
    acq_recarga: "Recarga / Nuevo número",
    acq_porta: "Portabilidad",
    validity: "Vigencia",
    val_any: "Cualquiera",
    val_weekly: "Semanal",
    val_monthly: "Mensual",
    val_bimonthly: "Bimestral",
    val_semester: "Semestral",
    val_annual: "Anual",
    dataRange: "Cantidad de datos",
    data_any: "Cualquiera",
    data_unlimited: "Ilimitado",
    budget: "Presupuesto máximo",
    enable: "Activar",
    autopay: "Precio con domiciliación (autopago)",
    requiredApps: "Apps requeridas",
    show: "Mostrar",
    hide: "Ocultar",
    clearFilters: "Limpiar filtros",
    noResults: "No hay planes que coincidan",
    bestValueTitle: "Mejor valor",
    bestValueDesc: (carrier: string, name: string, gb: string, price: number) =>
      `${carrier} ${name} te da ${gb} por $${price} MXN.`,
    // card
    data: "Datos",
    libres: "Datos libres",
    perGB: "MXN/GB",
    perDay: "GB/día",
    callsSms: "Llamadas / SMS",
    unlimited: "Ilimitado",
    unlimitedBoth: "Ilimitados",
    unlimitedApps: "Apps ilimitadas",
    socialData: "Datos para redes sociales",
    videoData: "Datos para video / streaming",
    hotspot: "Hotspot / compartir datos",
    hotspotYes: "Incluido",
    includes: "Incluye",
    autopayPrice: "con domiciliación",
    porta: "Portabilidad",
    perValidity: (d: number) => `MXN / ${d} días`,
    footer:
      "Datos recopilados manualmente · Precios en MXN · Verifica disponibilidad con cada compañía",
    postTitle: "Planes de renta (pospago)",
    postSoon: "Próximamente",
    postDesc:
      "Estamos recopilando los planes pospago de AT&T, Telcel, Movistar y resellers de Altan. Avísanos cuando quieras ser de los primeros en compararlos.",
    notifyMe: "Avísame",
    notifyOk: "¡Gracias! Te avisaremos cuando esté listo.",
    emailPlaceholder: "tu@correo.com",
  },
  en: {
    appName: "Plans MX",
    tagline: "Prepaid plan comparison for Mexico",
    prepaid: "Prepaid",
    postpaid: "Postpaid",
    plans: "plans",
    filters: "Filters",
    sortBy: "Sort by",
    sort_price_asc: "Lowest price",
    sort_data_desc: "Most data",
    sort_apps_desc: "Most apps",
    sort_value: "Best value (price/GB)",
    operator: "Carrier",
    network: "Network (Towers)",
    simType: "SIM type",
    allSims: "All",
    esim: "eSIM",
    physical: "Physical SIM",
    bothSim: "eSIM + Physical",
    acquisition: "How you get it",
    acq_any: "Any",
    acq_recarga: "Top-up / New number",
    acq_porta: "Port-in (Portabilidad)",
    validity: "Validity",
    val_any: "Any",
    val_weekly: "Weekly",
    val_monthly: "Monthly",
    val_bimonthly: "Bimonthly",
    val_semester: "Semester",
    val_annual: "Annual",
    dataRange: "Data amount",
    data_any: "Any",
    data_unlimited: "Unlimited",
    budget: "Max budget",
    enable: "Enable",
    autopay: "Price with autopay (domiciliación)",
    requiredApps: "Required apps",
    show: "Show",
    hide: "Hide",
    clearFilters: "Clear filters",
    noResults: "No plans match your filters",
    bestValueTitle: "Best value",
    bestValueDesc: (carrier: string, name: string, gb: string, price: number) =>
      `${carrier} ${name} gives you ${gb} for $${price} MXN.`,
    data: "Data",
    libres: "Open data",
    perGB: "MXN/GB",
    perDay: "GB/day",
    callsSms: "Calls / SMS",
    unlimited: "Unlimited",
    unlimitedBoth: "Unlimited",
    unlimitedApps: "Unlimited apps",
    socialData: "Social media data",
    videoData: "Video / streaming data",
    hotspot: "Hotspot / tethering",
    hotspotYes: "Included",
    includes: "Includes",
    autopayPrice: "with autopay",
    porta: "Port-in",
    perValidity: (d: number) => `MXN / ${d} days`,
    footer:
      "Manually collected data · Prices in MXN · Verify availability with each carrier",
    postTitle: "Monthly contract plans (postpaid)",
    postSoon: "Coming soon",
    postDesc:
      "We are collecting postpaid plans from AT&T, Telcel, Movistar and Altan resellers. Let us know if you want to be among the first to compare them.",
    notifyMe: "Notify me",
    notifyOk: "Thanks! We'll let you know when it's ready.",
    emailPlaceholder: "you@email.com",
  },
} as const;

export type Strings = (typeof STRINGS)["es"];

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Strings;
}

const LangContext = createContext<LangCtx | null>(null);

/* ─────────────────────────── Provider ────────────────────────────── */

export function AppProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("dark");
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "light") root.classList.add("light");
    else root.classList.remove("light");
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggle: () => setMode((m) => (m === "dark" ? "light" : "dark")) }}>
      <LangContext.Provider value={{ lang, setLang, t: STRINGS[lang] }}>
        {children}
      </LangContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within AppProvider");
  return ctx;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within AppProvider");
  return ctx;
}
