import * as React from "react";
import { Question } from "../components/common/Question";
import { Layout } from "../components/layout/Layout";
import { QUESTIONS_PER_PAGE } from "../constants/common";
import { Pagination } from "../components/common/Pagination";
// import { useQuestion } from "../hooks/question";
import { Question as QuestionT } from "../types/common";
import { Text, Link } from "@chakra-ui/react";
import { useUser } from "../hooks/users";
import { useUserData } from "../store/userStore";
import { GetServerSideProps } from "next";
import axios from "../lib/api";

interface IProps {
  questions: QuestionT[];
}

const IndexPage = ({ questions }: IProps): JSX.Element => {
  console.log(questions);
  const [currPage, setCurrPage] = React.useState(1);
  // const [questions, isLoading] = useQuestion();
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
      {/* {isLoading ? (
        <Center>
          <CircularProgress isIndeterminate />
        </Center>
      ) : questions.length > 0 ? (
        <>
          {currQuestions.map((question: QuestionT, idx: number) => (
            <Question question={question} key={idx} />
          ))}
          {questions.length > 8 ? (
            <Pagination totalQuestions={questions.length} paginate={paginate} />
          ) : null}
        </>
      ) : (
        <>
          <Text align='center'>There are no questions at the moment</Text>
          <Text align='center' textDecoration='underline'>
            <Link href='/question/new'>Create one now!</Link>
          </Text>
        </>
      )} */}
      {questions && (
        <>
          {currQuestions.map((question: QuestionT, idx: number) => (
            <Question question={question} key={idx} />
          ))}
          {questions.length > 8 ? (
            <Pagination totalQuestions={questions.length} paginate={paginate} />
          ) : null}
        </>
      )}
      {questions.length === 0 ? (
        <>
          <Text align='center'>There are no questions at the moment</Text>
          <Text align='center' textDecoration='underline'>
            <Link href='/question/new'>Create one now!</Link>
          </Text>
        </>
      ) : null}
    </Layout>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await axios.get(`/api/question`);

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      questions: data.data.data,
    },
  };
};
