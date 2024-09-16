import Label from "@/components/Input/labels";
import TextInputComponent from "@/components/Input/TextInput";
import { Colors } from "@/constants/Colors";
import React, { useEffect, useRef, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import {
  View,
  StyleSheet,
  Text,
  KeyboardTypeOptions,
  Animated,
} from "react-native";

type TextInputWithErrorProps = {
  label: string;
  name: string;
  maxLength?: number;
  control: Control<FieldValues>;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, any>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
  errors?: FieldErrors<FieldValues>;
};

const TextInputWithError = ({
  label,
  name,
  control,
  maxLength = 508,
  rules,
  secureTextEntry = false,
  errors,
  multiline = false,
  numberOfLines = 10,
  keyboardType = "default",
}: TextInputWithErrorProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{ marginBottom: 5, position: "relative" }}>
      <Controller
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <TextInputComponent
              label={
                <View
                  style={{
                    marginLeft: -30,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "white",
                      fontFamily: "RobotoBold",
                      backgroundColor: Colors.black,
                      borderColor:
                        isFocused || field.value ? "#bd391b" : Colors.black,
                      borderWidth: 2,
                      marginTop: 15,
                      marginLeft: 10,
                      margin: 0,
                      letterSpacing: 2.8,
                    }}
                  >
                    {" " + label + " "}
                  </Text>
                </View>
              }
              onFocus={() => setIsFocused(true)}
              multiline={multiline}
              numberOfLines={numberOfLines}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={() => {
                field.onBlur();
                setIsFocused(false);
              }}
              placeholder={"Please enter " + label.toLowerCase() + " here"}
              secureTextEntry={secureTextEntry}
              maxLength={maxLength}
              keyboardType={keyboardType}
              theme={{
                colors: {
                  onSurfaceVariant: Colors.primary.darkest,
                },
              }}
              styles={{
                minHeight: multiline ? (isFocused ? 200 : 100) : 50,
                width: 330,
                maxHeight: 300,
              }}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                {error && (
                  <Text style={styles.errorText}> {error.message} </Text>
                )}
              </View>
              <Text
                style={{
                  fontSize: 11,
                  color: Colors.accent.lightest,
                  letterSpacing: 1.5,
                  fontFamily: "Poppins",
                }}
              >
                {field.value.length}/{maxLength}
              </Text>
            </View>
          </>
        )}
        name={name}
        rules={rules}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: Colors.primary.darkest,
    marginBottom: 5,
    marginTop: 2,
    backgroundColor: Colors.black,
  },
});
export default TextInputWithError;
