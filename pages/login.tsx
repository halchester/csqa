import * as React from "react";
import { Layout } from "../components/layout/Layout";
import {
  Button,
  FormLabel,
  Input,
  Text,
  Box,
  Link,
  Stack,
} from "@chakra-ui/react";
import { Formik } from "formik";
import axios from "../lib/api";
import { useRouter } from "next/dist/client/router";

const LoginPage = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

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
        onSubmit={async ({ username, password }) => {
          setLoading(true);
          const payload = { username, password };

          try {
            const response = await axios.post("/api/auth", payload);
            if (response.data.data) {
              router.push("/");
            }
            setLoading(false);
          } catch (err) {
            console.log(err);
            setLoading(false);
          }

          // .then((response) => {
          //   console.log(response);
          //   setLoading(false);
          // })
          // .catch((err) => {
          //   console.log(err.response);
          //   setLoading(false);
          // });
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing='3'>
              <Box>
                <FormLabel>Username</FormLabel>
                <Input
                  value={values.username}
                  name='username'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Box>
              <Box>
                <FormLabel>Password</FormLabel>
                <Input
                  value={values.password}
                  name='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
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
