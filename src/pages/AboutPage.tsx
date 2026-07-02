import { Link } from 'react-router-dom';
import { Users, MapPin, Award, Shield, Languages, Heart, Target, Globe } from 'lucide-react';

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

export function AboutPage() {
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
            About BharatConnect
          </h1>
          <p className="mt-3 text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            India's trusted telecom operator — connecting millions with reliable networks and support in the languages they speak.
          </p>
        </div>
      </section>

      {/* ═══ Stats ══════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b" style={{ borderColor: 'rgba(11,43,91,0.06)' }}>
        <div className="container-site py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
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

      {/* ═══ Our Story ═════════════════════════════════════════════════════ */}
      <section className="container-site py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-2xl md:text-3xl font-extrabold mb-6"
            style={{ color: 'var(--bc-navy)', fontFamily: "'Plus Jakarta Sans'" }}
          >
            Our Story
          </h2>
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--bc-ink)', opacity: 0.7 }}>
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
        </div>
      </section>

      {/* ═══ Leadership ════════════════════════════════════════════════════ */}
      <section className="section-mist py-14 md:py-16">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-xl md:text-2xl font-extrabold mb-8 text-center"
              style={{ color: 'var(--bc-navy)', fontFamily: "'Plus Jakarta Sans'" }}
            >
              Leadership
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Ananya Deshpande', role: 'CEO & Managing Director', icon: Users },
                { name: 'Rahul Joshi', role: 'VP, Customer Experience & Nodal Officer', icon: Award },
                { name: 'Priya Iyer', role: 'Chief Regulatory Officer & Appellate Authority', icon: Globe },
              ].map((person) => (
                <div
                  key={person.name}
                  className="bg-white rounded-xl p-6 text-center"
                  style={{ border: '1px solid rgba(11,43,91,0.06)' }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ background: 'linear-gradient(135deg, rgba(15,139,141,0.1), rgba(11,43,91,0.05))' }}
                  >
                    <person.icon size={22} style={{ color: 'var(--bc-teal)' }} />
                  </div>
                  <h3 className="font-bold text-sm" style={{ color: 'var(--bc-navy)' }}>
                    {person.name}
                  </h3>
                  <p className="text-xs mt-1" style={{ color: 'var(--bc-ink)', opacity: 0.5 }}>
                    {person.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Our Values ════════════════════════════════════════════════════ */}
      <section className="container-site py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-xl md:text-2xl font-extrabold mb-8 text-center"
            style={{ color: 'var(--bc-navy)', fontFamily: "'Plus Jakarta Sans'" }}
          >
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-xl p-6 flex gap-4"
                style={{ border: '1px solid rgba(11,43,91,0.06)' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(15,139,141,0.08)' }}
                >
                  <v.icon size={18} style={{ color: 'var(--bc-teal)' }} />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1.5" style={{ color: 'var(--bc-navy)' }}>
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HQ Info ═══════════════════════════════════════════════════════ */}
      <section className="section-mist py-14 text-center">
        <div className="container-site">
          <div className="flex items-center justify-center gap-2 mb-3">
            <MapPin size={20} style={{ color: 'var(--bc-teal)' }} />
            <h2 className="text-lg font-bold" style={{ color: 'var(--bc-navy)' }}>
              Headquarters
            </h2>
          </div>
          <p className="text-sm" style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>
            BharatConnect Tower, Hinjewadi IT Park, Pune 411057, Maharashtra, India
          </p>
          <Link to="/support" className="btn-primary mt-6 inline-flex">
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}
