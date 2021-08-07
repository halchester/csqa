import { useQuery } from "react-query";
import axios from "../lib/api";

const getQuestions = async () => {
  const res = await axios.get("/api/question");
  return res.data.data;
};

export const useQuestion = (): any => {
  const { data, refetch, isLoading } = useQuery("questions", getQuestions, {
    staleTime: 5000,
  });
  const questions = data;
  return [questions, isLoading, { refetch }];
};

export const getQuestionDetail = async ({ queryKey }: any): Promise<any> => {
  const res = await axios.get(`/api/question/${queryKey[1]}`);
  return res.data.data;
};
