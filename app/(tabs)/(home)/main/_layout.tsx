import React from "react";

import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="[goalid]/index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default HomeLayout;
