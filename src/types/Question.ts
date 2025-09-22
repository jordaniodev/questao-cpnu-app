
import { Alternative } from "./Alternative";
import { QuestionAnswered } from "./QuestionAnswered";
import { Subtopic } from "./Subtopic";
import { TestQuestion } from "./TestQuestion";
import { Topic } from "./Topic";
import { QuestionComment } from "./QuestionComment";

export interface Question {
  id: number;
  topicId: number;
  subtopicId?: number;
  statement: string;
  createdAt?: Date;
  updatedAt?: Date;
  comment?: string;
  alternatives: Alternative[];
  subtopic: Subtopic;
  topic: Topic;
  testQuestions: TestQuestion[];
  questionAnswereds: QuestionAnswered[];
  questionComments: QuestionComment[];
}
