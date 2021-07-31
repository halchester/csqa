import { Document } from "mongoose";

export type QuestionDoc = Document & {
  title: string;
  body: string;
  author: UserDoc;
  createdAt: Date;
  questionId: string;
  comments: CommentDoc[];
};

export type UserDoc = Document & {
  email: string;
  username: string;
  fullName: string;
  password: string;
  userId: string;
  questions: QuestionDoc[];
};

export type CommentDoc = any;
