import { model, Schema } from "mongoose";
import shortid from "shortid";
import { UserDoc } from "../../types/models";

const UserSchema = new Schema<UserDoc>(
  {
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
    questions: {
      type: Schema.Types.ObjectId,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<UserDoc>("save", function (next) {
  let question = this;
  if (!question.userId) {
    question.userId = shortid.generate();
  }
  next();
});

const User = model<UserDoc>("User", UserSchema);

export default User;
