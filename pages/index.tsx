import * as React from "react";
import { Question } from "../components/common/Question";
import { Layout } from "../components/layout/Layout";
import { QUESTIONS_PER_PAGE } from "../constants/common";
import { Pagination } from "../components/common/Pagination";
import { useQuestion } from "../hooks/question";
import { Question as QuestionT } from "../types/common";
import { Center, CircularProgress } from "@chakra-ui/react";
import { useUser } from "../hooks/users";
import { useUserData } from "../store/userStore";

const IndexPage = () => {
  const [currPage, setCurrPage] = React.useState(1);
  const [questions, isLoading] = useQuestion();
  const setUserData = useUserData((state) => state.setUserData);
  const [user] = useUser();

  React.useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, []);

  let indexOfLastQuestion = currPage * QUESTIONS_PER_PAGE;
  let indexOfFirstQuestion = indexOfLastQuestion - QUESTIONS_PER_PAGE;
  let currQuestions = questions?.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const paginate = (num: number) => setCurrPage(num);

  return (
    <Layout>
      {isLoading ? (
        <Center>
          <CircularProgress isIndeterminate />
        </Center>
      ) : questions ? (
        <>
          {currQuestions.map((question: QuestionT, idx: number) => (
            <Question question={question} key={idx} />
          ))}
          {questions.length > 8 ? (
            <Pagination totalQuestions={questions.length} paginate={paginate} />
          ) : null}
        </>
      ) : null}
    </Layout>
  );
};

export default IndexPage;
