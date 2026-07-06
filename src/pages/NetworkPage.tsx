import { Signal, Smartphone, MapPin, AlertTriangle, Check, Zap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SpotlightCard } from '../components/SpotlightCard';

const CITIES_5G = [
  'Mumbai', 'Delhi NCR', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune',
  'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Kochi',
  'Vizag', 'Indore', 'Nagpur', 'Coimbatore', 'Mysuru', 'Surat',
];

const revealVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

export function NetworkPage() {
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
            <span>Next-Gen Nationwide Infrastructure</span>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold"
            style={{ fontFamily: "'Plus Jakarta Sans'" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            India's fastest growing network
          </motion.h1>
          <motion.p 
            className="mt-4 text-base md:text-lg max-w-2xl mx-auto text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            4G across every state. 5G live in 180+ cities. Building the future — today.
          </motion.p>
        </div>
      </section>

      {/* ═══ Coverage stats ═════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-site py-10">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={revealVariants} className="flex flex-col items-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600">
                  <Signal size={20} />
                </div>
                <span className="text-3xl font-extrabold text-slate-800">4G</span>
              </div>
              <p className="text-sm text-gray-500 max-w-xs">
                Nationwide coverage across all states and union territories
              </p>
            </motion.div>

            <motion.div variants={revealVariants} className="flex flex-col items-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 animate-pulse">
                  <Zap size={20} />
                </div>
                <span className="text-3xl font-extrabold text-slate-800">5G</span>
              </div>
              <p className="text-sm text-gray-500 max-w-xs">
                Live in 180+ cities — expanding every month
              </p>
            </motion.div>

            <motion.div variants={revealVariants} className="flex flex-col items-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600">
                  <MapPin size={20} />
                </div>
                <span className="text-3xl font-extrabold text-slate-800">500K+</span>
              </div>
              <p className="text-sm text-gray-500 max-w-xs">
                Cell towers keeping India connected
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 5G explained ══════════════════════════════════════════════════ */}
      <section className="container-site py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-2xl md:text-3xl font-extrabold mb-10 text-slate-800 tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans'" }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            5G on BharatConnect — what you need to know
          </motion.h2>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SpotlightCard className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm">
                <h3 className="font-bold text-lg text-slate-800 mb-5">
                  How to get 5G (it's simple)
                </h3>
                <div className="space-y-4 text-left">
                  {[
                    { icon: Smartphone, text: 'You need a 5G-capable phone (iPhone 12 or later, most Android phones from 2022+)' },
                    { icon: Signal, text: 'You need a BharatConnect plan — no separate 5G recharge required' },
                    { icon: MapPin, text: 'You need to be in a 5G-enabled area' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-teal-500/10 border border-teal-500/20 text-teal-600"
                      >
                        <item.icon size={16} />
                      </div>
                      <p className="text-sm leading-relaxed text-gray-500 pt-1.5 flex-1">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SpotlightCard className="bg-white rounded-2xl p-6 border border-gray-150 shadow-sm">
                <h3 className="font-bold text-lg text-slate-800 mb-3">
                  No extra charge for 5G
                </h3>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center mt-0.5 flex-shrink-0 text-teal-600">
                    <Check size={14} strokeWidth={2.5} />
                  </div>
                  <p className="text-sm leading-relaxed text-gray-500 flex-1">
                    5G is included with all BharatConnect plans at no additional cost. There is no separate "5G recharge" — if your phone supports 5G and you're in a 5G area, you'll automatically connect to the 5G network. Your existing data quota applies as usual.
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div 
              className="rounded-2xl p-6 border border-amber-500/25 bg-amber-500/5 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-600 flex-shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-amber-850 mb-1">
                    A note about 6G
                  </h3>
                  <p className="text-xs md:text-sm leading-relaxed text-gray-500">
                    6G is a future technology that is currently in the research and development phase worldwide. It is not yet available anywhere in the world, including India. Be wary of any claims suggesting 6G service is available — it is expected to begin deployment no earlier than 2030.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ 5G Cities ═════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 md:py-24 border-y border-gray-150">
        <div className="container-site">
          <motion.h2
            className="text-2xl md:text-3xl font-extrabold text-center mb-12 text-slate-800"
            style={{ fontFamily: "'Plus Jakarta Sans'" }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            5G is live in these cities
          </motion.h2>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-3.5 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {CITIES_5G.map((city) => (
              <motion.span
                key={city}
                variants={revealVariants}
                className="text-sm px-4 py-2.5 rounded-full font-bold shadow-sm border border-slate-100 flex items-center gap-1.5 bg-white text-slate-700"
                whileHover={{ scale: 1.06, y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <span>📍</span> {city}
              </motion.span>
            ))}
            <motion.span
              variants={revealVariants}
              className="text-sm px-5 py-2.5 rounded-full font-bold shadow-sm border border-teal-500/20 bg-teal-50 text-teal-700 flex items-center"
              whileHover={{ scale: 1.06, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              + 160 more cities
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══════════════════════════════════════════════════════════ */}
      <section className="container-site py-20 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <h2
            className="text-2xl md:text-3xl font-extrabold mb-4 text-slate-800"
          >
            Experience 5G today
          </h2>
          <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
            Choose a plan and enjoy next-gen speeds at no extra cost.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
            <Link to="/plans" className="btn-primary shadow-lg shadow-teal-500/15">
              View plans
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
