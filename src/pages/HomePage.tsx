import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Wifi,
  Smartphone,
  Globe,
  MessageCircle,
  Shield,
  Languages,
  Signal,
  ChevronRight,
  Search,
  Star,
  Zap,
} from 'lucide-react';

const TRUST_STATS = [
  { value: '82M+', label: 'Subscribers' },
  { value: '4G', label: 'Nationwide' },
  { value: '180+', label: '5G Cities' },
  { value: '7', label: 'Languages' },
];

const FEATURES = [
  {
    icon: Smartphone,
    title: 'Prepaid Plans',
    desc: 'Affordable daily data packs starting at ₹179. Unlimited calls, SMS, and high-speed data.',
    link: '/plans',
    cta: 'View plans',
  },
  {
    icon: Globe,
    title: 'Postpaid Plans',
    desc: 'Hassle-free monthly billing with up to unlimited data and OTT subscriptions included.',
    link: '/plans',
    cta: 'Explore postpaid',
  },
  {
    icon: Zap,
    title: 'Data Add-Ons',
    desc: 'Need more data? Top up instantly — night packs, weekend boosters, and international roaming.',
    link: '/plans',
    cta: 'See add-ons',
  },
  {
    icon: Wifi,
    title: 'BharatConnect Fiber',
    desc: 'Blazing-fast home broadband. 100 Mbps to 1 Gbps plans with free Wi-Fi router.',
    link: '/fiber',
    cta: 'Check availability',
  },
];

const WHY_US = [
  {
    icon: Languages,
    title: 'Language-first support',
    desc: 'Customer care in Hindi, Marathi, Tamil, Telugu, Kannada, Bengali, and English — speak the language you think in.',
  },
  {
    icon: Signal,
    title: 'Reliable nationwide coverage',
    desc: '4G across India. 5G live in 180+ cities. No separate recharge — just get a 5G phone and enjoy faster speeds at no extra cost.',
  },
  {
    icon: Shield,
    title: 'Transparent billing',
    desc: 'No hidden charges. Every charge explained in your bill. Cancel OTT subscriptions and add-ons anytime from your account.',
  },
  {
    icon: Star,
    title: 'Support that improves over time',
    desc: 'Our AI assistant Suhaas learns and gets better. Backed by human agents when you need them, with every complaint tracked by a docket number.',
  },
];

const MOCK_COVERAGE: Record<string, string> = {
  mumbai: '5G Live — Enjoy blazing-fast speeds up to 1 Gbps',
  delhi: '5G Live — Enjoy blazing-fast speeds up to 1 Gbps',
  pune: '5G Live — Enjoy blazing-fast speeds up to 1 Gbps',
  bangalore: '5G Live — Ultra-fast connectivity available',
  bengaluru: '5G Live — Ultra-fast connectivity available',
  hyderabad: '5G Live — Ultra-fast connectivity available',
  chennai: '5G Live — Ultra-fast connectivity available',
  kolkata: '5G Live — Network expansion underway',
  jaipur: '4G Available — 5G coming soon',
  lucknow: '4G Available — 5G coming soon',
  patna: '4G Available — Strong coverage across the city',
  bhopal: '4G Available — Strong coverage across the city',
};

export function HomePage() {
  const [coverageQuery, setCoverageQuery] = useState('');
  const [coverageResult, setCoverageResult] = useState<string | null>(null);

  const checkCoverage = () => {
    const q = coverageQuery.trim().toLowerCase();
    if (!q) return;
    const result = MOCK_COVERAGE[q];
    setCoverageResult(
      result || '4G Available — Reliable coverage in your area. 5G rollout in progress.'
    );
  };

  return (
    <div>
      {/* ═══ Hero ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0B2B5B 0%, #0F4C75 40%, #0F8B8D 100%)',
          minHeight: '520px',
        }}
      >
        <div className="container-site relative z-10 py-20 md:py-28 flex flex-col items-center text-center">
          <h1
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-3xl"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            India's network,{' '}
            <span style={{ color: '#14B8A6' }}>in your language.</span>
          </h1>
          <p
            className="text-lg md:text-xl mt-5 max-w-2xl leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            From bustling metros to every district town — reliable 4G/5G, transparent plans,
            and customer care that speaks your mother tongue.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link to="/recharge" className="btn-primary !py-3.5 !px-8 text-base">
              Recharge now
            </Link>
            <Link
              to="/plans"
              className="btn-secondary !py-3.5 !px-8 text-base !bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
            >
              Explore plans
            </Link>
          </div>
        </div>

        {/* Decorative gradient orbs */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #14B8A6, transparent)', filter: 'blur(100px)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #7C5CFF, transparent)', filter: 'blur(80px)' }}
        />
      </section>

      {/* ═══ Trust Strip ════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b" style={{ borderColor: 'rgba(11,43,91,0.06)' }}>
        <div className="container-site py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {TRUST_STATS.map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-extrabold" style={{ color: 'var(--bc-teal)' }}>
                  {s.value}
                </p>
                <p className="text-sm mt-0.5" style={{ color: 'var(--bc-ink)', opacity: 0.55 }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Feature Cards ══════════════════════════════════════════════════════ */}
      <section className="container-site py-16 md:py-20">
        <div className="text-center mb-12">
          <h2
            className="text-2xl md:text-3xl font-extrabold"
            style={{ color: 'var(--bc-navy)', fontFamily: "'Plus Jakarta Sans'" }}
          >
            Everything you need, one network
          </h2>
          <p className="mt-3 text-base" style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>
            Mobile plans, home broadband, and smart add-ons — all under BharatConnect.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => (
            <Link key={f.title} to={f.link} className="plan-card group cursor-pointer">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(15,139,141,0.1), rgba(15,139,141,0.05))',
                  border: '1px solid rgba(15,139,141,0.15)',
                }}
              >
                <f.icon size={22} style={{ color: 'var(--bc-teal)' }} />
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: 'var(--bc-navy)' }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>
                {f.desc}
              </p>
              <span
                className="text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                style={{ color: 'var(--bc-teal)' }}
              >
                {f.cta} <ChevronRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ Why BharatConnect ═══════════════════════════════════════════════ */}
      <section className="section-mist py-16 md:py-20">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2
              className="text-2xl md:text-3xl font-extrabold"
              style={{ color: 'var(--bc-navy)', fontFamily: "'Plus Jakarta Sans'" }}
            >
              Why BharatConnect?
            </h2>
            <p className="mt-3 text-base max-w-xl mx-auto" style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>
              Built for India, with the values that matter to you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {WHY_US.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 flex gap-4"
                style={{ border: '1px solid rgba(11,43,91,0.06)' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: 'linear-gradient(135deg, rgba(15,139,141,0.12), rgba(15,139,141,0.05))',
                  }}
                >
                  <item.icon size={18} style={{ color: 'var(--bc-teal)' }} />
                </div>
                <div>
                  <h3 className="text-base font-bold mb-1.5" style={{ color: 'var(--bc-navy)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Coverage Checker ═══════════════════════════════════════════════ */}
      <section className="container-site py-16 md:py-20">
        <div className="max-w-xl mx-auto text-center">
          <h2
            className="text-2xl md:text-3xl font-extrabold mb-3"
            style={{ color: 'var(--bc-navy)', fontFamily: "'Plus Jakarta Sans'" }}
          >
            Check coverage in your area
          </h2>
          <p className="text-base mb-8" style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>
            Enter your city name to check 4G/5G availability.
          </p>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2"
                style={{ color: 'rgba(11,43,91,0.3)' }}
              />
              <input
                type="text"
                className="coverage-input !pl-10"
                placeholder="e.g. Mumbai, Delhi, Pune..."
                value={coverageQuery}
                onChange={(e) => {
                  setCoverageQuery(e.target.value);
                  setCoverageResult(null);
                }}
                onKeyDown={(e) => e.key === 'Enter' && checkCoverage()}
                aria-label="Enter city name for coverage check"
              />
            </div>
            <button onClick={checkCoverage} className="btn-primary flex-shrink-0">
              Check
            </button>
          </div>
          {coverageResult && (
            <div
              className="mt-5 p-4 rounded-xl text-left animate-fade-in"
              style={{
                background: 'rgba(15,139,141,0.06)',
                border: '1px solid rgba(15,139,141,0.15)',
              }}
            >
              <div className="flex items-start gap-3">
                <Signal size={20} style={{ color: 'var(--bc-teal)' }} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--bc-navy)' }}>
                    {coverageQuery.charAt(0).toUpperCase() + coverageQuery.slice(1)}
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--bc-ink)', opacity: 0.7 }}>
                    {coverageResult}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══ CTA banner ═════════════════════════════════════════════════════ */}
      <section
        className="py-14 text-center"
        style={{
          background: 'linear-gradient(135deg, #0B2B5B 0%, #0F8B8D 100%)',
        }}
      >
        <div className="container-site">
          <h2
            className="text-2xl md:text-3xl font-extrabold text-white mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans'" }}
          >
            Ready to switch?
          </h2>
          <p className="text-base mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Port your number to BharatConnect in 3–5 working days. Or recharge an existing plan right now.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/recharge" className="btn-primary !bg-white !text-bc-navy hover:!bg-gray-100">
              Recharge now
            </Link>
            <Link
              to="/support"
              className="btn-secondary !border-white/25 !text-white/90 hover:!bg-white/10 flex items-center gap-2"
            >
              <MessageCircle size={16} /> Talk to Suhaas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
