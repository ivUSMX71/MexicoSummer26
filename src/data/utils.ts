import type { Plan, Carrier } from "./types";
import { carriers, NETWORK_COLORS, CARRIER_COLORS, CARRIER_GRADIENTS } from "./types";

export function getCarrier(carrierId: string): Carrier | undefined {
  return carriers.find((c) => c.id === carrierId);
}

export function getNetworkColor(network: string): string {
  return (NETWORK_COLORS as Record<string, string>)[network] ?? "#64748b";
}

export function getCarrierColor(carrierId: string): string {
  return CARRIER_COLORS[carrierId] ?? "#64748b";
}

/** Brand gradient string for a carrier (e.g. Bait → yellow→red). */
export function carrierGradient(carrierId: string, network: string): string {
  const pair = CARRIER_GRADIENTS[carrierId];
  if (pair) return `linear-gradient(135deg, ${pair[0]} 0%, ${pair[1]} 100%)`;
  const c1 = getCarrierColor(carrierId);
  const c2 = getNetworkColor(network);
  return `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`;
}

export function formatData(gb: number | "unlimited"): string {
  if (gb === "unlimited") return "Ilimitado";
  if (gb >= 1) return `${gb} GB`;
  return `${Math.round(gb * 1000)} MB`;
}

export function formatMinutes(min: number | "unlimited"): string {
  if (min === "unlimited") return "Ilimitado";
  return `${min} min`;
}

/** MXN per GB normalized to a 30-day month (longer plans scaled down). */
export function mxnPerGB(plan: Plan): number | null {
  if (plan.dataGB === "unlimited") return null;
  if (plan.dataGB === 0) return null;
  const monthFactor = plan.validityDays > 30 ? plan.validityDays / 30 : 1;
  const effectivePrice = plan.price / monthFactor;
  return effectivePrice / plan.dataGB;
}

/** Display string with $ sign, e.g. "$12.50/GB". */
export function formatMXNperGB(plan: Plan): string {
  const c = mxnPerGB(plan);
  if (c === null) return "Ilimitado";
  return `$${c.toFixed(2)}/GB`;
}

/** GB per day, based on main data over validity. */
export function gbPerDay(plan: Plan): number | null {
  if (plan.dataGB === "unlimited") return null;
  if (plan.validityDays === 0) return null;
  return plan.dataGB / plan.validityDays;
}

export function formatGBperDay(plan: Plan): string {
  const v = gbPerDay(plan);
  if (v === null) return "Ilimitado";
  if (v >= 1) return `${v.toFixed(1)} GB/día`;
  return `${Math.round(v * 1000)} MB/día`;
}

/** Total data capacity = main + social + video pools. */
export function totalDataGB(plan: Plan): number | "unlimited" {
  if (plan.dataGB === "unlimited") return "unlimited";
  return plan.dataGB + (plan.socialGB ?? 0) + (plan.videoGB ?? 0);
}

export type ValidityCategory =
  | "weekly"
  | "monthly"
  | "bimonthly"
  | "semester"
  | "annual";

export function validityCategory(days: number): ValidityCategory {
  if (days <= 7) return "weekly";
  if (days <= 31) return "monthly";
  if (days <= 90) return "bimonthly";
  if (days <= 180) return "semester";
  return "annual";
}

/** Data-amount buckets for the range filter (based on main data). */
export type DataRange = "0-2" | "2-5" | "5-10" | "10-25" | "25+";

export function dataRangeOf(plan: Plan): DataRange | "unlimited" {
  if (plan.dataGB === "unlimited") return "unlimited";
  const gb = plan.dataGB;
  if (gb < 2) return "0-2";
  if (gb < 5) return "2-5";
  if (gb < 10) return "5-10";
  if (gb < 25) return "10-25";
  return "25+";
}

/** Effective price respecting the global autopay toggle. */
export function effectivePrice(plan: Plan, autopay: boolean): number {
  if (autopay && plan.autopayPrice != null) return plan.autopayPrice;
  return plan.price;
}
