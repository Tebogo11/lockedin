import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";

const ActionButtons = () => {
  return (
    <>
      <LinearGradient
        colors={["#EC9F05", "#FF2121"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          width: "100%",
          height: 50,

          justifyContent: "center",
          alignItems: "stretch",
          padding: 5,
        }}
      >
        <ThemedText type="subtitle" style={{ fontSize: 14, textAlign: "left" }}>
          Life Coach
        </ThemedText>
        <ThemedText type="subtitle" style={{ fontSize: 8, textAlign: "right" }}>
          +250
        </ThemedText>
      </LinearGradient>
      <LinearGradient
        colors={["#b60064", "#FF2121"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          width: "100%",
          height: 30,
          marginTop: 5,
          justifyContent: "center",
          alignItems: "stretch",
          padding: 5,
        }}
      >
        <ThemedText
          type="subtitle"
          style={{ color: "#000", fontSize: 12, textAlign: "left" }}
        >
          Mediate
        </ThemedText>
        <ThemedText type="subtitle" style={{ fontSize: 8, textAlign: "right" }}>
          +250
        </ThemedText>
      </LinearGradient>
    </>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({});
