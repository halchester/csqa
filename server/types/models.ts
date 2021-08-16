import {Document} from "mongoose";

export type QuestionDoc = Document & {
  title: string;
  body: string;
  author: UserDoc;
  createdAt: Date;
  questionId: string;
  comments: CommentDoc[];
  points: PointDoc;
};

export type UserDoc = Document & {
  email: string;
  username: string;
  fullName: string;
  password: string;
  userId: string;
  questions: QuestionDoc[];
};

export type CommentDoc = Document & {
  comment: string;
  points: number;
  author: UserDoc;
  commentId: string;
};

export type PointDoc = Document & {
  count: number;
  uppers: UserDoc[];
  downers: UserDoc[];
};
