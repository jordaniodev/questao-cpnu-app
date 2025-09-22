"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type PaymentContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <PaymentContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentModal = () => {
  const context = useContext(PaymentContext);
  if (!context) throw new Error("usePaymentModal must be used within PaymentModalProvider");
  return context;
};
