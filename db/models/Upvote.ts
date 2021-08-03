import mongoose, { model, Schema } from "mongoose";

const UpvoteSchema = new Schema({
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

const Upvote = mongoose.models.Upvote || model("Upvote", UpvoteSchema);

export default Upvote;
