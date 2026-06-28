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
  | "Spotify"
  | "Netflix"
  | "Zoom"
  | "Telegram"
  | "Snapchat"
  | "Threads"
  | "LinkedIn"
  | "Discord"
  | "VIX"
  | "MVS";

export type SimType = "physical" | "esim" | "both";
export type PlanType = "prepaid"; // | "postpaid" — coming soon

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
  portabilidad: boolean;
  price: number;
  dataGB: number | "unlimited";
  callMinutes: number | "unlimited";
  sms: number | "unlimited";
  validityDays: number;
  unlimitedApps: UnlimitedApp[];
  notes?: string;
  includedSubscriptions?: string[];
}

export const carriers: Carrier[] = [
  { id: "telcel", name: "Telcel", network: "Telcel" },
  { id: "oxxocel", name: "Oxxo Cel", network: "Telcel" },
  { id: "att", name: "AT&T", network: "ATT" },
  { id: "unefon", name: "Unefon", network: "ATT" },
  { id: "movistar", name: "Movistar", network: "Movistar" },
  { id: "virgin", name: "Virgin Mobile", network: "Movistar" },
  { id: "bait", name: "Bait", network: "Altan" },
];

export const plans: Plan[] = [

  { id: "bait-3000", carrierId: "bait", name: "Bait $3,000", planType: "prepaid", simType: "both", portabilidad: false, price: 3000, dataGB: 20, callMinutes: "unlimited", sms: "unlimited", validityDays: 365, unlimitedApps: [] },
  { id: "bait-2300", carrierId: "bait", name: "Bait $2,300", planType: "prepaid", simType: "both", portabilidad: false, price: 2300, dataGB: 15, callMinutes: "unlimited", sms: "unlimited", validityDays: 365, unlimitedApps: [] },
  { id: "bait-2000-esim", carrierId: "bait", name: "1 año de servicio $2,000", planType: "prepaid", simType: "esim", portabilidad: false, price: 2000, dataGB: 12, callMinutes: "unlimited", sms: "unlimited", validityDays: 365, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"] },
  { id: "bait-2000", carrierId: "bait", name: "Bait $2,000", planType: "prepaid", simType: "both", portabilidad: false, price: 2000, dataGB: 12, callMinutes: "unlimited", sms: "unlimited", validityDays: 365, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"] },
  { id: "bait-1500", carrierId: "bait", name: "Bait $1,500", planType: "prepaid", simType: "both", portabilidad: false, price: 1500, dataGB: 15, callMinutes: "unlimited", sms: "unlimited", validityDays: 180, unlimitedApps: [] },
  { id: "bait-1000-esim", carrierId: "bait", name: "6 meses de servicio $1,000", planType: "prepaid", simType: "esim", portabilidad: false, price: 1000, dataGB: 12, callMinutes: "unlimited", sms: "unlimited", validityDays: 180, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"] },
  { id: "bait-1000", carrierId: "bait", name: "Bait $1,000", planType: "prepaid", simType: "both", portabilidad: false, price: 1000, dataGB: 12, callMinutes: "unlimited", sms: "unlimited", validityDays: 180, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"] },
  { id: "bait-800", carrierId: "bait", name: "Bait $800", planType: "prepaid", simType: "both", portabilidad: false, price: 800, dataGB: 20, callMinutes: "unlimited", sms: "unlimited", validityDays: 90, unlimitedApps: [] },
  { id: "bait-649-esim", carrierId: "bait", name: "Bait E-Sim $649", planType: "prepaid", simType: "esim", portabilidad: false, price: 649, dataGB: 50, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"], includedSubscriptions: ["VIX", "Programa Salud"] },
  { id: "bait-649", carrierId: "bait", name: "Bait $649", planType: "prepaid", simType: "both", portabilidad: false, price: 649, dataGB: 50, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"], includedSubscriptions: ["VIX", "Programa Salud"] },
  { id: "bait-550-esim", carrierId: "bait", name: "Adquiere tu E-Sim $550", planType: "prepaid", simType: "esim", portabilidad: false, price: 550, dataGB: 12, callMinutes: "unlimited", sms: "unlimited", validityDays: 90, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"] },
  { id: "bait-550", carrierId: "bait", name: "Bait $550", planType: "prepaid", simType: "both", portabilidad: false, price: 550, dataGB: 12, callMinutes: "unlimited", sms: "unlimited", validityDays: 90, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"] },
  { id: "bait-500", carrierId: "bait", name: "Bait $500", planType: "prepaid", simType: "both", portabilidad: false, price: 500, dataGB: 50, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"] },
  { id: "bait-349", carrierId: "bait", name: "Bait $349", planType: "prepaid", simType: "both", portabilidad: false, price: 349, dataGB: 15, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: [], includedSubscriptions: ["VIX"] },
  { id: "bait-300", carrierId: "bait", name: "Bait $300", planType: "prepaid", simType: "both", portabilidad: false, price: 300, dataGB: 20, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: [] },
  { id: "bait-299", carrierId: "bait", name: "Bait $299", planType: "prepaid", simType: "both", portabilidad: false, price: 299, dataGB: 15, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: [] },
  { id: "bait-250", carrierId: "bait", name: "Bait $250", planType: "prepaid", simType: "both", portabilidad: false, price: 250, dataGB: 15, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: [], includedSubscriptions: ["Programa Salud"] },
  { id: "bait-230-esim", carrierId: "bait", name: "Adquiere tu E-Sim $230", planType: "prepaid", simType: "esim", portabilidad: false, price: 230, dataGB: 15, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: [] },
  { id: "bait-230", carrierId: "bait", name: "Bait $230", planType: "prepaid", simType: "both", portabilidad: false, price: 230, dataGB: 15, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: [] },
  { id: "bait-200", carrierId: "bait", name: "Bait $200", planType: "prepaid", simType: "both", portabilidad: false, price: 200, dataGB: 12, callMinutes: "unlimited", sms: "unlimited", validityDays: 30, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"] },
  { id: "bait-135", carrierId: "bait", name: "Bait $135", planType: "prepaid", simType: "both", portabilidad: false, price: 135, dataGB: 5, callMinutes: "unlimited", sms: "unlimited", validityDays: 15, unlimitedApps: [], includedSubscriptions: ["Programa Salud"] },
  { id: "bait-125", carrierId: "bait", name: "Bait $125", planType: "prepaid", simType: "both", portabilidad: false, price: 125, dataGB: 8, callMinutes: "unlimited", sms: "unlimited", validityDays: 20, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"] },
  { id: "bait-120", carrierId: "bait", name: "Bait $120", planType: "prepaid", simType: "both", portabilidad: false, price: 120, dataGB: 5, callMinutes: "unlimited", sms: "unlimited", validityDays: 15, unlimitedApps: [] },
  { id: "bait-100-esim", carrierId: "bait", name: "Adquiere tu E-Sim $100", planType: "prepaid", simType: "esim", portabilidad: false, price: 100, dataGB: 5, callMinutes: "unlimited", sms: "unlimited", validityDays: 15, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"] },
  { id: "bait-100", carrierId: "bait", name: "Bait $100", planType: "prepaid", simType: "both", portabilidad: false, price: 100, dataGB: 5, callMinutes: "unlimited", sms: "unlimited", validityDays: 15, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"] },
  { id: "bait-65", carrierId: "bait", name: "Bait $65", planType: "prepaid", simType: "both", portabilidad: false, price: 65, dataGB: 4, callMinutes: "unlimited", sms: "unlimited", validityDays: 7, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Twitter/X"], includedSubscriptions: ["Programa Salud"] },
  { id: "bait-60", carrierId: "bait", name: "Bait $60", planType: "prepaid", simType: "both", portabilidad: false, price: 60, dataGB: 4, callMinutes: "unlimited", sms: "unlimited", validityDays: 7, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Twitter/X"] },
  { id: "bait-50", carrierId: "bait", name: "Bait $50", planType: "prepaid", simType: "both", portabilidad: false, price: 50, dataGB: 2, callMinutes: "unlimited", sms: "unlimited", validityDays: 7, unlimitedApps: ["WhatsApp", "Telegram", "Facebook", "Messenger", "Instagram", "Twitter/X", "Snapchat"] },
  { id: "bait-30", carrierId: "bait", name: "Bait $30", planType: "prepaid", simType: "both", portabilidad: false, price: 30, dataGB: 1.0, callMinutes: "unlimited", sms: "unlimited", validityDays: 3, unlimitedApps: [] },
  { id: "bait-20", carrierId: "bait", name: "Bait $20", planType: "prepaid", simType: "both", portabilidad: false, price: 20, dataGB: 0.512, callMinutes: "unlimited", sms: "unlimited", validityDays: 2, unlimitedApps: [] },
  { id: "bait-10", carrierId: "bait", name: "Bait $10", planType: "prepaid", simType: "both", portabilidad: false, price: 10, dataGB: 0.1, callMinutes: "unlimited", sms: "unlimited", validityDays: 1, unlimitedApps: [] },
  

// ═══════════════════════════════════════════════════════════
  // Virgin Mobile — High Capacity Tiers (image_e034b1.jpg)
  // ═══════════════════════════════════════════════════════════
  {
    id: "virgin-250",
    carrierId: "virgin",
    name: "Virgin $250",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    price: 250,
    dataGB: 14, // Libres only
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 31,
    unlimitedApps: [
      "WhatsApp", "Spotify", "Amazon Music", "Apple Music", 
      "Facebook", "Messenger", "Snapchat", "Instagram", 
      "Twitter/X", "Waze", "Google Maps", "Apple Maps", "Telegram"
    ],
    notes: "Includes 14 GB Libres (hotspot shareable) + 3 GB dedicated for video streaming (TikTok, YouTube, Prime Video). Total capacity 17 GB.",
    includedSubscriptions: []
  },
  {
    id: "virgin-599",
    carrierId: "virgin",
    name: "Virgin $599",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    price: 499,
    dataGB: 75, // Libres only
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 30,
    unlimitedApps: [],
    notes: "Promotional rate of $499 with auto-pay enabled. Full 75 GB Libres at max speed without throttled reduction. Hotspot fully enabled.",
    includedSubscriptions: []
  },
  {
    id: "virgin-400",
    carrierId: "virgin",
    name: "Virgin $400",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    price: 400,
    dataGB: 28, // Libres only
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 31,
    unlimitedApps: [
      "WhatsApp", "Spotify", "Amazon Music", "Apple Music", 
      "Facebook", "Messenger", "Snapchat", "Instagram", 
      "Twitter/X", "Waze", "Google Maps", "Apple Maps", "Telegram"
    ],
    notes: "Includes 28 GB Libres (hotspot shareable) + 6 GB dedicated for video streaming (TikTok, YouTube, Prime Video, Max). Total capacity 34 GB.",
    includedSubscriptions: []
  },
  {
    id: "virgin-300",
    carrierId: "virgin",
    name: "Virgin $300",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    price: 300,
    dataGB: 18, // Libres only
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 31,
    unlimitedApps: [
      "WhatsApp", "Spotify", "Amazon Music", "Apple Music", 
      "Facebook", "Messenger", "Snapchat", "Instagram", 
      "Twitter/X", "Waze", "Google Maps", "Apple Maps", "Telegram"
    ],
    notes: "Includes 18 GB Libres (hotspot shareable) + 4 GB dedicated for video streaming (TikTok, YouTube, Prime Video). Total capacity 22 GB.",
    includedSubscriptions: []
  },

  // ═══════════════════════════════════════════════════════════
  // Virgin Mobile — Standard Tiers (image_e03839.png)
  // ═══════════════════════════════════════════════════════════
  {
    id: "virgin-200",
    carrierId: "virgin",
    name: "Virgin $200",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    price: 200,
    dataGB: 10, // Libres only
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 30,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music"],
    notes: "Includes 10 GB Libres (hotspot shareable) + 10 GB data pool for social media apps (Facebook, Messenger, Twitter/X, Instagram, Apple Maps, Waze, Google Maps) + 1.5 GB video streaming (TikTok, YouTube). Total capacity 21.5 GB.",
    includedSubscriptions: []
  },
  {
    id: "virgin-150",
    carrierId: "virgin",
    name: "Virgin $150",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    price: 150,
    dataGB: 7, // Libres only
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 26,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music"],
    notes: "Includes 7 GB Libres (hotspot shareable) + 7 GB data pool for social media apps (Facebook, Messenger, Twitter/X, Instagram, Apple Maps, Waze, Google Maps) + 1 GB video streaming (TikTok, YouTube). Total capacity 15 GB.",
    includedSubscriptions: []
  },

  // ═══════════════════════════════════════════════════════════
  // Virgin Mobile — Special Long-Validity Tier (image_e03876.png)
  // ═══════════════════════════════════════════════════════════
  {
    id: "virgin-999",
    carrierId: "virgin",
    name: "Virgin $999",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    price: 999,
    dataGB: 4, // Libres only
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 360,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music"],
    notes: "Long-term validity plan (360 days). Includes 4 GB Libres data pool (hotspot shareable) and unlimited minutes/SMS.",
    includedSubscriptions: []
  },

  // ═══════════════════════════════════════════════════════════
  // Virgin Mobile — Mid-Validity Tier (image_e03876.png)
  // ═══════════════════════════════════════════════════════════
  {
    id: "virgin-100",
    carrierId: "virgin",
    name: "Virgin $100",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    price: 100,
    dataGB: 4, // Libres only
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 15,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music"],
    notes: "Includes 4 GB Libres (hotspot shareable) + 4 GB data pool for social media apps (Facebook, Messenger, Twitter/X, Instagram) + 500 MB video streaming (TikTok). Total capacity 8.5 GB.",
    includedSubscriptions: []
  },

  // ═══════════════════════════════════════════════════════════
  // Virgin Mobile — Micro-Validity Tiers (image_e03c10.png)
  // ═══════════════════════════════════════════════════════════
  {
    id: "virgin-75",
    carrierId: "virgin",
    name: "Virgin $75",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    price: 75,
    dataGB: 2.5, // Libres only
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 12,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music"],
    notes: "Includes 2.5 GB Libres (hotspot shareable) + 2.5 GB data pool for social media apps (Facebook, Messenger, Twitter/X, Instagram). Total capacity 5 GB.",
    includedSubscriptions: []
  },
  {
    id: "virgin-50",
    carrierId: "virgin",
    name: "Virgin $50",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    price: 50,
    dataGB: 1.5, // Libres only
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 7,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music"],
    notes: "Includes 1.5 GB Libres (hotspot shareable) + 1.5 GB data pool for social media apps (Facebook, Messenger, Twitter/X). Total capacity 3 GB.",
    includedSubscriptions: []
  },
  {
    id: "virgin-25",
    carrierId: "virgin",
    name: "Virgin $25",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    price: 25,
    dataGB: 0.5, // Libres only
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 2,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music"],
    notes: "Includes 500 MB Libres (hotspot shareable). Redes Ilimitadas messaging/music access enabled. No standalone social app data pool.",
    includedSubscriptions: []
  },

  // ═══════════════════════════════════════════════════════════
  // Virgin Mobile — Virgin + Uber Promotional Tiers (image_e03f7a.png)
  // ═══════════════════════════════════════════════════════════
  {
    id: "virgin-175-uber",
    carrierId: "virgin",
    name: "Virgin $175",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    price: 175,
    dataGB: 7, // Libres only
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 26,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music"],
    notes: "Includes 7 GB Libres (hotspot shareable) + 7 GB social media data pool (Facebook, Messenger, Twitter/X, Instagram, Apple Maps, Waze, Google Maps) + 1 GB video streaming (TikTok, YouTube). Includes $50 pesos Uber credit. eSIM compatible. Total capacity 15 GB.",
    includedSubscriptions: ["Uber Credit"]
  },
  {
    id: "virgin-230-uber",
    carrierId: "virgin",
    name: "Virgin $230",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    price: 230,
    dataGB: 10, // Libres only
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 30,
    unlimitedApps: ["WhatsApp", "Spotify", "Amazon Music", "Apple Music"],
    notes: "Includes 10 GB Libres (hotspot shareable) + 10 GB social media data pool (Facebook, Messenger, Twitter/X, Instagram, Apple Maps, Waze, Google Maps) + 1.5 GB video streaming (TikTok, YouTube). Includes $60 pesos Uber credit. eSIM compatible. Total capacity 21.5 GB.",
    includedSubscriptions: ["Uber Credit"]
  },
  {
    id: "virgin-290-uber",
    carrierId: "virgin",
    name: "Virgin $290",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    price: 290,
    dataGB: 14, // Libres only
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 31,
    unlimitedApps: [
      "WhatsApp", "Spotify", "Amazon Music", "Apple Music", 
      "Facebook", "Messenger", "Snapchat", "Instagram", 
      "Twitter/X", "Waze", "Google Maps", "Apple Maps", "Telegram"
    ],
    notes: "Includes 14 GB Libres (hotspot shareable) + 3 GB video streaming (TikTok, YouTube, Prime Video). Includes $80 pesos Uber credit. eSIM compatible. Total capacity 17 GB.",
    includedSubscriptions: ["Uber Credit"]
  },

  
  // ═══════════════════════════════════════════════════════════
  // AT&T — Prepago 2025–2026
  // Zero-rated: WhatsApp, Facebook, Instagram, X, Google Maps
  // Separate video GB (not unlimited): TikTok, YouTube, Netflix, Spotify
  // ═══════════════════════════════════════════════════════════
  {
    id: "att-10",
    carrierId: "att",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Recarga 10",
    price: 10,
    dataGB: 0.2,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 1,
    unlimitedApps: ["WhatsApp"],
    notes: "Double GB",
  },
  {
    id: "att-20",
    carrierId: "att",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Recarga 20",
    price: 20,
    dataGB: 0.4,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 1,
    unlimitedApps: ["WhatsApp"],
    notes: "Double GB + 200 MB social (FB, Messenger, X, IG, Google Maps)",
  },
  {
    id: "att-30",
    carrierId: "att",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Recarga 30",
    price: 30,
    dataGB: 0.6,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 3,
    unlimitedApps: ["WhatsApp"],
    notes: "Double GB + 300 MB social (FB, Messenger, X, IG, Google Maps)",
  },
  {
    id: "att-50",
    carrierId: "att",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Recarga 50",
    price: 50,
    dataGB: 1.5,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 5,
    unlimitedApps: ["WhatsApp"],
    notes: "Double GB + 1 GB social (FB, Messenger, X, IG, Google Maps)",
  },
  {
    id: "att-70",
    carrierId: "att",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Recarga 70",
    price: 70,
    dataGB: 9,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 10,
    unlimitedApps: ["WhatsApp"],
    notes: "Double GB + 1 GB social (FB, Messenger, X, IG, Google Maps)",
  },
  {
    id: "att-100",
    carrierId: "att",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Recarga 100",
    price: 100,
    dataGB: 4,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 14,
    unlimitedApps: ["Facebook", "Messenger", "WhatsApp", "Twitter/X", "Instagram", "Google Maps"],
    notes: "Double GB",
  },
  {
    id: "att-120",
    carrierId: "att",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Recarga 120",
    price: 120,
    dataGB: 15,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 21,
    unlimitedApps: ["Facebook", "Messenger", "WhatsApp", "Twitter/X", "Instagram", "Google Maps"],
    notes: "Double GB",
  },
  {
    id: "att-150",
    carrierId: "att",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Recarga 150",
    price: 150,
    dataGB: 9,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 25,
    unlimitedApps: ["Facebook", "Messenger", "WhatsApp", "Twitter/X", "Instagram", "Google Maps"],
    notes: "Triple GB",
  },
  {
    id: "att-200",
    carrierId: "att",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Recarga 200",
    price: 200,
    dataGB: 12,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 30,
    unlimitedApps: ["Facebook", "Messenger", "WhatsApp", "Twitter/X", "Instagram", "Google Maps"],
    notes: "Triple GB",
  },
  {
    id: "att-300",
    carrierId: "att",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Recarga 300",
    price: 300,
    dataGB: 18,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 30,
    unlimitedApps: ["Facebook", "Messenger", "WhatsApp", "Twitter/X", "Instagram", "Google Maps"],
    notes: "Triple GB",
  },
  {
    id: "att-go-150",
    carrierId: "att",
    planType: "prepaid",
    simType: "esim",
    portabilidad: false,
    name: "Paquete 6.5 GB",
    price: 150,
    dataGB: 6.5,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 30,
    unlimitedApps: [],
    notes: "AT&T GO eSIM Plan",
  },
  {
    id: "att-go-200",
    carrierId: "att",
    planType: "prepaid",
    simType: "esim",
    portabilidad: false,
    name: "Paquete 10 GB",
    price: 200,
    dataGB: 10,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 30,
    unlimitedApps: [],
    notes: "AT&T GO eSIM Plan",
  },
  {
    id: "att-go-300",
    carrierId: "att",
    planType: "prepaid",
    simType: "esim",
    portabilidad: false,
    name: "Paquete 20 GB",
    price: 300,
    dataGB: 20,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 30,
    unlimitedApps: [],
    notes: "AT&T GO eSIM Plan",
  },

  // ═══════════════════════════════════════════════════════════
  // TELCEL — Amigo Sin Límite 2025
  // Unlimited: WhatsApp, Facebook, Instagram, X, Snapchat
  // TikTok & YouTube: separate add-on only
  // ═══════════════════════════════════════════════════════════
  {
    id: "telcel-10",
    carrierId: "telcel",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Amigo Sin Límite 10",
    price: 10,
    dataGB: 0.05,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 1,
    unlimitedApps: ["WhatsApp"],
  },
  {
    id: "telcel-20",
    carrierId: "telcel",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Amigo Sin Límite 20",
    price: 20,
    dataGB: 0.1,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 2,
    unlimitedApps: ["WhatsApp"],
    notes: "200 MB social (FB, Messenger, X)",
  },
  {
    id: "telcel-30",
    carrierId: "telcel",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Amigo Sin Límite 30",
    price: 30,
    dataGB: 0.16,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 3,
    unlimitedApps: ["WhatsApp"],
    notes: "300 MB social (FB, Messenger, X)",
  },
  {
    id: "telcel-50",
    carrierId: "telcel",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Amigo Sin Límite 50",
    price: 50,
    dataGB: 0.5,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 7,
    unlimitedApps: ["WhatsApp"],
    notes: "1 GB social (FB, IG, X, Snapchat, Messenger)",
  },
  {
    id: "telcel-50-promo",
    carrierId: "telcel",
    planType: "prepaid",
    simType: "both",
    portabilidad: true,
    name: "Recarga 50 (Portabilidad Promo)",
    price: 50,
    dataGB: 1.5,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 7,
    unlimitedApps: ["WhatsApp"],
    notes: "Triple GB + 1 GB social",
  },
  {
    id: "telcel-80",
    carrierId: "telcel",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Amigo Sin Límite 80",
    price: 80,
    dataGB: 0.8,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 12,
    unlimitedApps: ["WhatsApp"],
    notes: "1.5 GB social (FB, IG, X, Snapchat, Messenger)",
  },
  {
    id: "telcel-80-promo",
    carrierId: "telcel",
    planType: "prepaid",
    simType: "both",
    portabilidad: true,
    name: "Recarga 80 (Portabilidad Promo)",
    price: 80,
    dataGB: 2.4,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 12,
    unlimitedApps: ["WhatsApp"],
    notes: "Triple GB + 1.5 GB social",
  },
  {
    id: "telcel-100-promo",
    carrierId: "telcel",
    planType: "prepaid",
    simType: "both",
    portabilidad: true,
    name: "Recarga 100 (Portabilidad Promo)",
    price: 100,
    dataGB: 5.5,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 30,
    unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"],
    includedSubscriptions: ["Amazon Prime Básico", "Claro Música"],
    notes: "Equivalent to Paquete 300",
  },
  {
    id: "telcel-150-promo",
    carrierId: "telcel",
    planType: "prepaid",
    simType: "both",
    portabilidad: true,
    name: "Recarga 150 / 200 / 300 (Portabilidad Promo)",
    price: 150,
    dataGB: 8,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 30,
    unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"],
    includedSubscriptions: ["Amazon Prime Básico", "Claro Música"],
    notes: "Equivalent to Paquete 500",
  },
  {
    id: "telcel-100",
    carrierId: "telcel",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Amigo Sin Límite 100",
    price: 100,
    dataGB: 1.5,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 15,
    unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"],
    includedSubscriptions: ["Amazon Prime Básico"],
  },
  {
    id: "telcel-150",
    carrierId: "telcel",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Amigo Sin Límite 150",
    price: 150,
    dataGB: 2.5,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 25,
    unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"],
    includedSubscriptions: ["Amazon Prime Básico", "Claro Música"],
    notes: "Claro Música 500 MB",
  },
  {
    id: "telcel-200",
    carrierId: "telcel",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Amigo Sin Límite 200",
    price: 200,
    dataGB: 3.5,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 30,
    unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"],
    includedSubscriptions: ["Amazon Prime Básico", "Claro Música"],
    notes: "Claro Música 500 MB",
  },
  {
    id: "telcel-270",
    carrierId: "telcel",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Sin Límite 270 Amazon",
    price: 270,
    dataGB: 2.5,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 30,
    unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"],
    includedSubscriptions: ["Amazon Prime", "Claro Música"],
    notes: "Claro Música 500 MB",
  },
  {
    id: "telcel-300",
    carrierId: "telcel",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Amigo Sin Límite 300",
    price: 300,
    dataGB: 5.5,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 30,
    unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"],
    includedSubscriptions: ["Amazon Prime Básico", "Claro Música"],
    notes: "Claro Música 500 MB",
  },
  {
    id: "telcel-400",
    carrierId: "telcel",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Sin Límite 400 Amazon",
    price: 400,
    dataGB: 5.5,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 30,
    unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"],
    includedSubscriptions: ["Amazon Prime", "Claro Música"],
    notes: "Claro Música 500 MB",
  },
  {
    id: "telcel-500",
    carrierId: "telcel",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Amigo Sin Límite 500",
    price: 500,
    dataGB: 8,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 30,
    unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"],
    includedSubscriptions: ["Amazon Prime Básico", "Claro Música"],
    notes: "Claro Música 500 MB",
  },
  {
    id: "telcel-1200",
    carrierId: "telcel",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Prepago 1200",
    price: 1200,
    dataGB: 7,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 180,
    unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"],
    includedSubscriptions: ["Amazon Prime Básico", "Claro Música"],
    notes: "Promo double GB + Claro Música 500 MB",
  },
  {
    id: "telcel-2400",
    carrierId: "telcel",
    planType: "prepaid",
    simType: "both",
    portabilidad: false,
    name: "Prepago 2400",
    price: 2400,
    dataGB: 7,
    callMinutes: "unlimited",
    sms: "unlimited",
    validityDays: 365,
    unlimitedApps: ["Facebook", "Twitter/X", "Snapchat", "Instagram", "WhatsApp"],
    includedSubscriptions: ["Amazon Prime Básico", "Claro Música"],
    notes: "Promo double GB + Claro Música 500 MB",
  },
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
  "Spotify",
  "Netflix",
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

// Brand colors per carrier — used to create gradients mixing carrier + network
export const CARRIER_COLORS: Record<string, string> = {
  telcel: "#003087",
  oxxocel: "#E4002B",
  att: "#00A8E0",
  unefon: "#003DA5",
  movistar: "#019B3B",
  virgin: "#E4002B",
  bait: "#E31837",
};
