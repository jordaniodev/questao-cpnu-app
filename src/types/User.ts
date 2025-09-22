import { Block } from "./Block";
import { QuestionAnswered } from "./QuestionAnswered";

export interface User {
  id: number;
  planValidUntil: string;
  createdAt: Date;
  email: string | null;
  phone: string | null;
  bloco: string | null;
  name: string | null;
  block: Block;
  clerk_id: string | null;
  questionAnswereds: QuestionAnswered[];
}
