import mongoose, { model, Schema } from "mongoose";
import shortid from "shortid";
import { QuestionDoc } from "../../types/models";

const QuestionSchema = new Schema<QuestionDoc>({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    required: true,
  },
  questionId: {
    type: String,
  },
});

QuestionSchema.pre<QuestionDoc>("save", function (next) {
  let question = this;
  if (!question.questionId) {
    question.questionId = shortid.generate();
  }
  next();
});

const Question =
  mongoose.models.Question || model<QuestionDoc>("Question", QuestionSchema);

export default Question;
