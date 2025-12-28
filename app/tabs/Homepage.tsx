import { router } from "expo-router";
import * as secureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

const Homepage = () => {
  const [totalpass, Settotalpass] = useState(0);
  const [user, Setuser] = useState("");

  useEffect(() => {
    const GetCacheData = async () => {
      let username = await secureStore.getItemAsync("username");
      if (username != null) return Setuser(username);
    };
    GetCacheData();
  }, []);

  return (
    <>
      <View className=" flex-1 pt-24 w-screen ">
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
          <Text className="mb-1">• Use long passwords (12–16 characters)</Text>
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
      </View>
    </>
  );
};

export default Homepage;
