import { useState } from 'react';
import { ChevronDown, MessageCircle, FileText, Phone, AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSuhaas } from '../components/SuhaasWidget/SuhaasContext';
import { SpotlightCard } from '../components/SpotlightCard';

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

const revealVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export function SupportPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { openSuhaas } = useSuhaas();

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
            <span>24/7 Smart Assistance Desk</span>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold"
            style={{ fontFamily: "'Plus Jakarta Sans'" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            How can we help?
          </motion.h1>
          <motion.p 
            className="mt-4 text-base md:text-lg max-w-xl mx-auto text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Find answers to common questions, or talk to our AI assistant Suhaas.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={openSuhaas}
              className="mt-8 btn-primary !bg-white !text-[#0b2b5b] hover:!bg-gray-100 inline-flex items-center gap-2 shadow-lg shadow-black/15"
              aria-label="Talk to Suhaas voice assistant"
            >
              <MessageCircle size={18} />
              Talk to Suhaas
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQs ═══════════════════════════════════════════════════════════ */}
      <section className="container-site py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-2xl md:text-3xl font-extrabold mb-10 text-slate-800 text-left border-b pb-4 border-slate-100"
            style={{ fontFamily: "'Plus Jakarta Sans'" }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-4">
            {FAQS.map((faq, i) => {
              const isOpen = openFAQ === i;
              return (
                <motion.div 
                  key={i} 
                  className="faq-item"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  layout
                >
                  <button
                    onClick={() => setOpenFAQ(isOpen ? null : i)}
                    className="w-full text-left flex items-center justify-between p-5 gap-4 hover:bg-slate-50/50 transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="text-sm md:text-base font-bold text-slate-800">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className="flex-shrink-0 transition-transform duration-300 text-teal-600"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1">
                          <p className="text-sm leading-relaxed text-gray-500">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ Grievance Process ══════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20 md:py-24 border-y border-slate-100">
        <div className="container-site">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
            >
              <h2
                className="text-2xl md:text-3xl font-extrabold mb-4"
                style={{ color: 'var(--bc-navy)', fontFamily: "'Plus Jakarta Sans'" }}
              >
                Grievance Redressal Process
              </h2>
              <p className="text-sm md:text-base text-gray-500 max-w-lg mx-auto">
                We take every complaint seriously. Every issue gets a docket number for tracking.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainer}
            >
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
                  desc: 'If unresolved after 7 days, escalate Mr. Rahul Joshi at nodal@bharatconnect.in.',
                  icon: FileText,
                  color: 'var(--bc-amber)',
                },
                {
                  tier: 'Tier 3',
                  title: 'Appellate Authority',
                  desc: 'If still unresolved after 30 days, contact Priya Iyer at appellate@bharatconnect.in.',
                  icon: AlertCircle,
                  color: '#DC2626',
                },
              ].map((tier) => (
                <motion.div key={tier.tier} variants={revealVariants}>
                  <SpotlightCard className="bg-white border border-slate-100 p-6 flex flex-col items-center text-center h-full">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-slate-100"
                      style={{ background: `${tier.color}15` }}
                    >
                      <tier.icon size={20} style={{ color: tier.color }} />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: tier.color }}>
                      {tier.tier}
                    </p>
                    <h3 className="font-bold text-sm mb-2 text-slate-800">
                      {tier.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-gray-400">
                      {tier.desc}
                    </p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Still need help? ══════════════════════════════════════════════ */}
      <section className="container-site py-20 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
        >
          <h2
            className="text-2xl font-extrabold mb-4 text-slate-800"
          >
            Still need help?
          </h2>
          <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
            Our AI assistant Suhaas is available 24×7 and speaks Hindi, Marathi, Tamil, Telugu, Kannada, Bengali, and English.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
            <button
              onClick={openSuhaas}
              className="btn-primary inline-flex items-center gap-2"
              aria-label="Talk to Suhaas voice assistant"
            >
              <MessageCircle size={18} />
              Talk to Suhaas now
            </button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
