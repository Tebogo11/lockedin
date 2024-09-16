import { GoalType } from "@/types/habit";
import { User } from "firebase/auth";
import { create } from "zustand";

type CheckInType = {
  status: "good" | "bad";
  checkInDate: Date;
};

type Values = {
  goals: GoalType[];
};
type Operations = {
  setGoals: (goals: GoalType[]) => void;
};

const useGoals = create<Values & Operations>()((set) => ({
  goals: [],
  setGoals: (goals) => set({ goals }),
}));

export default useGoals;
