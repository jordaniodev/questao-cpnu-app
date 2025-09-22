'use client';
import { CountQuestionContext } from "./CountQuestionContext";
import { usePrivateFetch } from "@/lib/fetchPrivateClient";
import { User } from "@/types/User";
import { useEffect, useState, useCallback } from "react";

export function CountQuestionProvider({ children }: { children: React.ReactNode }) {
    const fetchPrivateClient = usePrivateFetch();
    const [count, setCount] = useState(0);
    const [user, setUser] = useState<User>();

    const loadUser = async () => {
        if(typeof window !== "undefined") {
            const userData = await fetchPrivateClient<User>(`users/me`);
            setUser(userData);
        }
    }

    const updateCount = useCallback(async () => {
        if(typeof window !== "undefined") {
            const { count: questionAnswered } = await fetchPrivateClient<{ count: number }>(`users/questions-answered-today-count`);
            setCount(questionAnswered);
        }
    }, [fetchPrivateClient]);


    useEffect(() => {
        updateCount();
    }, [updateCount]);

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <CountQuestionContext.Provider value={{ count, updateCount, user }}>
            {children}
        </CountQuestionContext.Provider>
    );
}
