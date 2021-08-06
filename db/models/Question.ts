import mongoose, { model, Schema } from "mongoose";
import shortid from "shortid";
import { QuestionDoc } from "../../types/models";

const QuestionSchema = new Schema<QuestionDoc>(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    points: {
      count: {
        type: Number,
        default: 0,
      },
      uppers: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      downers: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    author: {
      // required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    questionId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

QuestionSchema.pre<QuestionDoc>("save", function (next) {
  if (!this.questionId) {
    this.questionId = shortid.generate();
  }
  next();
});

const Question =
  mongoose.models.Question || model<QuestionDoc>("Question", QuestionSchema);

export default Question;
