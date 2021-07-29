import * as React from "react";
import { Layout } from "../components/layout/Layout";
import { Button, FormLabel, Input, Text, Box, Link } from "@chakra-ui/react";
import { Formik } from "formik";

const SignupPage = () => {
  return (
    <Layout>
      <Box my='4'>
        <Text align='left' fontSize='2xl' fontWeight='semibold'>
          Sign Up
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
              <FormLabel>Email</FormLabel>
              <Input id='email' onChange={handleChange} onBlur={handleBlur} />
            </Box>
            <Box mb='2'>
              <FormLabel>Full Name</FormLabel>
              <Input
                id='fullName'
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
            <Box mb='2'>
              <FormLabel>Re-enter Password</FormLabel>
              <Input
                id='repassword'
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
        <Link href='login'>Log In</Link>
      </Button>
    </Layout>
  );
};

export default SignupPage;

const formikInitialValues = {
  username: "",
  fullName: "",
  email: "",
  password: "",
  repassword: "",
};
