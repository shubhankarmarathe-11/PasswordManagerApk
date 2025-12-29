import { MaterialIcons } from "@expo/vector-icons";
import * as Crypto from "expo-crypto";
import { Link, useRouter } from "expo-router";
import * as secureStore from "expo-secure-store";
import * as sqlite from "expo-sqlite";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { showToast } from "../../utils/ShowMessage";

const RegisterUser = () => {
  const [username, Setusername] = useState("");
  const [email, Setemail] = useState("");
  const [phone, Setphone] = useState("");
  const [password, Setpassword] = useState("");

  const [showpassword, Setshowpass] = useState(true);

  const router = useRouter();

  const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  async function onClickRegister() {
    if (username == "")
      return showToast("error", "Error", "Please enter username");

    if (email == "" || !emailRegex.test(email))
      return showToast("error", "Error", "Please enter email");

    if (phone.length != 10)
      return showToast("error", "Error", "Please enter proper phone number");

    if (password == "" || password.length < 8)
      return showToast("error", "Error", "Please enter password");

    const db = await sqlite.openDatabaseAsync("passwords.db");

    let hashedpass = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    try {
      let r = await db.runAsync(
        "INSERT INTO USERS (username, email, mobilenum, password) VALUES (?, ?, ?, ?)",
        [String(username), String(email), String(phone), hashedpass]
      );
      await db.closeAsync();
      await secureStore.setItemAsync("username", username);
      await secureStore.setItemAsync("userid", String(r.lastInsertRowId));
      router.replace("/tabs/Homepage");
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
        <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
          <View className="flex flex-col items-center p-5 w-auto overflow-y-auto  justify-center h-3/4 m-3  rounded-md  gap-8 font-audiowide ">
            <Text className=" text-5xl font-bold ">Signup Page</Text>
            <Text className="font-bold ">
              Create account to keep passwords secure .
            </Text>
            <TextInput
              className="border w-full  rounded-2xl p-3 py-5 text-black"
              keyboardType="default"
              placeholder="Enter Name"
              placeholderTextColor={"#1F2937"}
              onChangeText={(text) => {
                Setusername(text);
              }}
            />
            <TextInput
              className="border w-full  rounded-2xl p-3 py-5 text-black"
              keyboardType="email-address"
              placeholder="Enter Email"
              placeholderTextColor={"#1F2937"}
              onChangeText={(text) => {
                Setemail(text);
              }}
            />
            <TextInput
              className="border w-full  rounded-2xl p-3 py-5 text-black"
              keyboardType="number-pad"
              placeholder="Enter Mobile Number"
              placeholderTextColor={"#1F2937"}
              onChangeText={(text) => {
                Setphone(String(text));
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
            <View className="bg-black w-fit rounded-xl py-4 px-8 flex items-center justify-center shadow-2xl elevation-2xl ">
              <Text
                onPress={onClickRegister}
                className="text-white text-center"
              >
                Create Account
              </Text>
            </View>
            <Link
              className="underline underline-offset-8 text-violet-700 text-center"
              href={"/auth/Login"}
            >
              Login Now
            </Link>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default RegisterUser;
