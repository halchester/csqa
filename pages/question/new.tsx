import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { CustomEditor } from "../../components/common/CustomEditor";
import { Formik } from "formik";
import axios from "../../lib/api";
import { useUserData } from "../../store/userStore";
import { useRouter } from "next/dist/client/router";

const NewQuestionPage = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const userData = useUserData((state) => state.userData);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!userData) {
      router.push("/login");
    }
  }, [userData]);

  return (
    <Layout>
      <Box my='4'>
        <Text align='left' fontSize='2xl' fontWeight='semibold'>
          New Question
        </Text>
        <Text fontSize='sm' color='gray.500'>
          Make sure to add specific detail for other people who are willing to
          help you!
        </Text>
      </Box>
      <Formik
        initialValues={formikInitialValues}
        onSubmit={async ({ title, body }, { resetForm }) => {
          setLoading(true);
          const payload = { title, body, author: userData };
          try {
            await axios.post("/api/question", payload);
            setLoading(false);
            toast({
              status: "success",
              title: "Uploaded!",
              description:
                "Your question has been successfully uploaded! Please wait for us to redirect you to the home page!",
              isClosable: true,
              duration: 4000,
            });
            resetForm();
            setTimeout(() => {
              router.push("/");
            }, 2000);
          } catch (err) {
            console.log(err);
            setLoading(false);
            toast({
              status: "error",
              title: "Oh what a bummer!",
              description: "Something went wrong! :(",
              isClosable: true,
              duration: 4000,
            });
          }
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form>
            <Stack spacing='3'>
              <Box>
                <FormLabel>Title</FormLabel>
                <Input
                  name='title'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
              </Box>
              <Box>
                <FormLabel>Details</FormLabel>
                <CustomEditor
                  name='body'
                  handleChange={handleChange}
                  value={values.body}
                />
              </Box>
              <Button
                colorScheme='green'
                isFullWidth
                onClick={() => handleSubmit()}
                isLoading={loading}
              >
                Upload!
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
    </Layout>
  );
};

export default NewQuestionPage;
{
  /* <CustomEditor content={content} setContent={setContent} /> */
}

const formikInitialValues = {
  title: "",
  body: "",
};
