import * as React from "react";
import { Layout } from "../components/layout/Layout";
import { Button, FormLabel, Input, Text, Box, Link } from "@chakra-ui/react";
import { Formik } from "formik";
import axios from "../lib/api";

const SignupPage = () => {
  const [loading, setLoading] = React.useState(false);

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
        onSubmit={async (
          { fullName, email, password, username },
          { resetForm }
        ) => {
          setLoading(true);
          const payload = { fullName, email, password, username };
          try {
            const response = await axios.post("/api/auth/signup", payload);
            console.log(response.data);
            setLoading(false);
            // resetForm();
          } catch (err) {
            console.log(err.response.data);
            setLoading(false);
          }
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box mb='2'>
              <FormLabel>Username</FormLabel>
              <Input
                name='username'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
            </Box>
            <Box mb='2'>
              <FormLabel>Email</FormLabel>
              <Input
                name='email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </Box>
            <Box mb='2'>
              <FormLabel>Full Name</FormLabel>
              <Input
                name='fullName'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullName}
              />
            </Box>
            <Box mb='2'>
              <FormLabel>Password</FormLabel>
              <Input
                name='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </Box>
            <Box mb='2'>
              <FormLabel>Re-enter Password</FormLabel>
              <Input
                name='repassword'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.repassword}
              />
            </Box>
            <Button
              mb='2'
              onClick={() => handleSubmit()}
              isFullWidth
              colorScheme='green'
              isLoading={loading}
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
