import { db } from "@/app/firebaseConfig";
import useUser, { UserData } from "@/state/user";
import { CheckInType, GoalType } from "@/types/habit";
import { calculateProgressToNextLevel } from "@/utils.ts/levelCalc";
import { router } from "expo-router";
import {
  doc,
  CollectionReference,
  collection,
  Timestamp,
  addDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

const useCheckIn = () => {
  const { setUserData, userData } = useUser();

  const addCheckIn = (goal: GoalType, isPositive: boolean) => {
    try {
      const goalDoc = doc(db, "users", userData.uid, "goal", goal.id);
      const goalRef: CollectionReference = collection(goalDoc, "checkin");
      const newGaolEntry: Omit<CheckInType, "id"> = {
        date: Timestamp.fromDate(new Date()),
        goalId: goal.id,
        points: goal.currentPoints,
        isPositive,
      };

      addDoc(goalRef, newGaolEntry)
        .then((data) => {
          // console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserCount = async (goal: GoalType, isPositive: boolean) => {
    try {
      const userDoc = doc(db, "users", userData.uid);

      const currentUserCount = userData.totalCount || 0;
      const increment = isPositive
        ? currentUserCount + goal.amountOfPointsEarned
        : currentUserCount - goal.amountOfPointsEarned;
      const {
        currentLevel,
        nextLevelPoints,
        pointsRemaining,
        pointsTowardsNextLevel,
      } = calculateProgressToNextLevel(increment);

      setUserData({
        ...userData,
        ...{
          totalCount: increment,
          currentLevel,
          nextLevelPoints,
          pointsRemaining,
          pointsTowardsNextLevel,
        },
      });
      updateDoc(userDoc, {
        totalCount: increment,
        currentLevel,
        nextLevelPoints,
        pointsRemaining,
        pointsTowardsNextLevel,
      })
        .then(() => {
          getDoc(userDoc).then((doc) => {
            setUserData(doc.data() as UserData);
          });
        })
        .catch((error: any) => {
          console.log("Error updating total count:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return { addCheckIn, updateUserCount };
};

export default useCheckIn;
