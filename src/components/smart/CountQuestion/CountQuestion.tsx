'use client'

import { usePrivateFetch } from "@/lib/fetchPrivateClient";
import { useEffect, useState } from "react";

interface CountQuestionProps {
    className?: string;
    title?: string;
}

export const CountQuestion = ({className}:CountQuestionProps) => {
    const fetchPrivateClient = usePrivateFetch();
    const [count, setCount] = useState(0);

    useEffect(() => {
        const handleRequest = async () => {
            const { count: questionAnswered } = await fetchPrivateClient<{ count: number }>(`users/questions-answered-today-count`)
            setCount(questionAnswered);
        };

        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const [input, init] = args as any;
            const url = typeof input === "string" ? input : input.url;
            const method = (init?.method || "GET").toUpperCase();

            const response = await originalFetch.apply(window, args);

            if (
                method === "POST" &&
                url.includes("question/answer")
            ) {
                handleRequest();
            }

            return response;
        };

        handleRequest();

        return () => {
            window.fetch = originalFetch;
        };
    }, [fetchPrivateClient])

    return <div className={`px-2 rounded outline-1 outline-offset-[-1px] outline-border ${className}`}>
        <div className="py-[8px] justify-start text-muted-foreground text-xs font-normal leading-none">Questões diárias: {count}/10</div>
    </div>
}