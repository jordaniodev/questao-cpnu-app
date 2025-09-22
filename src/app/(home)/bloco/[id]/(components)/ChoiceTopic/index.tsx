'use client';

import { ChevronRight, LoaderCircle, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import { ChoiceTopicProps } from "./index.type";
import React, { useState } from "react";
import { usePrivateFetch } from "@/lib/fetchPrivateClient";
import { Question } from "@/types/Question";
import { useRouter, useSearchParams } from 'next/navigation'
import { Ads } from "@/types/Ads";


export const ChoiceTopics = ({ topics }: ChoiceTopicProps) => {
    const [search, setSearch] = React.useState("");
    const fetchPrivate = usePrivateFetch();
    const { push } = useRouter();
    const [isLoadingTopicId, setIsLoadingTopicId] = useState<number>(0);
    const searchParams = useSearchParams();
    const tipoQuestao = searchParams.get('tipoQuestao');

    function normalizeText(text: string) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '');
    }

    const filteredTopics = React.useMemo(() => {
        const normalizedSearch = normalizeText(search);
        return topics.filter((topic) =>
            normalizeText(topic.name).includes(normalizedSearch)
        );
    }, [topics, search]);


    const handleDrawQuestions = async (topicId: number) => {

        try {

            setIsLoadingTopicId(topicId)
            const response = await fetchPrivate<{ question: Question, ads?: Ads }>(`question/draw/topic/${topicId}?questionType=${tipoQuestao}`, {
                method: 'GET',
                next: { revalidate: 60 * 60 * 24 * 30 }
            });

            push(`/questao/${response.question.id}?choiceType=topic&tipoQuestao=${tipoQuestao}`);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingTopicId(0);
        }
    }

    return <div className="flex flex-col gap-[1rem] w-full">
        <div className="grid w-full items-center gap-1.5">
            <div className="relative w-full">
                <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                    <SearchIcon className="h-4 w-4" />
                </div>
                <Input
                    id="search"
                    type="search"
                    placeholder="Buscar eixo temático"
                    className="w-full rounded-lg bg-background pl-8"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {/* <Card className="bg-background cursor-pointer">
                <CardContent>
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex flex-col gap-[2px]">
                            <h2 className="text-primary text-xs font-normal leading-none">Eixo Base</h2>
                            <h3 className="flex items-center justify-between text-[12px] leading-[16px]">Conhecimentos gerais</h3>
                        </div>
                        <CardAction className="flex items-center h-[30px]">
                            <ChevronRight />
                        </CardAction>
                    </CardTitle>
                </CardContent>
            </Card> */}
            {filteredTopics.map((topic, index: number) => {
                return <Card key={topic.id} onClick={() => handleDrawQuestions(topic.id)} className="bg-background cursor-pointer">
                    <CardContent>
                        <CardTitle className="flex items-center justify-between">
                            <div className="flex flex-col gap-[2px]">
                                <h2 className="text-primary text-xs font-normal leading-none">Eixo {index + 1}</h2>
                                <h3 className="flex items-center justify-between text-[12px] leading-[16px]">{topic.name}</h3>
                            </div>
                            <CardAction className="flex items-center h-[30px]">
                                {isLoadingTopicId === topic.id ? <LoaderCircle className="animate-spin" /> : <ChevronRight />}
                            </CardAction>
                        </CardTitle>
                    </CardContent>
                </Card>
            })}
        </div>
    </div>
}