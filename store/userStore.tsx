import create, { UseStore } from "zustand";
import { User } from "../types/common";

type UserStore = {
  userData: null | {} | User;
  setUserData: (user: any) => void;
};

export const useUserData = create<UserStore>((set) => ({
  userData: {},
  setUserData: (user: User) => {
    set(() => ({
      userData: user,
    }));
  },
}));
