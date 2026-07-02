import { useEffect, useRef } from 'react';
import { MessageCircle, Headphones, User, Sparkles } from 'lucide-react';
import { Message } from '../hooks/useWebSocket';

type ChatPanelProps = {
  messages: Message[];
  status: 'idle' | 'listening' | 'thinking' | 'speaking';
};

export function ChatPanel({ messages, status }: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const visibleCount = messages.filter((m) => m.speaker !== 'system').length;

  return (
    <div className="chat-panel-root">
      {/* ── Premium Panel Header ── */}
      <div className="chat-panel-header">
        <div className="chat-panel-header-left">
          <div className="chat-header-icon-wrap">
            <MessageCircle size={13} strokeWidth={2.5} />
            <span className="chat-header-icon-ping" />
          </div>
          <span className="chat-header-title">Transcript</span>
          <span className="chat-header-live-dot" />
        </div>

        {visibleCount > 0 && (
          <span className="chat-header-count">
            <Sparkles size={10} strokeWidth={2.5} />
            {visibleCount}
          </span>
        )}
      </div>

      {/* ── Messages scroll area ── */}
      <div
        ref={scrollRef}
        className="chat-panel-messages"
      >
        {messages.length === 0 ? (
          /* ── Empty state ── */
          <div className="chat-empty-state">
            <div className="chat-empty-icon-ring">
              <div className="chat-empty-icon-inner">
                <MessageCircle size={24} strokeWidth={1.5} />
              </div>
              <span className="chat-empty-ring-pulse" />
            </div>
            <p className="chat-empty-text">Conversation will appear here</p>
            <div className="chat-empty-dots">
              {[0, 1, 2].map((i) => (
                <span key={i} className="chat-empty-dot" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`chat-msg-row chat-msg-row--${message.speaker}`}
              style={{ animationDelay: `${Math.min(index * 0.06, 0.5)}s` }}
            >
              {message.speaker === 'system' ? (
                /* ── System message ── */
                <div className="chat-system-msg">
                  <span className="chat-system-line" />
                  <span className="chat-system-text">{message.text}</span>
                  <span className="chat-system-line" />
                </div>
              ) : (
                /* ── Chat bubble ── */
                <div className={`chat-bubble-wrap chat-bubble-wrap--${message.speaker}`}>
                  {/* Avatar */}
                  <div className={`chat-avatar chat-avatar--${message.speaker}`}>
                    {message.speaker === 'user' ? (
                      <User size={14} strokeWidth={2.2} />
                    ) : (
                      <Headphones size={14} strokeWidth={2.2} />
                    )}
                    <span className={`chat-avatar-glow chat-avatar-glow--${message.speaker}`} />
                  </div>

                  {/* Bubble */}
                  <div className={`chat-bubble chat-bubble--${message.speaker}`}>
                    <div className="chat-bubble-header">
                      <span className="chat-bubble-speaker">
                        {message.speaker === 'user' ? 'You' : 'Suhaas'}
                      </span>
                      <span className="chat-bubble-accent" />
                    </div>
                    <div className="chat-bubble-text">
                      {message.text}
                    </div>
                    {/* Decorative shimmer */}
                    <span className="chat-bubble-shimmer" />
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        {/* ── Typing indicator ── */}
        {status === 'thinking' && (
          <div className="chat-msg-row chat-msg-row--ai" style={{ animationDelay: '0s' }}>
            <div className="chat-bubble-wrap chat-bubble-wrap--ai">
              <div className="chat-avatar chat-avatar--ai">
                <Headphones size={14} strokeWidth={2.2} />
                <span className="chat-avatar-glow chat-avatar-glow--ai" />
              </div>
              <div className="chat-bubble chat-bubble--ai chat-bubble--typing">
                <div className="chat-bubble-header">
                  <span className="chat-bubble-speaker">Suhaas</span>
                </div>
                <div className="chat-typing-wave">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="chat-typing-bar"
                      style={{ animationDelay: `${i * 0.12}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
