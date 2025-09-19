import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface QuestaoHeaderProps {
    src: string;
}

export const QuestaoHeader = ({src}:QuestaoHeaderProps) => {
    
  return (
    <header className="w-full bg-sidebar-background sticky top-0 z-10">
        <div className="flex justify-between items-center p-4 max-w-[800px] mx-auto text-background">
            <Link href={src}>
                <Button variant={'ghost'} className="text-foreground" >
                    <ArrowLeft />
                    Sair da questão
                </Button>
            </Link>
        </div>
    </header>
  )
}