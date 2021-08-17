import {
  Badge,
  Box,
  Flex,
  IconButton,
  Link,
  Text,
  useToast
} from "@chakra-ui/react";
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
              <Text fontSize='lg' as='span'>
                <Link href={`/question/${question.questionId}`}>
                  {question.title}
                </Link>
              </Text>
              &nbsp;
              {question.comments.length > 0 ? (
                <Badge colorScheme='twitter' variant='outline'>
                  {question.comments.length} comments
                </Badge>
              ) : null}
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
