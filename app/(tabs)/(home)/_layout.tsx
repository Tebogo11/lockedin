import { Tabs, useSegments } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useGoalManagers } from "@/hooks/useGoalManagers";
import useUser from "@/state/user";
import usePageManagement from "@/state/pageManagment";

export default function TabLayout() {
  const { dontShowBottomTab } = usePageManagement();
  const { userData } = useUser();
  if (userData) {
    useGoalManagers();
  }
  const segment = useSegments();
  return (
    <Tabs
      sceneContainerStyle={{ backgroundColor: "transparent" }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          backgroundColor: Colors.primary.lightest,
          borderRadius: 15,
          height: 70,
          ...styles.shadow,
        },
      }}
    >
      <Tabs.Screen
        name="main"
        options={{
          title: "home",
          tabBarShowLabel: false,
          tabBarActiveTintColor: "rgb(255, 72, 0)",
          tabBarInactiveTintColor: Colors.primary.dark,
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6
              name="list-check"
              size={24}
              style={{ marginBottom: -30 }}
              color={color}
            />
          ),
          ...(dontShowBottomTab && { tabBarStyle: { display: "none" } }),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "add",
          tabBarShowLabel: false,
          tabBarItemStyle: {
            borderWidth: 1,
            marginTop: -10,
            backgroundColor: Colors.background,
            borderRadius: 15,
            minWidth: 60,
            maxWidth: 60,
            height: 60,
            transform: [{ rotate: "45deg" }],
          },
          tabBarStyle: {
            display:
              segment[2] === "add" || dontShowBottomTab ? "none" : "flex",
          },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={"add"}
              size={36}
              color={focused ? "rgb(255, 72, 0)" : Colors.primary.lightest}
              style={{ marginBottom: 0, transform: [{ rotate: "45deg" }] }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="options"
        options={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "rgb(255, 72, 0)",
          tabBarInactiveTintColor: Colors.primary.dark,
          title: "options",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
          ...(dontShowBottomTab && { tabBarStyle: { display: "none" } }),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  shadow: {
    borderColor: Colors.black,
    borderTopColor: Colors.black,
    borderWidth: 1,
    shadowColor: "#6e4949",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 4,
  },
});
