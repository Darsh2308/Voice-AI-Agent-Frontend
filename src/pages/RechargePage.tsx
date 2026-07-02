import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, CreditCard, Smartphone, Building2, Shield, CheckCircle2 } from 'lucide-react';
import {
  allPrepaidPlans,
  postpaidPlans,
  dataAddons,
  findPlanByCode,
} from '../data/plans';

type Step = 'mobile' | 'otp' | 'type' | 'plan' | 'payment' | 'success';
type FlowType = 'recharge' | 'paybill' | 'addon';

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
    // If plan is preselected, skip to payment
    if (preselectedPlan && findPlanByCode(preselectedPlan)) {
      setSelectedPlan(preselectedPlan);
      setStep('payment');
    } else {
      setStep('type');
    }
  };

  const handlePayment = () => {
    if (!paymentMethod) return;
    // Generate mock reference number
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
    <div>
      {/* ═══ Header ═════════════════════════════════════════════════════════ */}
      <section
        className="py-10 md:py-14 text-center"
        style={{
          background: 'linear-gradient(135deg, #0B2B5B 0%, #0F4C75 50%, #0F8B8D 100%)',
        }}
      >
        <div className="container-site">
          <h1
            className="text-2xl md:text-4xl font-extrabold text-white"
            style={{ fontFamily: "'Plus Jakarta Sans'" }}
          >
            {step === 'success' ? '🎉 Recharge Successful!' : 'Recharge & Pay'}
          </h1>
          <p className="mt-2 text-sm md:text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {step === 'success'
              ? 'Your transaction has been processed.'
              : 'Quick, secure, and 100% online. Recharges can only be completed on this website.'}
          </p>
        </div>
      </section>

      {/* ═══ Flow ═══════════════════════════════════════════════════════════ */}
      <section className="container-site py-10 md:py-14">
        <div className="max-w-lg mx-auto">

          {/* ── Progress indicator ── */}
          {step !== 'success' && (
            <div className="flex items-center justify-center gap-2 mb-8">
              {['mobile', 'otp', 'type', 'plan', 'payment'].map((s, i) => {
                const steps: Step[] = ['mobile', 'otp', 'type', 'plan', 'payment'];
                const currentIdx = steps.indexOf(step);
                const isActive = i <= currentIdx;
                return (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                      style={{
                        background: isActive ? 'var(--bc-teal)' : 'rgba(11,43,91,0.08)',
                        color: isActive ? 'white' : 'var(--bc-ink)',
                      }}
                    >
                      {i + 1}
                    </div>
                    {i < 4 && (
                      <div
                        className="w-6 h-0.5 rounded"
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
              className="flex items-center gap-1.5 text-sm mb-5 hover:opacity-70 transition-opacity"
              style={{ color: 'var(--bc-teal)' }}
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}

          {/* ──────── Step 1: Mobile ──────── */}
          {step === 'mobile' && (
            <div
              className="bg-white rounded-xl p-6 md:p-8"
              style={{ border: '1px solid rgba(11,43,91,0.08)' }}
            >
              <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--bc-navy)' }}>
                Enter your mobile number
              </h2>
              <p className="text-sm mb-6" style={{ color: 'var(--bc-ink)', opacity: 0.5 }}>
                We'll send an OTP to verify your number.
              </p>
              <div className="flex gap-3">
                <span
                  className="flex items-center px-3 rounded-xl text-sm font-medium"
                  style={{
                    background: 'rgba(11,43,91,0.04)',
                    border: '1px solid rgba(11,43,91,0.1)',
                    color: 'var(--bc-ink)',
                  }}
                >
                  +91
                </span>
                <input
                  type="tel"
                  className="coverage-input flex-1"
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
                <p className="text-xs mt-2" style={{ color: '#DC2626' }}>{mobileError}</p>
              )}
              <button
                onClick={handleMobileSubmit}
                className="btn-primary w-full mt-5"
              >
                Send OTP
              </button>
            </div>
          )}

          {/* ──────── Step 2: OTP ──────── */}
          {step === 'otp' && (
            <div
              className="bg-white rounded-xl p-6 md:p-8"
              style={{ border: '1px solid rgba(11,43,91,0.08)' }}
            >
              <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--bc-navy)' }}>
                Verify OTP
              </h2>
              <p className="text-sm mb-6" style={{ color: 'var(--bc-ink)', opacity: 0.5 }}>
                Enter the 6-digit code sent to +91 {mobile}
              </p>
              <input
                type="text"
                className="coverage-input text-center text-xl tracking-[0.5em] font-mono"
                placeholder="• • • • • •"
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
                <p className="text-xs mt-2" style={{ color: '#DC2626' }}>{otpError}</p>
              )}
              <p className="text-xs mt-3" style={{ color: 'var(--bc-ink)', opacity: 0.4 }}>
                For this demo, enter any 6-digit number.
              </p>
              <button
                onClick={handleOtpSubmit}
                className="btn-primary w-full mt-5"
              >
                Verify
              </button>
            </div>
          )}

          {/* ──────── Step 3: Type ──────── */}
          {step === 'type' && (
            <div
              className="bg-white rounded-xl p-6 md:p-8"
              style={{ border: '1px solid rgba(11,43,91,0.08)' }}
            >
              <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--bc-navy)' }}>
                What would you like to do?
              </h2>
              <p className="text-sm mb-6" style={{ color: 'var(--bc-ink)', opacity: 0.5 }}>
                Choose an option to continue.
              </p>
              <div className="space-y-3">
                {[
                  { key: 'recharge' as FlowType, icon: Smartphone, label: 'Recharge (Prepaid)', desc: 'Top up your prepaid plan' },
                  { key: 'paybill' as FlowType, icon: CreditCard, label: 'Pay Bill (Postpaid)', desc: 'Pay your monthly postpaid bill' },
                  { key: 'addon' as FlowType, icon: Building2, label: 'Buy Data Add-On', desc: 'Add extra data to your current plan' },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => {
                      setFlowType(opt.key);
                      setSelectedPlan('');
                      setStep('plan');
                    }}
                    className="w-full text-left rounded-xl p-4 flex items-center gap-4 transition-all hover:shadow-md"
                    style={{
                      border: '1px solid rgba(11,43,91,0.1)',
                      background: 'white',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(15,139,141,0.08)' }}
                    >
                      <opt.icon size={18} style={{ color: 'var(--bc-teal)' }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: 'var(--bc-navy)' }}>
                        {opt.label}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--bc-ink)', opacity: 0.5 }}>
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ──────── Step 4: Plan selection ──────── */}
          {step === 'plan' && (
            <div
              className="bg-white rounded-xl p-6 md:p-8"
              style={{ border: '1px solid rgba(11,43,91,0.08)' }}
            >
              <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--bc-navy)' }}>
                Select a plan
              </h2>
              <p className="text-sm mb-5" style={{ color: 'var(--bc-ink)', opacity: 0.5 }}>
                {flowType === 'recharge' ? 'Choose a prepaid plan' : flowType === 'paybill' ? 'Choose your postpaid plan' : 'Choose an add-on'}
              </p>
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {planList.map((plan) => {
                  const code = plan.code;
                  const price = 'price' in plan ? plan.price : 'rental' in plan ? plan.rental : 0;
                  const detail = 'data' in plan ? plan.data : '';
                  const validity = 'validity' in plan ? plan.validity : '/month';
                  const isSelected = selectedPlan === code;

                  return (
                    <button
                      key={code}
                      onClick={() => setSelectedPlan(code)}
                      className="w-full text-left rounded-xl p-3.5 flex items-center justify-between transition-all"
                      style={{
                        border: isSelected
                          ? '2px solid var(--bc-teal)'
                          : '1px solid rgba(11,43,91,0.08)',
                        background: isSelected ? 'rgba(15,139,141,0.04)' : 'white',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                          style={{
                            borderColor: isSelected ? 'var(--bc-teal)' : 'rgba(11,43,91,0.2)',
                          }}
                        >
                          {isSelected && (
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ background: 'var(--bc-teal)' }}
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: 'var(--bc-navy)' }}>
                            {code}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: 'var(--bc-ink)', opacity: 0.5 }}>
                            {detail} · {validity}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-bold" style={{ color: 'var(--bc-navy)' }}>
                        ₹{price}
                      </span>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => selectedPlan && setStep('payment')}
                className="btn-primary w-full mt-5"
                disabled={!selectedPlan}
                style={{ opacity: selectedPlan ? 1 : 0.5 }}
              >
                Continue — ₹{getPlanPrice()}
              </button>
            </div>
          )}

          {/* ──────── Step 5: Payment ──────── */}
          {step === 'payment' && (
            <div
              className="bg-white rounded-xl p-6 md:p-8"
              style={{ border: '1px solid rgba(11,43,91,0.08)' }}
            >
              <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--bc-navy)' }}>
                Secure Payment
              </h2>
              <p className="text-sm mb-5" style={{ color: 'var(--bc-ink)', opacity: 0.5 }}>
                Complete your payment of ₹{getPlanPrice()} for {getPlanLabel()}
              </p>

              {/* Order summary */}
              <div
                className="rounded-xl p-4 mb-5"
                style={{
                  background: 'rgba(15,139,141,0.04)',
                  border: '1px solid rgba(15,139,141,0.12)',
                }}
              >
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>Plan</span>
                  <span className="font-medium" style={{ color: 'var(--bc-navy)' }}>{selectedPlan}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>Mobile</span>
                  <span className="font-medium" style={{ color: 'var(--bc-navy)' }}>+91 {mobile}</span>
                </div>
                <div
                  className="flex justify-between text-sm pt-2 font-bold"
                  style={{ borderTop: '1px solid rgba(11,43,91,0.08)' }}
                >
                  <span style={{ color: 'var(--bc-navy)' }}>Total</span>
                  <span style={{ color: 'var(--bc-teal)' }}>₹{getPlanPrice()}</span>
                </div>
              </div>

              {/* Payment methods */}
              <p className="text-sm font-semibold mb-3" style={{ color: 'var(--bc-navy)' }}>
                Choose payment method
              </p>
              <div className="space-y-2 mb-5">
                {[
                  { key: 'upi', label: 'UPI (GPay / PhonePe / Paytm)', icon: '📱' },
                  { key: 'card', label: 'Debit / Credit Card', icon: '💳' },
                  { key: 'netbanking', label: 'Net Banking', icon: '🏦' },
                ].map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setPaymentMethod(m.key)}
                    className="w-full text-left rounded-xl p-3.5 flex items-center gap-3 transition-all"
                    style={{
                      border: paymentMethod === m.key
                        ? '2px solid var(--bc-teal)'
                        : '1px solid rgba(11,43,91,0.08)',
                      background: paymentMethod === m.key ? 'rgba(15,139,141,0.04)' : 'white',
                    }}
                  >
                    <span className="text-xl">{m.icon}</span>
                    <span className="text-sm font-medium" style={{ color: 'var(--bc-navy)' }}>
                      {m.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 mb-4 text-xs" style={{ color: 'var(--bc-ink)', opacity: 0.4 }}>
                <Shield size={14} />
                <span>256-bit SSL encryption. Your payment details are secure.</span>
              </div>

              <button
                onClick={handlePayment}
                className="btn-primary w-full"
                disabled={!paymentMethod}
                style={{ opacity: paymentMethod ? 1 : 0.5 }}
              >
                Pay ₹{getPlanPrice()}
              </button>
            </div>
          )}

          {/* ──────── Step 6: Success ──────── */}
          {step === 'success' && (
            <div
              className="bg-white rounded-xl p-8 text-center"
              style={{ border: '1px solid rgba(11,43,91,0.08)' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: 'rgba(15,139,141,0.1)' }}
              >
                <CheckCircle2 size={32} style={{ color: 'var(--bc-teal)' }} />
              </div>
              <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--bc-navy)' }}>
                Payment Successful!
              </h2>
              <p className="text-sm mb-6" style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>
                Your {flowType === 'recharge' ? 'recharge' : flowType === 'paybill' ? 'bill payment' : 'add-on purchase'} has been processed successfully.
              </p>

              <div
                className="rounded-xl p-5 text-left mb-6"
                style={{
                  background: 'rgba(15,139,141,0.04)',
                  border: '1px solid rgba(15,139,141,0.12)',
                }}
              >
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>Reference No.</span>
                    <span className="font-mono font-bold" style={{ color: 'var(--bc-teal)' }}>{refNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>Mobile</span>
                    <span className="font-medium" style={{ color: 'var(--bc-navy)' }}>+91 {mobile}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>Plan</span>
                    <span className="font-medium" style={{ color: 'var(--bc-navy)' }}>{selectedPlan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>Amount</span>
                    <span className="font-bold" style={{ color: 'var(--bc-navy)' }}>₹{getPlanPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: 'var(--bc-ink)', opacity: 0.6 }}>Status</span>
                    <span className="flex items-center gap-1 font-semibold" style={{ color: 'var(--bc-teal)' }}>
                      <Check size={14} /> Confirmed
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/" className="btn-secondary flex-1">
                  Go to home
                </Link>
                <Link to="/plans" className="btn-primary flex-1">
                  View more plans
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
