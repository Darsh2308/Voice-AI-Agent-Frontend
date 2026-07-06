import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, CreditCard, Smartphone, Building2, Shield, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  allPrepaidPlans,
  postpaidPlans,
  dataAddons,
  findPlanByCode,
} from '../data/plans';

type Step = 'mobile' | 'otp' | 'type' | 'plan' | 'payment' | 'success';
type FlowType = 'recharge' | 'paybill' | 'addon';

const stepVariants = {
  initial: { opacity: 0, x: 25 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, x: -25, transition: { duration: 0.2, ease: 'easeIn' } }
};

export function RechargePage() {
  const [searchParams] = useSearchParams();
  const preselectedPlan = searchParams.get('plan');

  const [step, setStep] = useState<Step>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [flowType, setFlowType] = useState<FlowType>('recharge');
  const [selectedPlan, setSelectedPlan] = useState<string>(preselectedPlan || '');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [refNumber, setRefNumber] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [otpError, setOtpError] = useState('');

  // Auto-detect flow type from preselected plan
  useEffect(() => {
    if (preselectedPlan) {
      const found = findPlanByCode(preselectedPlan);
      if (found) {
        if (found.type === 'postpaid') setFlowType('paybill');
        else if (found.type === 'addon') setFlowType('addon');
        else setFlowType('recharge');
      }
    }
  }, [preselectedPlan]);

  const handleMobileSubmit = () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setMobileError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setMobileError('');
    setStep('otp');
  };

  const handleOtpSubmit = () => {
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    }
    setOtpError('');
    if (preselectedPlan && findPlanByCode(preselectedPlan)) {
      setSelectedPlan(preselectedPlan);
      setStep('payment');
    } else {
      setStep('type');
    }
  };

  const handlePayment = () => {
    if (!paymentMethod) return;
    const ref = 'BC' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
    setRefNumber(ref);
    setStep('success');
  };

  const getPlanPrice = () => {
    const found = findPlanByCode(selectedPlan);
    if (!found) return 0;
    if (found.type === 'prepaid') return found.plan.price;
    if (found.type === 'postpaid') return found.plan.rental;
    if (found.type === 'addon') return found.plan.price;
    return 0;
  };

  const getPlanLabel = () => {
    const found = findPlanByCode(selectedPlan);
    if (!found) return selectedPlan;
    if (found.type === 'prepaid') return `${found.plan.code} — ${found.plan.data}, ${found.plan.validity}`;
    if (found.type === 'postpaid') return `${found.plan.code} — ${found.plan.data}/mo`;
    if (found.type === 'addon') return `${found.plan.code} — ${found.plan.data}`;
    return selectedPlan;
  };

  const goBack = () => {
    const order: Step[] = ['mobile', 'otp', 'type', 'plan', 'payment'];
    const idx = order.indexOf(step);
    if (idx > 0) setStep(order[idx - 1]);
  };

  const planList = flowType === 'recharge' ? allPrepaidPlans
    : flowType === 'paybill' ? postpaidPlans
    : dataAddons;

  return (
    <div className="overflow-hidden">
      {/* ═══ Header ═════════════════════════════════════════════════════════ */}
      <section
        className="py-14 md:py-16 text-center bg-mesh-dynamic bg-noise text-white relative"
      >
        <div className="container-site relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 inline-flex px-3 py-1 rounded-full text-xs font-bold text-teal-300 border border-teal-500/25 bg-teal-950/20 backdrop-blur-md items-center gap-1.5"
          >
            <Sparkles size={12} className="animate-pulse" />
            <span>Instant & Encrypted Checkout Portal</span>
          </motion.div>
          <motion.h1
            className="text-3xl md:text-4xl font-extrabold"
            style={{ fontFamily: "'Plus Jakarta Sans'" }}
            animate={{ scale: step === 'success' ? [1, 1.03, 1] : 1 }}
            transition={{ duration: 0.4 }}
          >
            {step === 'success' ? '🎉 Recharge Successful!' : 'Recharge & Pay'}
          </motion.h1>
          <p className="mt-2 text-sm md:text-base text-white/85 max-w-lg mx-auto">
            {step === 'success'
              ? 'Your transaction has been processed.'
              : 'Quick, secure, and 100% online. Recharges can only be completed on this website.'}
          </p>
        </div>
      </section>

      {/* ═══ Flow ═══════════════════════════════════════════════════════════ */}
      <section className="container-site py-12 md:py-16">
        <div className="max-w-lg mx-auto">

          {/* ── Progress indicator ── */}
          {step !== 'success' && (
            <div className="flex items-center justify-center gap-2 mb-10">
              {['mobile', 'otp', 'type', 'plan', 'payment'].map((s, i) => {
                const steps: Step[] = ['mobile', 'otp', 'type', 'plan', 'payment'];
                const currentIdx = steps.indexOf(step);
                const isActive = i <= currentIdx;
                const isCurrent = step === s;
                return (
                  <div key={s} className="flex items-center gap-2">
                    <motion.div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      animate={{
                        backgroundColor: isCurrent 
                          ? '#0F8B8D' 
                          : isActive 
                          ? '#14B8A6' 
                          : 'rgba(11,43,91,0.06)',
                        color: isActive ? 'white' : 'var(--bc-navy)',
                        scale: isCurrent ? 1.15 : 1,
                        boxShadow: isCurrent ? '0 0 12px rgba(15,139,141,0.3)' : 'none'
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {i + 1}
                    </motion.div>
                    {i < 4 && (
                      <div
                        className="w-6 h-0.5 rounded transition-all duration-300"
                        style={{ background: isActive ? 'var(--bc-teal)' : 'rgba(11,43,91,0.1)' }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Back button ── */}
          {step !== 'mobile' && step !== 'success' && (
            <button
              onClick={goBack}
              className="flex items-center gap-1.5 text-sm mb-6 hover:opacity-75 transition-opacity font-semibold"
              style={{ color: 'var(--bc-teal)' }}
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}

          {/* ── Steps Layout Wrapper ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* ──────── Step 1: Mobile ──────── */}
              {step === 'mobile' && (
                <div
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-100"
                >
                  <h2 className="text-xl font-bold mb-1.5 text-slate-800">
                    Enter your mobile number
                  </h2>
                  <p className="text-sm mb-6 text-gray-500">
                    We'll send an OTP to verify your number.
                  </p>
                  <div className="flex gap-3">
                    <span
                      className="flex items-center px-4 rounded-xl text-sm font-bold border border-slate-200 bg-slate-50 text-slate-700"
                    >
                      +91
                    </span>
                    <input
                      type="tel"
                      className="coverage-input flex-1 !h-12 !py-2"
                      placeholder="9876543210"
                      value={mobile}
                      onChange={(e) => {
                        setMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
                        setMobileError('');
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && handleMobileSubmit()}
                      aria-label="Mobile number"
                      maxLength={10}
                    />
                  </div>
                  {mobileError && (
                    <p className="text-xs mt-2 text-red-600 font-medium">{mobileError}</p>
                  )}
                  <motion.button
                    onClick={handleMobileSubmit}
                    className="btn-primary w-full mt-6 shadow-md shadow-teal-500/10"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    Send OTP
                  </motion.button>
                </div>
              )}

              {/* ──────── Step 2: OTP ──────── */}
              {step === 'otp' && (
                <div
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-100"
                >
                  <h2 className="text-xl font-bold mb-1.5 text-slate-800">
                    Verify OTP
                  </h2>
                  <p className="text-sm mb-6 text-gray-500">
                    Enter the 6-digit code sent to +91 {mobile}
                  </p>
                  <input
                    type="text"
                    className="coverage-input text-center text-xl tracking-[0.5em] font-mono !h-12"
                    placeholder="••••••"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                      setOtpError('');
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleOtpSubmit()}
                    aria-label="One-time password"
                    maxLength={6}
                  />
                  {otpError && (
                    <p className="text-xs mt-2 text-red-600 font-medium">{otpError}</p>
                  )}
                  <p className="text-xs mt-4 text-gray-400 font-medium italic">
                    For this demo, enter any 6-digit number.
                  </p>
                  <motion.button
                    onClick={handleOtpSubmit}
                    className="btn-primary w-full mt-6 shadow-md shadow-teal-500/10"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    Verify
                  </motion.button>
                </div>
              )}

              {/* ──────── Step 3: Type ──────── */}
              {step === 'type' && (
                <div
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-100"
                >
                  <h2 className="text-xl font-bold mb-1.5 text-slate-800">
                    What would you like to do?
                  </h2>
                  <p className="text-sm mb-6 text-gray-500">
                    Choose an option to continue.
                  </p>
                  <div className="space-y-3.5">
                    {[
                      { key: 'recharge' as FlowType, icon: Smartphone, label: 'Recharge (Prepaid)', desc: 'Top up your prepaid plan' },
                      { key: 'paybill' as FlowType, icon: CreditCard, label: 'Pay Bill (Postpaid)', desc: 'Pay your monthly postpaid bill' },
                      { key: 'addon' as FlowType, icon: Building2, label: 'Buy Data Add-On', desc: 'Add extra data to your current plan' },
                    ].map((opt) => (
                      <motion.button
                        key={opt.key}
                        onClick={() => {
                          setFlowType(opt.key);
                          setSelectedPlan('');
                          setStep('plan');
                        }}
                        className="w-full text-left rounded-2xl p-4.5 flex items-center gap-4 transition-all border border-slate-200 bg-white hover:border-teal-500/40 hover:shadow-md"
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                      >
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-teal-500/10 border border-teal-500/10 text-teal-600"
                        >
                          <opt.icon size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-800">
                            {opt.label}
                          </p>
                          <p className="text-xs mt-1 text-slate-500">
                            {opt.desc}
                          </p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* ──────── Step 4: Plan selection ──────── */}
              {step === 'plan' && (
                <div
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-100"
                >
                  <h2 className="text-xl font-bold mb-1.5 text-slate-800">
                    Select a plan
                  </h2>
                  <p className="text-sm mb-6 text-gray-500">
                    {flowType === 'recharge' ? 'Choose a prepaid plan' : flowType === 'paybill' ? 'Choose your postpaid plan' : 'Choose an add-on'}
                  </p>
                  <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                    {planList.map((plan) => {
                      const code = plan.code;
                      const price = 'price' in plan ? plan.price : 'rental' in plan ? plan.rental : 0;
                      const detail = 'data' in plan ? plan.data : '';
                      const validity = 'validity' in plan ? plan.validity : '/month';
                      const isSelected = selectedPlan === code;

                      return (
                        <motion.button
                          key={code}
                          onClick={() => setSelectedPlan(code)}
                          className="w-full text-left rounded-2xl p-4 flex items-center justify-between transition-all border"
                          style={{
                            borderColor: isSelected ? 'var(--bc-teal)' : 'rgba(11, 43, 91, 0.1)',
                            background: isSelected ? 'rgba(15, 139, 141, 0.04)' : 'white',
                          }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                              style={{
                                borderColor: isSelected ? 'var(--bc-teal)' : 'rgba(11, 43, 91, 0.25)',
                              }}
                            >
                              {isSelected && (
                                <div
                                  className="w-3 h-3 rounded-full bg-teal-600"
                                />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-800">
                                {code}
                              </p>
                              <p className="text-xs mt-1 text-slate-500">
                                {detail} · {validity}
                              </p>
                            </div>
                          </div>
                          <span className="text-sm font-extrabold text-slate-850">
                            ₹{price}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                  <motion.button
                    onClick={() => selectedPlan && setStep('payment')}
                    className="btn-primary w-full mt-6 shadow-md"
                    disabled={!selectedPlan}
                    style={{ opacity: selectedPlan ? 1 : 0.5 }}
                    whileHover={selectedPlan ? { scale: 1.01 } : {}}
                    whileTap={selectedPlan ? { scale: 0.99 } : {}}
                  >
                    Continue — ₹{getPlanPrice()}
                  </motion.button>
                </div>
              )}

              {/* ──────── Step 5: Payment ──────── */}
              {step === 'payment' && (
                <div
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-100"
                >
                  <h2 className="text-xl font-bold mb-1.5 text-slate-800">
                    Secure Payment
                  </h2>
                  <p className="text-sm mb-6 text-gray-500">
                    Complete payment of ₹{getPlanPrice()} for {getPlanLabel()}
                  </p>

                  {/* Order summary */}
                  <div
                    className="rounded-2xl p-4.5 mb-6 border border-teal-500/10 bg-teal-500/3"
                  >
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-slate-500 font-medium">Plan</span>
                      <span className="font-bold text-slate-800">{selectedPlan}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-slate-500 font-medium">Mobile</span>
                      <span className="font-bold text-slate-800">+91 {mobile}</span>
                    </div>
                    <div
                      className="flex justify-between text-sm pt-3 font-bold border-t border-slate-100"
                    >
                      <span className="text-slate-800">Total</span>
                      <span className="text-teal-650 text-base">₹{getPlanPrice()}</span>
                    </div>
                  </div>

                  {/* Payment methods */}
                  <p className="text-sm font-bold mb-3.5 text-slate-800">
                    Choose payment method
                  </p>
                  <div className="space-y-2.5 mb-6">
                    {[
                      { key: 'upi', label: 'UPI (GPay / PhonePe / Paytm)', icon: '📱' },
                      { key: 'card', label: 'Debit / Credit Card', icon: '💳' },
                      { key: 'netbanking', label: 'Net Banking', icon: '🏦' },
                    ].map((m) => (
                      <motion.button
                        key={m.key}
                        onClick={() => setPaymentMethod(m.key)}
                        className="w-full text-left rounded-xl p-3.5 flex items-center gap-3 transition-all border"
                        style={{
                          borderColor: paymentMethod === m.key
                            ? 'var(--bc-teal)'
                            : 'rgba(11, 43, 91, 0.1)',
                          background: paymentMethod === m.key ? 'rgba(15, 139, 141, 0.04)' : 'white',
                        }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <span className="text-xl">{m.icon}</span>
                        <span className="text-sm font-bold text-slate-800">
                          {m.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mb-5 text-[11px] text-gray-400 font-medium">
                    <Shield size={14} className="text-teal-600" />
                    <span>256-bit SSL encryption. Your details are secure.</span>
                  </div>

                  <motion.button
                    onClick={handlePayment}
                    className="btn-primary w-full shadow-md"
                    disabled={!paymentMethod}
                    style={{ opacity: paymentMethod ? 1 : 0.5 }}
                    whileHover={paymentMethod ? { scale: 1.01 } : {}}
                    whileTap={paymentMethod ? { scale: 0.99 } : {}}
                  >
                    Pay ₹{getPlanPrice()}
                  </motion.button>
                </div>
              )}

              {/* ──────── Step 6: Success ──────── */}
              {step === 'success' && (
                <motion.div
                  className="bg-white rounded-2xl p-8 text-center shadow-xl border border-slate-100"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-teal-50"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                  >
                    <CheckCircle2 size={32} className="text-teal-500" />
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2 text-slate-800">
                    Payment Successful!
                  </h2>
                  <p className="text-sm text-gray-500 mb-8">
                    Your {flowType === 'recharge' ? 'recharge' : flowType === 'paybill' ? 'bill payment' : 'add-on purchase'} has been processed.
                  </p>

                  <div
                    className="rounded-2xl p-5 text-left mb-8 border border-slate-100 bg-slate-50/50"
                  >
                    <div className="space-y-3.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Reference No.</span>
                        <span className="font-mono font-bold text-teal-650">{refNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Mobile</span>
                        <span className="font-bold text-slate-800">+91 {mobile}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Plan</span>
                        <span className="font-bold text-slate-800">{selectedPlan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Amount</span>
                        <span className="font-extrabold text-slate-800">₹{getPlanPrice()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">Status</span>
                        <span className="flex items-center gap-1 font-bold text-teal-600">
                          <Check size={14} strokeWidth={2.5} /> Confirmed
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3.5">
                    <Link to="/" className="btn-secondary flex-1 text-center justify-center font-bold">
                      Go to home
                    </Link>
                    <Link to="/plans" className="btn-primary flex-1 text-center justify-center font-bold">
                      View more plans
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>
    </div>
  );
}
