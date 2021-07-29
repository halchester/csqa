import * as React from "react";
import { Question } from "../components/common/Question";
import { Layout } from "../components/layout/Layout";
import { data } from "../lib/data";
import { QUESTIONS_PER_PAGE } from "../constants/common";
import { Pagination } from "../components/common/Pagination";

const IndexPage = () => {
  const [questions] = React.useState(data);
  const [currPage, setCurrPage] = React.useState(1);

  let indexOfLastQuestion = currPage * QUESTIONS_PER_PAGE;
  let indexOfFirstQuestion = indexOfLastQuestion - QUESTIONS_PER_PAGE;
  let currQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const paginate = (num: number) => setCurrPage(num);

  return (
    <Layout>
      {currQuestions.map((question, idx) => (
        <Question question={question} key={idx} />
      ))}
      <Pagination totalQuestions={questions.length} paginate={paginate} />
    </Layout>
  );
};

export default IndexPage;
