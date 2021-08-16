import * as React from "react";
import { Layout } from "../../components/layout/Layout";
import { Center, CircularProgress } from "@chakra-ui/react";
import { QuestionDetail } from "../../components/common/QuestionDetail";
import { CommentSection } from "../../components/common/CommentSection";
// import { GetStaticPaths, GetStaticProps } from "next";
// import axios from "../../lib/api";
// import { Question as QuestionT } from "../../types/common";
import { useQuery } from "react-query";
import { getQuestionDetail } from "../../hooks/question";
import { useRouter } from "next/dist/client/router";

const CustomQuestionDetailPage = (): JSX.Element => {
  const router = useRouter();
  const { data, refetch, isLoading } = useQuery(
    ["details", router.query.questionId],
    getQuestionDetail
  );

  return (
    <Layout>
      {isLoading ? (
        <Center>
          <CircularProgress isIndeterminate />
        </Center>
      ) : data ? (
        <>
          <QuestionDetail question={data} />
          <CommentSection comments={data.comments} refetch={refetch} />
        </>
      ) : null}
    </Layout>
  );
};

export default CustomQuestionDetailPage;

// export const getStaticProps: GetStaticProps = async (context) => {
//   const questionId = context?.params?.questionId;

//   const {
//     data: { data },
//   } = await axios.get(`/api/question/${questionId}`);

//   return {
//     props: {
//       questions: data,
//       questionId,
//     },
//     revalidate: 60,
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [], //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// };
