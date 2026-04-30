import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { getData, saveData } from "@/database/Cache";
import { getDB } from "@/database/db";
import { useRouter } from "expo-router";
import { CircleUserRound, UserRoundKey } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function ShowPassword({ _id, name }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={async () => {
        await saveData("pass_id", String(_id));
        router.push("/(Pages)/(SeparatePages)/UpdatePass");
      }}
      className="my-2"
    >
      <Card className="bg-green-100" key={_id}>
        <CardHeader>
          <View className="flex flex-row items-center gap-2">
            <UserRoundKey />
            <Text>{name}</Text>
          </View>
        </CardHeader>
        <CardContent className="">
          <Text className="text-sm ">Tap to Access</Text>
        </CardContent>
      </Card>
    </Pressable>
  );
}

export default function HomePage() {
  const [Saved, SetSaved] = useState(0);

  const [username, SetUsername] = useState("");

  const router = useRouter();

  async function CheckIsLoggedIn() {
    let result = await getData("username");

    if (result != null) return SetUsername(result);
  }

  const [FetchedData, SetFetchedData] = useState<any>([]);

  const FetchStoredData = async () => {
    try {
      let newarr = [];
      const getId = await getData("_id");

      const db = await getDB();

      const Rows = await db.getAllAsync(
        `SELECT id,appname FROM StoredPasswords WHERE account_id=${getId}`,
      );
      newarr = await Rows.reverse();

      let newarr2 = [];

      for (let i = 0; i < newarr.length; i++) {
        if (i == 4) {
          break;
        }

        newarr2.push(newarr[i]);
      }
      newarr = newarr2;
      newarr2 = [];

      SetFetchedData(newarr);
    } catch (err) {}
  };

  useEffect(() => {
    CheckIsLoggedIn();
    FetchStoredData();
  }, []);

  return (
    <>
      <SafeAreaView className="flex-1 m-3">
        <View className="my-2 flex flex-row items-center gap-2">
          <CircleUserRound size={28} />
          <Text className="">{username}</Text>
        </View>
        <Text className="text-3xl font-bold my-2">Welcome back </Text>
        <Separator />

        <View className="bg-gray-100 h-56 flex p-3 items-center justify-between flex-row my-3 gap-3">
          <View className="bg-white w-28 h-28 flex justify-center items-center rounded-2xl">
            <Text className="text-center font-bold my-2">Saved Passwords</Text>
            <Text className="text-3xl text-center font-thin text-green-400">
              {Saved}
            </Text>
          </View>
          <Pressable
            onPress={() => {
              router.push("/(Pages)/(SeparatePages)/Password");
            }}
            className="bg-black w-28 h-28 flex justify-center items-center rounded-2xl"
          >
            <Text className="text-center font-bold my-2 text-white">
              Generate Password
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              router.push("/(Pages)/(SeparatePages)/AddNewPassword");
            }}
            className="bg-black w-28 h-28 flex justify-center items-center rounded-2xl"
          >
            <Text className="text-center font-bold my-2 text-white">
              Add new Password
            </Text>
          </Pressable>
        </View>
        <Separator />
        <Text className="my-2">Recent Passwords</Text>
        <ScrollView className="my-3">
          <View>
            {FetchedData.map((val) => {
              return (
                <ShowPassword key={val.id} _id={val.id} name={val.appname} />
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
