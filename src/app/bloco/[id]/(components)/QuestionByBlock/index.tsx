'use client';
import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card"
import { usePrivateFetch } from "@/lib/fetchPrivateClient";
import { Block } from "@/types/Block";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export const QuestionByBlock = ({ bloco }: { bloco: Block }) => {

    const fetchClient = usePrivateFetch();

    const {push} = useRouter();

    const handleDrawQuestionsByBlock = async () => {
        const response = await fetchClient<{ id: number }>(`/question/draw-by-block/${bloco.id}`, {
            method: 'POST'
        });


        push(`/questao/${response.id}?choiceType=block`);
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