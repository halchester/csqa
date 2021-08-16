import {Box, Text, Stack, Link, useToast} from "@chakra-ui/react";
import React, {useState} from "react";
import {Comment as CommentT} from "../../types/common";
import {Comment} from "./Comment";
import axios from "../../lib/api";
import {useRouter} from "next/dist/client/router";
import {AddComment} from "./AddComment";
import {useUserData} from "../../store/userStore";

type IProps = {
  comments: CommentT[];
  refetch: () => void;
};

export const CommentSection = ({comments, refetch}: IProps): JSX.Element => {
  const userData = useUserData((state) => state.userData);
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const postComment = async () => {
    setLoading(true);
    const payload = {comment, author: userData};
    try {
      await axios.post(`/api/question/${router.query.questionId}`, payload);
      refetch();
      setLoading(false);
      setComment("");
    } catch (err) {
      toast({
        status: "error",
        description: "Something went wrong!"
      });
      setLoading(false);
    }
  };

  return (
    <Box my='6'>
      <Stack spacing='4'>
        {userData ? (
          <AddComment
            comment={comment}
            setComment={setComment}
            postComment={postComment}
            loading={loading}
          />
        ) : (
          <Text align='center' color='red.500'>
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
