import User from "../../db/models/User";

export const findUserById = async (userId: string) => {
  try {
    return await User.findOne({ _id: userId });
  } catch (err) {
    return err;
  }
};

export const findUserByUsername = async (username: string) => {
  try {
    return await User.findOne({ username });
  } catch (err) {
    return err;
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    return await User.findOne({ email });
  } catch (err) {
    return err;
  }
};

export const checkFields = async (payload: any) => {
  if (
    payload.username &&
    payload.fullName &&
    payload.email &&
    payload.password
  ) {
    return true;
  }
  return false;
};
