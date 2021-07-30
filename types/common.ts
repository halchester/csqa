export type Question = {
  questionId: number;
  title: string;
  body: string;
  author: User;
  createdAt: Date;
  points: number;
};

export type User = {
  email: string;
  username: string;
  fullName: string;
  userId: string;
  questions: Question[];
};
