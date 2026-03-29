import { useEffect, useRef } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { Message } from '../hooks/useWebSocket';

type ChatPanelProps = {
  messages: Message[];
};

export function ChatPanel({ messages }: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const visibleCount = messages.filter((m) => m.speaker !== 'system').length;

  return (
    <div className="flex flex-col h-full">
      {/* ── Panel header ── */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-6 py-4"
        style={{ borderBottom: '1px solid rgba(124, 58, 237, 0.18)' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(168,85,247,0.15))',
              border: '1px solid rgba(124, 58, 237, 0.35)',
            }}
          >
            <MessageCircle size={15} style={{ color: '#A855F7' }} />
          </div>
          <div>
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase"
              style={{ color: '#C084FC', fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Conversation
            </p>
            <p className="text-xs" style={{ color: 'rgba(168, 85, 247, 0.45)', marginTop: '1px' }}>
              Voice transcript
            </p>
          </div>
        </div>

        {visibleCount > 0 && (
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: 'rgba(124, 58, 237, 0.15)',
              color: '#A855F7',
              border: '1px solid rgba(124, 58, 237, 0.3)',
            }}
          >
            {visibleCount}
          </span>
        )}
      </div>

      {/* ── Messages scroll area ── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-5 space-y-4"
      >
        {messages.length === 0 ? (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center h-full gap-5 select-none">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{
                background:
                  'linear-gradient(135deg, rgba(59, 7, 100, 0.6), rgba(109, 40, 217, 0.3))',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                boxShadow: '0 0 30px rgba(124, 58, 237, 0.15)',
                animation: 'glowPulse 2.5s ease-in-out infinite',
              }}
            >
              <Sparkles size={32} style={{ color: '#A855F7' }} />
            </div>
            <div className="text-center">
              <p
                className="text-sm font-medium"
                style={{ color: '#C084FC', fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Ready to listen
              </p>
              <p className="text-xs mt-1" style={{ color: 'rgba(168, 85, 247, 0.45)' }}>
                Connect and start speaking to begin
              </p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className="animate-slide-up"
              style={{
                display: 'flex',
                justifyContent:
                  message.speaker === 'user'
                    ? 'flex-end'
                    : message.speaker === 'system'
                    ? 'center'
                    : 'flex-start',
              }}
            >
              {message.speaker === 'system' ? (
                /* ── System message ── */
                <div
                  className="text-xs italic px-4 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    color: 'rgba(255, 255, 255, 0.35)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  {message.text}
                </div>
              ) : (
                /* ── Chat bubble ── */
                <div
                  className="max-w-[82%] rounded-2xl px-4 py-3"
                  style={
                    message.speaker === 'user'
                      ? {
                          background: 'linear-gradient(135deg, #FF4500 0%, #FF6B00 100%)',
                          boxShadow:
                            '0 4px 20px rgba(255, 69, 0, 0.28), 0 1px 0 rgba(255,255,255,0.08) inset',
                        }
                      : {
                          background:
                            'linear-gradient(135deg, rgba(59, 7, 100, 0.75) 0%, rgba(109, 40, 217, 0.55) 100%)',
                          border: '1px solid rgba(124, 58, 237, 0.32)',
                          boxShadow: '0 4px 20px rgba(124, 58, 237, 0.18)',
                        }
                  }
                >
                  <div
                    className="text-xs font-bold tracking-[0.2em] uppercase mb-1.5 opacity-75"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {message.speaker === 'user' ? 'You' : 'AI'}
                  </div>
                  <div className="text-sm leading-relaxed text-white font-light">
                    {message.text}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
