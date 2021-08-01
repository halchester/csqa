import { TriangleUpIcon } from "@chakra-ui/icons";
import { Box, Input, Text, Flex, IconButton, Stack } from "@chakra-ui/react";
import React from "react";
import { Comment as CommentT } from "../../types/common";
import { Comment } from "./Comment";

type IProps = {
  comments: CommentT[];
};

export const CommentSection = ({ comments }: IProps) => {
  return (
    <Box my='6'>
      <Stack spacing='4'>
        <AddComment />
        {comments.map((cmt) => (
          <Comment comment={cmt} />
        ))}
      </Stack>
    </Box>
  );
};

const AddComment = () => {
  return (
    <Flex>
      <Input size='sm' placeholder='What are your thoughts?' />
      <IconButton
        ml='2'
        aria-label='add-comment'
        icon={<TriangleUpIcon />}
        size='sm'
      />
    </Flex>
  );
};
