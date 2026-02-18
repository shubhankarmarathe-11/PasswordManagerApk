import { getDB } from "@/Storage/database";
import { showToast } from "@/utils/ShowMessage";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import * as secureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const Homepage = () => {
  const [totalpass, Settotalpass] = useState(0);
  const [user, Setuser] = useState("");

  const isFocused = useIsFocused();

  useEffect(() => {
    const GetCacheData = async () => {
      let username = await secureStore.getItemAsync("username");
      let userid = await secureStore.getItemAsync("userid");

      if (username == null || userid == null) {
        showToast("error", "Error", "please try again");
        setTimeout(() => {
          router.replace("/auth/Login");
        }, 300);
      }
      try {
        Setuser(String(username));
        const db = await getDB();

        let result = await db.getAllAsync(
          "SELECT id FROM allpasswords WHERE userid = (?)",
          [String(userid)],
        );

        Settotalpass(result.length);
      } catch (error) {
        showToast("error", "Error", "please try again");
        setTimeout(() => {
          router.replace("/auth/Login");
        }, 300);
      }
    };
    if (isFocused) {
      GetCacheData();
    }
  }, [isFocused]);

  return (
    <>
      <View className=" pt-8 w-screen ">
        <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
          <View className="p-3 gap-5">
            <Text className="text-center text-2xl font-bold break-words">
              👋 Welcome {user}
            </Text>
            {/* Top view with two view left and right */}
            <View className="flex flex-row justify-start items-center">
              <View className="bg-violet-200 h-48 w-48 rounded-md flex items-center justify-center">
                <Text className="text-center text-black">Passwords Saved</Text>
                <Text className="text-center text-3xl text-black">
                  {totalpass}
                </Text>
              </View>
            </View>
            <Pressable
              onPress={() => {
                router.navigate("/passwords/");
              }}
              className="bg-violet-700 rounded-md py-16 flex justify-center items-center"
            >
              <Text className="text-white text-lg">Go to Saved Passwords</Text>
            </Pressable>
            <Text className="text-lg font-bold">
              Best Practices to Create strong Password
            </Text>
            <Text className="mb-1">
              • Use long passwords (12–16 characters)
            </Text>
            <Text className=" mb-1">
              • Combine uppercase, lowercase, numbers, and symbols
            </Text>
            <Text className=" mb-1">
              • Avoid personal information and common words
            </Text>
            <Text className=" mb-1">
              • Use a unique password for every account
            </Text>
            <Text className=" mb-1">
              • Change passwords immediately if compromised
            </Text>
            <Text className=" mb-1">
              • Enable Two-Factor Authentication (2FA)
            </Text>
            <Text className="">
              • Use a password manager to generate and store passwords securely
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Homepage;
