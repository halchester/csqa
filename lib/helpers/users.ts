import User from "../../db/models/User";

export const findUserByUsername = async (username: string) => {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (err) {
    return false;
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
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
