import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo } from "react";
import usePageManagement from "@/state/pageManagment";
import { MainContainer } from "@/components/MainContainer";
import { db } from "@/app/firebaseConfig";
import GoalForm from "@/components/Form/GoalForm";
import useUser from "@/state/user";
import { GoalInfoType, GoalType } from "@/types/habit";
import { router, useLocalSearchParams } from "expo-router";
import {
  doc,
  CollectionReference,
  collection,
  Timestamp,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { useForm } from "react-hook-form";
import useGoals from "@/state/goal";

const EditGoal = () => {
  const { goalid } = useLocalSearchParams<{ goalid: string }>();
  const { userData } = useUser();
  const { setDontShowBottomTab } = usePageManagement();
  const { goals } = useGoals();

  useEffect(() => {
    setDontShowBottomTab(true);
  }, []);

  const currentGoal = useMemo(
    () => goals.find((goal) => goal.id === goalid),
    [goalid, goals]
  );

  const formHelpers = useForm<GoalInfoType>({
    defaultValues: currentGoal,
  });

  const onSubmit = (data: GoalInfoType) => {
    const goalDoc = doc(db, "users", userData.uid, "goal", goalid);

    updateDoc(goalDoc, data).then((data) => {
      console.log(data);
      router.replace("/(tabs)/(home)/main/home");
    });
  };

  return (
    <>
      <GoalForm
        title="Edit Goal"
        onSubmit={onSubmit}
        defaultPointsEarned={currentGoal?.amountOfPointsEarned || 200}
        formHelpers={formHelpers}
      />
    </>
  );
};

export default EditGoal;
