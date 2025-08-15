'use client'

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { QuestionProps } from "./index.type";
import { Button } from "@/components/ui/button";
import { BookCheck, CircleCheck, CircleOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Alternative } from "@/types/Alternative";
import { usePrivateFetch } from "@/lib/fetchPrivateClient";
import { useRouter, useSearchParams } from "next/navigation";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

export const Question = ({ question }: QuestionProps) => {
    const fetchPrivateClient = usePrivateFetch();
    const [alternativeSelected, setAlternativeSelected] = useState<Alternative | null>(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const choiceAlternative = async (alternative: Alternative) => {

        if (alternativeSelected) return;

        setAlternativeSelected(alternative);

        await fetchPrivateClient(`question/answer/`, {
            method: 'POST',
            body: JSON.stringify({ alternativeId: alternative.id, questionId: question.id }),
        });
    }

    const continuarHandle = async () => {
        if (!alternativeSelected) return;
        setIsLoading(true);
        const choiceType = typeof window !== "undefined"
            ? new URLSearchParams(window.location.search).get("choiceType") ?? 'block'
            : 'block';

        const newQuestion = await fetchPrivateClient<{ id: number }>(`question/draw/${choiceType}/${question.topicId}`);
        router.replace(`/questao/${newQuestion.id}?choiceType=${choiceType}`);
        setIsLoading(false);
    }

    const classWrong = " border-red-600 border bg-red-50 text-red-600 font-bold";
    const classCorrect = " border-emerald-500 border bg-emerald-50 text-emerald-500 font-bold";

    return (
        <>
            <Drawer>
                <div className="flex gap-[24px] flex-col  sm:pb-[80px] pb-[160px]">
                    <p className="text-foreground text-sm leading-normal">{question.statement}</p>

                    <div className="flex flex-col gap-[8px]">
                        {question.alternatives.map((alternative, index) => (
                            <Card key={index} onClick={() => choiceAlternative(alternative)} className={"mb-2" + (alternativeSelected?.id === alternative.id ? alternativeSelected.correctAnswer ? classCorrect : classWrong : "bg-white")}>
                                <CardContent>
                                    <CardTitle className="flex items-center justify-between text-[12px] leading-[16px]">
                                        {alternative.description}
                                    </CardTitle>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <footer className="fixed w-full py-[20px] flex items-center justify-center bottom-[0px] left-0 z-3 bg-white border-t border-border ">
                        <div className="px-[16px] flex flex-col gap-2 sm:flex-row sm:justify-end sm:max-w-[800px] w-full">
                            <div className={(alternativeSelected ? "justify-between" : "justify-end") + " flex flex-1"}>
                                {alternativeSelected?.correctAnswer && <Button variant={'ghost'}>
                                    <CircleCheck className="text-emerald-500" />
                                    Correta
                                </Button>}
                                {alternativeSelected && !alternativeSelected?.correctAnswer && <Button variant={'ghost'}>
                                    <CircleOff className="text-red-600" />
                                    Incorreta
                                </Button>}
                                <DrawerTrigger disabled={alternativeSelected === null}>
                                    <Button
                                        variant={'ghost'}
                                        className={(alternativeSelected === null ? "text-gray-500 cursor-not-allowed" : "text-primary")}
                                        disabled={alternativeSelected === null}
                                    >
                                        <BookCheck />
                                        Ver justificativa
                                    </Button>
                                </DrawerTrigger>
                            </div>
                            <Button
                                className={"min-w-[120px] w-full sm:w-auto" + (alternativeSelected === null ? " bg-gray-200 text-gray-500 cursor-not-allowed" : (alternativeSelected.correctAnswer ? " bg-emerald-500" : " bg-red-600"))}
                                onClick={continuarHandle}
                                disabled={alternativeSelected === null || isLoading}
                                
                            >
                                {isLoading ? <LoaderCircle className="animate-spin" /> : "Próxima Questão"}

                            </Button>
                        </div>
                    </footer>
                </div>
                <DrawerContent>
                    <DrawerHeader className="p-[32px]">
                        <DrawerTitle className="max-w-[800px] text-left mx-auto">Justificativa</DrawerTitle>
                        <DrawerDescription className="max-w-[800px] text-left mx-auto">{question.comment}</DrawerDescription>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
        </>)
}