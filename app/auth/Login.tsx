import * as Crypto from "expo-crypto";
import { Link, useRouter } from "expo-router";
import * as secureStore from "expo-secure-store";
import * as sqlite from "expo-sqlite";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { showToast } from "../../utils/ShowMessage";

const Login = () => {
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
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
      console.log(error);

      return showToast("error", "Error", "Please try again");
    }
  }

  return (
    <>
      <View className=" flex-1 pt-24 w-screen ">
        <Toast />
        <View className="flex flex-col items-center p-5 w-auto overflow-y-auto justify-center h-3/4 m-3  rounded-md  gap-8 ">
          <Text className=" text-5xl font-bold ">Login Page</Text>
          <Text className="font-bold ">Login to access your passwords .</Text>
          <TextInput
            className="border w-full  rounded-2xl p-3 py-5 "
            keyboardType="email-address"
            placeholder="Enter Email"
            onChangeText={(text) => {
              Setemail(text);
            }}
          />
          <TextInput
            className="border w-full rounded-2xl p-3 py-5 "
            keyboardType="default"
            secureTextEntry={true}
            placeholder="Enter Password"
            onChangeText={(text) => {
              Setpassword(text);
            }}
          />
          <View className="w-full text-left">
            <Link
              className="underline underline-offset-8 text-violet-700 "
              href={"/auth/ForgotPassword"}
            >
              Forgot password ?
            </Link>
          </View>
          <View className="bg-black w-fit rounded-xl py-4 px-8 flex items-center justify-center shadow-2xl elevation-2xl ">
            <Text onPress={onClickLogin} className="text-white ">
              Login Now
            </Text>
          </View>
          <Link
            className="underline underline-offset-8 text-violet-700"
            href={"/auth/RegisterUser"}
          >
            Register Now
          </Link>
        </View>
      </View>
    </>
  );
};

export default Login;
