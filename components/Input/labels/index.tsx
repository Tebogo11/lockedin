import React from "react";
import { Text, StyleSheet } from "react-native";

interface LabelProps {
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ children }) => {
  return <Text style={styles.label}>{children}</Text>;
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: "white",
    marginLeft: 10,
    fontFamily: "Roboto",
    marginBottom: 8,
  },
});

export default Label;
