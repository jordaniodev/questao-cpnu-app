'use client';
import { CountQuestionContext } from "./CountQuestionContext";
import { usePrivateFetch } from "@/lib/fetchPrivateClient";
import { useEffect, useState, useCallback } from "react";

export function CountQuestionProvider({ children }: { children: React.ReactNode }) {
    const fetchPrivateClient = usePrivateFetch();
    const [count, setCount] = useState(0);

    const updateCount = useCallback(async () => {
        const { count: questionAnswered } = await fetchPrivateClient<{ count: number }>(`users/questions-answered-today-count`);
        setCount(questionAnswered);
    }, [fetchPrivateClient]);

    useEffect(() => {
        updateCount();
    }, [updateCount]);

    return (
        <CountQuestionContext.Provider value={{ count, updateCount }}>
            {children}
        </CountQuestionContext.Provider>
    );
}
