import { useState } from 'react';
import { Mic, MicOff, PhoneOff } from 'lucide-react';
import { Status } from '../hooks/useWebSocket';

type ControlsProps = {
  isConnected: boolean;
  status: Status;
  micVolume: number;
  onConnect: () => void;
  onDisconnect: () => void;
  onInterrupt: () => void;
  compact?: boolean;
};

const STATUS_LABELS: Record<Status, string> = {
  idle: 'Ready',
  listening: 'Listening…',
  thinking: 'Processing…',
  speaking: 'Suhaas is speaking…',
};

const STATUS_COLORS: Record<Status, string> = {
  idle: 'var(--bc-teal)',
  listening: '#14B8A6',
  thinking: 'var(--bc-amber)',
  speaking: 'var(--bc-teal)',
};

export function Controls({
  isConnected,
  status,
  onDisconnect,
  onInterrupt,
  compact = false,
}: ControlsProps) {
  const [muted, setMuted] = useState(false);

  if (!compact) return null; // Only used in widget now

  return (
    <div className="flex flex-col items-center gap-3 py-4 px-5">
      {/* ── Status ── */}
      <div className="flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: STATUS_COLORS[status] }}
        />
        <span
          className="text-xs font-semibold"
          style={{ color: STATUS_COLORS[status], fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {STATUS_LABELS[status]}
        </span>
      </div>

      {/* ── Call timer / connected indicator ── */}
      {isConnected && (
        <p className="text-xs" style={{ color: 'var(--bc-ink)', opacity: 0.35 }}>
          Call in progress
        </p>
      )}

      {/* ── Button row ── */}
      <div className="flex items-center gap-4">
        {/* Mute button */}
        <button
          onClick={() => {
            setMuted(!muted);
            if (!muted) onInterrupt();
          }}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: muted ? 'rgba(220, 38, 38, 0.08)' : 'rgba(11, 43, 91, 0.06)',
            border: muted ? '1.5px solid rgba(220, 38, 38, 0.2)' : '1.5px solid rgba(11,43,91,0.1)',
          }}
          aria-label={muted ? 'Unmute microphone' : 'Mute microphone'}
          title={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? (
            <MicOff size={20} style={{ color: '#DC2626' }} />
          ) : (
            <Mic size={20} style={{ color: 'var(--bc-navy)' }} />
          )}
        </button>

        {/* End call button */}
        <button
          onClick={onDisconnect}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #DC2626, #EF4444)',
            boxShadow: '0 4px 16px rgba(220, 38, 38, 0.3), 0 2px 6px rgba(0,0,0,0.1)',
          }}
          aria-label="End call"
          title="End call"
        >
          <PhoneOff size={22} className="text-white" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
