'use client'

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleOff } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlternativeQuestionChallenge, QuestionChallenge as QuestionChallengeType } from "../../page";
import { useAuth } from "@clerk/nextjs";
import { useAuthModal } from "@/app/(components)/AuthModal/index.hook";

export interface QuestionChallengeProps {
    questions: QuestionChallengeType[]
    bloco: {
        id: number;
        name: string;
        link: string;
    }
}

export const QuestionChallenge = ({ questions, bloco }: QuestionChallengeProps) => {
    const [alternativeSelected, setAlternativeSelected] = useState<AlternativeQuestionChallenge>();
    const router = useRouter();
    const [alternativeWasConfirmed, setAlternativeWasConfirmed] = useState(false);
    const alternativeWasSelected = useMemo(() => !!alternativeSelected, [alternativeSelected]);
    const [questionActualIndex, setQuestionActualIndex] = useState<number>(0);
    const [questionHistory, setQuestionHistory] = useState<string[]>(Array(5).fill('default'));

    const questionActual = useMemo(() => questions[questionActualIndex], [questions, questionActualIndex]);
    const allQuestionAnswers = useMemo(() => questionHistory.every(q => q === 'correct' || q === 'wrong'), [questionHistory]);

    const choiceAlternative = async (alternative: AlternativeQuestionChallenge) => {
        if (!alternativeWasConfirmed)
            setAlternativeSelected(alternative);
    }

    const cssClassCTA = () => {
        if (!alternativeWasSelected) return "bg-gray-200 text-gray-500 cursor-not-allowed";

        if (alternativeSelected && !alternativeWasConfirmed) return "bg-[#E0E7FF] text-primary";

        return "";
    }


    const cssClassAlternative = (alternative: AlternativeQuestionChallenge) => {

        const classWrong = " border-red-600 border bg-red-50 text-red-600 font-bold";
        const classCorrect = " border-emerald-500 border bg-emerald-50 text-emerald-500 font-bold";
        const classSelected = " border-primary border bg-[#E0E7FF] text-primary font-bold";

        if (alternativeSelected?.id === alternative.id) {
            if (!alternativeWasConfirmed) return classSelected;

            if (alternativeSelected.correctAnswer) return classCorrect;

            return classWrong;
        }

        return '';
    }

    const continuarHandle = async () => {

        if (alternativeWasConfirmed) {
            questionHistory[questionActualIndex] = alternativeSelected?.correctAnswer ? 'correct' : 'wrong';
            setQuestionHistory([...questionHistory]);
            setQuestionActualIndex((prevIndex) => prevIndex + 1);
            setAlternativeWasConfirmed(false);
            setAlternativeSelected(undefined);
            return
        }

        setAlternativeWasConfirmed(true);
    }

    const handleRetry = async () => {
        setQuestionActualIndex(0);
        setQuestionHistory(Array(5).fill('default'));
    }

    const { isLoaded, isSignedIn } = useAuth();
    const { openModal } = useAuthModal();

    if (isLoaded && !isSignedIn) {
        setTimeout(() => {
            openModal();
        }, 1000);
    }

    return (!allQuestionAnswers ?
        <>
            <div className="flex w-full justify-center mt-[24px]">
                <div className="rounded-2xl outline outline-offset-[-1px] outline-border inline-flex flex-col justify-start items-start overflow-hidden mx-auto w-[600px]">
                    <div className="flex flex-col p-[1rem] bg-sidebar-background border-b border-border justify-center items-start gap-4 overflow-hidden w-[600px]">
                        <h2 className="justify-start text-primary font-bold leading-none">Desafio SimulaPRO 2025</h2>
                        <h3 className="justify-start text-base-muted-foreground text-xs font-normal leading-none">Acerte ao menos 3 de 5 questões do bloco 6 para ganhar um desconto para simulados!</h3>
                        <ul className="list-none flex gap-[4px] w-full">
                            {questionHistory.map((question, index) => (
                                <li
                                    key={index}
                                    className={`h-2 ${question === 'correct'
                                        ? 'bg-emerald-500'
                                        : question === 'wrong'
                                            ? 'bg-[#be185d]'
                                            : 'bg-ring'
                                        } rounded-full overflow-hidden flex-1`}
                                ></li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col p-[1rem]">
                        <p className="justify-start text-muted-foreground text-xs font-normal leading-none">Bloco {bloco.id} - {bloco.name}</p>
                        <p className="justify-center text-muted-foreground text-xs font-bold leading-3">{questionActual.topic.name}</p>
                    </div>
                </div>
            </div>
            <div className="mt-[24px] max-w-[600px] mx-auto">
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
                                    <div class="question-content">${questionActual.statement}</div>
                                `,
                        }}
                    />
                    <div className="flex flex-col gap-[8px]">
                        {questionActual.alternatives.map((alternative, index) => (
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
                            </div>
                            <Button
                                className={"min-w-[120px] w-full sm:w-auto " + cssClassCTA()}
                                onClick={continuarHandle}
                                disabled={!alternativeSelected}
                            >
                                {alternativeWasSelected && !alternativeWasConfirmed ? "Confirmar minha resposta" : alternativeWasConfirmed ? "Próxima Questão" : "Continuar"}
                            </Button>
                        </div>
                    </footer>
                </div>
            </div>
        </> :
        questionHistory.filter(q => q === 'correct').length >= 3 ? (
        <div className="mt-[24px] max-w-[600px] mx-auto">
            <div className="flex w-full justify-center mt-[24px] flex-col gap-4">
                <div className="rounded-2xl outline outline-offset-[-1px] outline-border inline-flex flex-col justify-start items-start overflow-hidden mx-auto w-[600px]">
                    <div className="flex flex-col p-[1rem] bg-sidebar-background border-b border-border justify-center items-start gap-4 overflow-hidden w-[600px]">
                        <h2 className="justify-start text-primary font-bold leading-none">Desafio SimulaPRO 2025</h2>
                        <h3 className="justify-start text-base-muted-foreground text-xs font-normal leading-none">Acerte ao menos 3 de 5 questões do bloco 6 para ganhar um desconto para simulados!</h3>
                    </div>
                </div>
                <h2 className="text-foreground text-xl font-bold leading-7">Parabéns!</h2>
                <ul className="flex w-full gap-[4px] max-w-[300px] mx-auto">
                    {questionHistory.map((question, index) => (
                        <li
                            key={index}
                            className={`flex flex-col items-center flex-1 h-auto text-custom-success text-sm font-bold leading-tight gap-[4px]`}
                        >
                            <span>
                                {index + 1}
                            </span>
                            <div
                                className={`w-full h-[8px] mt-1 rounded-full overflow-hidden ${question === 'correct'
                                    ? 'bg-emerald-500'
                                    : question === 'wrong'
                                        ? 'bg-[#be185d]'
                                        : 'bg-ring'
                                    }`}
                            ></div>
                        </li>
                    ))}
                </ul>
                <div className=" bg-surfaces-neutral-surface-neutral-50 rounded-[10px] flex flex-col justify-start items-center gap-5">
                    <p>Você finalizou o teste e já mandou bem acertando {questionHistory.filter(q => q === 'correct').length} de 5 questões. E tem mais: por completar o teste, você desbloqueou um desconto exclusivo só pra você!</p>
                    <div className="mt-[32px] w-full flex flex-col px-4 pt-6 pb-4 relative rounded-2xl outline outline-offset-[-1px] outline-border justify-start items-start gap-4">
                        <span className="px-3 py-1.5 mt-[-32px] mx-auto z-1 bg-orange-500 rounded-2xl items-center text-center justify-start text-orange-50 text-[10px] font-bold uppercase leading-[10px]">50% de desconto por tempo limitado!</span>
                        <span className="w-full text-center text-foreground text-sm font-bold leading-none">10 simulados do Bloco {bloco.id}</span>
                        <div className="p-6 w-full bg-sidebar-accent rounded-lg flex flex-col justify-center items-center gap-2">
                            <span className="line-through text-foreground text-sm font-normal leading-none">R$ 94,85 <span className="line-through text-muted-foreground text-sm font-normal  leading-none">/Mês</span></span>
                            <span className="text-emerald-500 font-bold text-3xl font-normal leading-9">R$ 47,49 <span className="text-muted-foreground text-xl font-normal leading-tight">/Mês*</span></span>
                        </div>
                        <a href={bloco.link} target="_blank" className="w-full">
                            <Button variant="default" className="w-full bg-emerald-500 hover:bg-emerald-500">
                                Aproveitar desconto agora
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    ) :<div className="mt-[24px] max-w-[600px] mx-auto">
            <div className="flex w-full justify-center mt-[24px] flex-col gap-4">
                <div className="rounded-2xl outline outline-offset-[-1px] outline-border inline-flex flex-col justify-start items-start overflow-hidden mx-auto w-[600px]">
                    <div className="flex flex-col p-[1rem] bg-sidebar-background border-b border-border justify-center items-start gap-4 overflow-hidden w-[600px]">
                        <h2 className="justify-start text-primary font-bold leading-none">Desafio SimulaPRO 2025</h2>
                        <h3 className="justify-start text-base-muted-foreground text-xs font-normal leading-none">Acerte ao menos 3 de 5 questões do bloco 6 para ganhar um desconto para simulados!</h3>
                    </div>
                </div>
                <h2 className="text-foreground text-xl font-bold leading-7">Que pena, você não atingiu o minimo</h2>
                <ul className="flex w-full gap-[4px] max-w-[300px] mx-auto">
                    {questionHistory.map((question, index) => (
                        <li
                            key={index}
                            className={`flex flex-col items-center flex-1 h-auto text-custom-success text-sm font-bold leading-tight gap-[4px]`}
                        >
                            <span>
                                {index + 1}
                            </span>
                            <div
                                className={`w-full h-[8px] mt-1 rounded-full overflow-hidden ${question === 'correct'
                                    ? 'bg-emerald-500'
                                    : question === 'wrong'
                                        ? 'bg-[#be185d]'
                                        : 'bg-ring'
                                    }`}
                            ></div>
                        </li>
                    ))}
                </ul>
                <div className=" bg-surfaces-neutral-surface-neutral-50 rounded-[10px] flex flex-col justify-start items-center gap-5">
                    <p>Você finalizou o teste e acertou {questionHistory.filter(q => q === 'correct').length} de 5 questões. Mas voce pode tentar de novo.</p>
                    <Button variant="default" onClick={() => handleRetry()} className="w-full">
                        Tentar de novo
                    </Button>
                </div>
            </div>
        </div>
    )
}