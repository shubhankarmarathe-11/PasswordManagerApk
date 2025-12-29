import { showToast } from "@/utils/ShowMessage";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import * as secureStore from "expo-secure-store";
import * as sqlite from "expo-sqlite";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const AllPasswords = () => {
  const [SavedPass, SetSavedPass] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const opendb = async () => {
      try {
        let userid = await secureStore.getItemAsync("userid");
        const db = await sqlite.openDatabaseAsync("passwords.db");


        let data = await db.getAllAsync(
          "SELECT id, title FROM allpasswords WHERE userid = (?)",
          [userid]
        );
        if(data.length==0) return SetSavedPass([])
        SetSavedPass(data);
        // await db.closeAsync();
      } catch (error) {

        return showToast("error", "Error", "please try again");
      }
    };

    if (isFocused) {
      opendb();
    }
  }, [isFocused]);

  return (
    <>
     <View className="z-50">
        <Toast />
      </View>
    
    <View className="pt-8 w-screen ">
      <View className="p-3 gap-5 flex items-center">
        <Text className="text-lg font-semibold">Saved Passwords</Text>
        <ScrollView className="w-full">
          <View className="gap-5 w-full">
            {SavedPass.length == 0 ? (
              <Text>No Saved Passwords</Text>
            ) : (
              <>
                {SavedPass.map((val) => {
                  return (
                    <Pressable
                      onPress={() => {
                        router.push({
                          pathname: `/passwords/${val.id}`,
                          params: { passid: `${val.id}` },
                        });
                      }}
                      className="w-full rounded-md p-5 border border-1 flex flex-row justify-between items-center"
                      key={val.id}
                    >
                      <Text className="text-black text-lg font-bold ">{val.title}</Text>
                      <Text className="text-black text-lg font-bold"> > </Text>
                    </Pressable>
                  );
                })}
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
    </>
  );
};

export default AllPasswords;
