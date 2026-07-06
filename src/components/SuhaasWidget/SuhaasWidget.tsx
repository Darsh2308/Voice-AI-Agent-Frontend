import { useEffect } from 'react';
import { Phone, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSuhaas } from './SuhaasContext';
import { IPhoneMockup } from '../iPhoneMockup';

const STATUS_DOT_COLORS: Record<string, string> = {
  idle: '#0F8B8D',
  listening: '#14B8A6',
  thinking: '#B7791F',
  speaking: '#7C5CFF',
};

export function SuhaasWidget() {
  const {
    isOpen,
    openSuhaas,
    closeSuhaas,
    isConnected,
    status,
    disconnect,
  } = useSuhaas();

  // Close assistant connection and dialog
  const handleClose = () => {
    if (isConnected) disconnect();
    closeSuhaas();
  };

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, isConnected]);

  return (
    <>
      {/* ── 3D Floating Arrow and Badge (Guides to FAB) ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed z-[9997] flex flex-col items-center gap-2.5 pointer-events-none left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[20px]"
            style={{
              bottom: '90px',
            }}
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {/* Glowing Badge */}
            <motion.div
              className="px-4 py-2 rounded-full text-xs font-bold text-white flex items-center gap-2 shadow-2xl border border-teal-400/20"
              style={{
                background: 'linear-gradient(135deg, #0F8B8D, #7C5CFF)',
                boxShadow: '0 8px 30px rgba(124, 92, 255, 0.4), 0 2px 8px rgba(0,0,0,0.15)',
              }}
              animate={{
                y: [0, -6, 0],
                boxShadow: [
                  '0 8px 24px rgba(124, 92, 255, 0.3), 0 2px 8px rgba(0,0,0,0.15)',
                  '0 12px 36px rgba(20, 184, 166, 0.5), 0 2px 8px rgba(0,0,0,0.15)',
                  '0 8px 24px rgba(124, 92, 255, 0.3), 0 2px 8px rgba(0,0,0,0.15)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Sparkles size={12} className="text-teal-300 animate-pulse" />
              <span>Try the AI Voice Bot</span>
            </motion.div>

            {/* 3D Styled Arrow */}
            <motion.div
              className="text-2xl filter drop-shadow-[0_4px_6px_rgba(15,139,141,0.5)]"
              animate={{
                y: [0, 8, 0],
                rotate: [12, -8, 12],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              👇
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Collapsed FAB (Call Suhaas Button) ── */}
      <motion.button
        onClick={openSuhaas}
        className="fixed z-[9998] flex items-center gap-2.5 rounded-full text-white"
        style={{
          bottom: '20px',
          right: '20px',
          padding: '14px 22px',
          background: 'linear-gradient(135deg, #0F8B8D, #0B2B5B)',
          boxShadow: '0 8px 32px rgba(15, 139, 141, 0.3), 0 4px 12px rgba(0,0,0,0.15)',
        }}
        animate={
          isOpen
            ? { opacity: 0, scale: 0.8, y: 15, pointerEvents: 'none' }
            : { opacity: 1, scale: 1, y: 0, pointerEvents: 'auto' }
        }
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        aria-label="Open voice assistant Suhaas"
        id="suhaas-fab"
      >
        <Phone size={18} strokeWidth={2.2} />
        <span className="text-sm font-semibold hidden sm:inline">Call Suhaas</span>
        <span
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ background: STATUS_DOT_COLORS[status] || STATUS_DOT_COLORS.idle }}
        />
      </motion.button>

      {/* ── Expanded Dialog (iPhone Calling Flow Modal Overlay) ── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            
            {/* Fullscreen Backdrop Blur */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* iOS Spring Mockup Modal Container */}
            <motion.div
              className="relative z-10 w-full max-w-[290px] flex justify-center items-center pointer-events-auto"
              initial={{ opacity: 0, y: 35, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 35, scale: 0.9 }}
              transition={{ type: 'spring', damping: 24, stiffness: 210 }}
            >
              {/* Close Button on Desktop outside the phone body */}
              <button
                onClick={handleClose}
                className="absolute -top-12 md:-right-12 md:top-2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-colors cursor-pointer active:scale-95"
                aria-label="Close voice assistant"
              >
                <X size={20} />
              </button>

              {/* iPhone Mockup with nested calling state */}
              <IPhoneMockup />
            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* Desktop and Mobile Responsiveness styles */}
      <style>{`
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
