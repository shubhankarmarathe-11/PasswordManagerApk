import { showToast } from "@/utils/ShowMessage";
import { MaterialIcons } from "@expo/vector-icons";
import * as Crypto from "expo-crypto";
import { router } from "expo-router";
import * as secureStore from "expo-secure-store";
import * as sqlite from "expo-sqlite";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

const ForgotPassword = () => {
  const [email, Setemail] = useState("");
  const [prevpass, Setprevpass] = useState("");

  const [showpassword, Setshowpass] = useState(true);

  const ClickonUpdate = async () => {
    if (email == "") return showToast("error", "Error", "Please enter email");
    if (prevpass == "")
      return showToast("error", "Error", "Please enter old password");

    let hashedpass = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      prevpass
    );

    const userid = await secureStore.getItemAsync("userid");
    const db = await sqlite.openDatabaseAsync("passwords.db");
    let result = await db.runAsync(
      "UPDATE USERS SET password = ? WHERE id = ? AND email ?",
      [hashedpass, Number(userid), email]
    );
    if (result.changes === 1) {
      showToast("success", "Updated", "Password Updated");
      setTimeout(() => {
        router.replace("/auth/Login");
      }, 200);
    } else {
      showToast("error", "Error", "Nothing was Updated");
    }
  };

  return (
    <>
      <View className="z-50">
        <Toast />
      </View>
      <View className=" pt-8 w-screen">
        <View className="flex flex-col items-center p-5 w-auto overflow-y-auto justify-center h-3/4 m-3  rounded-md  gap-8 ">
          <Text className=" text-2xl font-thim ">Update account password</Text>
          <TextInput
            className="border w-full  rounded-2xl p-3 py-5 text-black"
            value={email}
            keyboardType="email-address"
            placeholder="Enter your email"
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
              placeholder="Enter previous password"
              placeholderTextColor={"#1F2937"}
              value={prevpass}
              onChangeText={(text) => {
                Setprevpass(text);
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

          <Pressable
            onPress={ClickonUpdate}
            className="w-full bg-gray-700 p-5 flex justify-center items-center rounded-2xl"
          >
            <Text className="text-white">Update Password</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default ForgotPassword;
