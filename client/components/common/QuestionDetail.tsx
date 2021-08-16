import React from "react";
import {Text} from "@chakra-ui/react";
import {Question} from "../../types/common";
import moment from "moment";

type IProps = {
  question: Question;
};

export const QuestionDetail = ({question}: IProps): JSX.Element => {
  return (
    <>
      <Text fontSize='2xl'>{question.title}</Text>
      <Text color='gray.500' fontSize='sm' as='span'>
        Uploaded by{" "}
        <Text color='gray.500' fontWeight='semibold' fontSize='sm' as='span'>
          {question.author.username}
        </Text>
        {" | "}
        <Text color='gray.500' fontWeight='semibold' fontSize='sm' as='span'>
          {moment(question.createdAt).fromNow()}
        </Text>
      </Text>
      <Text my='6'>{question.body}</Text>
    </>
  );
};
