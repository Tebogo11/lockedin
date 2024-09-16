import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import SliderComponent from "@react-native-community/slider";
import { Colors } from "@/constants/Colors";

type SliderProps = {
  pointsEarned: number;
  setPointsEarned: React.Dispatch<React.SetStateAction<number>>;
};

const stepValue = [200, 400, 600, 800, 1000];
const Slider = ({ pointsEarned, setPointsEarned }: SliderProps) => {
  const onChange = (value: number) => {
    setPointsEarned(stepValue[value - 1]);
  };

  return (
    <View
      style={{
        backgroundColor: Colors.black,
        paddingVertical: 10,
        marginTop: 7,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: Colors.black,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "white",
            fontFamily: "RobotoBold",
            marginTop: 15,
            marginLeft: 20,
            letterSpacing: 2.8,
            marginBottom: 10,
          }}
        >
          Amount Earned
        </Text>
        <View>
          <Text
            style={{
              fontSize: 16,
              color: "white",
              fontFamily: "RobotoBold",
              marginTop: 15,
              marginRight: 20,
              margin: 0,
              letterSpacing: 2.8,
              marginBottom: 10,
              borderLeftWidth: 1,
              borderLeftColor: "white",
            }}
          >
            {pointsEarned}
          </Text>
        </View>
      </View>
      <SliderComponent
        step={1}
        StepMarker={() => {
          return (
            <View
              style={{
                width: 10,
                height: 0,
                backgroundColor: "red",
              }}
            />
          );
        }}
        style={{ maxWidth: "90%", height: 60, paddingHorizontal: 10 }}
        minimumValue={1}
        maximumValue={5}
        value={stepValue.indexOf(pointsEarned) + 1}
        onValueChange={onChange}
        thumbTintColor={Colors.primary.darkest}
        minimumTrackTintColor={Colors.primary.darkest}
        maximumTrackTintColor="#000"
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});
