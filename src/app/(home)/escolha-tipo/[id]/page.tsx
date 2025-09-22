import { CountQuestionBadge } from "@/components/smart/CountQuestionBadge/CountQuestionBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SignedIn } from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link";

interface EscolhaTipoProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function Page({ params }: EscolhaTipoProps) {

    const resolvedParams = await params;

    return <main className="py-[24px] max-w-[800px] mx-auto px-[16px] flex flex-col gap-[16px]">
        <h1 className="text-primary text-xl font-extrabold leading-7" >Tipo de questão <span className="text-muted-foreground">Bloco {resolvedParams.id}</span></h1>
        <div className="flex md:flex-row flex-col gap-[16px] w-full">
            <Link href={`/bloco/${resolvedParams.id}?tipoQuestao=question`} className="flex-1">
                <Card className="w-full pt-[0] flex flex-col gap-[16px] cursor-pointer overflow-hidden">
                    <div className="w-full h-[160px] relative">
                        <Image src={'/images/question.svg'} alt="Questão Prova" fill className="object-contain bg-[#DFE7FF]" />
                    </div>
                    <div className="px-[24px] flex flex-col gap-[6px] items-start">
                        <h2 className="self-stretch justify-start text-muted-foreground text-sm font-extrabold">Questões de prova</h2>
                        <h3 className="self-stretch justify-start text-muted-foreground text-sm font-normal">Questões no formato da banca FGV</h3>
                        <SignedIn>
                            <CountQuestionBadge className="mt-[10px]" />
                        </SignedIn>
                    </div>
                </Card>
            </Link>
            <Link href={`/bloco/${resolvedParams.id}?tipoQuestao=exercise`}  className="flex-1">
                <Card className="w-full pt-[0] flex flex-col gap-[16px] cursor-pointer overflow-hidden">
                    <div className="w-full h-[160px] relative">
                        <Image src={'/images/exercise.svg'} alt="Questão Exercício" fill className="object-contain bg-[#DFE7FF]"/>
                    </div>
                    <div className="px-[24px] flex flex-col gap-[6px] items-start">
                        <h2 className="self-stretch justify-start text-muted-foreground text-sm font-extrabold">Exercícios rápidos</h2>
                        <h3 className="self-stretch justify-start text-muted-foreground text-sm font-normal">Perguntas rápidas para testar conhecimentos</h3>
                        <SignedIn>
                            <Button className="mt-[10px] text-muted-foreground font-medium text-xs" variant={'secondary'} size={'sm'}>Ilimitado</Button>
                        </SignedIn>
                    </div>
                </Card>
            </Link>
        </div>
    </main>
}