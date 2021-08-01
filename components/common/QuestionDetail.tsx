import React from "react";
import { Text } from "@chakra-ui/react";
import { Question } from "../../types/common";
import moment from "moment";

type IProps = {
  question: Question;
};

export const QuestionDetail = ({ question }: IProps) => {
  return (
    <>
      <Text fontSize='2xl'>{question.title}</Text>
      <Text color='gray.500' fontSize='sm' as='span'>
        {moment(question.createdAt).fromNow()} |
      </Text>
      <Text color='gray.500' fontSize='sm' as='span'>
        &nbsp;{question.author.fullName}
      </Text>
      <Text my='6'>{question.body}</Text>
    </>
  );
};
