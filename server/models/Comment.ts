import {model, Schema} from "mongoose";
import shortid from "shortid";
import {CommentDoc} from "../types/models";

const CommentSchema = new Schema<CommentDoc>(
  {
    comment: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    commentId: {
      type: String
    }
  },
  {timestamps: true}
);

CommentSchema.pre<CommentDoc>("save", function (next) {
  if (!this.commentId) {
    this.commentId = shortid.generate();
  }
  next();
});

const Comment = model<CommentDoc>("Comment", CommentSchema);

export default Comment;
