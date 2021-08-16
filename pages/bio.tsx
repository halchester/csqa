import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Link,
  Stack,
  Text,
  // useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Layout } from "../components/layout/Layout";
import { Question } from "../types/common";
import axios from "../lib/api";
import { useRouter } from "next/dist/client/router";
import { useUserData } from "../store/userStore";

const BioPage = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const removeUserData = useUserData((state) => state.removeUserData);
  const router = useRouter();
  const userData = useUserData((state) => state.userData);
  // const toast = useToast();
  const calculatePoint = (up: number, down: number) => up - down;

  const logoutUser = async () => {
    setLoading(true);
    try {
      await axios.delete("/api/auth");
      removeUserData();
      setLoading(false);
      router.push("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <>
        <Text>{userData?.fullName}</Text>
        <Text as='span' fontSize='sm' color='gray.500'>
          {userData?.username} |
        </Text>
        <Text as='span' fontSize='sm' color='gray.500'>
          &nbsp;{userData?.email}
        </Text>
        <Stack spacing='4' my='6'>
          <Text fontSize='lg' fontWeight='semibold' textDecoration='underline'>
            Questions you've uploaded
          </Text>
          {userData?.questions.map((question: Question) => (
            <Flex
              alignItems='center'
              justifyContent='space-between'
              key={question.questionId}
            >
              <Text key={question.questionId} as='span'>
                <Link href={`/question/${question.questionId}`}>
                  {question.title}
                </Link>
              </Text>
              <Box>
                <Text as='span'>Points :</Text>
                <Badge ml='3' colorScheme='orange'>
                  {calculatePoint(
                    question.points.uppers.length,
                    question.points.downers.length
                  )}
                </Badge>
              </Box>
            </Flex>
          ))}
        </Stack>
      </>

      <Center>
        <Button
          size='sm'
          colorScheme='red'
          isLoading={loading}
          onClick={logoutUser}
        >
          Log out
        </Button>
      </Center>
    </Layout>
  );
};

export default BioPage;
