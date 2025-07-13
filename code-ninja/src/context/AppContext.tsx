"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  showWelcome: boolean;
  setShowWelcome: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <AppContext.Provider value={{ showWelcome, setShowWelcome }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
