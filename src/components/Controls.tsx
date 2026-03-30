import { Mic, MicOff, Zap } from 'lucide-react';
import { Status } from '../hooks/useWebSocket';

type ControlsProps = {
  isConnected: boolean;
  status: Status;
  micVolume: number;
  onConnect: () => void;
  onDisconnect: () => void;
  onInterrupt: () => void;
};

const STATUS_LABELS: Record<Status, string> = {
  idle: 'Ready',
  listening: 'Listening',
  thinking: 'Processing',
  speaking: 'Speaking',
};

const STATUS_STYLES: Record<Status, { color: string; glow: string }> = {
  idle: { color: '#A855F7', glow: 'rgba(168, 85, 247, 0.4)' },
  listening: { color: '#C084FC', glow: 'rgba(192, 132, 252, 0.4)' },
  thinking: { color: '#FFB800', glow: 'rgba(255, 184, 0, 0.4)' },
  speaking: { color: '#FF6B00', glow: 'rgba(255, 107, 0, 0.4)' },
};

// Per-bar multipliers — bell-curve shape so centre bars are tallest
const BAR_MULTIPLIERS = [0.3, 0.45, 0.6, 0.75, 0.88, 1.0, 0.95, 1.0, 0.88, 0.75, 0.6, 0.45, 0.3];
const MAX_BAR_HEIGHT = 56; // px — matches the h-14 container
const SILENCE_HEIGHT = 3;  // px — flat line when not speaking
const SPEAK_THRESHOLD = 0.015;

export function Controls({
  isConnected,
  status,
  micVolume,
  onConnect,
  onDisconnect,
  onInterrupt,
}: ControlsProps) {
  const { color } = STATUS_STYLES[status];

  return (
    <div className="flex flex-col items-center gap-4 py-7">
      {/* ── Status label ── */}
      <div className="flex items-center gap-2 h-5">
        <span
          className="text-xs font-bold tracking-[0.3em] uppercase transition-colors duration-700"
          style={{ color, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {STATUS_LABELS[status]}
        </span>
        {isConnected && (
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: color }}
          />
        )}
      </div>

      {/* ── Sound wave bars — purely reactive to mic, no animation fallback ── */}
      <div
        className="flex gap-1 items-end transition-opacity duration-300"
        style={{ opacity: status === 'listening' ? 1 : 0, height: `${MAX_BAR_HEIGHT}px` }}
      >
        {BAR_MULTIPLIERS.map((multiplier, i) => {
          const isSpeaking = status === 'listening' && micVolume > SPEAK_THRESHOLD;
          const barHeight = isSpeaking
            ? Math.min(MAX_BAR_HEIGHT, Math.max(SILENCE_HEIGHT + 4, micVolume * MAX_BAR_HEIGHT * multiplier * 5))
            : SILENCE_HEIGHT;
          return (
            <div
              key={i}
              className="w-2 rounded-full"
              style={{
                background: isSpeaking
                  ? `linear-gradient(to top, #7C3AED, #C084FC)`
                  : 'rgba(168, 85, 247, 0.25)',
                height: `${barHeight}px`,
                transition: 'height 80ms ease-out, background 200ms ease',
              }}
            />
          );
        })}
      </div>

      {/* ── Button row ── */}
      <div className="flex items-center gap-5">
        {/* Interrupt button */}
        {isConnected && (
          <button
            onClick={onInterrupt}
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #D97706, #FFB800)',
              boxShadow: '0 0 24px rgba(217, 119, 6, 0.45), 0 4px 16px rgba(0,0,0,0.4)',
            }}
            title="Interrupt AI"
          >
            <Zap size={20} className="text-white" strokeWidth={2.5} />
          </button>
        )}

        {/* Main mic button */}
        <button
          onClick={isConnected ? onDisconnect : onConnect}
          className="relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          style={
            isConnected
              ? {
                  background: 'linear-gradient(135deg, #FF2D00, #FF6B00)',
                  boxShadow: `0 0 38px rgba(255, 69, 0, 0.55), 0 0 80px rgba(255, 107, 0, 0.22), 0 4px 20px rgba(0,0,0,0.5)`,
                }
              : {
                  background: 'linear-gradient(135deg, #6D28D9, #9333EA)',
                  boxShadow: `0 0 38px rgba(109, 40, 217, 0.55), 0 0 80px rgba(147, 51, 234, 0.22), 0 4px 20px rgba(0,0,0,0.5)`,
                }
          }
        >
          {/* Ping ring when active */}
          {isConnected && (
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ background: 'rgba(255, 107, 0, 0.6)' }}
            />
          )}
          {isConnected ? (
            <MicOff size={32} className="text-white relative z-10" strokeWidth={2} />
          ) : (
            <Mic size={32} className="text-white relative z-10" strokeWidth={2} />
          )}
        </button>
      </div>

      {/* ── Hint text ── */}
      <p
        className="text-xs transition-colors duration-500"
        style={{ color: 'rgba(255,255,255,0.22)' }}
      >
        {isConnected ? 'Tap to disconnect' : 'Tap to connect'}
      </p>
    </div>
  );
}
