import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface SuhaasContextValue {
  isOpen: boolean;
  openSuhaas: () => void;
  closeSuhaas: () => void;
  toggleSuhaas: () => void;
}

const SuhaasContext = createContext<SuhaasContextValue | null>(null);

export function SuhaasProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openSuhaas = useCallback(() => setIsOpen(true), []);
  const closeSuhaas = useCallback(() => setIsOpen(false), []);
  const toggleSuhaas = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <SuhaasContext.Provider value={{ isOpen, openSuhaas, closeSuhaas, toggleSuhaas }}>
      {children}
    </SuhaasContext.Provider>
  );
}

export function useSuhaas() {
  const ctx = useContext(SuhaasContext);
  if (!ctx) throw new Error('useSuhaas must be used within SuhaasProvider');
  return ctx;
}
