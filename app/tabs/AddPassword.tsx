import { showToast } from "@/utils/ShowMessage";
import { router } from "expo-router";
import * as secureStore from "expo-secure-store";
import * as sqlite from "expo-sqlite";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

const AddPassword = () => {
  const [title, Settitle] = useState("");
  const [username, Setusername] = useState("");
  const [password, Setpassword] = useState("");

  const onClickAdd = async () => {
    if (title == "")
      return showToast("error", "Error", "Please enter website / app name");
    if (username == "")
      return showToast("error", "Error", "Please enter username ");
    if (password == "")
      return showToast("error", "Error", "Please enter password ");

    try {
      const db = await sqlite.openDatabaseAsync("passwords.db");
      const userid = await secureStore.getItemAsync("userid");
      if (userid == null) return router.replace("/auth/Login");
      console.log(userid);

      let r = await db.runAsync(
        "INSERT INTO allpasswords (userid, title, username, password) VALUES (?, ?, ?, ?)",
        [userid, title, username, password]
      );
      console.log(r);
      Settitle("");
      Setusername("");
      Setpassword("");
      return showToast("success", "Success", "Successfully added");
    } catch (error) {
      console.log(error);
      return showToast("error", "Error", "Please try again ");
    }
  };

  return (
    <>
      <View className=" flex-1 pt-24 w-screen ">
        <Toast />
        <View className="p-3 gap-5">
          <Text className="text-center text-3xl ">Add Password</Text>
          <Text className="font-bold">Website / App name</Text>
          <TextInput
            className="border border-1 rounded p-3 text-lg font-extralight"
            placeholder="Enter Website / App name"
            value={title}
            onChangeText={(text) => {
              Settitle(text);
            }}
          />
          <Text className="font-bold">Username / email</Text>
          <TextInput
            className="border border-1 rounded p-3 text-lg font-extralight"
            placeholder="Enter username / email"
            value={username}
            onChangeText={(text) => {
              Setusername(text);
            }}
          />
          <Text className="font-bold">Password</Text>
          <TextInput
            className="border border-1 rounded p-3 text-lg font-extralight"
            placeholder="Enter Password"
            value={password}
            onChangeText={(text) => {
              Setpassword(text);
            }}
          />

          <Text
            onPress={onClickAdd}
            className="w-full bg-violet-700 text-center text-white rounded-md p-5 font-bold "
          >
            Submit
          </Text>
        </View>
      </View>
    </>
  );
};

export default AddPassword;
