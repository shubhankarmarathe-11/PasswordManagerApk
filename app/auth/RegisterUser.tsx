import { useNetworkState } from "expo-network";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { showToast } from "../../utils/ShowMessage";

const RegisterUser = () => {
  const networkState = useNetworkState();
  useEffect(() => {
    console.log(`Current network type: 
  ${networkState.isInternetReachable}`);
  }, []);

  const [username, Setusername] = useState("");
  const [email, Setemail] = useState("");
  const [phone, Setphone] = useState("");
  const [password, Setpassword] = useState("");

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

    return showToast("success", "Success", "correct login");
  }

  return (
    <View className=" flex-1 pt-24 w-screen ">
      <Toast />
      <View className="flex flex-col items-center p-5 w-auto overflow-y-auto  justify-center h-3/4 m-3  rounded-md  gap-8 font-audiowide ">
        <Text className=" text-5xl font-bold ">Signup Page</Text>
        <Text className="font-bold ">
          Create account to keep passwords secure .
        </Text>
        <TextInput
          className="border w-full  rounded-2xl p-3 py-5 "
          keyboardType="default"
          placeholder="Enter Name"
          onChangeText={(text) => {
            Setusername(text);
          }}
        />
        <TextInput
          className="border w-full  rounded-2xl p-3 py-5 "
          keyboardType="email-address"
          placeholder="Enter Email"
          onChangeText={(text) => {
            Setemail(text);
          }}
        />
        <TextInput
          className="border w-full  rounded-2xl p-3 py-5 "
          keyboardType="number-pad"
          placeholder="Enter Mobile Number"
          onChangeText={(text) => {
            Setphone(String(text));
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
        <View className="bg-black w-fit rounded-xl py-4 px-8 flex items-center justify-center shadow-2xl elevation-2xl ">
          <Text onPress={onClickRegister} className="text-white ">
            Create Account
          </Text>
        </View>
        <Link
          className="underline underline-offset-8 text-violet-700"
          href={"/auth/Login"}
        >
          Login Now
        </Link>
      </View>
    </View>
  );
};

export default RegisterUser;
