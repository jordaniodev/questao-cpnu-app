'use client'

import { Button } from "@/components/ui/button";
import { useCountQuestion } from "../CountQuestion/CountQuestionContext";

export const CountQuestionBadge = ({className}: {className?: string}) => {
    const { count, user } = useCountQuestion();
    

    return <Button className={`text-muted-foreground font-medium text-xs ${className}`} variant={'secondary'} size={'sm'}>{!user?.planValidUntil ? `Questões gratuitas diárias: ${count}/3` : 'Ilimitado [Usuário PRO]'}</Button>;
}