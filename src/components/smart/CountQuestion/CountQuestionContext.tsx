import { User } from "@/types/User";
import { createContext, useContext, useState, useCallback } from "react";

interface CountQuestionContextType {
  count: number;
  user?: User;
  updateCount: () => Promise<void>;
}
    
export const CountQuestionContext = createContext<CountQuestionContextType | undefined>(undefined);

export function useCountQuestion() {
  const ctx = useContext(CountQuestionContext);
  if (!ctx) throw new Error("useCountQuestion must be used within CountQuestionProvider");
  return ctx;
}
