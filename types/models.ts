import { Document } from "mongoose";

export type QuestionDoc = Document & {
  title: string;
  body: string;
  author: UserDoc;
  createdAt: Date;
  uniqueId: string;
};

export type UserDoc = Document & {
  email: string;
  username: string;
  fullName: string;
  password: string;
  userId: string;
  questions: QuestionDoc[];
};
