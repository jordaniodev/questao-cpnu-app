import { Alternative } from "@/types/Alternative";
import { Question } from "@/types/Question";
import { Topic } from "@/types/Topic";
import { QUESTIONS } from "./page.data";
import { QuestionChallenge } from "./(components)/QuestionChallenge";
import { Block } from "@/types/Block";

interface DesafioPageProps {
    params: Promise<{
        id: string;
    }>;
}

export interface AlternativeQuestionChallenge extends Pick<Alternative, 'id' | 'description' | 'position' | 'correctAnswer'> {}
export interface QuestionChallenge extends Pick<Question, 'statement' | 'comment'> {
    alternatives: Array<AlternativeQuestionChallenge>;
    topic: Pick<Topic, 'name'>;
}
export interface QuestionChallengeData {
    [key: number]: {
        questions: Array<QuestionChallenge>
        bloco: Pick<Block, 'id' | 'name'> & {
            link: string;
        };
    }
}

export default async function Page({ params }: DesafioPageProps) {
    const id = Number((await params).id);
    const questionData = QUESTIONS[id];
    const questoes = questionData?.questions || [];

    return <>
        <div className="w-full h-[140px] bg-sky-50 flex justify-center">
            <div className="max-w-[600px] px-[16px] ">
                <div className="flex items-center h-[140px]">
                    <div className="flex flex-col items-start flex-1">
                        <p className="text-blue-600 md:text-2xl text-xl font-black uppercase leading-normal">Desafio Simula PRO  <span className="text-green-400">2025</span></p>
                        <p className="px-3 py-1.5 bg-sky-100 rounded-2xl font-bold inline-flex justify-center items-center gap-2 text-blue-600 text-xs leading-none">Bloco {id}</p>
                    </div>
                    <img src="/images/challenge.svg" alt="Desafio Simula PRO" />
                </div>
            </div>
        </div>
        <QuestionChallenge bloco={questionData.bloco} questions={questoes} />
    </>
}