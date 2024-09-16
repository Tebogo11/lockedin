import { User } from "firebase/auth";
import { create } from "zustand";

export type UserData = {
  uid: string;
  username: string;
  email: string;
  totalCount?: number;
  nextLevelPoints?: number;
  pointsRemaining?: number;
  currentLevel?: number;
  pointsTowardsNextLevel?: number;
};

type Values = {
  authUser: User | null;
  userData: UserData;
};
type Operations = {
  setUserData: (data: UserData) => void;
  setAuthUser: (user: User | null) => void;
};

const useUser = create<Values & Operations>()((set) => ({
  authUser: null,
  userData: {
    uid: "",
    username: "",
    email: "",
  },
  setUserData: (data) => set({ userData: data }),
  setAuthUser: (user) => set({ authUser: user }),
}));

export default useUser;
