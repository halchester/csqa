import {useQuery} from "react-query";
import axios from "../lib/api";

const getQuestions = async () => {
  const res = await axios.get("/api/questions");
  return res.data.data;
};

export const useQuestion = (): any => {
  const {data, refetch, isLoading} = useQuery("questions", getQuestions, {
    staleTime: 5000
  });
  const questions = data;
  return [questions, isLoading, {refetch}];
};

export const getQuestionDetail = async (props: any): Promise<any> => {
  const res = await axios.get(`/api/question/${props.queryKey[1]}`);
  return res.data.data;
};
