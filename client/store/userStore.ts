import create from "zustand";
import {User} from "../types/common";
import {persist} from "zustand/middleware";

type UserStore = {
  userData: User | null;
  token: string | null;
  setUserData: (user: any) => void;
  removeUserData: () => void;
  setToken: (token: string) => void;
  removeToken: () => void;
};

export const useUserData = create<UserStore>(
  persist(
    (set) => ({
      userData: null,
      token: null,

      setUserData: (user: User) => {
        set(() => ({
          userData: user
        }));
      },

      removeUserData: () => {
        set(() => ({
          userData: null
        }));
      },

      setToken: (token: string) => {
        set(() => ({
          token: token
        }));
      },
      removeToken: () => {
        set(() => ({
          token: null
        }));
      }
    }),
    {
      name: "userStore"
    }
  )
);
