import * as React from "react";
import {Text, Link} from "@chakra-ui/react";
import axios from "../lib/api";
import {Layout} from "../components/layout/Layout";
import {GetServerSideProps} from "next";
import {Question as QuestionT} from "../types/common";
import {Question} from "../components/common/Question";
import {Pagination} from "../components/common/Pagination";

interface IProps {
  questions: QuestionT[];
}

const IndexPage = ({questions}: IProps): JSX.Element => {
  const [currPage, setCurrPage] = React.useState(1);
  const QUESTIONS_PER_PAGE = 8;

  let indexOfLastQuestion = currPage * QUESTIONS_PER_PAGE;
  let indexOfFirstQuestion = indexOfLastQuestion - QUESTIONS_PER_PAGE;
  let currQuestions = questions?.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const paginate = (num: number) => setCurrPage(num);

  return (
    <Layout>
      {questions ? (
        <>
          {currQuestions.map((q: QuestionT, idx: number) => (
            <Question question={q} key={idx} />
          ))}
          {questions.length > 8 ? (
            <Pagination
              totalQuestions={questions.length}
              paginate={paginate}
              currPage={currPage}
            />
          ) : null}
        </>
      ) : null}
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
  const {
    data: {data}
  } = await axios.get("/api/questions");

  return {
    props: {
      questions: data
    }
  };
};
