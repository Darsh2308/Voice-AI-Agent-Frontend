import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

const QUICK_LINKS = [
  { to: '/plans', label: 'Prepaid Plans' },
  { to: '/plans', label: 'Postpaid Plans' },
  { to: '/recharge', label: 'Recharge' },
  { to: '/fiber', label: 'Fiber Broadband' },
];

const COMPANY_LINKS = [
  { to: '/about', label: 'About Us' },
  { to: '/network', label: 'Network & 5G' },
  { to: '/support', label: 'Customer Support' },
];

const LANGUAGES = ['English', 'हिन्दी', 'मराठी', 'தமிழ்', 'తెలుగు', 'ಕನ್ನಡ', 'বাংলা'];

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{ background: 'var(--bc-navy)', borderColor: 'rgba(255,255,255,0.08)' }}
      role="contentinfo"
    >
      <div className="container-site py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* ── Brand ── */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4" aria-label="BharatConnect home">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #0F8B8D, #14B8A6)' }}
              >
                <Phone size={14} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans'" }}>
                Bharat<span style={{ color: '#14B8A6' }}>Connect</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              India's trusted telecom operator. Connecting 82 million+ subscribers with reliable
              4G/5G coverage and support in 7 languages.
            </p>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Plans</h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company ── */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Languages & Support ── */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Support Languages
            </h3>
            <div className="flex flex-wrap gap-2 mb-5">
              {LANGUAGES.map((lang) => (
                <span
                  key={lang}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.65)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {lang}
                </span>
              ))}
            </div>
            <p className="text-sm font-semibold text-white mb-1">Customer care 24×7</p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Toll-free: 1800-XXX-XXXX
            </p>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            © {new Date().getFullYear()} BharatConnect Telecom Pvt. Ltd. All rights reserved. Regulated by DoT & TRAI.
          </p>
          <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Nodal Officer: Mr. Rahul Joshi | Appellate Authority: Ms. Priya Iyer — Details at{' '}
            <Link to="/support" className="underline hover:text-white/60">
              bharatconnect.in/grievance
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
