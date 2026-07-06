import { Link } from 'react-router-dom';
import { Users, MapPin, Award, Shield, Languages, Heart, Target, Globe, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { SpotlightCard } from '../components/SpotlightCard';

const STATS = [
  { value: '2009', label: 'Founded' },
  { value: '82M+', label: 'Subscribers' },
  { value: '180+', label: '5G Cities' },
  { value: '7', label: 'Support Languages' },
];

const VALUES = [
  {
    icon: Languages,
    title: 'Language-first',
    desc: 'Every Indian deserves support in their mother tongue. We offer service in Hindi, Marathi, Tamil, Telugu, Kannada, Bengali, and English — and we\'re adding more.',
  },
  {
    icon: Shield,
    title: 'Transparent',
    desc: 'No hidden charges, no surprise bills. Every fee is explained upfront. If something goes wrong, we fix it — and you can track every complaint by docket number.',
  },
  {
    icon: Heart,
    title: 'India-first',
    desc: 'Built for India\'s diverse needs. From metro cities to district towns, our network is designed to keep every Indian connected reliably.',
  },
  {
    icon: Target,
    title: 'Always improving',
    desc: 'Our AI assistant Suhaas gets smarter over time. Our network expands every month. We never stop making things better for our subscribers.',
  },
];

const revealVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export function AboutPage() {
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
            <span>Connecting India Seamlessly</span>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold"
            style={{ fontFamily: "'Plus Jakarta Sans'" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About BharatConnect
          </motion.h1>
          <motion.p 
            className="mt-4 text-base md:text-lg max-w-2xl mx-auto text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            India's trusted telecom operator — connecting millions with reliable networks and support in the languages they speak.
          </motion.p>
        </div>
      </section>

      {/* ═══ Stats ══════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-150">
        <div className="container-site py-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {STATS.map((s, i) => (
              <motion.div key={s.label} variants={revealVariants}>
                <p className="text-3xl md:text-4xl font-extrabold text-teal-650">
                  {s.value}
                </p>
                <p className="text-xs font-bold mt-1 text-slate-400 uppercase tracking-widest">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ Our Story ═════════════════════════════════════════════════════ */}
      <section className="container-site py-20 md:py-28">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <h2
            className="text-2xl md:text-3xl font-extrabold mb-8 text-slate-850 tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans'" }}
          >
            Our Story
          </h2>
          <div className="space-y-5 text-sm md:text-base leading-relaxed text-gray-500">
            <p>
              BharatConnect was founded in <strong>2009</strong> in <strong>Pune, Maharashtra</strong>, with a simple
              belief: every Indian deserves affordable, reliable connectivity — and support in the language they
              think in.
            </p>
            <p>
              What started as a regional operator serving western India has grown into a nationwide telecom
              with <strong>approximately 82 million subscribers</strong> across every state and union territory.
              We were early to invest in 4G infrastructure even in tier-2 and tier-3 cities, and today we offer
              <strong> 5G coverage in over 180 cities</strong> — with more launching every month.
            </p>
            <p>
              Under the leadership of CEO <strong>Ananya Deshpande</strong>, BharatConnect has stayed true to
              its founding principles: transparent billing with no hidden charges, customer support available
              24×7 in <strong>seven languages</strong> (Hindi, Marathi, Tamil, Telugu, Kannada, Bengali, and English),
              and a relentless focus on network quality.
            </p>
            <p>
              We are regulated by the <strong>Department of Telecommunications (DoT)</strong> and the
              <strong> Telecom Regulatory Authority of India (TRAI)</strong>, and we take our compliance
              obligations seriously — from tariff transparency to grievance redressal timelines.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ═══ Leadership ════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 border-y border-gray-150">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              className="text-2xl md:text-3xl font-extrabold mb-12 text-center text-slate-800"
              style={{ fontFamily: "'Plus Jakarta Sans'" }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Leadership
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
            >
              {[
                { name: 'Ananya Deshpande', role: 'CEO & Managing Director', icon: Users },
                { name: 'Rahul Joshi', role: 'VP, CX & Nodal Officer', icon: Award },
                { name: 'Priya Iyer', role: 'Chief Regulatory Officer', icon: Globe },
              ].map((person) => (
                <motion.div key={person.name} variants={revealVariants}>
                  <SpotlightCard className="bg-white border border-slate-100 p-6 flex flex-col items-center text-center h-full">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-slate-100 bg-teal-500/10 text-teal-600"
                    >
                      <person.icon size={20} />
                    </div>
                    <h3 className="font-bold text-sm text-slate-800">
                      {person.name}
                    </h3>
                    <p className="text-xs mt-1.5 text-gray-400">
                      {person.role}
                    </p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Our Values ════════════════════════════════════════════════════ */}
      <section className="container-site py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-2xl md:text-3xl font-extrabold mb-12 text-center text-slate-850"
            style={{ fontFamily: "'Plus Jakarta Sans'" }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Values
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {VALUES.map((v) => (
              <motion.div key={v.title} variants={revealVariants}>
                <SpotlightCard className="bg-white rounded-2xl p-6 flex gap-4 border border-slate-100 h-full">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm border border-teal-500/10 bg-teal-500/10 text-teal-600"
                  >
                    <v.icon size={18} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-sm mb-2 text-slate-800">
                      {v.title}
                    </h3>
                    <p className="text-xs md:text-sm leading-relaxed text-gray-500">
                      {v.desc}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ HQ Info ═══════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 text-center border-t border-gray-150">
        <div className="container-site">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="flex flex-col items-center"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <MapPin size={20} className="text-teal-600" />
              <h2 className="text-lg font-bold text-slate-800">
                Headquarters
              </h2>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              BharatConnect Tower, Hinjewadi IT Park, Pune 411057, Maharashtra, India
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block mt-6">
              <Link to="/support" className="btn-primary">
                Contact us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
