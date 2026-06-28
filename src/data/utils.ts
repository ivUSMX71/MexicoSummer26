import type { Plan, Carrier } from "./types";
import { carriers, NETWORK_COLORS, CARRIER_COLORS } from "./types";

export function getCarrier(carrierId: string): Carrier | undefined {
  return carriers.find((c) => c.id === carrierId);
}

export function getNetworkColor(network: string): string {
  return (NETWORK_COLORS as Record<string, string>)[network] ?? "#64748b";
}

export function getCarrierColor(carrierId: string): string {
  return CARRIER_COLORS[carrierId] ?? "#64748b";
}

// CSS gradient string mixing carrier brand color with network color.
// e.g. Virgin (red) on Movistar (green) → red→green gradient
export function carrierGradient(carrierId: string, network: string): string {
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

export function formatSms(sms: number | "unlimited"): string {
  if (sms === "unlimited") return "Ilimitado";
  return `${sms} SMS`;
}

export function pricePerGB(plan: Plan): number | null {
  if (plan.dataGB === "unlimited") return null;
  if (plan.dataGB === 0) return null;
  return plan.price / plan.dataGB;
}

export function dataPerMXN(plan: Plan): number {
  if (plan.dataGB === "unlimited") return Infinity;
  return (plan.dataGB / plan.price) * 100;
}

// MXN per GB normalized to a 30-day month.
// For plans with validity > 30 days (e.g. 180/365), the data is a monthly
// allowance, so we scale the effective price down to a 30-day equivalent.
export function mxnPerGB(plan: Plan): number | null {
  if (plan.dataGB === "unlimited") return null;
  if (plan.dataGB === 0) return null;
  const monthFactor = plan.validityDays > 30 ? plan.validityDays / 30 : 1;
  const effectivePrice = plan.price / monthFactor;
  return effectivePrice / plan.dataGB;
}

export function formatMXNperGB(plan: Plan): string {
  const c = mxnPerGB(plan);
  if (c === null) return "Ilimitado";
  return `${c.toFixed(2)}/GB`;
}
