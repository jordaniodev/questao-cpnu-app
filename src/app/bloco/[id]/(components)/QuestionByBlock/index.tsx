'use client';
import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card"
import { usePrivateFetch } from "@/lib/fetchPrivateClient";
import { fetchPrivateServer } from "@/lib/fetchPrivateServer";
import { Block } from "@/types/Block";
import { ChevronRight } from "lucide-react";

export const QuestionByBlock = ({ bloco }: { bloco: Block }) => {

    const fetchClient = usePrivateFetch();

    const handleDrawQuestionsByBlock = async () => {
        const response = await fetchClient(`/question/draw-by-block/${bloco.id}`, {
            method: 'POST'
        });
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