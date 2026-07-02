import { useState } from 'react';
import { Phone } from 'lucide-react';

type LoginPageProps = {
  onLogin: () => void;
};

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validUser = import.meta.env.VITE_AUTH_USERNAME;
    const validPass = import.meta.env.VITE_AUTH_PASSWORD;

    if (username === validUser && password === validPass) {
      onLogin();
    } else {
      setError('Invalid username or password.');
      setPassword('');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, #0B2B5B 0%, #0F4C75 40%, #0F8B8D 100%)
        `,
      }}
    >
      {/* Card */}
      <div
        className="w-full max-w-sm rounded-2xl px-8 py-10 flex flex-col gap-7"
        style={{
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 8px 48px rgba(0,0,0,0.3)',
        }}
      >
        {/* Brand */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #0F8B8D, #14B8A6)',
              boxShadow: '0 0 28px rgba(15, 139, 141, 0.4)',
            }}
          >
            <Phone size={24} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="text-center">
            <p
              className="text-2xl font-extrabold text-white"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Bharat<span style={{ color: '#14B8A6' }}>Connect</span>
            </p>
            <p
              className="text-xs tracking-[0.15em] mt-1"
              style={{ color: 'rgba(255, 255, 255, 0.45)' }}
            >
              Admin Dashboard
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs font-bold tracking-[0.15em] uppercase text-white/60"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              autoComplete="username"
              required
              className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-200"
              style={{
                background: 'rgba(255, 255, 255, 0.07)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
              onFocus={(e) => (e.currentTarget.style.border = '1px solid rgba(20, 184, 166, 0.6)')}
              onBlur={(e) => (e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.15)')}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs font-bold tracking-[0.15em] uppercase text-white/60"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              autoComplete="current-password"
              required
              className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-200"
              style={{
                background: 'rgba(255, 255, 255, 0.07)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
              onFocus={(e) => (e.currentTarget.style.border = '1px solid rgba(20, 184, 166, 0.6)')}
              onBlur={(e) => (e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.15)')}
            />
          </div>

          {/* Error */}
          {error && (
            <p
              className="text-xs text-center animate-slide-up"
              style={{ color: '#F87171' }}
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl py-3 text-sm font-bold tracking-[0.1em] uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mt-1 text-white"
            style={{
              background: 'linear-gradient(135deg, #0F8B8D, #14B8A6)',
              boxShadow: '0 0 28px rgba(15, 139, 141, 0.35), 0 4px 16px rgba(0,0,0,0.3)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
