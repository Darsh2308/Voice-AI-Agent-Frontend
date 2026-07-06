import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { useWebSocket, type Status, type Message } from '../../hooks/useWebSocket';

interface SuhaasContextValue {
  isOpen: boolean;
  openSuhaas: () => void;
  closeSuhaas: () => void;
  toggleSuhaas: () => void;
  isConnected: boolean;
  status: Status;
  messages: Message[];
  micVolume: number;
  connect: () => Promise<void> | void;
  disconnect: () => void;
  interrupt: () => void;
}

const SuhaasContext = createContext<SuhaasContextValue | null>(null);

export function SuhaasProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected, status, messages, micVolume, connect, disconnect, interrupt } =
    useWebSocket();

  const openSuhaas = useCallback(() => setIsOpen(true), []);
  const closeSuhaas = useCallback(() => setIsOpen(false), []);
  const toggleSuhaas = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <SuhaasContext.Provider
      value={{
        isOpen,
        openSuhaas,
        closeSuhaas,
        toggleSuhaas,
        isConnected,
        status,
        messages,
        micVolume,
        connect,
        disconnect,
        interrupt,
      }}
    >
      {children}
    </SuhaasContext.Provider>
  );
}

export function useSuhaas() {
  const ctx = useContext(SuhaasContext);
  if (!ctx) throw new Error('useSuhaas must be used within SuhaasProvider');
  return ctx;
}

