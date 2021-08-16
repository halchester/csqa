import User from "../models/User";
import {UserDoc as UserT} from "../types/models";

export const findUserById = async (userId: string): Promise<UserT | null> => {
  try {
    const user = await User.findOne({_id: userId});
    if (user) {
      return user;
    }
    return null;
  } catch (err) {
    return err;
  }
};

export const findUserByUsername = async (
  username: string
): Promise<UserT | null> => {
  try {
    const user = await User.findOne({username});
    if (user) {
      return user;
    }
    return null;
  } catch (err) {
    return err;
  }
};

export const findUserByEmail = async (email: string): Promise<UserT | null> => {
  try {
    const user = await User.findOne({email});

    if (user) {
      return user;
    }
    return null;
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
