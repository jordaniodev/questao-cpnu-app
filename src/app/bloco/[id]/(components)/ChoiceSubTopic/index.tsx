'use client';

import { ChevronRight, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import { ChoiceTopicProps } from "./index.type";

import React from "react";
import { fetchPrivateServer } from "@/lib/fetchPrivateServer";
import { useRouter } from 'next/navigation'
import { usePrivateFetch } from "@/lib/fetchPrivateClient";

export const ChoiceSubTopics = ({ topics }: ChoiceTopicProps) => {
    const [search, setSearch] = React.useState("");

    const { push } = useRouter();
    const fetchPrivate = usePrivateFetch();
    

    function normalizeText(text: string) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '');
    }

    const handleDrawQuestions = async (topicId: number) => {
        const response = await fetchPrivate<{ id: number }>(`question/draw-by-topic/${topicId}`, {
            method: 'GET',
            next: { revalidate: 60 * 60 * 24 * 30 }
        });

        push(`/questao/${response.id}`);

    }

    const filteredTopics = React.useMemo(() => {
        const normalizedSearch = normalizeText(search);
        return topics
            .map(topic => {
                const topicMatches = normalizeText(topic.name).includes(normalizedSearch);
                const filteredSubtopics = topic.subtopics.filter(subTopic =>
                    normalizeText(subTopic.name).includes(normalizedSearch)
                );
                if (topicMatches) {
                    // Se o tópico bate, mostra todos os subtopicos
                    return { ...topic };
                } else if (filteredSubtopics.length > 0) {
                    // Se só subtopicos batem, mostra só os filtrados
                    return { ...topic, subtopics: filteredSubtopics };
                }
                return null;
            })
            .filter(Boolean);
    }, [topics, search]);

    return (
        <div className="flex flex-col gap-[1rem] w-full">
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
            <div className="flex flex-col gap-[1rem] w-full">
                {filteredTopics.length === 0 ? (
                    <div className="w-full min-h-[48px] flex items-center justify-center text-muted-foreground text-sm">
                        Nenhum resultado encontrado
                    </div>
                ) : (
                    filteredTopics.map((topic) => {
                        if (!topic) return null;
                        return (
                            <div key={topic.id} className="flex flex-col gap-[8px] w-full">
                                <span className="text-base-muted-foreground text-sm font-bold leading-tight">{topic.name}</span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4">
                                    {topic.subtopics.map(subTopic => (
                                        <Card key={subTopic.id} className="cursor-pointer" onClick={() => handleDrawQuestions(topic.id)}>
                                            <CardContent>
                                                <CardTitle className="flex items-center justify-between">
                                                    <h3 className="flex items-center justify-between text-[12px] leading-[16px]">{subTopic.name}</h3>
                                                    <CardAction>
                                                        <ChevronRight />
                                                    </CardAction>
                                                </CardTitle>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
}