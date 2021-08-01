import React from "react";
import { Comment as CommentT } from "../../types/common";

type IProps = {
  comment: CommentT;
};

export const Comment = ({}: IProps) => {
  return (
    <>
      <p>Comment here and there</p>
    </>
  );
};
