'use client';
import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card"
import { usePrivateFetch } from "@/lib/fetchPrivateClient";
import { Ads } from "@/types/Ads";
import { Block } from "@/types/Block";
import { Question } from "@/types/Question";
import { ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const QuestionByBlock = ({ bloco }: { bloco: Block }) => {

    const fetchClient = usePrivateFetch();

    const searchParams = useSearchParams();
    const tipoQuestaoParams = searchParams.get('tipoQuestao');
    const tipoQuestao = tipoQuestaoParams === 'exercise' ? 'exercise' : 'question';

    const { push } = useRouter();

    const handleDrawQuestionsByBlock = async () => {
        const response = await fetchClient<{ question: Question, ads: Ads }>(`question/draw/block/${bloco.id}?questionType=${tipoQuestao}`, {
            method: 'GET'
        });

        push(`/questao/${response.question.id}?choiceType=block&tipoQuestao=${tipoQuestao}`);
    }

    return (
        <Card onClick={() => handleDrawQuestionsByBlock()} className="cursor-pointer">
            <CardContent>
                <CardTitle className="flex items-center justify-between">
                    <h3>Questões aleatórias do bloco {bloco.number}</h3>
                    <CardAction>
                        <ChevronRight />
                    </CardAction>
                </CardTitle>
            </CardContent>
        </Card>
    )
}