import mongoose, { model, Schema } from "mongoose";
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
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    userId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<UserDoc>("save", function (next) {
  let user = this;
  if (!user.userId) {
    user.userId = shortid.generate();
  }
  next();
});

const User = mongoose.models.User || model<UserDoc>("User", UserSchema);

export default User;
