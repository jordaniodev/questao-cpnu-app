import { fetchPrivateServer } from "@/lib/fetchPrivateServer";
import { Question as QuestionComponent } from "./(component)/Question";
import { Question } from "@/types/Question";
import { QuestaoHeader } from "./(component)/QuestionHeader/QuestionHeader";

interface QuestaoPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function Page({ params }: QuestaoPageProps) {
    const resolvedParams = await params;
    const question = await fetchPrivateServer<Question>(`question/${resolvedParams.id}`, {
        next: { revalidate: 60 * 60 * 24 * 30 }
    });

    return (
        <div>
            <QuestaoHeader src={'/escolha-tipo/' + question.topic.block.id} />
            <div className="flex max-w-[800px] flex-col mx-auto mt-[16px] gap-[24px] px-[16px]">
                <div className="self-stretch p-4 bg-sidebar-background rounded-lg inline-flex flex-col justify-center items-start gap-1">
                    <h3 className=" text-muted-foreground text-xs leading-none">Bloco {question.topic.block.number} - {question.topic.block.name}</h3>
                    <div className="text-muted-foreground text-xs font-bold leading-3">{question.topic.name} {question?.subtopic.name ? `- ${question?.subtopic.name}` : ''}</div>
                </div>
                <QuestionComponent question={question} />
            </div>
        </div>
        
    )
}
