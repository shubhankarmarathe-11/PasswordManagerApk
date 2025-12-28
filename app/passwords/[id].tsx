import { showToast } from "@/utils/ShowMessage";
import { router, useLocalSearchParams } from "expo-router";
import * as secureStore from "expo-secure-store";
import * as sqlite from "expo-sqlite";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

const id = () => {
  const { passid } = useLocalSearchParams();

  const [title, Settitle] = useState("");
  const [username, Setusername] = useState("");
  const [password, Setpassword] = useState("");

  async function onClickUpdate() {
    const userid = await secureStore.getItemAsync("userid");
    const db = await sqlite.openDatabaseAsync("passwords.db");
    let result = await db.runAsync(
      "UPDATE allpasswords SET title = ?, username = ?, password = ? WHERE id = ? AND userid = ?",
      [title, username, password, Number(passid), Number(userid)]
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
    const db = await sqlite.openDatabaseAsync("passwords.db");
    let result = await db.runAsync(
      "DELETE FROM allpasswords WHERE id = ? AND userid = ?",
      [Number(passid), Number(userid)]
    );

    if (result.changes === 1) {
      showToast("success", "Deleted", "Password deleted");
      setTimeout(() => {
        router.back();
      }, 200);
    } else {
      showToast("error", "Error", "Nothing was deleted");
    }
  }

  useEffect(() => {
    const openDb = async () => {
      const db = await sqlite.openDatabaseAsync("passwords.db");
      let result = await db.getFirstAsync(
        "SELECT * FROM allpasswords WHERE id = ?",
        [passid]
      );
      Settitle(result.title);
      Setusername(result.username);
      Setpassword(result.password);
    };
    openDb();
  }, []);

  return (
    <View className="flex-1 pt-24 w-screen ">
      <Toast />
      <View className="p-3 gap-5">
        <Text className="text-center text-3xl ">Edit Password</Text>
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
          onPress={onClickUpdate}
          className="w-full bg-violet-700 text-center text-white rounded-md p-5 font-bold "
        >
          Update
        </Text>
        <Text
          onPress={onClickDelete}
          className="w-full bg-red-700 text-center text-white rounded-md p-5 font-bold "
        >
          Delete
        </Text>
      </View>
    </View>
  );
};

export default id;
