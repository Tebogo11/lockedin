import { View, Text, useColorScheme } from "react-native";
import React from "react";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { Stack } from "expo-router";

const Authlayout = () => {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(login)/index" options={{ headerShown: false }} />
        <Stack.Screen name="(signup)/index" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
};

export default Authlayout;
