import User from "../db/User";
import {User as UserT} from "../types/common";

export const findUserById = async (userId: string): Promise<UserT> => {
  try {
    return await User.findOne({_id: userId});
  } catch (err) {
    return err;
  }
};

export const findUserByUsername = async (username: string): Promise<UserT> => {
  try {
    return await User.findOne({username});
  } catch (err) {
    return err;
  }
};

export const findUserByEmail = async (email: string): Promise<UserT> => {
  try {
    return await User.findOne({email});
  } catch (err) {
    return err;
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const checkFields = (payload: any): boolean => {
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
