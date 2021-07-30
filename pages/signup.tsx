import * as React from "react";
import { Layout } from "../components/layout/Layout";
import {
  Button,
  FormLabel,
  Input,
  Text,
  Box,
  Link,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { Formik } from "formik";
import axios from "../lib/api";

const SignupPage = () => {
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();

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
            toast({
              status: "success",
              title: "Account registered!",
              description: `Your account with ${response.data.username} has been successfully registered!`,
              isClosable: true,
              duration: 9000,
            });
            setLoading(false);
            resetForm();
          } catch (err) {
            toast({
              status: "error",
              description: `${err.response.data.error}`,
              isClosable: true,
              duration: 9000,
            });
            setLoading(false);
          }
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Box>
                <FormLabel>Username</FormLabel>
                <Input
                  name='username'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
              </Box>
              <Box>
                <FormLabel>Email</FormLabel>
                <Input
                  name='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </Box>
              <Box>
                <FormLabel>Full Name</FormLabel>
                <Input
                  name='fullName'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                />
              </Box>
              <Box>
                <FormLabel>Password</FormLabel>
                <Input
                  name='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </Box>
              <Box>
                <FormLabel>Re-enter Password</FormLabel>
                <Input
                  name='repassword'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.repassword}
                />
              </Box>
              <Button
                onClick={() => handleSubmit()}
                isFullWidth
                colorScheme='green'
                isLoading={loading}
              >
                Continue
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
      <Button variant='ghost' isFullWidth mt='2'>
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
