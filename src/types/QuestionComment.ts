import { User } from "./User";


export interface QuestionComment {
    id: number;
    content: string;
    userId: number;
    createdAt: Date;
    user: User;
}