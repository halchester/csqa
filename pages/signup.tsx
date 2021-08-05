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
  FormHelperText,
  FormControl,
} from "@chakra-ui/react";
import { Formik } from "formik";
import axios from "../lib/api";
import { signUpFormValidation } from "../lib/formValidation";

const SignupPage = (): JSX.Element => {
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
        validationSchema={signUpFormValidation}
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
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
        }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl id='username'>
                <FormLabel>Username</FormLabel>
                <Input
                  name='username'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  isInvalid={
                    Boolean(touched.username) && Boolean(errors.username)
                  }
                />
                <FormHelperText color='red.500'>
                  {touched.username && errors.username}
                </FormHelperText>
              </FormControl>

              <FormControl id='email'>
                <FormLabel>Email</FormLabel>
                <Input
                  name='email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  isInvalid={Boolean(touched.email) && Boolean(errors.email)}
                />
                <FormHelperText color='red.500'>
                  {touched.email && errors.email}
                </FormHelperText>
              </FormControl>
              <FormControl id='fullName'>
                <FormLabel>Full Name</FormLabel>
                <Input
                  name='fullName'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                  isInvalid={
                    Boolean(touched.fullName) && Boolean(errors.fullName)
                  }
                />
                <FormHelperText color='red.500'>
                  {touched.fullName && errors.fullName}
                </FormHelperText>
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <Input
                  name='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  isInvalid={
                    Boolean(touched.password) && Boolean(errors.password)
                  }
                />
                <FormHelperText color='red.500'>
                  {touched.password && errors.password}
                </FormHelperText>
              </FormControl>
              <FormControl id='repassword'>
                <FormLabel>Re-enter Password</FormLabel>
                <Input
                  name='repassword'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.repassword}
                  isInvalid={
                    Boolean(touched.repassword) && Boolean(errors.repassword)
                  }
                />
                <FormHelperText color='red.500'>
                  {touched.repassword && errors.repassword}
                </FormHelperText>
              </FormControl>
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
