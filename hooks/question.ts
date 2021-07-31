import { useQuery } from "react-query";
import axios from "../lib/api";

const getQuestions = async () => {
  const res = await axios.get("/api/question");
  return res.data.data;
};

export const useQuestion = () => {
  const { data, refetch, isLoading } = useQuery("questions", getQuestions);
  const questions = data;
  return [questions, isLoading, { refetch }];
};
