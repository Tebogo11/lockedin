import { View, Text } from "react-native";
import React from "react";
import { GoalType } from "@/types/habit";
import MoreInfo from "./MoreInfo";

type GoalMoreInfoProps = {
  goalInfo: GoalType;
};

const GoalMoreInfo = ({ goalInfo }: GoalMoreInfoProps) => {
  return (
    <View>
      <View>
        <MoreInfo goalInfo={goalInfo} />
      </View>
    </View>
  );
};

export default GoalMoreInfo;
