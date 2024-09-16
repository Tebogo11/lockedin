import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MainContainer } from "@/components/MainContainer";
import { ThemedText } from "@/components/ThemedText";
import TextInputWithError from "@/components/TextInput/TextInputWithError";
import { useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { db } from "@/app/firebaseConfig";
import { doc, collection, addDoc, Timestamp } from "firebase/firestore";
import useUser from "@/state/user";
import { CollectionReference } from "firebase/firestore";
import { GoalInfoType, GoalType } from "@/types/habit";
import Slider from "@/components/Form/Slider";
import GoalForm from "@/components/Form/GoalForm";

const defaultValues = {
  title: "",
  description: "",
  tips: "",
};

const AddGoal = () => {
  const { userData } = useUser();

  const formHelpers = useForm<GoalInfoType>({
    defaultValues: defaultValues,
  });

  const onSubmit = (data: GoalInfoType) => {
    const userDoc = doc(db, "users", userData.uid);
    const goalRef: CollectionReference = collection(userDoc, "goal");
    const newGaolEntry: Omit<GoalType, "id"> = {
      ...data,
      amountOfPointsEarned: data.pointsEarned,
      currentPoints: 0,
      postiveCheckInStreak: 0,
      negativeCheckInStreak: 0,
      createdAt: Timestamp.fromDate(new Date()),
    };
    addDoc(goalRef, newGaolEntry).then((data) => {
      router.replace("/(tabs)/(home)/main/home");
      formHelpers.setValue("title", defaultValues.title);
      formHelpers.setValue("description", defaultValues.description);
      formHelpers.setValue("tips", defaultValues.tips);
    });
  };

  return (
    <>
      <GoalForm
        title="Track new Goal"
        onSubmit={onSubmit}
        formHelpers={formHelpers}
      />
    </>
  );
};

export default AddGoal;

const styles = StyleSheet.create({
  submitButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    width: "100%",
    paddingHorizontal: 20,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    borderRadius: 7,
    width: "45%",
  },
});
