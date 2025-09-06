import { Alternative } from "@/types/Alternative";
import { Question } from "@/types/Question";
import { Topic } from "@/types/Topic";

interface DesafioPageProps {
    params: Promise<{
        id: string;
    }>;
}

export interface QuestionChallenge extends Pick<Question, 'statement' | 'comment'> {
    alternatives: Array<Pick<Alternative, 'id' | 'description' | 'position' | 'correctAnswer'>>;
    topic: Pick<Topic, 'name'>;
}
export interface QuestionChallengeData {
    [key: number]: {
        questions: Array<QuestionChallenge>
    }
}

export default async function Page({ params }: DesafioPageProps) {



}