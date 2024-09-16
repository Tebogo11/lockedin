import { db } from "@/app/firebaseConfig";
import useGoals from "@/state/goal";
import useUser from "@/state/user";
import { GoalType } from "@/types/habit";
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";

export const useGoalManagers = () => {
  const { setGoals } = useGoals();
  const { authUser } = useUser();
  const query = collection(db, "users", authUser?.uid || "", "goal");

  //handle errors
  const [goalsDoc, loading, error] = useCollection(query);

  useEffect(() => {
    if (!loading) {
      const goals = goalsDoc?.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });

      setGoals(goals as GoalType[]);
    }
  }, [goalsDoc]);

  return {};
};
