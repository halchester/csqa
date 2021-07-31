export type Question = {
  questionId: number;
  title: string;
  body: string;
  author: User;
  createdAt: Date;
  points: number;
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
