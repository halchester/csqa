import mongoose, { model, Schema } from "mongoose";

const DownvoteSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
  votes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const Downvote = mongoose.models.Downvote || model("Downvote", DownvoteSchema);

export default Downvote;
