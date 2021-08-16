import create from "zustand";
import { User } from "../types/common";
import { persist } from "zustand/middleware";

type UserStore = {
  userData: User | null;
  setUserData: (user: any) => void;
  removeUserData: () => void;
};

export const useUserData = create<UserStore>(
  persist(
    (set) => ({
      userData: null,

      setUserData: (user: User) => {
        set(() => ({
          userData: user,
        }));
      },

      removeUserData: () => {
        set(() => ({
          userData: null,
        }));
      },
    }),
    {
      name: "userStore",
    }
  )
);
