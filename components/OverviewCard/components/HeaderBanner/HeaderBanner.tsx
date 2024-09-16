import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
const LogoImage = require("../../../../assets/images/LockedInLogo.png");

const HeaderBanner = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={LogoImage}
        contentFit="cover"
        transition={1000}
      />

      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 5,
          padding: 2,
          backgroundColor: Colors.primary.dark,
          shadowColor: "#141414",
          shadowOffset: { width: -2, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 0.1,
          elevation: 24,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 10,
          marginTop: 10,
        }}
      >
        <Ionicons name="menu" size={38} color={Colors.black} />
      </View>
    </View>
  );
};

export default HeaderBanner;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 70,
    marginBottom: 20,
    minWidth: "100%",
    padding: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 170,
    height: 120,
    transform: [{ rotate: "-4deg" }],
  },
});
