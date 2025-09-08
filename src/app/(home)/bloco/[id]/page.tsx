import { BlocoPageProps } from "./page.type";
import { Block } from "@/types/Block";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ChoiceTopics } from "./(components)/ChoiceTopic";
import { Topic } from "@/types/Topic";
import { ChoiceSubTopics } from "./(components)/ChoiceSubTopic";
import { fetchPublicServer } from "@/lib/fetchPublic";
import { QuestionByBlock } from "./(components)/QuestionByBlock";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChoiceHeader } from "./(components)/ChioiceHeader";
import { TabsListsTopics } from "./(components)/TabsListsTopics";


export default async function BlocoPage({ params }: BlocoPageProps) {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const bloco = await fetchPublicServer<Block>(`blocks/${id}`, {
        next: { revalidate: 60 * 60 * 24 * 30 }
    });

    const topics = await fetchPublicServer<Topic[]>(`topic/by-block/${id}`, {
        next: { revalidate: 60 * 60 * 24 * 30 }
    });

    return <>
        <div className="w-full flex justify-center mt-[24px]">
            <div className="w-[800px] overflow-hidden rounded-lg shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] outline-1 outline-offset-[-1px] outline-accent max-w-[90%]">
                <div className="flex items-center bg-sky-100 px-[16px] pt-[8px]">
                    <div className="flex flex-col items-start flex-1">
                        <p className="text-blue-600 md:text-2xl text-xl font-black uppercase leading-normal">Desafio Simula PRO  <span className="text-green-400">2025</span></p>
                        <p className="px-3 py-1.5 bg-sky-100 rounded-2xl font-bold inline-flex justify-center items-center gap-2 text-blue-600 text-xs leading-none">Bloco {id}</p>
                    </div>
                    <img src="/images/challenge.svg" alt="Desafio Simula PRO" />
                </div>
                <Link href={`/desafio/${id}`} className=" text-xs font-medium leading-none p-4 flex w-full text-foreground justify-between items-center">
                    <p>
                        Acerte ao menos 3 de 5 questões do bloco 6 para ganhar um desconto para simulados!
                    </p>
                    <Button variant={'ghost'} size={'sm'}><ChevronRight /></Button>
                </Link>
            </div>
        </div>
        <main className="py-[24px] max-w-[800px] mx-auto px-[16px] flex flex-col gap-[16px]">
            <Link href={`/escolha-tipo/${bloco.id}`} className="flex items-center gap-[8px]">
                <Button variant={'ghost'} >
                    <ArrowLeft />
                    Voltar
                </Button>
            </Link>
            <ChoiceHeader bloco={bloco} />
            <div className="flex flex-col mx-auto  gap-[24px] w-full">
                <QuestionByBlock bloco={bloco} />
                <Tabs className="w-full flex flex-col items-center" defaultValue="eixos">
                    <TabsListsTopics />
                    <TabsContent value="eixos" className="w-full mt-[1rem]">
                        <ChoiceTopics topics={topics} />
                    </TabsContent>
                    <TabsContent value="temas" className="w-full mt-[1rem]">
                        <ChoiceSubTopics topics={topics} />
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    </>
}