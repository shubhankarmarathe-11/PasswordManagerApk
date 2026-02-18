import { getDB } from "@/Storage/database";
import { showToast } from "@/utils/ShowMessage";
import { router, useLocalSearchParams } from "expo-router";
import * as secureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

import { Decryptdata, Encryptdata } from "@/utils/cryptofunctions";
import { MaterialIcons } from "@expo/vector-icons";

const id = () => {
  const { passid } = useLocalSearchParams();

  const [title, Settitle] = useState("");
  const [username, Setusername] = useState("");
  const [password, Setpassword] = useState("");

  const [showpassword, Setshowpass] = useState(true);

  async function onClickUpdate() {
    const userid = await secureStore.getItemAsync("userid");
    const db = await getDB();

    let encrypteddata = await Encryptdata(String(password));

    if (encrypteddata == false)
      return showToast("error", "Error", "Please try again ");

    let result = await db.runAsync(
      "UPDATE allpasswords SET title = ?, username = ?, password = ? WHERE id = ? AND userid = ?",
      [title, username, encrypteddata, Number(passid), Number(userid)],
    );
    if (result.changes === 1) {
      showToast("success", "Updated", "Password Updated");
      setTimeout(() => {
        router.back();
      }, 200);
    } else {
      showToast("error", "Error", "Nothing was Updated");
    }
  }

  async function onClickDelete() {
    const userid = await secureStore.getItemAsync("userid");
    const db = await getDB();
    let result = await db.runAsync(
      "DELETE FROM allpasswords WHERE id = ? AND userid = ?",
      [Number(passid), userid],
    );

    if (result.changes === 1) {
      showToast("success", "Deleted", "Password deleted");

      router.back();
    } else {
      showToast("error", "Error", "Nothing was deleted");
    }
  }

  useEffect(() => {
    const openDb = async () => {
      const db = await getDB();
      let result = await db.getFirstAsync(
        "SELECT * FROM allpasswords WHERE id = ?",
        [passid],
      );
      Settitle(result.title);
      Setusername(result.username);

      let decryptdata = await Decryptdata(result.password);

      if (decryptdata == false)
        return showToast("error", "Error", "Please try again ");

      Setpassword(decryptdata);
    };
    openDb();
  }, []);

  return (
    <>
      <View className="z-50">
        <Toast />
      </View>
      <View className="pt-8 w-screen ">
        <View className="p-3 gap-5">
          <Text className="text-center text-3xl ">Edit Password</Text>
          <Text className="font-bold">Website / App name</Text>
          <TextInput
            className="border border-1 rounded p-3 text-lg font-extralight text-black"
            placeholder="Enter Website / App name"
            placeholderTextColor={"#1F2937"}
            value={title}
            onChangeText={(text) => {
              Settitle(text);
            }}
          />
          <Text className="font-bold">Username / email</Text>
          <TextInput
            className="border border-1 rounded p-3 text-lg font-extralight text-black"
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
              className="flex-1 rounded p-3 text-lg font-extralight text-black"
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
            onPress={onClickUpdate}
            className="w-full bg-violet-200 text-center text-white rounded-md p-5 font-bold "
          >
            Update
          </Text>
          <Text
            onPress={onClickDelete}
            className="w-full bg-red-300 text-center text-white rounded-md p-5 font-bold "
          >
            Delete
          </Text>
        </View>
      </View>
    </>
  );
};

export default id;
