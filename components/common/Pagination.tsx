import * as React from "react";
import {QUESTIONS_PER_PAGE} from "../../constants/common";
import {Button, Flex} from "@chakra-ui/react";

interface IProps {
  totalQuestions: number;
  paginate: (num: number) => void;
}

export const Pagination = ({totalQuestions, paginate}: IProps): JSX.Element => {
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
          size='sm'
          colorScheme='green'
        >
          {num}
        </Button>
      ))}
    </Flex>
  );
};
