import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import * as React from "react";
import moment from "moment";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Question as QuestionT } from "../../types/common";

interface IProps {
  question: QuestionT;
}

export const Question = ({ question }: IProps) => {
  const upvoteQuestion = (id: number) => {
    console.log(id);
  };

  const downvoteQuestin = (id: number) => {
    console.log(id);
  };

  return (
    <Box mb='4'>
      <Flex justifyContent='space-between' alignItems='center'>
        <Text fontSize='lg'>{question.title}</Text>
        <Box>
          <Box as='span'>
            <IconButton
              size='xs'
              aria-label='upvote'
              icon={<ArrowUpIcon fontWeight='bold' />}
              onClick={() => upvoteQuestion(question.questionId)}
            />
            <Text
              as='span'
              fontSize='sm'
              color='gray.500'
              mx='2'
              fontWeight='bold'
            >
              {question.points}
            </Text>
            <IconButton
              size='xs'
              aria-label='downvote'
              icon={<ArrowDownIcon fontWeight='bold' />}
              onClick={() => downvoteQuestin(question.questionId)}
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
        {moment(question.createdAt).format("DD-MM-YYYY")}
      </Text>
    </Box>
  );
};
