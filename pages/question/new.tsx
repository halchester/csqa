import React, { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CustomEditor } from "../../components/common/CustomEditor";
import { Formik } from "formik";
import axios from "../../lib/api";
import { useUser } from "../../hooks/users";

const NewQuestionPage = () => {
  const [loading, setLoading] = useState(false);
  const [user] = useUser();
  const toast = useToast();
  // console.log(user);

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
        onSubmit={async ({ title, body }) => {
          setLoading(true);
          const payload = { title, body, author: user };
          try {
            const response = await axios.post("/api/question", payload);
            setLoading(false);
            toast({
              status: "success",
              title: "Uploaded!",
              description: "Your question has been successfully uploaded!",
              isClosable: true,
              duration: 4000,
            });
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
