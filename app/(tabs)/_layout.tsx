import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import useUser, { UserData } from "@/state/user";
import { doc, getDoc } from "firebase/firestore";

export default function StackLayout() {
  const [userIsValid, setUserIsValid] = useState(false);
  const { setAuthUser, setUserData } = useUser();
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  useEffect(() => {
    setIsLoadingAuth(true);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserIsValid(true);
        setAuthUser(user);
        setIsLoadingAuth(false);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data() as UserData;
        if (userData) {
          setUserData(userData);
        }
      } else {
        setUserIsValid(false);
      }
    });
  }, []);

  if (isLoadingAuth) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {userIsValid ? (
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}
