import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchPublicServer } from "@/lib/fetchPublic";
import { Block } from "@/types/Block";
import { PaginateResponse } from "@/types/Paginate";
import Link from "next/link";
import { InstallPWAButton } from "./(components)/InstallPWA";
export default async function Home() {

  const blocks = await fetchPublicServer<PaginateResponse<Block>>('blocks');

  return (
    <div className="flex max-w-[800px] flex-col mx-auto mt-[48px] gap-[24px] px-[16px]">
      <div className="w-full flex gap-[2rem] items-center">
        <img src="/images/logo-badge.svg" alt="Simula CPNU" />
        <div className="flex flex-col gap-[8px]">
          <h1 className="text-primary text-xl font-bold font-['Rawline'] leading-7">Teste seu conhecimento para o CNPU com questões inéditas</h1>
          <p className="text-muted-foreground text-sm font-medium font-['Rawline'] leading-tight">Responda questões específicas dos temas e eixos do seu bloco do CPNU e pratique seu conhecimento diariamente com questões inéditas de acordo com a banca FVG</p>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="flex gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3">
          {blocks.data.map((block) => (
            <Card key={block.id} className="bg-sidebar-background min-w-[220px] sm:min-w-0">
              <CardContent className="flex-col gap-[6px] flex">
                <img src={`images/icons/${block.id}.svg`} alt="" width={40} />
                <p className="text-muted-foreground text-xs font-bold font-['Rawline']">Bloco {block.number}</p>
                <p className="text-foreground text-xs font-bold font-['Rawline'] leading-none capitalize">{block.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Link href="/escolha-bloco" className="w-full">
        <Button variant={'default'} className="w-full">Quero testar meus conhecimentos</Button>
      </Link>
      <InstallPWAButton />
    </div>
  );
}
