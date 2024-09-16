import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import React from "react";
import { GoalType } from "@/types/habit";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Button } from "react-native-paper";
import { Link } from "expo-router";

type GoalPageNavProps = {
  goBack: () => void;
  goalId: string;
};
const GoalPageNav = ({ goBack, goalId }: GoalPageNavProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
      }}
    >
      <Button
        mode="text"
        rippleColor={Colors.primary.dark}
        style={{
          borderRadius: 5,
        }}
        onPress={goBack}
      >
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            name="arrowleft"
            size={24}
            color={Colors.black}
            onPress={goBack}
          />
          <Text style={{ fontSize: 20, marginLeft: 5, color: Colors.black }}>
            Go Back
          </Text>
        </View>
      </Button>
      <Link href={{ pathname: "/main/[goalid]", params: { goalid: goalId } }}>
        <Button
          mode="outlined"
          contentStyle={{
            flexDirection: "row",
            padding: 0,
            height: 40,
            marginTop: 0,
          }}
          style={{
            borderColor: Colors.black,
            borderWidth: 2,
            borderRadius: 5,
            marginTop: -10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              marginLeft: 5,
              color: Colors.black,
              height: 50,
              letterSpacing: 1.5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Edit
          </Text>
        </Button>
      </Link>
    </View>
  );
};

export default GoalPageNav;

const styles = StyleSheet.create({});
