import {Box, Input} from "@chakra-ui/react";
import * as React from "react";
import {Layout} from "../components/layout/Layout";
import {GetServerSideProps} from "next";
import axios from "../lib/api";
import {Question as QuestionT} from "../types/common";
import {Question} from "../components/common/Question";

type IProps = {
  questions: QuestionT[];
};

const SearchPage = ({questions}: IProps): JSX.Element => {
  const [query, setQuery] = React.useState("");

  const filterQuestions = (data: QuestionT[], query: string | "") => {
    const results = [];
    for (let q of data) {
      if (q.title.toLowerCase().includes(query)) {
        results.push(q);
      }
    }
    return results;
  };

  return (
    <Layout>
      <Input
        size='md'
        variant='flushed'
        placeholder='Search for questions ... '
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Box my='4' />
      {questions
        ? filterQuestions(questions, query).map((q, idx) => (
            <Question question={q} key={idx} />
          ))
        : null}
    </Layout>
  );
};

export default SearchPage;

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
