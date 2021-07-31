import mongoose, { model, Schema } from "mongoose";
import shortid from "shortid";
import { CommentDoc } from "../../types/models";

const CommentSchema = new Schema<CommentDoc>({
  comment: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    required: true,
  },
  commentId: {
    type: String,
  },
});

CommentSchema.pre<CommentDoc>("save", function (next) {
  let comment = this;
  if (!comment.commentId) {
    comment.commentId = shortid.generate();
  }
  next();
});

const Comment =
  mongoose.models.Comment || model<CommentDoc>("Comment", CommentSchema);

export default Comment;
