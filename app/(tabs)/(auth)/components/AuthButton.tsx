import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

interface AuthButtonProps {
  onPress: () => void;
  title: string;
}

const AuthButton = ({ onPress, title }: AuthButtonProps) => {
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Button
        style={styles.button}
        mode="elevated"
        onPress={onPress}
        contentStyle={{
          padding: 0,
          margin: 0,

          marginHorizontal: 3,
          height: 60,
        }}
      >
        <Text style={styles.buttonText}>{title.toUpperCase()}</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    borderRadius: 15,
    width: 170,
    backgroundColor: Colors.background,
    // borderWidth: 1,
    // borderColor: Colors.accent.light,
  },
  buttonText: {
    color: Colors.accent.lightest,
    fontSize: 16,
    width: 170,
    height: 60,
    textAlign: "center",
    fontFamily: "Poppins",
    fontWeight: "bold",
    letterSpacing: 6.5,
  },
});

export default AuthButton;
