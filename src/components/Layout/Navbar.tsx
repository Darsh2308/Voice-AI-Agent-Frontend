import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/plans', label: 'Plans' },
  { to: '/network', label: 'Network & 5G' },
  { to: '/fiber', label: 'Fiber' },
  { to: '/support', label: 'Support' },
  { to: '/about', label: 'About' },
];

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-nav sticky top-0 z-[900]" role="banner">
      <nav
        className="container-site flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="BharatConnect home">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #0F8B8D, #0B2B5B)',
              boxShadow: '0 2px 12px rgba(15, 139, 141, 0.3)',
            }}
          >
            <Phone size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <span
            className="text-xl font-extrabold tracking-tight"
            style={{
              color: 'var(--bc-navy)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Bharat<span style={{ color: 'var(--bc-teal)' }}>Connect</span>
          </span>
        </Link>

        {/* ── Desktop links ── */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── Desktop CTA ── */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/recharge" className="btn-primary text-sm !py-2 !px-5">
            Recharge
          </Link>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="container-site py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link block py-3 !text-base ${location.pathname === link.to ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <Link
                to="/recharge"
                className="btn-primary w-full text-center"
                onClick={() => setMobileOpen(false)}
              >
                Recharge Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
