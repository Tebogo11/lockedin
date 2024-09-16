import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useUser from "@/state/user";
import { Colors } from "@/constants/Colors";

import { ThemedText } from "../ThemedText";
import ActionButtons from "./components/Actions/ActionButtons";
import HeaderBanner from "./components/HeaderBanner/HeaderBanner";
import { calcLevelBar } from "@/utils.ts/levelCalc";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const OverviewCard = () => {
  const { userData } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.topBannerContainer}>
        <View style={styles.counterContainer}>
          <Text
            style={{
              color: "#a19f9f",
              fontFamily: "Poppins",
              letterSpacing: 2.5,
            }}
          >
            Total Points :{" "}
          </Text>
          <Text style={styles.count}>{userData?.totalCount}</Text>
        </View>
        <View style={{ width: "33%" }}>
          <ActionButtons />
        </View>
      </View>
      <View style={styles.bottomBannerContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: 5 }}>
            <View style={styles.progressionSubContainer}>
              <ThemedText type="subtitle" style={styles.progressionLevel}>
                Progression
              </ThemedText>
            </View>
            <View
              style={{
                ...styles.progressionSubContainer,
                backgroundColor: Colors.primary.darker,
              }}
            >
              <ThemedText
                type="subtitle"
                style={{ ...styles.progressionLevel, color: Colors.black }}
              >
                Lvl {userData.currentLevel}
              </ThemedText>
            </View>
          </View>
          <ThemedText style={styles.rankerText}>
            {userData.pointsTowardsNextLevel}/1000
          </ThemedText>
        </View>
        <View style={styles.rankerContainer}>
          {Array.from({ length: 5 }).map((_, i) => {
            const isActive = calcLevelBar(
              i,
              userData.pointsTowardsNextLevel || 0
            );
            return (
              <View
                key={i}
                style={{
                  borderBottomColor: isActive ? "white" : "#000",
                  borderBottomWidth: 4,
                  height: 20,
                  width: "18%",
                }}
              ></View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default OverviewCard;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 20,
    width: "90%",
    height: 170,
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 10,
  },
  topBannerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomBannerContainer: {
    flexDirection: "column",
  },
  counterContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "65%",
    padding: 10,
    backgroundColor: "#0a022b",
  },
  count: {
    color: "white",
    fontFamily: "DsDigital",
    fontSize: 40,
  },
  rankerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
  },
  rankerText: {
    fontSize: 10,
    color: "white",
    fontFamily: "Poppins",
    letterSpacing: 2,
    marginBottom: -12,
  },
  progressionSubContainer: {
    height: 30,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "stretch",
    padding: 5,
    borderWidth: 2,
    borderColor: Colors.primary.darker,
  },
  progressionLevel: {
    fontSize: 12,
    textAlign: "left",
    color: Colors.primary.darker,
    letterSpacing: 2.5,
    fontFamily: "SpaceMomo",
  },
});
