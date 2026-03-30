import { useState } from 'react';
import { Radio } from 'lucide-react';

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
      className="h-screen flex flex-col items-center justify-center overflow-hidden text-white"
      style={{
        background: `
          radial-gradient(ellipse at 15% 45%, rgba(59, 7, 100, 0.5) 0%, transparent 55%),
          radial-gradient(ellipse at 85% 15%, rgba(255, 69, 0, 0.12) 0%, transparent 45%),
          radial-gradient(ellipse at 70% 85%, rgba(109, 40, 217, 0.22) 0%, transparent 50%),
          #05000F
        `,
      }}
    >
      {/* Card */}
      <div
        className="w-full max-w-sm rounded-2xl px-8 py-10 flex flex-col gap-7"
        style={{
          background: 'rgba(5, 0, 20, 0.72)',
          border: '1px solid rgba(124, 58, 237, 0.28)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 8px 48px rgba(0,0,0,0.55), inset 0 0 40px rgba(124,58,237,0.04)',
        }}
      >
        {/* Brand */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #FF4500, #7C3AED)',
              boxShadow: '0 0 28px rgba(124, 58, 237, 0.5)',
            }}
          >
            <Radio size={22} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="text-center">
            <p
              className="text-gradient-brand text-xl font-black tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              VOICE AI
            </p>
            <p
              className="text-xs tracking-[0.22em] mt-0.5"
              style={{ color: 'rgba(168, 85, 247, 0.5)' }}
            >
              NEURAL INTERFACE
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: '#C084FC', fontFamily: "'Space Grotesk', sans-serif" }}
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
                background: 'rgba(124, 58, 237, 0.08)',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                fontFamily: "'Inter', sans-serif",
              }}
              onFocus={(e) => (e.currentTarget.style.border = '1px solid rgba(168, 85, 247, 0.7)')}
              onBlur={(e) => (e.currentTarget.style.border = '1px solid rgba(124, 58, 237, 0.3)')}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: '#C084FC', fontFamily: "'Space Grotesk', sans-serif" }}
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
                background: 'rgba(124, 58, 237, 0.08)',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                fontFamily: "'Inter', sans-serif",
              }}
              onFocus={(e) => (e.currentTarget.style.border = '1px solid rgba(168, 85, 247, 0.7)')}
              onBlur={(e) => (e.currentTarget.style.border = '1px solid rgba(124, 58, 237, 0.3)')}
            />
          </div>

          {/* Error */}
          {error && (
            <p
              className="text-xs text-center animate-slide-up"
              style={{ color: '#FF6B00' }}
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl py-3 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mt-1"
            style={{
              background: 'linear-gradient(135deg, #6D28D9, #9333EA)',
              boxShadow: '0 0 28px rgba(109, 40, 217, 0.45), 0 4px 16px rgba(0,0,0,0.4)',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
