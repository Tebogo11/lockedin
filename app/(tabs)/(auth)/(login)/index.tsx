import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  signInWithEmailAndPassword,
  setPersistence,
  inMemoryPersistence,
  Persistence,
} from "firebase/auth";
import GradientText from "../components/GradientTitle";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthButton from "../components/AuthButton";
import { Link, router } from "expo-router";
import { getDoc, doc } from "firebase/firestore";

import { useForm } from "react-hook-form";
import { MainContainer } from "../../../../components/MainContainer";
import useUser, { UserData } from "../../../../state/user";
import { auth, db } from "../../../firebaseConfig";
import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import { blurhash } from "@/constants/BlurHash";
import TextInputWithError from "@/components/TextInput/TextInputWithError";
const LogoImage = require("../../../../assets/images/LockedInLogo.png");

const persistance: Persistence = {
  type: "LOCAL",
};

type SignInValues = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const [inValidDetailsError, setInValidDetailsError] = useState(false);
  const { setAuthUser, setUserData } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (data: SignInValues) => {
    const { email, password } = data;

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        setAuthUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data() as UserData;
        if (userData) {
          setUserData(userData);
        }

        router.push("/(home)");
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        if (errorCode === "auth/invalid-credential") {
          setInValidDetailsError(true);
        }
      });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <MainContainer>
        <View style={{ height: 200, marginBottom: -100, marginTop: 60 }}>
          <Image
            style={styles.image}
            source={LogoImage}
            contentFit="cover"
            transition={1000}
          />
        </View>
        <Text style={styles.header}>Welcome</Text>
        {inValidDetailsError ? (
          <View
            style={{
              backgroundColor: "rgba(255, 33, 33, 0.651)",
              paddingHorizontal: 10,
              marginBottom: 20,
            }}
          >
            <Text style={{ color: "#ffcfcfdc", fontFamily: "Poppins" }}>
              Invalid email or password
            </Text>
          </View>
        ) : null}
        <View>
          <TextInputWithError
            control={control as any}
            label="Email"
            name="email"
            rules={{
              required: "Email is required",
            }}
            errors={errors}
          />
        </View>
        <View style={{ marginTop: 5 }}>
          <TextInputWithError
            control={control as any}
            label="Password"
            name="password"
            secureTextEntry
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              maxLength: {
                value: 128,
                message: "Password must be no longer than 128 characters",
              },
            }}
            errors={errors}
          />
        </View>
        <View
          style={{
            minWidth: "100%",
            marginRight: 50,
            alignItems: "flex-end",
            justifyContent: "flex-end",
            marginBottom: 30,
          }}
        >
          <Text style={styles.ForgettenText}>Forgthen password?</Text>
        </View>
        <AuthButton title="Login" onPress={handleSubmit(handleLogin)} />
        <View style={styles.redirect}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppons",
              color: Colors.accent.darkest,
              opacity: 0.8,
            }}
          >
            Don’t have an account?
          </Text>
          <Link
            href="/(auth)/(signup)"
            style={{
              marginLeft: 5,
              fontSize: 16,
              fontFamily: "Poppons",
              color: Colors.secondary.dark,
              fontWeight: "thin",

              letterSpacing: 3,
              marginTop: 5,
            }}
          >
            Sign up
          </Link>
        </View>
      </MainContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  ForgettenText: {
    fontFamily: "Poppins",
    color: "#FBF1EF",
  },
  header: {
    fontFamily: "Poppins",
    fontSize: 24,
    color: Colors.accent.light,
    marginBottom: 10,
    marginTop: 125,
    opacity: 0.7,
    letterSpacing: 20,
  },
  redirect: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  image: {
    width: 400,
    height: 200,
    transform: [{ rotate: "-4deg" }],
  },
});

export default LoginScreen;
