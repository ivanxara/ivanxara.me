"use client";

import { createContext, useContext } from "react";

const PortfolioChatContext = createContext<(() => void) | null>(null);

export function PortfolioChatProvider({
  children,
  onOpenChat,
}: {
  children: React.ReactNode;
  onOpenChat: () => void;
}) {
  return (
    <PortfolioChatContext.Provider value={onOpenChat}>
      {children}
    </PortfolioChatContext.Provider>
  );
}

export function usePortfolioChat() {
  return useContext(PortfolioChatContext);
}
