'use client'

import { useCountQuestion } from "./CountQuestionContext";

interface CountQuestionProps {
    className?: string;
    title?: string;
}

export const CountQuestion = ({ className }: CountQuestionProps) => {

    const { count, user } = useCountQuestion();

    if(user?.planValidUntil) return null;

    return <div className={`px-2 rounded outline-1 outline-offset-[-1px] outline-border ${className}`}>
        <div className="py-[8px] justify-start text-muted-foreground text-xs font-normal leading-none">Questões diárias: {count}/3</div>
    </div>;
}