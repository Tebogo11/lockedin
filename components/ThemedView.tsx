import { Colors } from "@/constants/Colors";
import { View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  return (
    <View
      style={[{ backgroundColor: Colors.background }, style]}
      {...otherProps}
    />
  );
}
