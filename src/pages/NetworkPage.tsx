import { Signal, Smartphone, MapPin, AlertTriangle, Check, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const CITIES_5G = [
  'Mumbai', 'Delhi NCR', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune',
  'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Kochi',
  'Vizag', 'Indore', 'Nagpur', 'Coimbatore', 'Mysuru', 'Surat',
];

export function NetworkPage() {
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
          <h1
            className="text-3xl md:text-5xl font-extrabold text-white"
            style={{ fontFamily: "'Plus Jakarta Sans'" }}
          >
            India's fastest growing network
          </h1>
          <p className="mt-3 text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            4G across every state. 5G live in 180+ cities. Building the future — today.
          </p>
        </div>
      </section>

      {/* ═══ Coverage stats ═════════════════════════════════════════════════ */}
      <section className="bg-white border-b" style={{ borderColor: 'rgba(11,43,91,0.06)' }}>
        <div className="container-site py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Signal size={24} style={{ color: 'var(--bc-teal)' }} />
                <span className="text-3xl font-extrabold" style={{ color: 'var(--bc-navy)' }}>4G</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>
                Nationwide coverage across all states and union territories
              </p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap size={24} style={{ color: 'var(--bc-teal)' }} />
                <span className="text-3xl font-extrabold" style={{ color: 'var(--bc-navy)' }}>5G</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>
                Live in 180+ cities — expanding every month
              </p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin size={24} style={{ color: 'var(--bc-teal)' }} />
                <span className="text-3xl font-extrabold" style={{ color: 'var(--bc-navy)' }}>500K+</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>
                Cell towers keeping India connected
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5G explained ══════════════════════════════════════════════════ */}
      <section className="container-site py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-extrabold mb-6"
            style={{ color: 'var(--bc-navy)', fontFamily: "'Plus Jakarta Sans'" }}
          >
            5G on BharatConnect — what you need to know
          </h2>

          <div
            className="bg-white rounded-xl p-6 mb-6"
            style={{ border: '1px solid rgba(11,43,91,0.08)' }}
          >
            <h3 className="font-bold mb-3" style={{ color: 'var(--bc-navy)' }}>
              How to get 5G (it's simple)
            </h3>
            <div className="space-y-3">
              {[
                { icon: Smartphone, text: 'You need a 5G-capable phone (iPhone 12 or later, most Android phones from 2022+)' },
                { icon: Signal, text: 'You need a BharatConnect plan — no separate 5G recharge required' },
                { icon: MapPin, text: 'You need to be in a 5G-enabled area' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(15,139,141,0.08)' }}
                  >
                    <item.icon size={16} style={{ color: 'var(--bc-teal)' }} />
                  </div>
                  <p className="text-sm leading-relaxed pt-1" style={{ color: 'var(--bc-ink)', opacity: 0.7 }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="bg-white rounded-xl p-6 mb-6"
            style={{ border: '1px solid rgba(11,43,91,0.08)' }}
          >
            <h3 className="font-bold mb-3" style={{ color: 'var(--bc-navy)' }}>
              No extra charge for 5G
            </h3>
            <div className="flex items-start gap-3">
              <Check size={18} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--bc-teal)' }} />
              <p className="text-sm leading-relaxed" style={{ color: 'var(--bc-ink)', opacity: 0.7 }}>
                5G is included with all BharatConnect plans at no additional cost. There is no separate "5G recharge" — if your phone supports 5G and you're in a 5G area, you'll automatically connect to the 5G network. Your existing data quota applies as usual.
              </p>
            </div>
          </div>

          <div
            className="rounded-xl p-6 mb-8"
            style={{
              background: 'rgba(183,121,31,0.06)',
              border: '1px solid rgba(183,121,31,0.15)',
            }}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--bc-amber)' }} />
              <div>
                <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--bc-amber)' }}>
                  A note about 6G
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--bc-ink)', opacity: 0.7 }}>
                  6G is a future technology that is currently in the research and development phase worldwide. It is not yet available anywhere in the world, including India. Be wary of any claims suggesting 6G service is available — it is expected to begin deployment no earlier than 2030.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5G Cities ═════════════════════════════════════════════════════ */}
      <section className="section-mist py-14 md:py-16">
        <div className="container-site">
          <h2
            className="text-xl md:text-2xl font-extrabold text-center mb-8"
            style={{ color: 'var(--bc-navy)', fontFamily: "'Plus Jakarta Sans'" }}
          >
            5G is live in these cities
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {CITIES_5G.map((city) => (
              <span
                key={city}
                className="text-sm px-4 py-2 rounded-full font-medium"
                style={{
                  background: 'white',
                  color: 'var(--bc-navy)',
                  border: '1px solid rgba(11,43,91,0.08)',
                }}
              >
                📍 {city}
              </span>
            ))}
            <span
              className="text-sm px-4 py-2 rounded-full font-medium"
              style={{
                background: 'rgba(15,139,141,0.08)',
                color: 'var(--bc-teal)',
                border: '1px solid rgba(15,139,141,0.15)',
              }}
            >
              + 160 more cities
            </span>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══════════════════════════════════════════════════════════ */}
      <section className="container-site py-14 text-center">
        <h2
          className="text-xl md:text-2xl font-extrabold mb-3"
          style={{ color: 'var(--bc-navy)' }}
        >
          Experience 5G today
        </h2>
        <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>
          Choose a plan and enjoy next-gen speeds at no extra cost.
        </p>
        <Link to="/plans" className="btn-primary">
          View plans
        </Link>
      </section>
    </div>
  );
}
