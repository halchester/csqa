import React from "react";
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
} from "@chakra-ui/react";
import { CustomEditor } from "../../components/common/CustomEditor";
import { Formik } from "formik";

const NewQuestionPage = () => {
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
        onSubmit={async (values) => {
          console.log(values);
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
