import { useEffect, useRef } from 'react';
import { Phone, ChevronDown, X } from 'lucide-react';
import { useSuhaas } from './SuhaasContext';
import { useWebSocket } from '../../hooks/useWebSocket';
import { ChatPanel } from '../ChatPanel';
import { Controls } from '../Controls';

const STATUS_DOT_COLORS: Record<string, string> = {
  idle: '#0F8B8D',
  listening: '#14B8A6',
  thinking: '#B7791F',
  speaking: '#0F8B8D',
};

const STATUS_LABELS: Record<string, string> = {
  idle: 'Ready',
  listening: 'Listening',
  thinking: 'Processing',
  speaking: 'Speaking',
};

export function SuhaasWidget() {
  const { isOpen, openSuhaas, closeSuhaas } = useSuhaas();
  const { isConnected, status, messages, micVolume, connect, disconnect, interrupt } =
    useWebSocket();

  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeSuhaas();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, closeSuhaas]);

  return (
    <>
      {/* ── Collapsed FAB ──────────────────────────────────────────────── */}
      <button
        onClick={openSuhaas}
        className={`fixed z-[9998] flex items-center gap-2.5 rounded-full text-white transition-all duration-500 hover:scale-105 active:scale-95 ${
          isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'
        }`}
        style={{
          bottom: '20px',
          right: '20px',
          padding: '14px 22px',
          background: 'linear-gradient(135deg, #0F8B8D, #0B2B5B)',
          boxShadow: '0 8px 32px rgba(15, 139, 141, 0.3), 0 4px 12px rgba(0,0,0,0.15)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        aria-label="Open voice assistant Suhaas"
        id="suhaas-fab"
      >
        <Phone size={18} strokeWidth={2.2} />
        <span className="text-sm font-semibold hidden sm:inline">Call Suhaas</span>
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: STATUS_DOT_COLORS[status] || STATUS_DOT_COLORS.idle }}
        />
      </button>

      {/* ── Backdrop (mobile) ── */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/30 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeSuhaas}
        aria-hidden="true"
        style={{
          transition: 'opacity 0.3s ease',
          visibility: isOpen ? 'visible' : 'hidden',
        }}
      />

      {/* ── Expanded Panel ── */}
      <div
        ref={panelRef}
        className="fixed z-[9999] flex flex-col overflow-hidden"
        style={{
          bottom: '0',
          right: '0',
          width: '100%',
          maxWidth: '400px',
          height: '70vh',
          borderRadius: '1rem 1rem 0 0',
          background: 'var(--bc-cloud)',
          border: '1px solid rgba(11, 43, 91, 0.1)',
          boxShadow: '0 -4px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(11,43,91,0.04)',
          transformOrigin: 'bottom right',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.92)',
          pointerEvents: isOpen ? 'auto' : 'none',
          visibility: isOpen ? 'visible' : 'hidden',
        }}
        role="dialog"
        aria-label="Suhaas voice assistant"
        aria-modal="true"
      >
        {/* ── Header ── */}
        <div
          className="flex-shrink-0 flex items-center justify-between px-5 py-3.5"
          style={{
            background: 'linear-gradient(135deg, #0B2B5B, #0F4C75)',
            borderBottom: '1px solid rgba(11,43,91,0.1)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <Phone size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Suhaas
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'animate-pulse' : ''}`}
                  style={{
                    background: isConnected ? '#14B8A6' : 'rgba(255,255,255,0.4)',
                  }}
                />
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {isConnected ? STATUS_LABELS[status] || 'Connected' : 'BharatConnect Voice Support'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={closeSuhaas}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white/90 hover:bg-white/10 transition-colors"
              aria-label="Minimize voice assistant"
            >
              <ChevronDown size={18} />
            </button>
            <button
              onClick={() => {
                if (isConnected) disconnect();
                closeSuhaas();
              }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-red-300 hover:bg-white/10 transition-colors"
              aria-label="Close voice assistant"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Idle screen (always present, transitions out when connected) */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 gap-6 transition-all duration-500"
            style={{
              opacity: !isConnected ? 1 : 0,
              transform: !isConnected ? 'scale(1)' : 'scale(0.95)',
              pointerEvents: !isConnected ? 'auto' : 'none',
              background: 'var(--bc-cloud)',
            }}
          >
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{
                  background: 'linear-gradient(135deg, rgba(15,139,141,0.08), rgba(11,43,91,0.06))',
                  border: '2px solid rgba(15,139,141,0.15)',
                }}
              >
                <Phone size={32} style={{ color: 'var(--bc-teal)' }} />
              </div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--bc-navy)', fontFamily: "'Plus Jakarta Sans'" }}>
                Talk to Suhaas
              </h3>
              <p className="text-sm mt-1.5 max-w-[260px]" style={{ color: 'var(--bc-ink)', opacity: 0.5 }}>
                BharatConnect's AI voice assistant. Available 24×7 in 7 languages.
              </p>
            </div>

            <button
              onClick={connect}
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #0F8B8D, #14B8A6)',
                boxShadow: '0 6px 24px rgba(15, 139, 141, 0.35), 0 4px 12px rgba(0,0,0,0.1)',
              }}
              aria-label="Start call with Suhaas"
            >
              <Phone size={26} className="text-white" strokeWidth={2} />
            </button>
            <p className="text-xs animate-pulse-slow" style={{ color: 'var(--bc-ink)', opacity: 0.35 }}>
              Tap to call
            </p>
          </div>

          {/* Active Call screen (transitions in when connected) */}
          <div
            className="absolute inset-0 flex flex-col overflow-hidden transition-all duration-500"
            style={{
              opacity: isConnected ? 1 : 0,
              transform: isConnected ? 'scale(1)' : 'scale(1.05)',
              pointerEvents: isConnected ? 'auto' : 'none',
            }}
          >
            {/* Call controls bar */}
            <div
              className="flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(11,43,91,0.06)' }}
            >
              <Controls
                isConnected={isConnected}
                status={status}
                micVolume={micVolume}
                onConnect={connect}
                onDisconnect={disconnect}
                onInterrupt={interrupt}
                compact
              />
            </div>

            {/* Chat transcript */}
            <div className="flex-1 overflow-hidden">
              <ChatPanel messages={messages} status={status} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop positioning ── */}
      <style>{`
        @media (min-width: 768px) {
          div[role="dialog"][aria-label="Suhaas voice assistant"] {
            bottom: 16px !important;
            right: 16px !important;
            height: 580px !important;
            max-height: 80vh !important;
            border-radius: 1rem !important;
          }
        }
        @media (max-width: 639px) {
          #suhaas-fab {
            left: 50%;
            right: auto !important;
            transform: translateX(-50%);
          }
        }
      `}</style>
    </>
  );
}
