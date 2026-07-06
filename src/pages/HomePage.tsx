import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
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
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { SpotlightCard } from '../components/SpotlightCard';
import { IPhoneMockup } from '../components/iPhoneMockup';
import { useSuhaas } from '../components/SuhaasWidget/SuhaasContext';

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

const scrollRevealVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function HomePage() {
  const [coverageQuery, setCoverageQuery] = useState('');
  const [coverageResult, setCoverageResult] = useState<string | null>(null);
  
  const { connect, isConnected } = useSuhaas();

  const checkCoverage = () => {
    const q = coverageQuery.trim().toLowerCase();
    if (!q) return;
    const result = MOCK_COVERAGE[q];
    setCoverageResult(
      result || '4G Available — Reliable coverage in your area. 5G rollout in progress.'
    );
  };

  return (
    <div className="overflow-hidden">
      {/* ═══ Hero ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-mesh-dynamic bg-noise flex items-center"
        style={{
          minHeight: '560px',
        }}
      >
        <div className="container-site relative z-10 py-24 md:py-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-5 px-3 py-1 rounded-full text-xs font-bold text-teal-300 border border-teal-500/25 bg-teal-950/20 backdrop-blur-md flex items-center gap-1.5"
          >
            <Sparkles size={12} className="animate-pulse" />
            <span>Welcome to India's Next-Gen Telco</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-4xl tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            India's network,{' '}
            <span className="bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent">in your language.</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mt-6 max-w-2xl leading-relaxed text-white/80"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            From bustling metros to every district town — reliable 4G/5G, transparent plans,
            and customer care that speaks your mother tongue.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/recharge" className="btn-primary !py-4 !px-8 text-base shadow-xl shadow-teal-500/25">
              Recharge now
            </Link>
            <Link
              to="/plans"
              className="btn-secondary !py-4 !px-8 text-base !bg-white/10 !text-white !border-white/20 hover:!bg-white/20 transition-all duration-300"
            >
              Explore plans
            </Link>
          </motion.div>
        </div>

        {/* Floating gradient decorative orbs */}
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-35"
          style={{ background: 'radial-gradient(circle, rgba(20, 184, 166, 0.5), transparent 70%)', filter: 'blur(100px)' }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(124, 92, 255, 0.4), transparent 70%)', filter: 'blur(90px)' }}
          animate={{
            x: [0, -25, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </section>

      {/* ═══ Trust Strip ════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b" style={{ borderColor: 'rgba(11,43,91,0.06)' }}>
        <div className="container-site py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {TRUST_STATS.map((s, i) => (
              <motion.div 
                key={s.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="text-3xl md:text-4xl font-extrabold" style={{ color: 'var(--bc-teal)' }}>
                  {s.value}
                </p>
                <p className="text-xs font-semibold mt-1 uppercase tracking-widest" style={{ color: 'var(--bc-ink)', opacity: 0.5 }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Feature Cards ══════════════════════════════════════════════════════ */}
      <section className="container-site py-20 md:py-28">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollRevealVariants}
        >
          <h2
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
            style={{ color: 'var(--bc-navy)', fontFamily: "'Plus Jakarta Sans'" }}
          >
            Everything you need, one network
          </h2>
          <p className="mt-4 text-base md:text-lg max-w-xl mx-auto text-gray-500">
            Mobile plans, home broadband, and smart add-ons — all under BharatConnect.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainerVariants}
        >
          {FEATURES.map((f) => (
            <motion.div key={f.title} variants={scrollRevealVariants}>
              <Link to={f.link}>
                <SpotlightCard className="h-full cursor-pointer flex flex-col p-6 border border-gray-100 bg-white">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm border"
                    style={{
                      background: 'linear-gradient(135deg, rgba(15,139,141,0.08), rgba(15,139,141,0.03))',
                      borderColor: 'rgba(15,139,141,0.15)',
                    }}
                  >
                    <f.icon size={22} style={{ color: 'var(--bc-teal)' }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2.5 text-slate-800">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6 text-slate-500 flex-1">
                    {f.desc}
                  </p>
                  <span
                    className="text-sm font-bold flex items-center gap-1 text-[#0F8B8D] hover:gap-2 transition-all"
                  >
                    {f.cta} <ChevronRight size={14} />
                  </span>
                </SpotlightCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══ Interactive Voice Bot Section ══════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 bg-slate-950 text-white overflow-hidden bg-noise">
        {/* Soft background light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 filter blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124, 92, 255, 0.45) 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 filter blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(20, 184, 166, 0.3) 0%, transparent 70%)' }} />

        <div className="container-site relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Info */}
          <motion.div 
            className="lg:col-span-6 text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainerVariants}
          >
            <motion.div 
              variants={scrollRevealVariants}
              className="inline-flex px-3 py-1 rounded-full text-xs font-bold text-teal-300 border border-teal-400/20 bg-teal-950/30 backdrop-blur-md items-center gap-1.5 mb-6"
            >
              <Sparkles size={12} className="animate-pulse text-teal-400" />
              <span>Voice AI Support</span>
            </motion.div>

            <motion.h2 
              variants={scrollRevealVariants}
              className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Meet Suhaas, your dedicated voice assistant.
            </motion.h2>

            <motion.p 
              variants={scrollRevealVariants}
              className="text-base md:text-lg mt-6 text-slate-350 text-gray-400 leading-relaxed"
            >
              Available 24x7 to support your recharges, plans, balance checks, and support ticket complaints. Simply speak naturally in Hindi, Marathi, Bengali, Tamil, Telugu, Kannada, or English.
            </motion.p>

            <motion.div 
              variants={scrollRevealVariants}
              className="mt-8 space-y-4"
            >
              {[
                'Instant voice recharges & balance updates',
                'Speak the language you think in (7 regional languages)',
                'Auto-detects billing disputes and files instant support dockets'
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-teal-400 text-xs font-extrabold">✓</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-300">{point}</span>
                </div>
              ))}
            </motion.div>

            <motion.div 
              variants={scrollRevealVariants}
              className="mt-10 flex flex-wrap gap-4 items-center"
            >
              <button 
                onClick={connect}
                className="btn-primary !py-4 !px-8 text-base shadow-xl shadow-teal-500/10 flex items-center gap-2"
              >
                <PhoneCall size={18} />
                {isConnected ? 'Call in Progress...' : 'Start AI Voice Call'}
              </button>
              <span className="text-xs text-gray-500 font-medium">Uses WebRTC / Microphones</span>
            </motion.div>
          </motion.div>

          {/* Right: Realistic iPhone mockup */}
          <motion.div 
            className="lg:col-span-6 flex justify-center relative py-8"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
          >
            {/* Ambient glows behind the mockup */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#14B8A6]/20 filter blur-3xl animate-screen-glow" />
            <IPhoneMockup />
          </motion.div>

        </div>
      </section>

      {/* ═══ Why BharatConnect ═══════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="container-site">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollRevealVariants}
          >
            <h2
              className="text-3xl md:text-4xl font-extrabold tracking-tight"
              style={{ color: 'var(--bc-navy)', fontFamily: "'Plus Jakarta Sans'" }}
            >
              Why BharatConnect?
            </h2>
            <p className="mt-4 text-base md:text-lg max-w-xl mx-auto text-gray-500">
              Built for India, with the values that matter to you.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainerVariants}
          >
            {WHY_US.map((item) => (
              <motion.div key={item.title} variants={scrollRevealVariants}>
                <SpotlightCard className="bg-white rounded-2xl p-6 flex gap-5 border border-slate-100">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm border border-teal-500/10"
                    style={{
                      background: 'linear-gradient(135deg, rgba(15,139,141,0.08), rgba(15,139,141,0.02))',
                    }}
                  >
                    <item.icon size={20} style={{ color: 'var(--bc-teal)' }} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-2 text-slate-800">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500">
                      {item.desc}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ Coverage Checker ═══════════════════════════════════════════════ */}
      <section className="container-site py-20 md:py-28">
        <motion.div 
          className="max-w-xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollRevealVariants}
        >
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight"
            style={{ color: 'var(--bc-navy)', fontFamily: "'Plus Jakarta Sans'" }}
          >
            Check coverage in your area
          </h2>
          <p className="text-base text-gray-500 mb-10">
            Enter your city name to check 4G/5G availability.
          </p>
          <div className="flex gap-3 bg-white p-2 rounded-2xl shadow-md border border-gray-100">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: 'rgba(11,43,91,0.4)' }}
              />
              <input
                type="text"
                className="coverage-input !pl-11 !border-none !shadow-none !h-full"
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
            <button onClick={checkCoverage} className="btn-primary flex-shrink-0 !py-3 !px-6">
              Check
            </button>
          </div>
          {coverageResult && (
            <motion.div
              className="mt-6 p-4 rounded-2xl text-left border border-teal-500/10 shadow-sm"
              style={{
                background: 'rgba(15,139,141,0.03)',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-3">
                <Signal size={20} style={{ color: 'var(--bc-teal)' }} className="flex-shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <p className="font-bold text-sm text-slate-800">
                    {coverageQuery.charAt(0).toUpperCase() + coverageQuery.slice(1)}
                  </p>
                  <p className="text-sm mt-0.5 text-slate-600 leading-relaxed">
                    {coverageResult}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* ═══ CTA banner ═════════════════════════════════════════════════════ */}
      <section
        className="py-20 text-center relative overflow-hidden bg-mesh-dynamic bg-noise"
      >
        <div className="container-site relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans'" }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to switch?
          </motion.h2>
          <motion.p 
            className="text-base md:text-lg mb-8 max-w-2xl mx-auto text-white/80"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Port your number to BharatConnect in 3–5 working days. Or recharge an existing plan right now.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/recharge" className="btn-primary !bg-white !text-[#0B2B5B] hover:!bg-gray-100 transition-all duration-300 shadow-xl shadow-black/10">
              Recharge now
            </Link>
            <Link
              to="/support"
              className="btn-secondary !bg-transparent !border-white/25 !text-white/90 hover:!bg-white/10 flex items-center justify-center gap-2 transition-all duration-300"
            >
              <MessageCircle size={16} /> Talk to Suhaas
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
