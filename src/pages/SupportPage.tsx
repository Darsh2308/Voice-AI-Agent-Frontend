import { useState } from 'react';
import { ChevronDown, MessageCircle, FileText, Phone, AlertCircle } from 'lucide-react';
import { useSuhaas } from '../components/SuhaasWidget/SuhaasContext';

interface FAQ {
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [
  {
    question: 'My bill is higher than my plan rental. Why?',
    answer: 'This usually happens when an OTT subscription or data add-on has auto-renewed, or there was extra usage beyond your plan limits (such as international calls or premium SMS). Check the line-by-line breakdown in your bill on the website. You can cancel future auto-renewals from your account settings at any time.',
  },
  {
    question: 'I recharged but didn\'t get my data. What happened?',
    answer: 'This can occur if the wrong plan was selected during recharge, or if the payment transaction failed midway. If the payment failed, the amount will be auto-reversed to your payment method within 3–5 working days. If the payment was successful but data wasn\'t credited, please contact support with your transaction reference number.',
  },
  {
    question: 'My data ran out before the end of the month.',
    answer: 'This happens when your daily quota is used up (for daily data packs) or when you hit the Fair Usage Policy (FUP) limit on postpaid plans. After FUP, speeds are throttled but service continues. To get high-speed data again, you can buy a data add-on from the website — options start at just ₹19.',
  },
  {
    question: 'I want to port my number to BharatConnect. How?',
    answer: 'Porting is simple: SMS "PORT" followed by your 10-digit number to 1900 from the number you want to port. You\'ll receive a Unique Porting Code (UPC). Visit a BharatConnect store or apply online with your UPC, Aadhaar, and a passport-size photo. The process takes 3–5 working days. Your number stays the same!',
  },
  {
    question: 'I have no network / no signal in my area.',
    answer: 'First, try toggling airplane mode on and off, and reseat your SIM card. If the issue persists, check the BharatConnect app or website for any reported outages in your area. If there\'s no outage, we\'ll raise a fault ticket with a docket number so you can track the resolution. Our network team typically resolves coverage issues within 48 hours.',
  },
  {
    question: 'How do I get 5G? Do I need a special recharge?',
    answer: 'No special recharge is needed! To enjoy 5G, you need three things: (1) a 5G-capable phone, (2) any active BharatConnect plan, and (3) to be in a 5G-enabled area. There\'s no extra charge for 5G — your existing data quota applies at 5G speeds automatically. Check our Network page for the list of 5G cities.',
  },
];

export function SupportPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { openSuhaas } = useSuhaas();

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
            How can we help?
          </h1>
          <p className="mt-3 text-base md:text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Find answers to common questions, or talk to our AI assistant Suhaas.
          </p>
          <button
            onClick={openSuhaas}
            className="mt-6 btn-primary !bg-white !text-bc-navy hover:!bg-gray-100 inline-flex items-center gap-2"
            aria-label="Talk to Suhaas voice assistant"
          >
            <MessageCircle size={18} />
            Talk to Suhaas
          </button>
        </div>
      </section>

      {/* ═══ FAQs ═══════════════════════════════════════════════════════════ */}
      <section className="container-site py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-xl md:text-2xl font-extrabold mb-8"
            style={{ color: 'var(--bc-navy)', fontFamily: "'Plus Jakarta Sans'" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="faq-item">
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full text-left flex items-center justify-between p-5 gap-4"
                  aria-expanded={openFAQ === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="text-sm font-semibold" style={{ color: 'var(--bc-navy)' }}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className="flex-shrink-0 transition-transform"
                    style={{
                      color: 'var(--bc-teal)',
                      transform: openFAQ === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>
                {openFAQ === i && (
                  <div
                    id={`faq-answer-${i}`}
                    className="px-5 pb-5 animate-fade-in"
                  >
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--bc-ink)', opacity: 0.65 }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Grievance Process ══════════════════════════════════════════════ */}
      <section className="section-mist py-14 md:py-16">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-xl md:text-2xl font-extrabold mb-8 text-center"
              style={{ color: 'var(--bc-navy)', fontFamily: "'Plus Jakarta Sans'" }}
            >
              Grievance Redressal Process
            </h2>
            <p className="text-sm text-center mb-8" style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>
              We take every complaint seriously. Every issue gets a docket number for tracking.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  tier: 'Tier 1',
                  title: 'Customer Support',
                  desc: 'Reach out via Suhaas (voice AI), website chat, or call 1800-XXX-XXXX. Most issues resolved within 24 hours.',
                  icon: Phone,
                  color: 'var(--bc-teal)',
                },
                {
                  tier: 'Tier 2',
                  title: 'Nodal Officer',
                  desc: 'If unresolved after 7 days, escalate to Nodal Officer Mr. Rahul Joshi at nodal@bharatconnect.in.',
                  icon: FileText,
                  color: 'var(--bc-amber)',
                },
                {
                  tier: 'Tier 3',
                  title: 'Appellate Authority',
                  desc: 'If still unresolved after 30 days, contact Appellate Authority Ms. Priya Iyer at appellate@bharatconnect.in.',
                  icon: AlertCircle,
                  color: '#DC2626',
                },
              ].map((tier) => (
                <div
                  key={tier.tier}
                  className="bg-white rounded-xl p-6 text-center"
                  style={{ border: '1px solid rgba(11,43,91,0.06)' }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
                    style={{ background: `${tier.color}15` }}
                  >
                    <tier.icon size={18} style={{ color: tier.color }} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: tier.color }}>
                    {tier.tier}
                  </p>
                  <h3 className="font-bold text-sm mb-2" style={{ color: 'var(--bc-navy)' }}>
                    {tier.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>
                    {tier.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Still need help? ══════════════════════════════════════════════ */}
      <section className="container-site py-14 text-center">
        <h2
          className="text-xl font-extrabold mb-3"
          style={{ color: 'var(--bc-navy)' }}
        >
          Still need help?
        </h2>
        <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>
          Our AI assistant Suhaas is available 24×7 and speaks Hindi, Marathi, Tamil, Telugu, Kannada, Bengali, and English.
        </p>
        <button
          onClick={openSuhaas}
          className="btn-primary inline-flex items-center gap-2"
          aria-label="Talk to Suhaas voice assistant"
        >
          <MessageCircle size={18} />
          Talk to Suhaas now
        </button>
      </section>
    </div>
  );
}
