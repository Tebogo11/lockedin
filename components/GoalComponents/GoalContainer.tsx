import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import { GoalType } from "@/types/habit";
import { db } from "@/app/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useUser from "@/state/user";
import useCheckIn from "./useCheckIn";

type GoalContainerProps = {
  goal: GoalType;
};

const GoalContainer = ({ goal }: GoalContainerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentGoal, setCurrentGoal] = useState<GoalType>(goal);
  const { authUser } = useUser();
  const { addCheckIn, updateUserCount } = useCheckIn();
  const goalRef = doc(db, "users", authUser?.uid ?? "", "goal", goal.id);

  // keyFunction
  const handleCheckIn = async (isPostive: boolean) => {
    setIsLoading(true);

    const newData = {
      currentPoints: isPostive
        ? currentGoal.currentPoints + currentGoal.amountOfPointsEarned
        : currentGoal.currentPoints - currentGoal.amountOfPointsEarned,
      ...(isPostive
        ? { postiveCheckInStreak: currentGoal.postiveCheckInStreak + 1 }
        : { negativeCheckInStreak: currentGoal.negativeCheckInStreak + 1 }),
    };

    updateDoc(goalRef, newData)
      .then(() => {
        getDoc(goalRef).then(async (doc) => {
          const updatedGoal = { ...doc.data(), id: doc.id } as GoalType;
          setCurrentGoal(updatedGoal);
          setIsLoading(false);
          await addCheckIn(updatedGoal, isPostive);
          await updateUserCount(updatedGoal, isPostive);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.goalShortInfo}>
        <Text style={styles.goalTitle}>{goal.title}</Text>
        <View style={styles.line} />
        <Text
          style={{
            ...styles.goalTitle,
            color: Colors.accent.darkest,
            fontFamily: "Poppinsfffjb",
          }}
        >
          Total points: {goal.currentPoints}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
          onPress={() => {
            if (!isLoading) {
              handleCheckIn(false);
            }
          }}
        >
          <View style={styles.actionContainer}>
            <Entypo name="minus" size={24} color={Colors.darkAccent.lightest} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
          onPress={() => {
            if (!isLoading) {
              handleCheckIn(true);
            }
          }}
        >
          <View style={styles.actionContainer}>
            <Entypo name="plus" size={24} color={Colors.darkAccent.lightest} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GoalContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    height: 70,
    marginBottom: 10,
    minWidth: "100%",
    backgroundColor: Colors.black,
    padding: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    borderRadius: 5,
    justifyContent: "space-between",
  },
  goalShortInfo: {
    backgroundColor: "#000",
    width: "70%",
    height: "90%",
    padding: 5,
    borderRadius: 5,
  },
  goalTitle: {
    fontSize: 12,
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontFamily: "Roboto",
    letterSpacing: 1.8,
    color: Colors.accent.dark,
  },
  line: {
    borderBottomColor: Colors.accent.lightest,
    borderBottomWidth: 1,
    width: "100%",
    marginVertical: 5,
  },
  actionContainer: {
    backgroundColor: Colors.primary.dark,
    padding: 5,
    borderRadius: 5,
  },
});
