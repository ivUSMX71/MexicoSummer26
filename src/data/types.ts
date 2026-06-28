export type Network = "Altan" | "ATT" | "Telcel" | "Movistar";

export type UnlimitedApp =
  | "WhatsApp"
  | "Instagram"
  | "Facebook"
  | "Messenger"
  | "TikTok"
  | "Twitter/X"
  | "YouTube"
  | "Google Maps"
  | "Apple Maps"
  | "Waze"
  | "Spotify"
  | "Amazon Music"
  | "Apple Music"
  | "Netflix"
  | "Prime Video"
  | "Max"
  | "Claro Música"
  | "Zoom"
  | "Telegram"
  | "Snapchat"
  | "Threads"
  | "LinkedIn"
  | "Discord"
  | "VIX"
  | "MVS";

export type SimType = "physical" | "esim" | "both";
export type PlanType = "prepaid";

/** How a plan can be acquired. Recarga and new SIM/number share the same price. */
export type Acquisition = "recarga" | "portabilidad";

export interface Carrier {
  id: string;
  name: string;
  network: Network;
}

export interface Plan {
  id: string;
  carrierId: string;
  name: string;
  planType: PlanType;
  simType: SimType;
  /** Available when porting your number in. */
  portabilidad: boolean;
  /** Regular price = top-up (recarga) or new number/SIM. */
  price: number;
  /** Discounted price when autopay (domiciliación) is enabled. */
  autopayPrice?: number;
  /** Main "open"/libre data, hotspot-shareable. */
  dataGB: number | "unlimited";
  callMinutes: number | "unlimited";
  sms: number | "unlimited";
  validityDays: number;
  /** Apps with truly unlimited (zero-rated) data. */
  unlimitedApps: UnlimitedApp[];
  /** Separate social-media data pool (NOT unlimited) in GB. */
  socialGB?: number;
  socialApps?: UnlimitedApp[];
  /** Separate video / streaming data pool in GB. */
  videoGB?: number;
  videoApps?: UnlimitedApp[];
  /** Hotspot / tethering allowed. */
  hotspot?: boolean;
  /** Promo multiplier text, e.g. "2x" or "3x". */
  promo?: string;
  includedSubscriptions?: string[];
  notes?: string;
}

export const carriers: Carrier[] = [
  { id: "telcel", name: "Telcel", network: "Telcel" },
  { id: "oxxocel", name: "Oxxo Cel", network: "ATT" },
  { id: "att", name: "AT&T", network: "ATT" },
  { id: "unefon", name: "Unefon", network: "ATT" },
  { id: "movistar", name: "Movistar", network: "Movistar" },
  { id: "virgin", name: "Virgin Mobile", network: "Movistar" },
  { id: "bait", name: "Bait", network: "Altan" },
];

export const plans: Plan[] = [
  // ═══════════════════════════════════════════════════════════
  // BAIT — Altan network. Social apps unlimited on many tiers.
  // (eSIM-only duplicates of physical tiers removed — "both"
  //  plans already cover eSIM + physical.)
  // ═══════════════════════════════════════════════════════════
  { id: "bait-3000", carrierId: "bait", name: "Bait $3,000", planType: "prepaid", simType: "both", portabilidad: false, price: 3000, dataGB: 20, callMinutes: "unlimited", sms: "unlimited", validityDays: 365, unlimitedApps: [], hotspot: true },
  { id: "bait-2300", carrierId: "bait", name: "Bait $2,300", planType: "prepaid", simType: "both", portabilidad: false, price: 2300, dataGB: 15, callMinutes: "unlimited", sms: "unlimited", validityDays: 365, unlimitedApps: [], hotspot: true },
  { id: "bait-2000", carrierId: "bait", name: "Bait $2,000", planType: "prepaid", simType: "both", portabilidad: false, price: 2000, dataGB: 12, callMinutes: "unlimited", sms: "unlimited", validityDays: 365, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"], hotspot: true },
  { id: "bait-1500", carrierId: "bait", name: "Bait $1,500", planType: "prepaid", simType: "both", portabilidad: false, price: 1500, dataGB: 15, callMinutes: "unlimited", sms: "unlimited", validityDays: 180, unlimitedApps: [], hotspot: true },
  { id: "bait-1000", carrierId: "bait", name: "Bait $1,000", planType: "prepaid", simType: "both", portabilidad: false, price: 1000, dataGB: 12, callMinutes: "unlimited", sms: "unlimited", validityDays: 180, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"], hotspot: true },
  { id: "bait-800", carrierId: "bait", name: "Bait $800", planType: "prepaid", simType: "both", portabilidad: false, price: 800, dataGB: 20, callMinutes: "unlimited", sms: "unlimited", validityDays: 90, unlimitedApps: [], hotspot: true },
  { id: "bait-649", carrierId: "bait", name: "Bait $649", planType: "prepaid", simType: "both", portabilidad: false, price: 649, dataGB: 50, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"], hotspot: true, includedSubscriptions: ["VIX", "Programa Salud"] },
  { id: "bait-550", carrierId: "bait", name: "Bait $550", planType: "prepaid", simType: "both", portabilidad: false, price: 550, dataGB: 12, callMinutes: "unlimited", sms: "unlimited", validityDays: 90, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"], hotspot: true },
  { id: "bait-500", carrierId: "bait", name: "Bait $500", planType: "prepaid", simType: "both", portabilidad: false, price: 500, dataGB: 50, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"], hotspot: true },
  { id: "bait-349", carrierId: "bait", name: "Bait $349", planType: "prepaid", simType: "both", portabilidad: false, price: 349, dataGB: 15, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: [], hotspot: true, includedSubscriptions: ["VIX"] },
  { id: "bait-300", carrierId: "bait", name: "Bait $300", planType: "prepaid", simType: "both", portabilidad: false, price: 300, dataGB: 20, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: [], hotspot: true },
  { id: "bait-299", carrierId: "bait", name: "Bait $299", planType: "prepaid", simType: "both", portabilidad: false, price: 299, dataGB: 15, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: [], hotspot: true },
  { id: "bait-250", carrierId: "bait", name: "Bait $250", planType: "prepaid", simType: "both", portabilidad: false, price: 250, dataGB: 15, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: [], hotspot: true, includedSubscriptions: ["Programa Salud"] },
  { id: "bait-230", carrierId: "bait", name: "Bait $230", planType: "prepaid", simType: "both", portabilidad: false, price: 230, dataGB: 15, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: [], hotspot: true },
  { id: "bait-200", carrierId: "bait", name: "Bait $200", planType: "prepaid", simType: "both", portabilidad: false, price: 200, dataGB: 12, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"], hotspot: true },
  { id: "bait-135", carrierId: "bait", name: "Bait $135", planType: "prepaid", simType: "both", portabilidad: false, price: 135, dataGB: 5, callMinutes: "unlimited", sms: "unlimited", validityDays: 15, unlimitedApps: [], hotspot: true, includedSubscriptions: ["Programa Salud"] },
  { id: "bait-125", carrierId: "bait", name: "Bait $125", planType: "prepaid", simType: "both", portabilidad: false, price: 125, dataGB: 8, callMinutes: "unlimited", sms: "unlimited", validityDays: 20, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"], hotspot: true },
  { id: "bait-120", carrierId: "bait", name: "Bait $120", planType: "prepaid", simType: "both", portabilidad: false, price: 120, dataGB: 5, callMinutes: "unlimited", sms: "unlimited", validityDays: 15, unlimitedApps: [], hotspot: true },
  { id: "bait-100", carrierId: "bait", name: "Bait $100", planType: "prepaid", simType: "both", portabilidad: false, price: 100, dataGB: 5, callMinutes: "unlimited", sms: "unlimited", validityDays: 15, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"], hotspot: true },
  { id: "bait-65", carrierId: "bait", name: "Bait $65", planType: "prepaid", simType: "both", portabilidad: false, price: 65, dataGB: 4, callMinutes: "unlimited", sms: "unlimited", validityDays: 7, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Twitter/X"], includedSubscriptions: ["Programa Salud"] },
  { id: "bait-60", carrierId: "bait", name: "Bait $60", planType: "prepaid", simType: "both", portabilidad: false, price: 60, dataGB: 4, callMinutes: "unlimited", sms: "unlimited", validityDays: 7, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Twitter/X"] },
  { id: "bait-50", carrierId: "bait", name: "Bait $50", planType: "prepaid", simType: "both", portabilidad: false, price: 50, dataGB: 2, callMinutes: "unlimited", sms: "unlimited", validityDays: 7, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"] },
  { id: "bait-30", carrierId: "bait", name: "Bait $30", planType: "prepaid", simType: "both", portabilidad: false, price: 30, dataGB: 1.0, callMinutes: "unlimited", sms: "unlimited", validityDays: 3, unlimitedApps: [] },
  { id: "bait-20", carrierId: "bait", name: "Bait $20", planType: "prepaid", simType: "both", portabilidad: false, price: 20, dataGB: 0.512, callMinutes: "unlimited", sms: "unlimited", validityDays: 2, unlimitedApps: [] },
  { id: "bait-10", carrierId: "bait", name: "Bait $10", planType: "prepaid", simType: "both", portabilidad: false, price: 10, dataGB: 0.1, callMinutes: "unlimited", sms: "unlimited", validityDays: 1, unlimitedApps: [] },

  // ═══════════════════════════════════════════════════════════
  // VIRGIN MOBILE — Movistar network.
  // "Libres" data is hotspot-shareable. Separate social + video pools.
  // ═══════════════════════════════════════════════════════════
  {
    id: "virgin-599", carrierId: "virgin", name: "Virgin $599", planType: "prepaid", simType: "both", portabilidad: true,
    price: 599, autopayPrice: 499, dataGB: 75, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, hotspot: true,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music"],
    notes: "75 GB a máxima velocidad sin reducción.",
  },
  {
    id: "virgin-400", carrierId: "virgin", name: "Virgin $400", planType: "prepaid", simType: "both", portabilidad: true,
    price: 400, dataGB: 28, callMinutes: "unlimited", sms: "unlimited", validityDays: 31, hotspot: true,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music", "Facebook", "Messenger", "Snapchat", "Instagram", "Twitter/X", "Waze", "Google Maps", "Apple Maps", "Telegram"],
    videoGB: 6, videoApps: ["TikTok", "YouTube", "Prime Video", "Max"],
  },
  {
    id: "virgin-300", carrierId: "virgin", name: "Virgin $300", planType: "prepaid", simType: "both", portabilidad: true,
    price: 300, dataGB: 18, callMinutes: "unlimited", sms: "unlimited", validityDays: 31, hotspot: true,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music", "Facebook", "Messenger", "Snapchat", "Instagram", "Twitter/X", "Waze", "Google Maps", "Apple Maps", "Telegram"],
    videoGB: 4, videoApps: ["TikTok", "YouTube", "Prime Video"],
  },
  {
    id: "virgin-290-uber", carrierId: "virgin", name: "Virgin $290", planType: "prepaid", simType: "both", portabilidad: true,
    price: 290, dataGB: 14, callMinutes: "unlimited", sms: "unlimited", validityDays: 31, hotspot: true,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music", "Facebook", "Messenger", "Snapchat", "Instagram", "Twitter/X", "Waze", "Google Maps", "Apple Maps", "Telegram"],
    videoGB: 3, videoApps: ["TikTok", "YouTube", "Prime Video"],
    includedSubscriptions: ["$80 crédito Uber"],
  },
  {
    id: "virgin-250", carrierId: "virgin", name: "Virgin $250", planType: "prepaid", simType: "both", portabilidad: true,
    price: 250, dataGB: 14, callMinutes: "unlimited", sms: "unlimited", validityDays: 31, hotspot: true,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music", "Facebook", "Messenger", "Snapchat", "Instagram", "Twitter/X", "Waze", "Google Maps", "Apple Maps", "Telegram"],
    videoGB: 3, videoApps: ["TikTok", "YouTube", "Prime Video"],
  },
  {
    id: "virgin-230-uber", carrierId: "virgin", name: "Virgin $230", planType: "prepaid", simType: "both", portabilidad: true,
    price: 230, dataGB: 10, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, hotspot: true,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music"],
    socialGB: 10, socialApps: ["Facebook", "Messenger", "Twitter/X", "Instagram", "Apple Maps", "Waze", "Google Maps"],
    videoGB: 1.5, videoApps: ["TikTok", "YouTube"],
    includedSubscriptions: ["$60 crédito Uber"],
  },
  {
    id: "virgin-200", carrierId: "virgin", name: "Virgin $200", planType: "prepaid", simType: "both", portabilidad: true,
    price: 200, dataGB: 10, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, hotspot: true,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music"],
    socialGB: 10, socialApps: ["Facebook", "Messenger", "Twitter/X", "Instagram", "Apple Maps", "Waze", "Google Maps"],
    videoGB: 1.5, videoApps: ["TikTok", "YouTube"],
  },
  {
    id: "virgin-175-uber", carrierId: "virgin", name: "Virgin $175", planType: "prepaid", simType: "both", portabilidad: true,
    price: 175, dataGB: 7, callMinutes: "unlimited", sms: "unlimited", validityDays: 26, hotspot: true,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music"],
    socialGB: 7, socialApps: ["Facebook", "Messenger", "Twitter/X", "Instagram", "Apple Maps", "Waze", "Google Maps"],
    videoGB: 1, videoApps: ["TikTok", "YouTube"],
    includedSubscriptions: ["$50 crédito Uber"],
  },
  {
    id: "virgin-150", carrierId: "virgin", name: "Virgin $150", planType: "prepaid", simType: "both", portabilidad: true,
    price: 150, dataGB: 7, callMinutes: "unlimited", sms: "unlimited", validityDays: 26, hotspot: true,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music"],
    socialGB: 7, socialApps: ["Facebook", "Messenger", "Twitter/X", "Instagram", "Apple Maps", "Waze", "Google Maps"],
    videoGB: 1, videoApps: ["TikTok", "YouTube"],
  },
  {
    id: "virgin-100", carrierId: "virgin", name: "Virgin $100", planType: "prepaid", simType: "both", portabilidad: true,
    price: 100, dataGB: 4, callMinutes: "unlimited", sms: "unlimited", validityDays: 15, hotspot: true,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music"],
    socialGB: 4, socialApps: ["Facebook", "Messenger", "Twitter/X", "Instagram"],
    videoGB: 0.5, videoApps: ["TikTok"],
  },
  {
    id: "virgin-75", carrierId: "virgin", name: "Virgin $75", planType: "prepaid", simType: "both", portabilidad: true,
    price: 75, dataGB: 2.5, callMinutes: "unlimited", sms: "unlimited", validityDays: 12, hotspot: true,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music"],
    socialGB: 2.5, socialApps: ["Facebook", "Messenger", "Twitter/X", "Instagram"],
  },
  {
    id: "virgin-50", carrierId: "virgin", name: "Virgin $50", planType: "prepaid", simType: "both", portabilidad: true,
    price: 50, dataGB: 1.5, callMinutes: "unlimited", sms: "unlimited", validityDays: 7, hotspot: true,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music"],
    socialGB: 1.5, socialApps: ["Facebook", "Messenger", "Twitter/X"],
  },
  {
    id: "virgin-25", carrierId: "virgin", name: "Virgin $25", planType: "prepaid", simType: "both", portabilidad: true,
    price: 25, dataGB: 0.5, callMinutes: "unlimited", sms: "unlimited", validityDays: 2, hotspot: true,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music"],
  },
  {
    id: "virgin-999", carrierId: "virgin", name: "Virgin $999", planType: "prepaid", simType: "both", portabilidad: true,
    price: 999, dataGB: 4, callMinutes: "unlimited", sms: "unlimited", validityDays: 360, hotspot: true,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music"],
    notes: "Vigencia anual (360 días).",
  },

  // ═══════════════════════════════════════════════════════════
  // AT&T — Prepago. Zero-rated: WhatsApp, Facebook, Instagram, X, Google Maps.
  // ═══════════════════════════════════════════════════════════
  { id: "att-10", carrierId: "att", name: "Recarga $10", planType: "prepaid", simType: "both", portabilidad: false, price: 10, dataGB: 0.2, callMinutes: "unlimited", sms: "unlimited", validityDays: 1, unlimitedApps: ["WhatsApp"], promo: "2x" },
  { id: "att-20", carrierId: "att", name: "Recarga $20", planType: "prepaid", simType: "both", portabilidad: false, price: 20, dataGB: 0.4, callMinutes: "unlimited", sms: "unlimited", validityDays: 1, unlimitedApps: ["WhatsApp"], socialGB: 0.2, socialApps: ["Facebook", "Messenger", "Twitter/X", "Instagram", "Google Maps"], promo: "2x" },
  { id: "att-30", carrierId: "att", name: "Recarga $30", planType: "prepaid", simType: "both", portabilidad: false, price: 30, dataGB: 0.6, callMinutes: "unlimited", sms: "unlimited", validityDays: 3, unlimitedApps: ["WhatsApp"], socialGB: 0.3, socialApps: ["Facebook", "Messenger", "Twitter/X", "Instagram", "Google Maps"], promo: "2x" },
  { id: "att-50", carrierId: "att", name: "Recarga $50", planType: "prepaid", simType: "both", portabilidad: false, price: 50, dataGB: 1.5, callMinutes: "unlimited", sms: "unlimited", validityDays: 5, unlimitedApps: ["WhatsApp"], socialGB: 1, socialApps: ["Facebook", "Messenger", "Twitter/X", "Instagram", "Google Maps"], promo: "2x" },
  { id: "att-70", carrierId: "att", name: "Recarga $70", planType: "prepaid", simType: "both", portabilidad: false, price: 70, dataGB: 9, callMinutes: "unlimited", sms: "unlimited", validityDays: 10, unlimitedApps: ["WhatsApp"], socialGB: 1, socialApps: ["Facebook", "Messenger", "Twitter/X", "Instagram", "Google Maps"], promo: "2x" },
  { id: "att-100", carrierId: "att", name: "Recarga $100", planType: "prepaid", simType: "both", portabilidad: false, price: 100, dataGB: 4, callMinutes: "unlimited", sms: "unlimited", validityDays: 14, unlimitedApps: ["Facebook", "Messenger", "WhatsApp", "Twitter/X", "Instagram", "Google Maps"], promo: "2x" },
  { id: "att-120", carrierId: "att", name: "Recarga $120", planType: "prepaid", simType: "both", portabilidad: false, price: 120, dataGB: 15, callMinutes: "unlimited", sms: "unlimited", validityDays: 21, unlimitedApps: ["Facebook", "Messenger", "WhatsApp", "Twitter/X", "Instagram", "Google Maps"], promo: "2x" },
  { id: "att-150", carrierId: "att", name: "Recarga $150", planType: "prepaid", simType: "both", portabilidad: false, price: 150, dataGB: 9, callMinutes: "unlimited", sms: "unlimited", validityDays: 25, unlimitedApps: ["Facebook", "Messenger", "WhatsApp", "Twitter/X", "Instagram", "Google Maps"], promo: "3x" },
  { id: "att-200", carrierId: "att", name: "Recarga $200", planType: "prepaid", simType: "both", portabilidad: false, price: 200, dataGB: 12, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: ["Facebook", "Messenger", "WhatsApp", "Twitter/X", "Instagram", "Google Maps"], promo: "3x" },
  { id: "att-300", carrierId: "att", name: "Recarga $300", planType: "prepaid", simType: "both", portabilidad: false, price: 300, dataGB: 18, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: ["Facebook", "Messenger", "WhatsApp", "Twitter/X", "Instagram", "Google Maps"], promo: "3x" },
  { id: "att-go-150", carrierId: "att", name: "AT&T GO 6.5 GB", planType: "prepaid", simType: "esim", portabilidad: false, price: 150, dataGB: 6.5, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: [], hotspot: true },
  { id: "att-go-200", carrierId: "att", name: "AT&T GO 10 GB", planType: "prepaid", simType: "esim", portabilidad: false, price: 200, dataGB: 10, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: [], hotspot: true },
  { id: "att-go-300", carrierId: "att", name: "AT&T GO 20 GB", planType: "prepaid", simType: "esim", portabilidad: false, price: 300, dataGB: 20, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: [], hotspot: true },

  // ═══════════════════════════════════════════════════════════
  // OXXO CEL — runs on AT&T network. Unlimited social on most tiers.
  // NOTE: figures approximate — verify current promos with Oxxo Cel.
  // ═══════════════════════════════════════════════════════════
  { id: "oxxocel-30", carrierId: "oxxocel", name: "Oxxo Cel $30", planType: "prepaid", simType: "both", portabilidad: false, price: 30, dataGB: 1, callMinutes: "unlimited", sms: "unlimited", validityDays: 3, unlimitedApps: ["WhatsApp", "Facebook", "Messenger"] },
  { id: "oxxocel-50", carrierId: "oxxocel", name: "Oxxo Cel $50", planType: "prepaid", simType: "both", portabilidad: false, price: 50, dataGB: 3, callMinutes: "unlimited", sms: "unlimited", validityDays: 7, unlimitedApps: ["WhatsApp", "Facebook", "Messenger", "Instagram", "Twitter/X"] },
  { id: "oxxocel-100", carrierId: "oxxocel", name: "Oxxo Cel $100", planType: "prepaid", simType: "both", portabilidad: false, price: 100, dataGB: 8, callMinutes: "unlimited", sms: "unlimited", validityDays: 15, unlimitedApps: ["WhatsApp", "Facebook", "Messenger", "Instagram", "Twitter/X"] },
  { id: "oxxocel-150", carrierId: "oxxocel", name: "Oxxo Cel $150", planType: "prepaid", simType: "both", portabilidad: false, price: 150, dataGB: 12, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: ["WhatsApp", "Facebook", "Messenger", "Instagram", "Twitter/X"] },
  { id: "oxxocel-200", carrierId: "oxxocel", name: "Oxxo Cel $200", planType: "prepaid", simType: "both", portabilidad: false, price: 200, dataGB: 16, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: ["WhatsApp", "Facebook", "Messenger", "Instagram", "Twitter/X"] },

  // ═══════════════════════════════════════════════════════════
  // TELCEL — Amigo Sin Límite. Unlimited: WhatsApp, FB, IG, X, Snapchat.
  // Claro Música ships with 500 MB dedicated data on bundle tiers.
  // ═══════════════════════════════════════════════════════════
  { id: "telcel-10", carrierId: "telcel", name: "Amigo Sin Límite $10", planType: "prepaid", simType: "both", portabilidad: false, price: 10, dataGB: 0.05, callMinutes: "unlimited", sms: "unlimited", validityDays: 1, unlimitedApps: ["WhatsApp"] },
  { id: "telcel-20", carrierId: "telcel", name: "Amigo Sin Límite $20", planType: "prepaid", simType: "both", portabilidad: false, price: 20, dataGB: 0.1, callMinutes: "unlimited", sms: "unlimited", validityDays: 2, unlimitedApps: ["WhatsApp"], socialGB: 0.2, socialApps: ["Facebook", "Messenger", "Twitter/X"] },
  { id: "telcel-30", carrierId: "telcel", name: "Amigo Sin Límite $30", planType: "prepaid", simType: "both", portabilidad: false, price: 30, dataGB: 0.16, callMinutes: "unlimited", sms: "unlimited", validityDays: 3, unlimitedApps: ["WhatsApp"], socialGB: 0.3, socialApps: ["Facebook", "Messenger", "Twitter/X"] },
  { id: "telcel-50", carrierId: "telcel", name: "Amigo Sin Límite $50", planType: "prepaid", simType: "both", portabilidad: false, price: 50, dataGB: 0.5, callMinutes: "unlimited", sms: "unlimited", validityDays: 7, unlimitedApps: ["WhatsApp"], socialGB: 1, socialApps: ["Facebook", "Instagram", "Twitter/X", "Snapchat", "Messenger"] },
  { id: "telcel-50-promo", carrierId: "telcel", name: "Recarga $50 (Portabilidad)", planType: "prepaid", simType: "both", portabilidad: true, price: 50, dataGB: 1.5, callMinutes: "unlimited", sms: "unlimited", validityDays: 7, unlimitedApps: ["WhatsApp"], socialGB: 1, socialApps: ["Facebook", "Instagram", "Twitter/X", "Snapchat", "Messenger"], promo: "3x" },
  { id: "telcel-80", carrierId: "telcel", name: "Amigo Sin Límite $80", planType: "prepaid", simType: "both", portabilidad: false, price: 80, dataGB: 0.8, callMinutes: "unlimited", sms: "unlimited", validityDays: 12, unlimitedApps: ["WhatsApp"], socialGB: 1.5, socialApps: ["Facebook", "Instagram", "Twitter/X", "Snapchat", "Messenger"] },
  { id: "telcel-80-promo", carrierId: "telcel", name: "Recarga $80 (Portabilidad)", planType: "prepaid", simType: "both", portabilidad: true, price: 80, dataGB: 2.4, callMinutes: "unlimited", sms: "unlimited", validityDays: 12, unlimitedApps: ["WhatsApp"], socialGB: 1.5, socialApps: ["Facebook", "Instagram", "Twitter/X", "Snapchat", "Messenger"], promo: "3x" },
  { id: "telcel-100", carrierId: "telcel", name: "Amigo Sin Límite $100", planType: "prepaid", simType: "both", portabilidad: false, price: 100, dataGB: 1.5, callMinutes: "unlimited", sms: "unlimited", validityDays: 15, unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"], includedSubscriptions: ["Amazon Prime Básico"] },
  { id: "telcel-100-promo", carrierId: "telcel", name: "Recarga $100 (Portabilidad)", planType: "prepaid", simType: "both", portabilidad: true, price: 100, dataGB: 5.5, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"], videoGB: 0.5, videoApps: ["Claro Música"], includedSubscriptions: ["Amazon Prime Básico", "Claro Música"] },
  { id: "telcel-150", carrierId: "telcel", name: "Amigo Sin Límite $150", planType: "prepaid", simType: "both", portabilidad: false, price: 150, dataGB: 2.5, callMinutes: "unlimited", sms: "unlimited", validityDays: 25, unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"], videoGB: 0.5, videoApps: ["Claro Música"], includedSubscriptions: ["Amazon Prime Básico", "Claro Música"] },
  { id: "telcel-150-promo", carrierId: "telcel", name: "Recarga $150 (Portabilidad)", planType: "prepaid", simType: "both", portabilidad: true, price: 150, dataGB: 8, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"], videoGB: 0.5, videoApps: ["Claro Música"], includedSubscriptions: ["Amazon Prime Básico", "Claro Música"] },
  { id: "telcel-200", carrierId: "telcel", name: "Amigo Sin Límite $200", planType: "prepaid", simType: "both", portabilidad: false, price: 200, dataGB: 3.5, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"], videoGB: 0.5, videoApps: ["Claro Música"], includedSubscriptions: ["Amazon Prime Básico", "Claro Música"] },
  { id: "telcel-270", carrierId: "telcel", name: "Sin Límite $270 Amazon", planType: "prepaid", simType: "both", portabilidad: false, price: 270, dataGB: 2.5, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"], videoGB: 0.5, videoApps: ["Claro Música"], includedSubscriptions: ["Amazon Prime", "Claro Música"] },
  { id: "telcel-300", carrierId: "telcel", name: "Amigo Sin Límite $300", planType: "prepaid", simType: "both", portabilidad: false, price: 300, dataGB: 5.5, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"], videoGB: 0.5, videoApps: ["Claro Música"], includedSubscriptions: ["Amazon Prime Básico", "Claro Música"] },
  { id: "telcel-400", carrierId: "telcel", name: "Sin Límite $400 Amazon", planType: "prepaid", simType: "both", portabilidad: false, price: 400, dataGB: 5.5, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"], videoGB: 0.5, videoApps: ["Claro Música"], includedSubscriptions: ["Amazon Prime", "Claro Música"] },
  { id: "telcel-500", carrierId: "telcel", name: "Amigo Sin Límite $500", planType: "prepaid", simType: "both", portabilidad: false, price: 500, dataGB: 8, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"], videoGB: 0.5, videoApps: ["Claro Música"], includedSubscriptions: ["Amazon Prime Básico", "Claro Música"] },
  { id: "telcel-1200", carrierId: "telcel", name: "Prepago $1,200", planType: "prepaid", simType: "both", portabilidad: false, price: 1200, dataGB: 7, callMinutes: "unlimited", sms: "unlimited", validityDays: 180, unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"], videoGB: 0.5, videoApps: ["Claro Música"], includedSubscriptions: ["Amazon Prime Básico", "Claro Música"], promo: "2x" },
  { id: "telcel-2400", carrierId: "telcel", name: "Prepago $2,400", planType: "prepaid", simType: "both", portabilidad: false, price: 2400, dataGB: 7, callMinutes: "unlimited", sms: "unlimited", validityDays: 365, unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"], videoGB: 0.5, videoApps: ["Claro Música"], includedSubscriptions: ["Amazon Prime Básico", "Claro Música"], promo: "2x" },
];

export const ALL_NETWORKS: Network[] = ["Altan", "ATT", "Telcel", "Movistar"];

export const ALL_APPS: UnlimitedApp[] = [
  "WhatsApp",
  "Instagram",
  "Facebook",
  "Messenger",
  "TikTok",
  "Twitter/X",
  "YouTube",
  "Google Maps",
  "Apple Maps",
  "Waze",
  "Spotify",
  "Amazon Music",
  "Apple Music",
  "Netflix",
  "Prime Video",
  "Max",
  "Claro Música",
  "Discord",
  "VIX",
  "MVS",
  "Zoom",
  "Telegram",
  "Snapchat",
  "Threads",
  "LinkedIn",
];

export const NETWORK_COLORS: Record<Network, string> = {
  Altan: "#E31837",
  ATT: "#00A8E0",
  Telcel: "#003087",
  Movistar: "#019B3B",
};

/** Two-stop brand gradients per carrier (used for the card accent). */
export const CARRIER_GRADIENTS: Record<string, [string, string]> = {
  telcel: ["#003087", "#00A8E0"],
  oxxocel: ["#FDB913", "#E4002B"],
  att: ["#00A8E0", "#0057B8"],
  unefon: ["#00B5E2", "#003DA5"],
  movistar: ["#00B33C", "#0066B3"],
  virgin: ["#E4002B", "#C8102E"],
  bait: ["#FFD200", "#E4002B"], // yellow → red
};

export const CARRIER_COLORS: Record<string, string> = {
  telcel: "#003087",
  oxxocel: "#E4002B",
  att: "#00A8E0",
  unefon: "#003DA5",
  movistar: "#019B3B",
  virgin: "#E4002B",
  bait: "#E4002B",
};
