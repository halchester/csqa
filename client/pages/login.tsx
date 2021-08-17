import * as React from "react";
import {Layout} from "../components/layout/Layout";
import {
  Button,
  FormLabel,
  Input,
  Text,
  Box,
  Link,
  Stack,
  Flex,
  IconButton,
  useToast,
  FormControl,
  FormHelperText
} from "@chakra-ui/react";
import {Formik} from "formik";
import axios from "../lib/api";
import {useRouter} from "next/dist/client/router";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {loginFormValidation} from "../lib/formValidation";
import {useUserData} from "../store/userStore";

const LoginPage = (): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const setUserData = useUserData((state) => state.setUserData);
  const toast = useToast();

  const togglePassword = () => setShowPassword(!showPassword);

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
        validationSchema={loginFormValidation}
        onSubmit={async ({username, password}) => {
          setLoading(true);
          const payload = {username, password};

          try {
            const {
              data: {data}
            } = await axios.post("/api/login", payload);
            if (data) {
              setUserData(data);
              router.push("/");
            }
            setLoading(false);
          } catch (err) {
            console.log(err.response);
            toast({
              status: "error",
              title: "Error!",
              description: "Your username or password is wrong!",
              isClosable: false,
              duration: 3000
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
          touched
        }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing='3'>
              <FormControl id='username'>
                <FormLabel>Username</FormLabel>
                <Input
                  value={values.username}
                  name='username'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    Boolean(touched.username) && Boolean(errors.username)
                  }
                />
                <FormHelperText color='red.500'>
                  {touched.username && errors.username}
                </FormHelperText>
              </FormControl>
              <FormControl id='password'>
                <Flex justifyContent='space-between' alignItems='center'>
                  <FormLabel mt='1'>Password</FormLabel>
                  {showPassword ? (
                    <IconButton
                      size='sm'
                      aria-label='togglePassword'
                      onClick={togglePassword}
                      colorScheme='green'
                      icon={<ViewOffIcon />}
                    />
                  ) : (
                    <IconButton
                      size='sm'
                      aria-label='togglePassword'
                      onClick={togglePassword}
                      colorScheme='red'
                      icon={<ViewIcon />}
                    />
                  )}
                </Flex>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  name='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={
                    Boolean(touched.password) && Boolean(errors.password)
                  }
                />
                <FormHelperText color='red.500'>
                  {touched.password && errors.password}
                </FormHelperText>
              </FormControl>
              <Button
                type='submit'
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
  password: ""
};
