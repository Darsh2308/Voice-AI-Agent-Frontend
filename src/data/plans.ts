// ── Plan data types ──────────────────────────────────────────────────────────

export type PlanCategory = 'prepaid' | 'postpaid' | 'addon';

export interface PrepaidPlan {
  code: string;
  price: number;
  validity: string;
  data: string;
  voice: string;
  sms: string;
  tag?: 'Entry' | 'Most popular' | 'Quarterly' | 'Best value';
  type: 'daily' | 'special';
}

export interface PostpaidPlan {
  code: string;
  rental: number;
  data: string;
  voice: string;
  sms: string;
  ott: string;
}

export interface DataAddon {
  code: string;
  price: number;
  data: string;
  validity: string;
}

export interface FiberPlan {
  code: string;
  speed: string;
  speedMbps: number;
  price: number;
  data: string;
  features: string[];
}

// ── Prepaid daily data packs ─────────────────────────────────────────────────

export const prepaidDailyPlans: PrepaidPlan[] = [
  {
    code: 'PP-179',
    price: 179,
    validity: '28 days',
    data: '1 GB/day',
    voice: 'Unlimited',
    sms: '100 SMS/day',
    tag: 'Entry',
    type: 'daily',
  },
  {
    code: 'PP-299',
    price: 299,
    validity: '28 days',
    data: '1.5 GB/day',
    voice: 'Unlimited',
    sms: '100 SMS/day',
    tag: 'Most popular',
    type: 'daily',
  },
  {
    code: 'PP-399',
    price: 399,
    validity: '56 days',
    data: '2 GB/day',
    voice: 'Unlimited',
    sms: '100 SMS/day',
    type: 'daily',
  },
  {
    code: 'PP-666',
    price: 666,
    validity: '84 days',
    data: '1.5 GB/day',
    voice: 'Unlimited',
    sms: '100 SMS/day',
    tag: 'Quarterly',
    type: 'daily',
  },
  {
    code: 'PP-2999',
    price: 2999,
    validity: '365 days',
    data: '2 GB/day',
    voice: 'Unlimited',
    sms: '100 SMS/day',
    tag: 'Best value',
    type: 'daily',
  },
];

// ── Prepaid data-only / special ──────────────────────────────────────────────

export const prepaidSpecialPlans: PrepaidPlan[] = [
  {
    code: 'PP-D19',
    price: 19,
    validity: '1 day',
    data: '1 GB data only',
    voice: '—',
    sms: '—',
    type: 'special',
  },
  {
    code: 'PP-D49',
    price: 49,
    validity: '3 days',
    data: '3 GB data only',
    voice: '—',
    sms: '—',
    type: 'special',
  },
  {
    code: 'PP-D199',
    price: 199,
    validity: '30 days',
    data: '12 GB total, no daily limit',
    voice: '—',
    sms: '—',
    type: 'special',
  },
  {
    code: 'PP-OTT-499',
    price: 499,
    validity: '28 days',
    data: '2 GB/day + 1 OTT subscription',
    voice: '—',
    sms: '—',
    type: 'special',
  },
];

// ── Postpaid ─────────────────────────────────────────────────────────────────

export const postpaidPlans: PostpaidPlan[] = [
  {
    code: 'POST-399',
    rental: 399,
    data: '40 GB',
    voice: 'Unlimited',
    sms: '100 SMS/day',
    ott: 'None',
  },
  {
    code: 'POST-599',
    rental: 599,
    data: '75 GB',
    voice: 'Unlimited',
    sms: '100 SMS/day',
    ott: '1 OTT',
  },
  {
    code: 'POST-799',
    rental: 799,
    data: 'Unlimited (FUP)',
    voice: 'Unlimited',
    sms: '100 SMS/day',
    ott: '2 OTT',
  },
  {
    code: 'POST-FAM-999',
    rental: 999,
    data: 'Unlimited (FUP) + 1 extra SIM',
    voice: 'Unlimited',
    sms: '100 SMS/day',
    ott: '3 OTT',
  },
];

// ── Data add-ons ─────────────────────────────────────────────────────────────

export const dataAddons: DataAddon[] = [
  { code: 'ADD-1G', price: 22, data: '1 GB', validity: 'Same as base plan' },
  { code: 'ADD-5G', price: 65, data: '5 GB', validity: 'Same as base plan' },
  { code: 'ADD-NIGHT', price: 19, data: 'Unlimited 12am–6am', validity: '7 days' },
  { code: 'ADD-WKND', price: 39, data: '10 GB weekend', validity: 'Weekend' },
  { code: 'ADD-ROAM-INTL', price: 999, data: '5 GB + intl voice', validity: '10 days' },
];

// ── Fiber broadband ──────────────────────────────────────────────────────────

export const fiberPlans: FiberPlan[] = [
  {
    code: 'Fiber-100',
    speed: '100 Mbps',
    speedMbps: 100,
    price: 699,
    data: '500 GB/month',
    features: ['Wi-Fi router included', 'Unlimited after-FUP at 5 Mbps', 'Free installation'],
  },
  {
    code: 'Fiber-300',
    speed: '300 Mbps',
    speedMbps: 300,
    price: 999,
    data: '1 TB/month',
    features: ['Dual-band Wi-Fi 6 router', 'Unlimited after-FUP at 10 Mbps', 'Free installation', '1 OTT subscription'],
  },
  {
    code: 'Fiber-500',
    speed: '500 Mbps',
    speedMbps: 500,
    price: 1499,
    data: '2 TB/month',
    features: ['Wi-Fi 6 router', 'Unlimited after-FUP at 15 Mbps', 'Free installation', '2 OTT subscriptions', 'Static IP available'],
  },
  {
    code: 'Fiber-1G',
    speed: '1 Gbps',
    speedMbps: 1000,
    price: 1999,
    data: '3.3 TB/month',
    features: ['Wi-Fi 6E mesh router', 'Unlimited after-FUP at 25 Mbps', 'Free installation', '3 OTT subscriptions', 'Static IP included', 'Priority support'],
  },
];

// ── All prepaid plans combined ───────────────────────────────────────────────

export const allPrepaidPlans = [...prepaidDailyPlans, ...prepaidSpecialPlans];

// ── Helper: find plan by code ────────────────────────────────────────────────

export function findPlanByCode(code: string) {
  const prepaid = allPrepaidPlans.find((p) => p.code === code);
  if (prepaid) return { type: 'prepaid' as const, plan: prepaid };

  const postpaid = postpaidPlans.find((p) => p.code === code);
  if (postpaid) return { type: 'postpaid' as const, plan: postpaid };

  const addon = dataAddons.find((p) => p.code === code);
  if (addon) return { type: 'addon' as const, plan: addon };

  return null;
}
