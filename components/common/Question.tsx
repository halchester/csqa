import { Box, Flex, IconButton, Link, Text } from "@chakra-ui/react";
import * as React from "react";
import moment from "moment";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Question as QuestionT } from "../../types/common";
import { useUserData } from "../../store/userStore";
import { useRouter } from "next/dist/client/router";
import axios from "../../lib/api";

interface IProps {
  question: QuestionT;
}

export const Question = ({ question }: IProps): JSX.Element => {
  const userData = useUserData((state) => state.userData);
  const router = useRouter();

  const upvoteQuestion = async (question: QuestionT) => {
    if (!userData) {
      router.push("/login");
      return;
    } else {
      const payload = { user: userData, question, up: true };

      try {
        const response = await axios.post("/api/vote/upvote", payload);
        console.log(response);
      } catch ({ response }) {
        console.log(response);
      }
    }
  };

  const downvoteQuestin = async (question: QuestionT) => {
    if (!userData) {
      router.push("/login");
      return;
    } else {
      const payload = { user: userData, question, down: true };
      try {
        const response = await axios.post("/api/vote/downvote", payload);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const calculatePoint = (up: number, down: number) => {
    if (up > down) {
      return up - down;
    } else if (down > up) {
      return down - up;
    } else {
      return 0;
    }
  };

  return (
    question && (
      <Box mb='4'>
        <Flex justifyContent='space-between' alignItems='center'>
          <Text fontSize='lg'>
            <Link href={`/question/${question.questionId}`}>
              {question.title}
            </Link>
          </Text>
          <Box>
            <Box as='span'>
              <IconButton
                size='xs'
                aria-label='upvote'
                icon={<ArrowUpIcon fontWeight='bold' />}
                onClick={() => upvoteQuestion(question)}
              />
              <Text
                as='span'
                fontSize='sm'
                color='gray.500'
                mx='2'
                fontWeight='bold'
              >
                {calculatePoint(
                  question.points.uppers.length,
                  question.points.downers.length
                )}
              </Text>
              <IconButton
                size='xs'
                aria-label='downvote'
                icon={<ArrowDownIcon fontWeight='bold' />}
                onClick={() => downvoteQuestin(question)}
              />
            </Box>
          </Box>
        </Flex>
        <Text as='span' fontSize='sm' color='gray.500'>
          {" "}
          {question.author.username}
        </Text>
        <Text as='span' fontSize='sm' color='gray.500'>
          {" | "}
          {moment(question.createdAt).fromNow()}
        </Text>
      </Box>
    )
  );
};
