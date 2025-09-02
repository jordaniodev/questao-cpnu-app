'use client'

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { QuestionProps } from "./index.type";
import { Button } from "@/components/ui/button";
import { BookCheck, CircleCheck, CircleOff, LoaderCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { Alternative } from "@/types/Alternative";
import { usePrivateFetch } from "@/lib/fetchPrivateClient";
import { useRouter, useSearchParams } from "next/navigation";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useAuth } from "@clerk/nextjs";
import { useAuthModal } from "@/app/(components)/AuthModal/index.hook";
import { Question as QuestionType } from "@/types/Question";
import { Ads } from "@/types/Ads";
import { AdsModal } from "../AdsModal";

export const Question = ({ question }: QuestionProps) => {
    const fetchPrivateClient = usePrivateFetch();
    const [alternativeSelected, setAlternativeSelected] = useState<Alternative | null>(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [alternativeWasConfirmed, setAlternativeWasConfirmed] = useState(false);
    const searchParams = useSearchParams();
    const [newQuestion, setNewQuestion] = useState<QuestionType>();
    const alternativeWasSelected = useMemo(() => !!alternativeSelected, [alternativeSelected]);
    const tipoQuestao = searchParams.get('tipoQuestao') ?? 'question';
    const [ads, setAds] = useState<Ads>();

    const choiceAlternative = async (alternative: Alternative) => {
        if(!alternativeWasConfirmed)
            setAlternativeSelected(alternative);
    }

    const cssClassCTA = () => {
        if(isLoading || !alternativeWasSelected) return "bg-gray-200 text-gray-500 cursor-not-allowed";

        if(alternativeSelected && !alternativeWasConfirmed) return "bg-[#E0E7FF] text-primary";

        return "";
    }


    const cssClassAlternative = (alternative: Alternative) => {

    const classWrong = " border-red-600 border bg-red-50 text-red-600 font-bold";
    const classCorrect = " border-emerald-500 border bg-emerald-50 text-emerald-500 font-bold";
    const classSelected = " border-primary border bg-[#E0E7FF] text-primary font-bold";

        if (alternativeSelected?.id === alternative.id) {
            if(!alternativeWasConfirmed) return classSelected;

            if(alternativeSelected.correctAnswer) return classCorrect;

            return classWrong;
        }

        return '';
    }


    const sendAnswer = async () => {
        try {

            setIsLoading(true);
            if (!alternativeSelected) return;

            await fetchPrivateClient(`question/answer/`, {
                method: 'POST',
                body: JSON.stringify({ alternativeId: alternativeSelected.id, questionId: question.id }),
            });

            setAlternativeWasConfirmed(true);
        }catch(error){
            console.error(error);
        }finally {
            setIsLoading(false);
        }
    }

    const continuarHandle = async () => {
        setIsLoading(true);
        if(!alternativeWasConfirmed && alternativeSelected)
                return sendAnswer();

        if (!alternativeSelected) return;

        const choiceType = typeof window !== "undefined"
            ? new URLSearchParams(window.location.search).get("choiceType") ?? 'block'
            : 'block';

        const topicId = choiceType === 'block' ? question.topic.block.id : question.topicId;
        const newQuestion = await fetchPrivateClient<{ question: QuestionType, ads?: Ads }>(`question/draw/${choiceType}/${topicId}?questionType=${tipoQuestao}`);

        if(newQuestion.ads){
            setAds(newQuestion.ads);
            setNewQuestion(newQuestion.question);
        }else {
            router.replace(`/questao/${newQuestion.question.id}?choiceType=${choiceType}&tipoQuestao=${tipoQuestao}`);
        }

    }


    const { isLoaded, isSignedIn } = useAuth();
    const { openModal } = useAuthModal();

    if (isLoaded && !isSignedIn) {
        setTimeout(() => {
            openModal();
        }, 1000);
    }

    return (
        <>
            <Drawer>
                <div className="flex gap-[24px] flex-col  sm:pb-[80px] pb-[160px]">
                    <div
                        className="text-foreground text-sm leading-normal"
                        style={{
                            lineHeight: "1.6",
                        }}
                        dangerouslySetInnerHTML={{
                            __html: `
                                <style>
                                    .question-content p { margin-bottom: 0.75em; }
                                    .question-content ul { margin-left: 1.5em; margin-bottom: 0.75em; }
                                    .question-content li { margin-bottom: 0.5em; }
                                </style>
                                <div class="question-content">${question.statement}</div>
                            `,
                        }}
                    />

                    <div className="flex flex-col gap-[8px]">
                        {question.alternatives.map((alternative, index) => (
                            <Card key={index} onClick={() => choiceAlternative(alternative)} className={"mb-2" + cssClassAlternative(alternative)}>
                                <CardContent>
                                    <CardTitle
                                        className="flex items-center justify-between text-[12px] leading-[16px]"
                                        dangerouslySetInnerHTML={{ __html: alternative.description }}
                                    />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <footer className="fixed w-full py-[20px] flex items-center justify-center bottom-[0px] left-0 z-3 bg-white border-t border-border ">
                        <div className="px-[16px] flex flex-col gap-2 sm:flex-row sm:justify-end sm:max-w-[800px] w-full">
                            <div className={(alternativeWasConfirmed ? "justify-between" : "justify-end") + " flex flex-1"}>
                                {alternativeWasConfirmed && <>
                                    {alternativeSelected?.correctAnswer && <Button variant={'ghost'}>
                                        <CircleCheck className="text-emerald-500" />
                                        Correta
                                    </Button>}
                                    {!alternativeSelected?.correctAnswer && <Button variant={'ghost'}>
                                        <CircleOff className="text-red-600" />
                                        Incorreta
                                    </Button>}
                                </>}
                                <DrawerTrigger disabled={!alternativeWasConfirmed}>
                                    <Button
                                        variant={'ghost'}
                                        className={(!alternativeWasConfirmed ? "text-gray-500 cursor-not-allowed" : "text-primary")}
                                        disabled={!alternativeWasConfirmed}
                                    >
                                        <BookCheck />
                                        Ver justificativa
                                    </Button>
                                </DrawerTrigger>
                            </div>
                            <Button
                                // className={"min-w-[120px] w-full sm:w-auto" + (alternativeWasSelected ? " bg-gray-200 text-gray-500 cursor-not-allowed" : (alternativeSelected.correctAnswer ? " bg-emerald-500" : " bg-red-600"))}
                                className={"min-w-[120px] w-full sm:w-auto " + cssClassCTA()}
                                onClick={continuarHandle}
                                disabled={!alternativeSelected || isLoading}
                            >
                                {isLoading ? <LoaderCircle className="animate-spin" /> :
                                    alternativeWasSelected && !alternativeWasConfirmed ? "Confirmar minha resposta" : alternativeWasConfirmed ? "Próxima Questão" : "Continuar"
                                }
                            </Button>
                        </div>
                    </footer>
                </div>
                <DrawerContent>
                    <DrawerHeader className="p-[32px]">
                        <DrawerTitle className="max-w-[800px] text-left mx-auto">Justificativa</DrawerTitle>
                        <DrawerDescription className="max-w-[800px] text-left mx-auto" dangerouslySetInnerHTML={{ __html: question.comment! }}></DrawerDescription>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>

            {ads && newQuestion && <AdsModal question={newQuestion} ads={ads} />}
        </>)
}