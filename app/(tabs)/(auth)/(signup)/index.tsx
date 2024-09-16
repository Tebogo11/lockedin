import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthButton from "../components/AuthButton";
import { Link } from "expo-router";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { router } from "expo-router";
import { useForm } from "react-hook-form";

import { MainContainer } from "../../../../components/MainContainer";
import useUser from "../../../../state/user";
import { auth, db } from "../../../firebaseConfig";
import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import TextInputWithError from "@/components/TextInput/TextInputWithError";

const LogoImage = require("../../../../assets/images/LockedInLogo.png");

type FormValues = {
  username: string;
  email: string;
  password: string;
  comfirmedPassword: string;
};

const LogoutScreen = () => {
  const { setAuthUser, setUserData } = useUser();

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      comfirmedPassword: "",
    },
  });
  const password = watch("password");

  const handleLogin = (data: FormValues) => {
    const { username, email, password } = data;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setAuthUser(user);
        setDoc(doc(collection(db, "users"), user.uid), {
          username,
          email,
          uid: user.uid,
        }).then(() => {
          setUserData({ username, email, uid: user.uid });
        });

        router.push("/(auth)/(login)");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/email-already-in-use") {
          setError("email", { message: "Email already exists." });
        }
      });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <MainContainer>
        <View style={{ height: 200, marginBottom: -100, marginTop: 30 }}>
          <Image
            style={styles.image}
            source={LogoImage}
            contentFit="cover"
            transition={1000}
          />
        </View>
        <Text style={styles.header}>Create new account</Text>
        <View style={{ marginBottom: 20 }}>
          <TextInputWithError
            control={control as any}
            label="Username"
            name="username"
            maxLength={20}
            rules={{
              required: "Username is required",
              minLength: 3,
              maxLength: 20,
            }}
            errors={errors}
          />
          <TextInputWithError
            control={control as any}
            label="Email"
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email address",
              },
            }}
            errors={errors}
            keyboardType="email-address"
          />
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
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
                message:
                  "least one: uppercase letter, lowercase letter, number",
              },
            }}
            errors={errors}
          />
          <TextInputWithError
            control={control as any}
            label="Comfirm Password"
            name="comfirmedPassword"
            secureTextEntry
            rules={{
              required: "Please comfirm password",
              validate: (value) =>
                value === password || "Passwords do not match",
            }}
            errors={errors}
          />
        </View>
        <AuthButton title="Sign up" onPress={handleSubmit(handleLogin)} />
        <View style={styles.redirect}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppons",
              color: Colors.accent.darkest,
              opacity: 0.8,
            }}
          >
            Already have an account?
          </Text>
          <Link
            href="/(auth)/(login)"
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
            Sign in
          </Link>
        </View>
      </MainContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  ForgettenText: {
    fontFamily: "Poppins",
    color: "#e2e2e2",
    marginHorizontal: 15,
  },
  header: {
    fontFamily: "Poppins",
    fontSize: 20,
    color: Colors.accent.light,
    marginBottom: 10,
    marginTop: 75,
    opacity: 0.7,
    letterSpacing: 10,
    textAlign: "center",
  },
  redirect: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  image: {
    width: 350,
    height: 175,
    transform: [{ rotate: "-4deg" }],
  },
});

export default LogoutScreen;
