import { Flex, Input, IconButton } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { TriangleUpIcon } from "@chakra-ui/icons";

type IProps = {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  postComment: () => void;
  loading: boolean;
};

export const AddComment = ({
  loading,
  comment,
  setComment,
  postComment,
}: IProps) => {
  return (
    <Flex>
      <Input
        size='sm'
        placeholder='What are your thoughts?'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <IconButton
        ml='2'
        aria-label='add-comment'
        onClick={postComment}
        icon={<TriangleUpIcon />}
        size='sm'
        isLoading={loading}
      />
    </Flex>
  );
};
