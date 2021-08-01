import { Box, Text, Stack, Link } from "@chakra-ui/react";
import React, { useState } from "react";
import { Comment as CommentT } from "../../types/common";
import { Comment } from "./Comment";
import { useUser } from "../../hooks/users";
import axios from "../../lib/api";
import { useRouter } from "next/dist/client/router";
import { AddComment } from "./AddComment";

type IProps = {
  comments: CommentT[];
};

export const CommentSection = ({ comments }: IProps) => {
  const [user] = useUser();
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const postComment = async () => {
    setLoading(true);
    const payload = { comment, author: user };
    try {
      const response = await axios.post(
        `/api/question/${router.query.questionId}`,
        payload
      );
      console.log(response);
      setLoading(false);
      setComment("");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Box my='6'>
      <Stack spacing='4'>
        {user ? (
          <AddComment
            comment={comment}
            setComment={setComment}
            postComment={postComment}
            loading={loading}
          />
        ) : (
          <Text>
            You have to <Link href='/login'>log in</Link> to comment.
          </Text>
        )}
        {comments.map((cmt, idx) => (
          <Comment comment={cmt} key={idx} />
        ))}
      </Stack>
    </Box>
  );
};
