import { useState } from 'react';
import { Check, Wifi, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fiberPlans } from '../data/plans';
import { SpotlightCard } from '../components/SpotlightCard';

const revealVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export function FiberPage() {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const checkAvailability = () => {
    if (!pincode.trim()) return;
    const p = pincode.trim();
    if (p.startsWith('4') || p.startsWith('1') || p.startsWith('5')) {
      setResult('Great news! BharatConnect Fiber is available in your area. Choose a plan below to get started.');
    } else {
      setResult('BharatConnect Fiber is expanding to your area soon. Leave your details and we\'ll notify you when service is available.');
    }
  };

  return (
    <div className="overflow-hidden">
      {/* ═══ Hero ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-24 text-center bg-mesh-dynamic bg-noise text-white relative"
      >
        <div className="container-site relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 inline-flex px-3 py-1 rounded-full text-xs font-bold text-teal-300 border border-teal-500/25 bg-teal-950/20 backdrop-blur-md items-center gap-1.5"
          >
            <Sparkles size={12} className="animate-pulse" />
            <span>High-Speed Broadband Internet</span>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold"
            style={{ fontFamily: "'Plus Jakarta Sans'" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            BharatConnect Fiber
          </motion.h1>
          <motion.p 
            className="mt-4 text-base md:text-lg max-w-2xl mx-auto text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Blazing-fast home broadband. From 100 Mbps to 1 Gbps — with free router and installation.
          </motion.p>
        </div>
      </section>

      {/* ═══ Availability Check ═════════════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-150">
        <div className="container-site py-10">
          <motion.div 
            className="max-w-lg mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-lg font-bold text-center mb-5 text-slate-800">
              Check availability in your area
            </h2>
            <div className="flex gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-200">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-450"
                  style={{ color: 'rgba(11,43,91,0.4)' }}
                />
                <input
                  type="text"
                  className="coverage-input !pl-11 !border-none !shadow-none !h-full"
                  placeholder="Enter your pincode"
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value.replace(/\D/g, '').slice(0, 6));
                    setResult(null);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && checkAvailability()}
                  aria-label="Enter pincode for fiber availability check"
                  maxLength={6}
                />
              </div>
              <button onClick={checkAvailability} className="btn-primary flex-shrink-0 !py-3 !px-6">
                Check
              </button>
            </div>
            {result && (
              <motion.div
                className="mt-5 p-4 rounded-2xl text-sm border border-teal-500/10 shadow-2xs text-left"
                style={{
                  background: 'rgba(15,139,141,0.03)',
                  color: 'var(--bc-ink)',
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-teal-500/10 flex items-center justify-center mt-0.5 text-teal-600">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-slate-650 leading-relaxed flex-1">{result}</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══ Fiber Plans ═══════════════════════════════════════════════════ */}
      <section className="container-site py-20 md:py-28">
        <motion.h2
          className="text-2xl md:text-3xl font-extrabold text-center mb-12 text-slate-800"
          style={{ fontFamily: "'Plus Jakarta Sans'" }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Choose your speed
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {fiberPlans.map((plan) => {
            const isFeatured = plan.speedMbps === 300;
            return (
              <motion.div key={plan.code} variants={revealVariants}>
                <SpotlightCard className={`flex flex-col p-6 h-full border ${isFeatured ? 'border-teal-500/35 shadow-md shadow-teal-500/5' : 'border-gray-150'}`}>
                  {isFeatured && (
                    <div className="mb-4">
                      <span className="badge-popular">Most popular</span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-1 text-slate-800">
                    {plan.speed}
                  </h3>
                  <p className="text-xs mb-4 font-mono text-[#0F8B8D] font-bold">
                    {plan.code}
                  </p>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-extrabold text-slate-800">
                      ₹{plan.price}
                    </span>
                    <span className="text-sm text-slate-450">
                      /month
                    </span>
                  </div>
                  <div className="text-sm font-semibold mb-4 text-teal-650">
                    {plan.data}
                  </div>
                  <div className="space-y-3 flex-1 mb-6 text-left">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5 text-sm text-slate-500">
                        <Check size={16} className="text-teal-500 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">{f}</span>
                      </div>
                    ))}
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/recharge"
                      className="btn-primary w-full text-sm shadow-sm"
                    >
                      Get started
                    </Link>
                  </motion.div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ═══ Features ═════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 md:py-24 border-y border-gray-150">
        <div className="container-site">
          <motion.h2
            className="text-2xl md:text-3xl font-extrabold text-center mb-12 text-slate-800"
            style={{ fontFamily: "'Plus Jakarta Sans'" }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why BharatConnect Fiber?
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {[
              { title: 'Free installation', desc: 'Professional installation at no cost. Our engineers set up everything — you just plug in and go.' },
              { title: 'Wi-Fi router included', desc: 'Every plan comes with a high-quality Wi-Fi router. Upgrade plans get Wi-Fi 6 and 6E mesh routers.' },
              { title: 'No lock-in contract', desc: 'Month-to-month billing. Upgrade, downgrade, or cancel anytime — no penalties, no surprises.' },
            ].map((item) => (
              <motion.div key={item.title} variants={revealVariants}>
                <SpotlightCard className="bg-white border border-slate-100 p-6 flex flex-col items-center text-center h-full">
                  <h3 className="font-bold text-base mb-3 text-slate-800">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {item.desc}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
