import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, HelpCircle } from 'lucide-react';
import { useSuhaas } from '../components/SuhaasWidget/SuhaasContext';
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

function getBadgeClass(tag?: string) {
  if (tag === 'Most popular') return 'badge-popular';
  if (tag === 'Best value') return 'badge-value';
  return '';
}

function PrepaidCard({ plan }: { plan: PrepaidPlan }) {
  const featured = plan.tag === 'Most popular' || plan.tag === 'Best value';
  return (
    <div className={`plan-card flex flex-col ${featured ? 'featured' : ''}`}>
      {plan.tag && (
        <div className="mb-3">
          <span className={getBadgeClass(plan.tag)}>{plan.tag}</span>
        </div>
      )}
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-3xl font-extrabold" style={{ color: 'var(--bc-navy)' }}>
          ₹{plan.price}
        </span>
        <span className="text-sm" style={{ color: 'var(--bc-ink)', opacity: 0.5 }}>
          / {plan.validity}
        </span>
      </div>
      <p className="text-xs mb-4 font-mono" style={{ color: 'var(--bc-teal)' }}>
        {plan.code}
      </p>
      <div className="space-y-2 flex-1">
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--bc-ink)', opacity: 0.7 }}>
          <Check size={14} style={{ color: 'var(--bc-teal)' }} />
          {plan.data}
        </div>
        {plan.voice !== '—' && (
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--bc-ink)', opacity: 0.7 }}>
            <Check size={14} style={{ color: 'var(--bc-teal)' }} />
            {plan.voice} calls
          </div>
        )}
        {plan.sms !== '—' && (
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--bc-ink)', opacity: 0.7 }}>
            <Check size={14} style={{ color: 'var(--bc-teal)' }} />
            {plan.sms}
          </div>
        )}
      </div>
      <Link
        to={`/recharge?plan=${plan.code}`}
        className="btn-primary w-full mt-5 text-sm"
      >
        Recharge
      </Link>
    </div>
  );
}

function PostpaidCard({ plan }: { plan: PostpaidPlan }) {
  return (
    <div className="plan-card flex flex-col">
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-3xl font-extrabold" style={{ color: 'var(--bc-navy)' }}>
          ₹{plan.rental}
        </span>
        <span className="text-sm" style={{ color: 'var(--bc-ink)', opacity: 0.5 }}>
          /month
        </span>
      </div>
      <p className="text-xs mb-4 font-mono" style={{ color: 'var(--bc-teal)' }}>
        {plan.code}
      </p>
      <div className="space-y-2 flex-1">
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--bc-ink)', opacity: 0.7 }}>
          <Check size={14} style={{ color: 'var(--bc-teal)' }} />
          {plan.data}
        </div>
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--bc-ink)', opacity: 0.7 }}>
          <Check size={14} style={{ color: 'var(--bc-teal)' }} />
          {plan.voice} calls
        </div>
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--bc-ink)', opacity: 0.7 }}>
          <Check size={14} style={{ color: 'var(--bc-teal)' }} />
          {plan.sms}
        </div>
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--bc-ink)', opacity: 0.7 }}>
          <Check size={14} style={{ color: 'var(--bc-teal)' }} />
          OTT: {plan.ott}
        </div>
      </div>
      <Link
        to={`/recharge?plan=${plan.code}`}
        className="btn-primary w-full mt-5 text-sm"
      >
        Choose plan
      </Link>
    </div>
  );
}

function AddonCard({ addon }: { addon: DataAddon }) {
  return (
    <div className="plan-card flex flex-col">
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-2xl font-extrabold" style={{ color: 'var(--bc-navy)' }}>
          ₹{addon.price}
        </span>
      </div>
      <p className="text-xs mb-3 font-mono" style={{ color: 'var(--bc-teal)' }}>
        {addon.code}
      </p>
      <div className="space-y-2 flex-1">
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--bc-ink)', opacity: 0.7 }}>
          <Check size={14} style={{ color: 'var(--bc-teal)' }} />
          {addon.data}
        </div>
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--bc-ink)', opacity: 0.7 }}>
          <Check size={14} style={{ color: 'var(--bc-teal)' }} />
          Valid: {addon.validity}
        </div>
      </div>
      <Link
        to={`/recharge?plan=${addon.code}`}
        className="btn-primary w-full mt-5 text-sm"
      >
        Buy add-on
      </Link>
    </div>
  );
}

export function PlansPage() {
  const [activeTab, setActiveTab] = useState<Tab>('prepaid');
  const { openSuhaas } = useSuhaas();

  return (
    <div>
      {/* ═══ Header ═════════════════════════════════════════════════════════ */}
      <section
        className="py-14 md:py-20 text-center"
        style={{
          background: 'linear-gradient(135deg, #0B2B5B 0%, #0F4C75 50%, #0F8B8D 100%)',
        }}
      >
        <div className="container-site">
          <h1
            className="text-3xl md:text-5xl font-extrabold text-white"
            style={{ fontFamily: "'Plus Jakarta Sans'" }}
          >
            Choose your plan
          </h1>
          <p className="mt-3 text-base md:text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Transparent pricing. No hidden charges. Plans for every budget.
          </p>
          <button
            onClick={openSuhaas}
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-colors"
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
            aria-label="Need help choosing? Talk to Suhaas"
          >
            <HelpCircle size={16} />
            Need help choosing? Talk to Suhaas
          </button>
        </div>
      </section>

      {/* ═══ Tabs ═══════════════════════════════════════════════════════════ */}
      <section className="container-site py-10 md:py-14">
        <div className="flex justify-center mb-8">
          <div
            className="inline-flex rounded-xl p-1"
            style={{ background: 'rgba(11,43,91,0.04)', border: '1px solid rgba(11,43,91,0.08)' }}
            role="tablist"
            aria-label="Plan categories"
          >
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab.key ? 'text-white shadow-md' : ''
                }`}
                style={
                  activeTab === tab.key
                    ? { background: 'var(--bc-teal)', color: 'white' }
                    : { color: 'var(--bc-ink)' }
                }
                role="tab"
                aria-selected={activeTab === tab.key}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Prepaid ── */}
        {activeTab === 'prepaid' && (
          <div>
            <h2 className="text-lg font-bold mb-5" style={{ color: 'var(--bc-navy)' }}>
              Daily Data Packs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-10">
              {prepaidDailyPlans.map((p) => (
                <PrepaidCard key={p.code} plan={p} />
              ))}
            </div>
            <h2 className="text-lg font-bold mb-5" style={{ color: 'var(--bc-navy)' }}>
              Data-Only & Special Packs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {prepaidSpecialPlans.map((p) => (
                <PrepaidCard key={p.code} plan={p} />
              ))}
            </div>
          </div>
        )}

        {/* ── Postpaid ── */}
        {activeTab === 'postpaid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {postpaidPlans.map((p) => (
              <PostpaidCard key={p.code} plan={p} />
            ))}
          </div>
        )}

        {/* ── Add-ons ── */}
        {activeTab === 'addons' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {dataAddons.map((a) => (
              <AddonCard key={a.code} addon={a} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
