import {Box, Flex, IconButton, Link, Text, useToast} from "@chakra-ui/react";
import * as React from "react";
import moment from "moment";
import {ArrowDownIcon, ArrowUpIcon} from "@chakra-ui/icons";
import {Question as QuestionT} from "../../types/common";
import {useUserData} from "../../store/userStore";
import {useRouter} from "next/dist/client/router";
import axios from "../../lib/api";

interface IProps {
  question: QuestionT;
}

export const Question = ({question}: IProps): JSX.Element => {
  const userData = useUserData((state) => state.userData);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const toast = useToast();

  const upvoteQuestion = async (question: QuestionT) => {
    if (!userData) {
      router.push("/login");
      return;
    } else {
      setLoading(true);
      const payload = {user: userData, question, up: true};

      try {
        await axios.post(`/api/question/up/${question.questionId}`, payload);
        setLoading(false);
      } catch ({
        response: {
          data: {message}
        }
      }) {
        toast({
          status: "error",
          description: message
        });
        setLoading(false);
      }
    }
  };

  const downvoteQuestin = async (question: QuestionT) => {
    if (!userData) {
      router.push("/login");
      return;
    } else {
      setLoading(true);
      const payload = {user: userData, question, down: true};
      try {
        await axios.post(`/api/question/down/${question.questionId}`, payload);
        setLoading(false);
      } catch ({
        response: {
          data: {message}
        }
      }) {
        toast({
          status: "error",
          description: message
        });
        setLoading(false);
      }
    }
  };

  const calculatePoint = (up: number, down: number) => up - down;
  return (
    question && (
      <Box mb='4'>
        <Flex justifyContent='space-between' alignItems='center'>
          <Box>
            <Flex alignItems='center'>
              <Text fontSize='md' fontWeight='semibold' as='span'>
                <Link href={`/question/${question.questionId}`}>
                  {question.title.length > 25
                    ? `${question.title.slice(0, 25)} ... `
                    : question.title}
                </Link>
              </Text>

              {/* {question.comments.length > 0 ? (
                <Badge colorScheme='twitter' variant='outline' size='sm' ml='1'>
                  {question.comments.length} cmts
                </Badge>
              ) : null} */}
            </Flex>
          </Box>
          <Box>
            <Box as='span'>
              {userData ? (
                <>
                  <IconButton
                    size='xs'
                    aria-label='upvote'
                    icon={<ArrowUpIcon fontWeight='bold' />}
                    onClick={() => upvoteQuestion(question)}
                    isLoading={loading}
                    colorScheme={
                      question.points.uppers.includes(userData._id)
                        ? "green"
                        : "gray"
                    }
                  />
                  <Text
                    as='span'
                    fontSize='sm'
                    color='gray.500'
                    mx='1.5'
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
                    isLoading={loading}
                    colorScheme={
                      question.points.downers.includes(userData._id)
                        ? "red"
                        : "gray"
                    }
                  />
                </>
              ) : null}
            </Box>
          </Box>
        </Flex>
        {question.comments.length > 0 ? (
          <Text fontSize='sm' color='messenger.500' fontWeight='semibold'>
            {question.comments.length} comments
          </Text>
        ) : null}
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
