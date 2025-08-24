import { Card, CardContent } from "@/components/ui/card";
import { fetchPrivateServer } from "@/lib/fetchPrivateServer";
import { Block } from "@/types/Block";
import { PaginateResponse } from "@/types/Paginate";
import Link from "next/link";

export default async function EscolhaBloco() {

  const blocks = await fetchPrivateServer<PaginateResponse<Block>>('blocks');
  return (
    <>
      <div className="flex max-w-[800px] flex-col mx-auto mt-[48px] gap-[16px] px-[16px]">
        <header className="flex flex-col gap-[8px]">
          <h1 className="text-base-foreground text-2xl font-bold">Escolha seu bloco</h1>
          <p className="text-muted-foreground text-sm font-medium">Escolha o bloco que você deseja estudar para o CPNU</p>
        </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full ">
        {blocks.data.map((block) => (
          <Link href={`/bloco/${block.id}`} key={block.id} className="w-full">
            <Card key={block.id} className="bg-white">
              <CardContent className=" justify-between gap-[6px] flex ">
                <div className="flex flex-col gap-[6px] flex-1">
                  <p className="text-muted-foreground text-xs font-bold">Bloco {block.number}</p>
                  <p className="text-base-foreground text-xs font-bold leading-none capitalize">{block.name}</p>
                </div>
                <img src={`images/icons-blue/${block.id}.svg`} alt="" width={40} />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      </div>
    </>
  );
}
