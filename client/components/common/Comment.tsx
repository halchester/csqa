import React from "react";
import {Comment as CommentT} from "../../types/common";
import {Box, Text} from "@chakra-ui/react";
import moment from "moment";

type IProps = {
  comment: CommentT;
};

export const Comment = ({comment}: IProps): JSX.Element => {
  return (
    <Box>
      <Text>{comment.comment}</Text>
      <Text as='span' fontSize='sm' color='gray.500'>
        {comment.author.username} |
      </Text>
      <Text as='span' fontSize='sm' color='gray.500'>
        &nbsp;{moment(comment.createdAt).fromNow()}
      </Text>
    </Box>
  );
};
