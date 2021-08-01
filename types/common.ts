export type Question = {
  questionId: number;
  title: string;
  body: string;
  author: User;
  updatedAt: Date;
  createdAt: Date;
  points: number;
  comments: Comment[];
};

export type User = {
  createdAt: Date;
  email: string;
  username: string;
  fullName: string;
  userId: string;
  password: string;
  updatedAt: Date;
  questions: Question[];
  _id: string;
};

export type Comment = {
  comment: string;
  points: number;
  author: User;
  commentId: string;
  createdAt: Date;
  updatedAt: Date;
};
