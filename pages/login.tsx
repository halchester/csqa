import * as React from "react";
import { Layout } from "../components/layout/Layout";
import { Button, FormLabel, Input, Text, Box, Link } from "@chakra-ui/react";
import { Formik } from "formik";

const LoginPage = () => {
  return (
    <Layout>
      <Box my='4'>
        <Text align='left' fontSize='2xl' fontWeight='semibold'>
          Login
        </Text>
        <Text fontSize='sm' color='gray.500'>
          csqa : An Open source developer forum and discussion panel
        </Text>
      </Box>
      <Formik
        initialValues={formikInitialValues}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Box mb='2'>
              <FormLabel>Username</FormLabel>
              <Input
                id='username'
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Box>
            <Box mb='2'>
              <FormLabel>Password</FormLabel>
              <Input
                id='password'
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Box>
            <Button
              mb='2'
              onClick={() => handleSubmit()}
              isFullWidth
              colorScheme='green'
            >
              Continue
            </Button>
          </form>
        )}
      </Formik>
      <Button variant='ghost' isFullWidth>
        <Link href='signup'>Sign Up</Link>
      </Button>
    </Layout>
  );
};

export default LoginPage;

const formikInitialValues = {
  username: "",
  password: "",
};
