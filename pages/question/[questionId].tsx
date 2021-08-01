import { useRouter } from "next/dist/client/router";
import * as React from "react";
import { Layout } from "../../components/layout/Layout";
import { useQuery } from "react-query";
import { getQuestionDetail } from "../../hooks/question";
import { Center, CircularProgress, Text } from "@chakra-ui/react";
import { QuestionDetail } from "../../components/common/QuestionDetail";
import { CommentSection } from "../../components/common/CommentSection";

const CustomQuestionDetailPage = () => {
  const router = useRouter();
  const { data, isLoading, error } = useQuery(
    ["detail", router.query.questionId],
    getQuestionDetail
  );

  return (
    <Layout>
      {error ? (
        <Text align='center' color='red' my='x'>
          Something went wrong!
        </Text>
      ) : isLoading ? (
        <Center>
          <CircularProgress isIndeterminate />
        </Center>
      ) : data !== null ? (
        <>
          <QuestionDetail question={data} />
          <CommentSection comments={data.comments} />
        </>
      ) : null}
    </Layout>
  );
};

export default CustomQuestionDetailPage;
