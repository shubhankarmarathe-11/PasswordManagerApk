import { showToast } from "@/utils/ShowMessage";
import { useIsFocused } from "@react-navigation/native";
import { Link, router } from "expo-router";
import * as secureStore from "expo-secure-store";
import * as sqlite from "expo-sqlite";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import img from "../../assets/images/icon.png";

const Settings = () => {
  let focused = useIsFocused();

  const [user, SetUser] = useState({});

  useEffect(() => {
    const openDb = async () => {
      try {
        const userid = await secureStore.getItemAsync("userid");

        const db = await sqlite.openDatabaseAsync("passwords.db");

        let result: Object | null = await db.getFirstAsync(
          `SELECT id,username,email,mobilenum FROM USERS WHERE id = ${Number(userid)}`
        );

        if (result == null)
          return showToast("error", "Error", "please try again");

        await SetUser(result);
      } catch (error) {
        return showToast("error", "Error", "please try again");
      }
    };

    if (focused) {
      openDb();
    }
  }, [focused]);

  return (
    <>
      <View className="z-50">
        <Toast />
      </View>

      <View className=" pt-8 w-screen ">
        <View className="gap-5 p-3">
          <Text className="text-lg font-bold text-center">Settings</Text>
          <View className="w-full bg-gray-700 p-3 rounded-md flex justify-center items-center">
            <Image className="w-32 h-32 rounded-full bg-white" source={img} />
            <Text className="text-lg font-bold text-white">
              {user.username}
            </Text>
            <Text className="text-lg font-bold text-white">{user.email}</Text>
            <Text className="text-lg font-bold text-white">
              {user.mobilenum}
            </Text>
          </View>

          <Link
            href={"/auth/ChangePassword"}
            className="text-red-500 text-lg font-bold"
          >
            Change Password
          </Link>
          <Pressable
            onPress={() => {
              router.replace("/auth/Login");
            }}
          >
            <Text className="text-red-500 text-lg font-bold">Logout</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default Settings;
