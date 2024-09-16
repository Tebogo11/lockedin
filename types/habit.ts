import { Timestamp } from "firebase/firestore";

export type GoalInfoType = {
  title: string;
  description: string;
  tips: string;
  pointsEarned: number;
};

export type CheckInType = {
  id: string; // Unique identifier for the check-in
  goalId: string; // Reference back to the Habit
  date: Timestamp;
  isPositive: boolean;
  points: number;
};

export type GoalType = {
  id: string;
  currentPoints: number;
  amountOfPointsEarned: number;
  postiveCheckInStreak: number;
  negativeCheckInStreak: number;
  createdAt: Timestamp;
  // aiGeneratedInsights?: string;
} & GoalInfoType;
