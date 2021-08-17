import * as React from "react";
import {Button, Flex} from "@chakra-ui/react";

const QUESTIONS_PER_PAGE = 8;

interface IProps {
  totalQuestions: number;
  paginate: (num: number) => void;
  currPage: number;
}

export const Pagination = ({
  totalQuestions,
  paginate,
  currPage
}: IProps): JSX.Element => {
  let numbers = [];
  for (let i = 1; i <= Math.ceil(totalQuestions / QUESTIONS_PER_PAGE); i++) {
    numbers.push(i);
  }

  return (
    <Flex justifyContent='center' alignItems='center'>
      {numbers.map((num) => (
        <Button
          key={num}
          onClick={() => paginate(num)}
          mx='1'
          size='xs'
          colorScheme={currPage === num ? "twitter" : null}
        >
          {num}
        </Button>
      ))}
    </Flex>
  );
};
