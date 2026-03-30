import { useWebSocket } from './hooks/useWebSocket';
import { Sphere } from './components/Sphere';
import { ChatPanel } from './components/ChatPanel';
import { Controls } from './components/Controls';
import { Radio } from 'lucide-react';

const NAV_WAVE_DELAYS = [0, 0.15, 0.05, 0.2, 0.1];

function App() {
  const { isConnected, status, messages, micVolume, connectionError, connect, disconnect, interrupt } =
    useWebSocket();

  const sphereGlow =
    status === 'speaking'
      ? 'rgba(255, 107, 0, 0.13)'
      : status === 'thinking'
      ? 'rgba(255, 184, 0, 0.09)'
      : status === 'listening'
      ? 'rgba(192, 132, 252, 0.1)'
      : 'rgba(124, 58, 237, 0.1)';

  return (
    <div
      className="h-screen flex flex-col overflow-hidden text-white"
      style={{
        background: `
          radial-gradient(ellipse at 15% 45%, rgba(59, 7, 100, 0.5) 0%, transparent 55%),
          radial-gradient(ellipse at 85% 15%, rgba(255, 69, 0, 0.12) 0%, transparent 45%),
          radial-gradient(ellipse at 70% 85%, rgba(109, 40, 217, 0.22) 0%, transparent 50%),
          radial-gradient(ellipse at 30% 80%, rgba(255, 107, 0, 0.07) 0%, transparent 40%),
          #05000F
        `,
      }}
    >
      {/* ══ Glass Navbar ══════════════════════════════════════════════════════ */}
      <nav className="glass-nav flex-shrink-0 h-16 flex items-center justify-between px-8 z-50">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #FF4500, #7C3AED)',
              boxShadow: '0 0 22px rgba(124, 58, 237, 0.45)',
            }}
          >
            <Radio size={17} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <span
              className="text-gradient-brand text-lg font-black tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              VOICE AI
            </span>
            <p
              className="text-xs tracking-[0.22em]"
              style={{ color: 'rgba(168, 85, 247, 0.45)', marginTop: '-2px' }}
            >
              NEURAL INTERFACE
            </p>
          </div>
        </div>

        {/* Centre: live-session pill */}
        <div
          className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-700"
          style={{
            background: 'rgba(124, 58, 237, 0.1)',
            border: `1px solid ${isConnected ? 'rgba(168, 85, 247, 0.35)' : 'rgba(124, 58, 237, 0.18)'}`,
            color: isConnected ? '#C084FC' : 'rgba(168, 85, 247, 0.4)',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          <span
            className={`w-2 h-2 rounded-full ${isConnected ? 'animate-pulse' : ''}`}
            style={{ background: isConnected ? '#A855F7' : 'rgba(168, 85, 247, 0.25)' }}
          />
          {isConnected ? 'Live Session' : 'Standby'}
        </div>

        {/* Right: mini wave bars + version */}
        <div className="flex items-center gap-3">
          {isConnected && (
            <div className="flex gap-1 items-end h-5">
              {NAV_WAVE_DELAYS.map((delay, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full"
                  style={{
                    background:
                      status === 'speaking'
                        ? 'linear-gradient(to top, #FF4500, #FF8C00)'
                        : 'linear-gradient(to top, #7C3AED, #C084FC)',
                    animation: 'soundWave 0.7s ease-in-out infinite',
                    animationDelay: `${delay}s`,
                    height: '100%',
                    opacity: 0.75,
                  }}
                />
              ))}
            </div>
          )}
          <span
            className="text-xs font-medium"
            style={{ color: 'rgba(255,255,255,0.22)' }}
          >
            v2.0
          </span>
        </div>
      </nav>

      {/* ══ Connection error banner ═══════════════════════════════════════════ */}
      {connectionError && (
        <div
          className="flex-shrink-0 flex items-center gap-2 px-6 py-2 text-xs font-medium"
          style={{
            background: 'rgba(220, 38, 38, 0.12)',
            borderBottom: '1px solid rgba(220, 38, 38, 0.25)',
            color: '#FCA5A5',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse flex-shrink-0" />
          {connectionError}
        </div>
      )}

      {/* ══ Split layout ══════════════════════════════════════════════════════ */}
      <div className="flex-1 flex overflow-hidden p-3 gap-3">

        {/* ── Left panel: Chat ─────────────────────────────────────────────── */}
        <div className="glass-panel w-1/2 flex flex-col overflow-hidden rounded-2xl">
          <ChatPanel messages={messages} />
        </div>

        {/* ── Right panel: Sphere + Controls ───────────────────────────────── */}
        <div className="glass-panel w-1/2 flex flex-col overflow-hidden rounded-2xl relative">
          {/* Dynamic ambient glow behind the sphere */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl transition-all duration-1000"
            style={{
              background: `radial-gradient(ellipse at 50% 42%, ${sphereGlow} 0%, transparent 68%)`,
            }}
          />

          {/* 3D Sphere — fills available height */}
          <div className="flex-1 relative">
            <Sphere status={status} micVolume={micVolume} />
          </div>

          {/* Controls pinned at bottom */}
          <div
            className="flex-shrink-0 relative"
            style={{ borderTop: '1px solid rgba(124, 58, 237, 0.14)' }}
          >
            <Controls
              isConnected={isConnected}
              status={status}
              onConnect={connect}
              onDisconnect={disconnect}
              onInterrupt={interrupt}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
