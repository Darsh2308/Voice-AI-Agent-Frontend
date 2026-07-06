import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, HelpCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSuhaas } from '../components/SuhaasWidget/SuhaasContext';
import { SpotlightCard } from '../components/SpotlightCard';
import {
  prepaidDailyPlans,
  prepaidSpecialPlans,
  postpaidPlans,
  dataAddons,
  type PrepaidPlan,
  type PostpaidPlan,
  type DataAddon,
} from '../data/plans';

type Tab = 'prepaid' | 'postpaid' | 'addons';

const TABS: { key: Tab; label: string }[] = [
  { key: 'prepaid', label: 'Prepaid' },
  { key: 'postpaid', label: 'Postpaid' },
  { key: 'addons', label: 'Data Add-Ons' },
];

const pageReveal = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const cardContainerReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

function getBadgeClass(tag?: string) {
  if (tag === 'Most popular') return 'badge-popular';
  if (tag === 'Best value') return 'badge-value';
  return 'bg-slate-100 text-slate-700 text-[10px] font-bold py-1 px-2.5 rounded-full uppercase tracking-wider';
}

function PrepaidCard({ plan }: { plan: PrepaidPlan }) {
  const featured = plan.tag === 'Most popular' || plan.tag === 'Best value';
  return (
    <motion.div variants={pageReveal}>
      <SpotlightCard className={`flex flex-col p-6 h-full border ${featured ? 'border-teal-500/30 shadow-md shadow-teal-500/5' : 'border-gray-150'}`}>
        {plan.tag && (
          <div className="mb-4">
            <span className={getBadgeClass(plan.tag)}>{plan.tag}</span>
          </div>
        )}
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-3xl font-extrabold text-slate-800">
            ₹{plan.price}
          </span>
          <span className="text-sm text-slate-400">
            / {plan.validity}
          </span>
        </div>
        <p className="text-xs mb-5 font-mono text-[#0F8B8D] font-bold">
          {plan.code}
        </p>
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2.5 text-sm text-slate-600">
            <Check size={16} className="text-teal-500" />
            {plan.data}
          </div>
          {plan.voice !== '—' && (
            <div className="flex items-center gap-2.5 text-sm text-slate-600">
              <Check size={16} className="text-teal-500" />
              {plan.voice} calls
            </div>
          )}
          {plan.sms !== '—' && (
            <div className="flex items-center gap-2.5 text-sm text-slate-600">
              <Check size={16} className="text-teal-500" />
              {plan.sms}
            </div>
          )}
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to={`/recharge?plan=${plan.code}`}
            className="btn-primary w-full mt-6 text-sm shadow-sm"
          >
            Recharge
          </Link>
        </motion.div>
      </SpotlightCard>
    </motion.div>
  );
}

function PostpaidCard({ plan }: { plan: PostpaidPlan }) {
  return (
    <motion.div variants={pageReveal}>
      <SpotlightCard className="flex flex-col p-6 h-full border border-gray-150">
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-3xl font-extrabold text-slate-800">
            ₹{plan.rental}
          </span>
          <span className="text-sm text-slate-400">
            /month
          </span>
        </div>
        <p className="text-xs mb-5 font-mono text-[#0F8B8D] font-bold">
          {plan.code}
        </p>
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2.5 text-sm text-slate-600">
            <Check size={16} className="text-teal-500" />
            {plan.data}
          </div>
          <div className="flex items-center gap-2.5 text-sm text-slate-600">
            <Check size={16} className="text-teal-500" />
            {plan.voice} calls
          </div>
          <div className="flex items-center gap-2.5 text-sm text-slate-600">
            <Check size={16} className="text-teal-500" />
            {plan.sms}
          </div>
          <div className="flex items-center gap-2.5 text-sm text-slate-600">
            <Check size={16} className="text-teal-500" />
            OTT: {plan.ott}
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to={`/recharge?plan=${plan.code}`}
            className="btn-primary w-full mt-6 text-sm shadow-sm"
          >
            Choose plan
          </Link>
        </motion.div>
      </SpotlightCard>
    </motion.div>
  );
}

function AddonCard({ addon }: { addon: DataAddon }) {
  return (
    <motion.div variants={pageReveal}>
      <SpotlightCard className="flex flex-col p-6 h-full border border-gray-150">
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-2xl font-extrabold text-slate-800">
            ₹{addon.price}
          </span>
        </div>
        <p className="text-xs mb-4 font-mono text-[#0F8B8D] font-bold">
          {addon.code}
        </p>
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2.5 text-sm text-slate-600">
            <Check size={16} className="text-teal-500" />
            {addon.data}
          </div>
          <div className="flex items-center gap-2.5 text-sm text-slate-600">
            <Check size={16} className="text-teal-500" />
            Valid: {addon.validity}
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to={`/recharge?plan=${addon.code}`}
            className="btn-primary w-full mt-6 text-sm shadow-sm"
          >
            Buy add-on
          </Link>
        </motion.div>
      </SpotlightCard>
    </motion.div>
  );
}

export function PlansPage() {
  const [activeTab, setActiveTab] = useState<Tab>('prepaid');
  const { openSuhaas } = useSuhaas();

  return (
    <div>
      {/* ═══ Header ═════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-20 text-center bg-mesh-dynamic bg-noise"
      >
        <div className="container-site relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex px-3 py-1 rounded-full text-xs font-bold text-teal-300 border border-teal-500/25 bg-teal-950/20 backdrop-blur-md items-center gap-1.5"
          >
            <Sparkles size={12} className="animate-pulse" />
            <span>Best Rates & Complete Transparency</span>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans'" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Choose your plan
          </motion.h1>
          <motion.p 
            className="mt-4 text-base md:text-lg max-w-xl mx-auto text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Transparent pricing. No hidden charges. Plans for every budget.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={openSuhaas}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-full transition-all duration-300 bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:scale-105 active:scale-95"
              aria-label="Need help choosing? Talk to Suhaas"
            >
              <HelpCircle size={16} className="text-teal-300" />
              Need help choosing? Talk to Suhaas
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══ Tabs ═══════════════════════════════════════════════════════════ */}
      <section className="container-site py-12 md:py-16">
        <div className="flex justify-center mb-12">
          <div
            className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200"
            role="tablist"
            aria-label="Plan categories"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-2.5 rounded-lg text-sm font-bold relative transition-colors ${
                    isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  role="tab"
                  aria-selected={isActive}
                >
                  <span className="relative z-10">{tab.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activePlanTab"
                      className="absolute inset-0 bg-[#0F8B8D] rounded-lg shadow-md"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Tab Content Container ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={cardContainerReveal}
          >
            {/* ── Prepaid ── */}
            {activeTab === 'prepaid' && (
              <div>
                <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-teal-500 rounded-full" />
                  Daily Data Packs
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-14">
                  {prepaidDailyPlans.map((p) => (
                    <PrepaidCard key={p.code} plan={p} />
                  ))}
                </div>
                
                <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-teal-500 rounded-full" />
                  Data-Only & Special Packs
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {prepaidSpecialPlans.map((p) => (
                    <PrepaidCard key={p.code} plan={p} />
                  ))}
                </div>
              </div>
            )}

            {/* ── Postpaid ── */}
            {activeTab === 'postpaid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {postpaidPlans.map((p) => (
                  <PostpaidCard key={p.code} plan={p} />
                ))}
              </div>
            )}

            {/* ── Add-ons ── */}
            {activeTab === 'addons' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {dataAddons.map((a) => (
                  <AddonCard key={a.code} addon={a} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
