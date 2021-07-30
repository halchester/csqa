import { Schema } from "mongoose";
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
  if (!question.uniqueId) {
    question.uniqueId = shortid.generate();
  }
  next();
});
