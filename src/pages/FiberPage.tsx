import { useState } from 'react';
import { Check, Wifi, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fiberPlans } from '../data/plans';

export function FiberPage() {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const checkAvailability = () => {
    if (!pincode.trim()) return;
    // Mocked: pincodes starting with 4 (Maharashtra) or 1 (Delhi) are available
    const p = pincode.trim();
    if (p.startsWith('4') || p.startsWith('1') || p.startsWith('5')) {
      setResult('Great news! BharatConnect Fiber is available in your area. Choose a plan below to get started.');
    } else {
      setResult('BharatConnect Fiber is expanding to your area soon. Leave your details and we\'ll notify you when service is available.');
    }
  };

  return (
    <div>
      {/* ═══ Hero ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-14 md:py-20 text-center"
        style={{
          background: 'linear-gradient(135deg, #0B2B5B 0%, #0F4C75 50%, #0F8B8D 100%)',
        }}
      >
        <div className="container-site">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wifi size={32} className="text-white" />
          </div>
          <h1
            className="text-3xl md:text-5xl font-extrabold text-white"
            style={{ fontFamily: "'Plus Jakarta Sans'" }}
          >
            BharatConnect Fiber
          </h1>
          <p className="mt-3 text-base md:text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Blazing-fast home broadband. From 100 Mbps to 1 Gbps — with free router and installation.
          </p>
        </div>
      </section>

      {/* ═══ Availability Check ═════════════════════════════════════════════ */}
      <section className="bg-white border-b" style={{ borderColor: 'rgba(11,43,91,0.06)' }}>
        <div className="container-site py-8">
          <div className="max-w-lg mx-auto">
            <h2 className="text-lg font-bold text-center mb-4" style={{ color: 'var(--bc-navy)' }}>
              Check availability in your area
            </h2>
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
                  placeholder="Enter your pincode"
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value);
                    setResult(null);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && checkAvailability()}
                  aria-label="Enter pincode for fiber availability check"
                  maxLength={6}
                />
              </div>
              <button onClick={checkAvailability} className="btn-primary flex-shrink-0">
                Check
              </button>
            </div>
            {result && (
              <div
                className="mt-4 p-4 rounded-xl text-sm animate-fade-in"
                style={{
                  background: 'rgba(15,139,141,0.06)',
                  border: '1px solid rgba(15,139,141,0.15)',
                  color: 'var(--bc-ink)',
                }}
              >
                {result}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ Fiber Plans ═══════════════════════════════════════════════════ */}
      <section className="container-site py-14 md:py-20">
        <h2
          className="text-2xl md:text-3xl font-extrabold text-center mb-10"
          style={{ color: 'var(--bc-navy)', fontFamily: "'Plus Jakarta Sans'" }}
        >
          Choose your speed
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {fiberPlans.map((plan) => (
            <div key={plan.code} className={`plan-card flex flex-col ${plan.speedMbps === 300 ? 'featured' : ''}`}>
              {plan.speedMbps === 300 && (
                <div className="mb-3">
                  <span className="badge-popular">Most popular</span>
                </div>
              )}
              <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--bc-navy)' }}>
                {plan.speed}
              </h3>
              <p className="text-xs mb-3 font-mono" style={{ color: 'var(--bc-teal)' }}>
                {plan.code}
              </p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-extrabold" style={{ color: 'var(--bc-navy)' }}>
                  ₹{plan.price}
                </span>
                <span className="text-sm" style={{ color: 'var(--bc-ink)', opacity: 0.5 }}>
                  /month
                </span>
              </div>
              <div className="text-sm mb-3 font-medium" style={{ color: 'var(--bc-ink)', opacity: 0.7 }}>
                {plan.data}
              </div>
              <div className="space-y-2 flex-1">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--bc-ink)', opacity: 0.7 }}>
                    <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--bc-teal)' }} />
                    {f}
                  </div>
                ))}
              </div>
              <Link
                to="/recharge"
                className="btn-primary w-full mt-5 text-sm"
              >
                Get started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Features ═════════════════════════════════════════════════════ */}
      <section className="section-mist py-14 md:py-16">
        <div className="container-site">
          <h2
            className="text-xl md:text-2xl font-extrabold text-center mb-8"
            style={{ color: 'var(--bc-navy)', fontFamily: "'Plus Jakarta Sans'" }}
          >
            Why BharatConnect Fiber?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Free installation', desc: 'Professional installation at no cost. Our engineers set up everything — you just plug in and go.' },
              { title: 'Wi-Fi router included', desc: 'Every plan comes with a high-quality Wi-Fi router. Upgrade plans get Wi-Fi 6 and 6E mesh routers.' },
              { title: 'No lock-in contract', desc: 'Month-to-month billing. Upgrade, downgrade, or cancel anytime — no penalties, no surprises.' },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 text-center"
                style={{ border: '1px solid rgba(11,43,91,0.06)' }}
              >
                <h3 className="font-bold mb-2" style={{ color: 'var(--bc-navy)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
