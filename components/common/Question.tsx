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
        <Text fontSize='lg'>{question.question}</Text>
        <Box>
          <Box as='span'>
            <IconButton
              size='xs'
              aria-label='upvote'
              icon={<ArrowUpIcon fontWeight='bold' />}
              onClick={() => upvoteQuestion(question.id)}
            />
            <Text
              as='span'
              fontSize='sm'
              color='gray.500'
              ml='1'
              fontWeight='bold'
            >
              {question.upvote}
            </Text>
          </Box>
          <Box as='span' ml='2'>
            <IconButton
              size='xs'
              aria-label='downvote'
              icon={<ArrowDownIcon fontWeight='bold' />}
              onClick={() => downvoteQuestin(question.id)}
            />
            <Text
              as='span'
              fontSize='sm'
              color='gray.500'
              ml='1'
              fontWeight='bold'
            >
              {question.downvote}
            </Text>
          </Box>
        </Box>
      </Flex>
      <Text as='span' fontSize='sm' color='gray.500'>
        {" "}
        {question.user}
      </Text>
      <Text as='span' fontSize='sm' color='gray.500'>
        {" | "}
        {moment(question.uploaded).format("DD-MM-YYYY")}
      </Text>
    </Box>
  );
};
