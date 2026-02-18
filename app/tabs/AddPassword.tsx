import { getDB } from "@/Storage/database";
import { Encryptdata } from "@/utils/cryptofunctions";
import { showToast } from "@/utils/ShowMessage";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as secureStore from "expo-secure-store";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

const AddPassword = () => {
  const [title, Settitle] = useState("");
  const [username, Setusername] = useState("");
  const [password, Setpassword] = useState("");
  const [showpassword, Setshowpass] = useState(true);

  const onClickAdd = async () => {
    if (title == "")
      return showToast("error", "Error", "Please enter website / app name");
    if (username == "")
      return showToast("error", "Error", "Please enter username ");
    if (password == "")
      return showToast("error", "Error", "Please enter password ");

    let encrypteddata = await Encryptdata(String(password));

    if (encrypteddata == false)
      return showToast("error", "Error", "Please try again ");

    try {
      const db = await getDB();
      const userid = await secureStore.getItemAsync("userid");
      if (userid == null) return router.replace("/auth/Login");

      let r = await db.runAsync(
        "INSERT INTO allpasswords (userid, title, username, password) VALUES (?, ?, ?, ?)",
        [userid, title, username, encrypteddata],
      );
      Settitle("");
      Setusername("");
      Setpassword("");

      return showToast("success", "Success", "Successfully added");
    } catch (error) {
      return showToast("error", "Error", "Please try again ");
    }
  };

  return (
    <>
      <View className="z-50">
        <Toast />
      </View>
      <View className=" pt-8 w-screen ">
        <View className="p-3 gap-5">
          <Text className="text-center text-3xl ">Add Password</Text>
          <Text className="font-bold">Website / App name</Text>
          <TextInput
            className="border border-1 rounded-2xl p-3 text-lg font-extralight text-black"
            placeholder="Enter Website / App name"
            placeholderTextColor={"#1F2937"}
            value={title}
            onChangeText={(text) => {
              Settitle(text);
            }}
          />
          <Text className="font-bold">Username / email</Text>
          <TextInput
            className="border border-1 rounded-2xl p-3 text-lg font-extralight text-black"
            placeholder="Enter username / email"
            placeholderTextColor={"#1F2937"}
            value={username}
            onChangeText={(text) => {
              Setusername(text);
            }}
          />
          <Text className="font-bold">Password</Text>
          <View className="border border-1 rounded-2xl  flex flex-row items-center w-full gap-2">
            <TextInput
              className="flex-1 rounded-2xl p-3 text-lg font-extralight text-black"
              placeholder="Enter Password"
              placeholderTextColor={"#1F2937"}
              value={password}
              onChangeText={(text) => {
                Setpassword(text);
              }}
              secureTextEntry={showpassword}
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
          <Text
            onPress={onClickAdd}
            className="w-full bg-gray-700 text-center text-white rounded-2xl p-5 font-bold "
          >
            Submit
          </Text>
        </View>
      </View>
    </>
  );
};

export default AddPassword;
