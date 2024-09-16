import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";
interface CustomTextInputProps extends TextInputProps {}

type TextInputComponentProps = TextInputProps & {
  styles?: any;
};
const TextInputComponent = ({
  styles: addStyles,
  multiline,
  ...props
}: TextInputComponentProps) => {
  return (
    <TextInput
      mode="outlined"
      style={{
        ...styles.input,
        ...addStyles,
        paddingBottom: multiline ? 10 : 0,
      }}
      activeOutlineColor={"#bd391b"}
      outlineColor={"rgb(102, 30, 1)"}
      placeholderTextColor={Colors.accent.dark}
      multiline={multiline}
      contentStyle={{
        color: Colors.accent.lightest,
        fontFamily: "Poppins",
        fontSize: 14,
        marginTop: 0,
        paddingTop: 20,
      }}
      {...props}
      outlineStyle={{ borderRadius: 3 }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#051924",
    height: 50,
    width: 330,
    color: Colors.accent.darker,
    fontFamily: "Poppins",
  },
});

export default TextInputComponent;
