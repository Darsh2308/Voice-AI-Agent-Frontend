import { useEffect, useRef } from 'react';
import { Message } from '../hooks/useWebSocket';

type ChatPanelProps = {
  messages: Message[];
};

export function ChatPanel({ messages }: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="w-full h-64 overflow-y-auto px-6 py-4 space-y-3 bg-black/20 rounded-lg scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          Start speaking to begin the conversation...
        </div>
      ) : (
        messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.speaker === 'user'
                ? 'justify-end'
                : message.speaker === 'system'
                ? 'justify-center'
                : 'justify-start'
            }`}
          >
            {message.speaker === 'system' ? (
              <div className="text-xs text-gray-500 italic px-2">{message.text}</div>
            ) : (
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.speaker === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-100'
                }`}
              >
                <div className="text-xs opacity-70 mb-1">
                  {message.speaker === 'user' ? 'You' : 'AI'}
                </div>
                <div className="text-sm leading-relaxed">{message.text}</div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
