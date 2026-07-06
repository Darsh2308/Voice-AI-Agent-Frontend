import { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Sparkles, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { useSuhaas } from './SuhaasWidget/SuhaasContext';

export function IPhoneMockup() {
  const {
    isConnected,
    status,
    micVolume,
    connect,
    disconnect,
    messages,
  } = useSuhaas();

  const [muted, setMuted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  
  // Ref for transcript scrolling
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const transcriptContainerRef = useRef<HTMLDivElement>(null);

  // Drag variables for Slide to Call
  const dragX = useMotionValue(0);
  const dragControls = useAnimation();
  const sliderTrackWidth = 220;
  const handleWidth = 44;
  const maxDragDistance = sliderTrackWidth - handleWidth - 8; // ~168px

  // Map drag position to text opacity and glowing handle effects
  const textOpacity = useTransform(dragX, [0, maxDragDistance * 0.7], [1, 0]);
  
  // Call duration timer
  useEffect(() => {
    let interval: any = null;
    if (isConnected) {
      setSeconds(0);
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      setSeconds(0);
      // Reset drag handle when call disconnected
      dragX.set(0);
      void dragControls.start({ x: 0 });
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnected, dragX, dragControls]);

  // Scroll transcripts to bottom
  useEffect(() => {
    if (transcriptContainerRef.current) {
      transcriptContainerRef.current.scrollTop = transcriptContainerRef.current.scrollHeight;
    }
  }, [messages, status]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const getStatusText = () => {
    if (status === 'idle') return 'Calling…';
    if (status === 'listening') return 'Listening…';
    if (status === 'thinking') return 'Processing…';
    if (status === 'speaking') return 'Speaking…';
    return 'Listening…';
  };

  const BAR_COUNT = 11;

  // Handles end of slide drag gesture
  const handleDragEnd = async () => {
    const currentX = dragX.get();
    if (currentX >= maxDragDistance * 0.85) {
      // Slide success: animate to end and start call
      await dragControls.start({ x: maxDragDistance, transition: { duration: 0.15 } });
      connect();
    } else {
      // Slide failed: bounce elastically back to start
      void dragControls.start({ x: 0, transition: { type: 'spring', stiffness: 220, damping: 18 } });
    }
  };

  return (
    <motion.div
      className="relative mx-auto w-[285px] h-[570px] rounded-[48px] bg-[#090D1A] p-3 shadow-2xl border-4 border-gray-800 scale-[0.92] sm:scale-100 origin-center"
      style={{
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.75), 0 0 40px rgba(124, 92, 255, 0.18)',
        perspective: 1000,
      }}
      initial={{ y: 15, rotateY: -2, rotateX: 2 }}
      animate={{ 
        y: [0, -6, 0],
        rotateY: [-2, 0, -2],
        rotateX: [2, 4, 2]
      }}
      transition={{
        y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        rotateY: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        rotateX: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
      }}
      whileHover={{ scale: 1.015, rotateY: 1, rotateX: 1 }}
    >
      {/* ── iOS Outer Bezel shine overlay ── */}
      <div className="absolute inset-0 rounded-[44px] pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/10 z-30" />

      {/* ── Screen glow light source (behinds) ── */}
      <div 
        className="absolute -inset-4 rounded-[60px] pointer-events-none opacity-25 filter blur-3xl z-0 transition-colors duration-700" 
        style={{
          background: isConnected
            ? status === 'speaking'
              ? 'radial-gradient(circle, rgba(124, 92, 255, 0.45) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(20, 184, 166, 0.45) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(11, 43, 91, 0.3) 0%, transparent 70%)'
        }}
      />

      {/* ── iPhone Screen ── */}
      <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-gradient-to-b from-[#09142b] via-[#050b1a] to-[#010308] flex flex-col justify-between py-6 px-4.5 select-none z-10">
        
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-black rounded-full z-40 flex items-center justify-between px-3">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-950/80" />
          <div className="flex gap-1 items-center">
            {isConnected && (
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500"></span>
              </span>
            )}
            <div className="w-3 h-1 rounded-full bg-gray-900" />
          </div>
        </div>

        {/* ── Screen Top Bar ── */}
        <div className="flex justify-between items-center text-[10px] text-white/70 font-semibold px-2.5 mt-1 z-20">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.22 19.58 10.57 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>
            <span className="tracking-wider">5G</span>
            <div className="w-4.5 h-2.5 border border-white/60 rounded-xs p-0.5 flex items-center">
              <div className="w-full h-full bg-white/90 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* ── Screen Body Content ── */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden mt-5 z-20">
          
          <AnimatePresence mode="wait">
            {!isConnected ? (
              /* ========================================================================= */
              /* ── STEP 2 — iPhone Call Screen (Initial State) ───────────────────────── */
              /* ========================================================================= */
              <motion.div
                key="dialer"
                className="flex-1 flex flex-col justify-between py-6 items-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {/* Caller Identity details */}
                <div className="text-center mt-6">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center relative shadow-2xl border border-white/10 bg-gradient-to-br from-[#0B2B5B] to-[#0F8B8D] mx-auto mb-6">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_65%)]" />
                    <Phone size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    Suhaas
                  </h3>
                  <p className="text-xs text-white/50 font-medium mt-1 uppercase tracking-widest">
                    Voice Assistant
                  </p>
                  <p className="text-[10px] text-teal-400 font-bold tracking-wider mt-2.5 uppercase">
                    Ready to connect
                  </p>
                </div>

                {/* Draggable Slide to Call capsule */}
                <div 
                  className="w-[220px] h-[52px] rounded-full flex items-center p-1 relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-inner"
                  style={{ boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.3)' }}
                >
                  {/* Sliding instruction text */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center pl-8 text-[11px] font-bold text-white/70 select-none pointer-events-none uppercase tracking-wider"
                    style={{ opacity: textOpacity }}
                  >
                    Slide to Call
                  </motion.div>

                  {/* Slider Handle */}
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: maxDragDistance }}
                    dragElastic={{ left: 0, right: 0.15 }}
                    dragMomentum={false}
                    style={{ x: dragX }}
                    animate={dragControls}
                    onDragEnd={handleDragEnd}
                    className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg border border-emerald-400/20"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 16px rgba(16,185,129,0.5)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone size={16} className="text-white" />
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              /* ========================================================================= */
              /* ── STEP 3 — Active Call Screen ────────────────────────────────────────── */
              /* ========================================================================= */
              <motion.div
                key="active-call"
                className="flex-1 flex flex-col justify-between overflow-hidden"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                {/* Caller Details Header */}
                <div className="flex-shrink-0 flex items-center justify-between bg-white/5 border border-white/5 rounded-2xl px-3 py-2 text-left mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-indigo-650 flex items-center justify-center font-bold text-xs text-white">
                      S
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white">Suhaas</h3>
                      <p className="text-[10px] text-teal-400 font-bold">{getStatusText()}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-white/80 bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">
                    {formatTime(seconds)}
                  </span>
                </div>

                {/* Conversation Transcripts Area */}
                <div
                  ref={transcriptContainerRef}
                  className="flex-1 overflow-y-auto px-1.5 py-2 space-y-3 scrollbar-none"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  {messages.filter((m) => m.speaker !== 'system').length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-white/30 px-3 py-10">
                      <MessageSquare size={20} className="text-teal-400 mb-2 animate-pulse" />
                      <p className="text-xs font-bold">Connected</p>
                      <p className="text-[10px] mt-1 text-white/35">Suhaas is waiting to hear from you...</p>
                    </div>
                  ) : (
                    messages
                      .filter((m) => m.speaker !== 'system')
                      .map((msg, idx) => {
                        const isUser = msg.speaker === 'user';
                        return (
                          <motion.div
                            key={idx}
                            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                            initial={{ opacity: 0, y: 10, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.25 }}
                          >
                            <div
                              className={`max-w-[85%] rounded-[18px] px-3.5 py-2 text-[11px] leading-relaxed break-words font-medium shadow-sm ${
                                isUser
                                  ? 'bg-gradient-to-br from-[#0F8B8D] to-[#14B8A6] text-white rounded-tr-none'
                                  : 'bg-white/10 text-white border border-white/5 rounded-tl-none'
                              }`}
                            >
                              {msg.text}
                            </div>
                          </motion.div>
                        );
                      })
                  )}

                  {/* Thinking status animated dots */}
                  {status === 'thinking' && (
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="bg-white/10 border border-white/5 rounded-[18px] rounded-tl-none px-3.5 py-2.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0s' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0.15s' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0.3s' }} />
                      </div>
                    </motion.div>
                  )}
                  <div ref={transcriptEndRef} />
                </div>

                {/* Bottom Controls Area (Fixed Waveform + Controls) */}
                <div className="flex-shrink-0 bg-black/10 border border-white/5 rounded-[28px] p-3 mt-1.5">
                  {/* Siri Waveform */}
                  <div className="flex items-end justify-center gap-1 h-6 mb-3 px-2">
                    {Array.from({ length: BAR_COUNT }).map((_, i) => {
                      let height = 3;
                      let delay = 0;
                      let duration = 0.8;
                      let bg = 'rgba(255, 255, 255, 0.2)';

                      if (isConnected) {
                        if (status === 'speaking') {
                          const sines = [
                            Math.sin(i * 0.8) * 10 + 12,
                            Math.sin(i * 1.2) * 12 + 14,
                            Math.sin(i * 0.5) * 6 + 8
                          ];
                          height = Math.max(3, sines[i % 3]);
                          duration = 0.35 + (i % 4) * 0.08;
                          bg = 'linear-gradient(to top, #7C5CFF, #A78BFA)';
                        } else if (status === 'listening') {
                          const vol = Math.max(0.05, micVolume);
                          height = 3 + vol * 24 * (1 + Math.sin(i * 0.4));
                          duration = 0.25;
                          bg = 'linear-gradient(to top, #0F8B8D, #14B8A6)';
                        } else if (status === 'thinking') {
                          height = 6 + Math.sin(Date.now() / 200 + i * 0.5) * 5;
                          duration = 0.9;
                          delay = i * 0.05;
                          bg = 'linear-gradient(to top, #B7791F, #D69E2E)';
                        }
                      }

                      return (
                        <motion.div
                          key={i}
                          className="w-1 rounded-full"
                          animate={{ height }}
                          style={{ background: bg }}
                          transition={{
                            repeat: Infinity,
                            duration,
                            delay,
                            ease: 'easeInOut'
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Exactly 2 Buttons: Mute (Left) and End (Right) */}
                  <div className="flex justify-center items-center gap-8 py-0.5">
                    {/* Mute Button */}
                    <div className="flex flex-col items-center gap-1">
                      <motion.button
                        onClick={() => setMuted(!muted)}
                        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                          muted 
                            ? 'bg-white text-black shadow-lg shadow-white/10' 
                            : 'bg-white/10 text-white hover:bg-white/15 border border-white/10'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Mute Microphone"
                      >
                        {muted ? <MicOff size={18} /> : <Mic size={18} />}
                      </motion.button>
                      <span className="text-[9px] text-white/50 font-bold uppercase tracking-wider">Mute</span>
                    </div>

                    {/* End Call Button */}
                    <div className="flex flex-col items-center gap-1">
                      <motion.button
                        onClick={disconnect}
                        className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-red-650 to-red-500 text-white shadow-lg shadow-red-500/25 border border-red-500/10"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        title="End Call"
                      >
                        <PhoneOff size={20} strokeWidth={2.5} />
                      </motion.button>
                      <span className="text-[9px] text-white/50 font-bold uppercase tracking-wider">End</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </motion.div>
  );
}
