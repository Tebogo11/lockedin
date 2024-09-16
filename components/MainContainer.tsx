import {
  View,
  type ViewProps,
  ImageBackground,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedViewProps } from "./ThemedView";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
const backgroundImage = require("../assets/images/background.png");

export function MainContainer({ style, ...otherProps }: ThemedViewProps) {
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={backgroundImage} style={styles.image}> */}
      <SafeAreaView style={[style, styles.mainContainer]} {...otherProps} />
      {/* </ImageBackground> */}
    </View>
  );
}
// C55530
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.background,
  },
  mainContainer: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "repeat",
    justifyContent: "center",
  },
});
