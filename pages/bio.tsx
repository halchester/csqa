import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Layout } from "../components/layout/Layout";
import { useUser } from "../hooks/users";
import { Question } from "../types/common";
import axios from "../lib/api";
import { useRouter } from "next/dist/client/router";
import { useUserData } from "../store/userStore";

const BioPage = (): JSX.Element => {
  const [user, isLoading] = useUser();
  const [loading, setLoading] = useState(false);
  const removeUserData = useUserData((state) => state.removeUserData);
  const router = useRouter();

  const logoutUser = async () => {
    setLoading(true);
    try {
      const response = await axios.delete("/api/auth");
      if (response) {
        removeUserData();
        setLoading(false);
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Layout>
      {isLoading ? (
        <Text align='center' color='green' my='6'>
          Please wait loading!
        </Text>
      ) : (
        <>
          <Text>{user.fullName}</Text>
          <Text as='span' fontSize='sm' color='gray.500'>
            {user.username} |
          </Text>
          <Text as='span' fontSize='sm' color='gray.500'>
            &nbsp;{user.email}
          </Text>
          <Stack spacing='4' my='6'>
            <Text
              fontSize='lg'
              fontWeight='semibold'
              textDecoration='underline'
            >
              Questions you've uploaded
            </Text>
            {user.questions.map((question: Question) => (
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
                    {question.points}
                  </Badge>
                </Box>
              </Flex>
            ))}
          </Stack>
        </>
      )}
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
