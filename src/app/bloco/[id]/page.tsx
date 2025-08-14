export const dynamic = "force-dynamic";

import { BlocoPageProps } from "./page.type";

import { Block } from "@/types/Block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChoiceTopics } from "./(components)/ChoiceTopic";
import { Topic } from "@/types/Topic";
import { ChoiceSubTopics } from "./(components)/ChoiceSubTopic";
import { fetchPublicServer } from "@/lib/fetchPublic";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { QuestionByBlock } from "./(components)/QuestionByBlock";


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
        <div className="border-b-1">
            <div className="flex justify-between flex-col items-start p-4 gap-1 max-w-[1280px] mx-auto">
                <h1 className="text-muted-foreground text-sm font-bold font-['Rawline'] leading-tight">Bloco {bloco.number}</h1>
                <h2 className="text-base-muted-foreground text-xs font-normal font-['Rawline'] leading-none capitalize">{bloco.name}</h2>
            </div>
        </div>
        <div className="flex max-w-[800px] flex-col mx-auto mt-[48px] gap-[24px] px-[16px]">
            <QuestionByBlock bloco={bloco} />
            <div className="flex flex-col">
                <h2 className="text-foreground text-2xl font-bold">Escolha o tema ou eixo</h2>
                <h3 className="text-muted-foreground text-sm font-medium">Qual tema você deseja testar seus conhecimentos?</h3>
            </div>
            <Tabs className="w-full flex flex-col items-center" defaultValue="eixos">
                <TabsList className="w-full justify-center">
                    <TabsTrigger value={'eixos'}>Eixos</TabsTrigger>
                    <Tooltip >
                        <TooltipTrigger className="flex-1">
                            <TabsTrigger value={'temas'} disabled={true}> (Em Breve)</TabsTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Em Breve</p>
                        </TooltipContent>
                    </Tooltip>
                </TabsList>
                <TabsContent value="eixos" className="w-full mt-[1rem]">
                    <ChoiceTopics topics={topics} />
                </TabsContent>
                <TabsContent value="temas" className="w-full mt-[1rem]">
                    <ChoiceSubTopics topics={topics} />
                </TabsContent>
            </Tabs>
        </div>
    </>
}