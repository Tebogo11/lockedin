import {
  Image,
  StyleSheet,
  Platform,
  Button,
  View,
  Touchable,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { Link, usePathname } from "expo-router";
import { MainContainer } from "../../../../components/MainContainer";
import { useGoalManagers } from "@/hooks/useGoalManagers";
import useGoals from "@/state/goal";
import GoalContainer from "@/components/GoalComponents/GoalContainer";
import React, { useEffect, useState } from "react";
import OverviewCard from "@/components/OverviewCard/OverviewCard";
import HeaderBanner from "@/components/OverviewCard/components/HeaderBanner/HeaderBanner";
import GoalMoreInfo from "@/components/GoalComponents/GoalMoreInfo";
import GoalPageNav from "@/components/GoalComponents/GoalPageNav";
import usePageManagement from "@/state/pageManagment";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  const [selectedGoal, setSelectGoal] = useState("");
  const { goals } = useGoals();
  const path = usePathname();
  const { setDontShowBottomTab } = usePageManagement();

  useEffect(() => {
    if (selectedGoal) {
      setDontShowBottomTab(true);
    } else {
      setDontShowBottomTab(false);
    }
  }, [selectedGoal]);

  return (
    <MainContainer>
      {!selectedGoal && (
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            <HeaderBanner />
          </View>
          <OverviewCard />
        </View>
      )}
      <View
        style={{
          height: selectedGoal ? "95%" : "56.5%",
          padding: 20,
        }}
      >
        {selectedGoal && (
          <GoalPageNav goBack={() => setSelectGoal("")} goalId={selectedGoal} />
        )}

        <ScrollView style={{ maxHeight: "100%" }} scrollEnabled={!selectedGoal}>
          {goals.map((goal, index) => {
            return (
              <View
                key={goal.id + index}
                style={{
                  display:
                    selectedGoal && selectedGoal !== goal.id ? "none" : "flex",
                }}
              >
                <TouchableHighlight
                  onPress={() => {
                    if (!selectedGoal) {
                      setSelectGoal(goal.id);
                    } else {
                      setSelectGoal("");
                    }
                  }}
                  underlayColor={Colors.primary.dark}
                >
                  <GoalContainer goal={goal} />
                </TouchableHighlight>
                {selectedGoal && selectedGoal === goal.id && (
                  <GoalMoreInfo goalInfo={goal} />
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
