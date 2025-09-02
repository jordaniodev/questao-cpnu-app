import { Card, CardContent } from "@/components/ui/card";
import { fetchPublicServer } from "@/lib/fetchPublic";
import { Block } from "@/types/Block";
import { PaginateResponse } from "@/types/Paginate";
import Link from "next/link";
export default async function Home() {

  const blocks = await fetchPublicServer<PaginateResponse<Block>>('blocks');

  return (
    <div className="flex max-w-[800px] flex-col mx-auto mt-[48px] gap-[24px] px-[16px]">
      <div className="w-full flex gap-[2rem] items-center flex-col">
        <img src="/images/logo.svg" alt="Simula CPNU" className="mb-[40px]" />
        <div className="flex flex-col sm:flex-row items-center gap-[8px]">
          <img src="/images/logo-badge.svg" alt="Simula CPNU" className="w-[160px]" />
          <div className="flex flex-col justify-center">
            <h1 className="text-primary text-xl font-extrabold leading-7">Teste seu conhecimento para o CNPU com questões inéditas</h1>
            <p className="text-muted-foreground text-sm font-medium font-['Rawline'] leading-tight">Responda questões específicas dos temas e eixos do seu bloco do CPNU e pratique seu conhecimento diariamente com questões inéditas de acordo com a banca FVG</p>
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="flex flex-col gap-[12px] pb-[40px]">
          {blocks.data.map((block, index) => (
            <Link href={`/escolha-tipo/${block.id}`} className="w-full" key={block.id}>
              <Card className="w-full  p-[16px]">
                <CardContent className="gap-[12px] flex px-0">
                  <img src={`images/icons/${block.id}.svg`} alt="" width={40} />
                  <div className="flex flex-col">
                    <p className="text-primary text-sm font-extrabold leading-tight">Bloco {block.number}</p>
                    <p className="text-muted-foreground text-xs font-normal leading-none">{block.name}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
