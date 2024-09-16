import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { GoalType } from "@/types/habit";
import { Colors } from "@/constants/Colors";

type MoreInfoProps = {
  goalInfo: GoalType;
};
export default function MoreInfo({ goalInfo }: MoreInfoProps) {
  return (
    <View>
      <View style={styles.counterWrapper}>
        <View style={{ ...styles.counterContainer, width: "30%" }}>
          <Text style={styles.counterLabels}>Postive</Text>
          <Text style={styles.counterValue}>
            {goalInfo.postiveCheckInStreak}
          </Text>
        </View>
        <View style={{ ...styles.counterContainer, width: "35%" }}>
          <Text style={styles.counterLabels}>Total Points</Text>
          <Text style={styles.counterValue}>{goalInfo.currentPoints}</Text>
        </View>
        <View style={{ ...styles.counterContainer, width: "30%" }}>
          <Text style={styles.counterLabels}>Negative</Text>
          <Text style={styles.counterValue}>
            {goalInfo.negativeCheckInStreak}
          </Text>
        </View>
      </View>
      <ScrollView style={{ minHeight: "100%" }}>
        <View>
          <ThemedText
            type="subtitle"
            style={{
              fontSize: 18,
              marginBottom: 10,
              color: "#ffffff81",
              letterSpacing: 1.5,
              fontFamily: "Poppins",
            }}
          >
            Description
          </ThemedText>
          <ThemedText type="default" style={styles.infoStyles}>
            {goalInfo.description}
          </ThemedText>
        </View>

        <ThemedText
          type="subtitle"
          style={{
            fontSize: 18,
            marginTop: 20,
            marginBottom: 10,
            color: "#ffffff81",
            letterSpacing: 1.5,
            fontFamily: "Poppins",
          }}
        >
          Rules and Tips{" "}
        </ThemedText>
        <ThemedText type="default" style={styles.infoStyles}>
          {goalInfo.tips}
        </ThemedText>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  counterWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  counterContainer: {
    width: "30%",
    marginRight: 5,
    height: 65,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
    backgroundColor: Colors.black,
    borderWidth: 2,
    borderColor: Colors.primary.darkest,
    borderRadius: 10,
    marginBottom: 30,
  },
  counterLabels: {
    color: "#fff",
    fontSize: 10,
    fontFamily: "Poppins",
    textAlign: "center",
    width: "100%",
  },
  counterValue: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "SpaceMomo",
    textAlign: "center",
    width: "100%",
  },
  infoStyles: {
    color: "#ffffffb5",
    fontSize: 14,
    fontFamily: "Roboto",
    letterSpacing: 1.2,
  },
});
