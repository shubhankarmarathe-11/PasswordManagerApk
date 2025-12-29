import * as Crypto from "expo-crypto";
import { Link, useRouter } from "expo-router";
import * as secureStore from "expo-secure-store";
import * as sqlite from "expo-sqlite";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { showToast } from "../../utils/ShowMessage";

import { MaterialIcons } from "@expo/vector-icons";

const Login = () => {
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [showpassword, Setshowpass] = useState(true);

  const router = useRouter();

  const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  async function onClickLogin() {
    if (email == "" || !emailRegex.test(email))
      return showToast("error", "Error", "Please enter email");

    if (password == "" || password.length < 8)
      return showToast("error", "Error", "Please enter password");

    try {
      const db = await sqlite.openDatabaseAsync("passwords.db");

      let hashedpass = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );

      let user = await db.getFirstAsync(
        "SELECT * FROM USERS WHERE email = ? AND password = ?",
        [String(email), hashedpass]
      );

      if (user) {
        await secureStore.setItemAsync("username", user.username);
        await secureStore.setItemAsync("userid", String(user.id));
        return router.replace("/tabs/Homepage");
      }

      return showToast("error", "Error", "Invalid credentials");
    } catch (error) {
      return showToast("error", "Error", "Please try again");
    }
  }

  return (
    <>
      <View className="z-50">
        <Toast />
      </View>
      <View className=" pt-8 w-screen ">
        <View className="">
          <Text className="text-center text-2xl font-bold mt-5">
            Welcome to Password Manager 🔐
          </Text>
          <Text className="text-center text-sm text-gray-500">
            Designed & developed by Shubhankar Marathe.
          </Text>
        </View>
        <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
          <View className="flex flex-col items-center px-5  w-auto overflow-y-auto justify-center h-3/4 m-3  rounded-md  gap-8 ">
            <Text className=" text-5xl font-bold ">Login Page</Text>
            <Text className="font-bold ">Login to access your passwords .</Text>
            <TextInput
              className="border w-full  rounded-2xl p-3 py-5 text-black"
              keyboardType="email-address"
              placeholder="Enter Email"
              placeholderTextColor={"#1F2937"}
              onChangeText={(text) => {
                Setemail(text);
              }}
            />

            <View className="border border-1 rounded-2xl  flex flex-row items-center w-full gap-2">
              <TextInput
                className="flex-1 rounded-2xl p-3 py-5 text-black"
                keyboardType="default"
                secureTextEntry={showpassword}
                placeholder="Enter Password"
                placeholderTextColor={"#1F2937"}
                onChangeText={(text) => {
                  Setpassword(text);
                }}
              />
              <Pressable
                className="min-w-fit p-3"
                onPress={() => {
                  Setshowpass(!showpassword);
                }}
              >
                <MaterialIcons
                  name={showpassword ? "visibility-off" : "visibility"}
                  size={24}
                  color={"black"}
                />
              </Pressable>
            </View>
            {/* <View className="w-full text-left">
            <Link
              className="underline underline-offset-8 text-violet-700 "
              href={"/auth/ForgotPassword"}
            >
              Forgot password ?
            </Link>
          </View> */}
            <View className="bg-black w-fit rounded-xl py-4 px-8 flex items-center justify-center shadow-2xl elevation-2xl ">
              <Text onPress={onClickLogin} className="text-white text-center">
                Login Now
              </Text>
            </View>
            <Link
              className="underline underline-offset-8 text-violet-700 text-center"
              href={"/auth/RegisterUser"}
            >
              Register Now
            </Link>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Login;
