import { useRouter } from "next/dist/client/router";
import * as React from "react";
import { Layout } from "../../components/layout/Layout";

const CustomQuestionDetailPage = () => {
  // const router = useRouter();
  // const id = router.query.questionId;
  return (
    <Layout>
      <p>Details and comment!</p>
    </Layout>
  );
};

export default CustomQuestionDetailPage;
