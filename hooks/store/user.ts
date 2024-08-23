import { User } from "@prisma/client";
import { create } from "zustand";

interface userState {
  user: User | undefined;
  logout: () => void;
}

export const useUser = create<userState>((set) => {
  return {
    user: undefined,
    logout: () => set({ user: undefined }),
  };
});
