import {ConnectionOptions} from "mongoose";

export const options: ConnectionOptions = {
  useFindAndModify: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
};
