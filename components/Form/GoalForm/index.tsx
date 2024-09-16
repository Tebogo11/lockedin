import { db } from "@/app/firebaseConfig";
import { MainContainer } from "@/components/MainContainer";
import TextInputWithError from "@/components/TextInput/TextInputWithError";
import { ThemedText } from "@/components/ThemedText";
import useUser from "@/state/user";
import { GoalInfoType, GoalType } from "@/types/habit";
import { router } from "expo-router";
import {
  doc,
  CollectionReference,
  collection,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Slider from "../Slider";

type GoalFormProps = {
  title: string;
  onSubmit: (data: GoalInfoType) => void;
  formHelpers: UseFormReturn<GoalInfoType, any, undefined>;
  defaultPointsEarned?: number;
};

const GoalForm = ({
  title,
  onSubmit,
  formHelpers,
  defaultPointsEarned = 200,
}: GoalFormProps) => {
  const [pointsEarned, setPointsEarned] = useState(defaultPointsEarned);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formHelpers;

  const onSubmitClick = (data: GoalInfoType) => {
    const extendData = { ...data, pointsEarned };
    onSubmit(extendData);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <MainContainer style={{ padding: 20 }}>
        <View>
          <ThemedText
            type="subtitle"
            style={{
              paddingTop: 30,
              fontSize: 24,
              marginVertical: 30,
              fontWeight: "600",
              letterSpacing: 6.5,
              fontFamily: "RobotoBold",
            }}
          >
            {title}
          </ThemedText>
          <TextInputWithError
            control={control as any}
            label="Title"
            name="title"
            maxLength={30}
            rules={{
              required: "Title is required",
              maxLength: 30,
            }}
            errors={errors}
          />
          <TextInputWithError
            control={control as any}
            label="Description"
            name="description"
            multiline
            numberOfLines={4}
            errors={errors}
          />
          <TextInputWithError
            control={control as any}
            label="Rules and Tips"
            name="tips"
            multiline
            errors={errors}
          />
          <Slider
            setPointsEarned={setPointsEarned}
            pointsEarned={pointsEarned}
          />
        </View>
        <View style={styles.submitButtons}>
          <Button
            mode="contained"
            style={{
              ...styles.button,
              backgroundColor: Colors.primary.lightest,
              borderWidth: 1,
              borderColor: "rgb(255, 72, 0)",
            }}
            onPress={() => router.back()}
          >
            <ThemedText
              type="buttonText"
              style={{ color: "rgb(255, 72, 0)", fontWeight: "600" }}
            >
              Cancel
            </ThemedText>
          </Button>
          <Button
            mode="elevated"
            style={{
              ...styles.button,
              backgroundColor: Colors.primary.dark,
            }}
            onPress={handleSubmit(onSubmitClick)}
          >
            <ThemedText
              type="buttonText"
              style={{ color: "white", fontWeight: "600" }}
            >
              Save
            </ThemedText>
          </Button>
        </View>
      </MainContainer>
    </KeyboardAwareScrollView>
  );
};

export default GoalForm;

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
