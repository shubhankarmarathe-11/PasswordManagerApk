import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { CircleUserRound, UserRoundKey } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function ShowPassword({ _id, name }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        router.push("/(Pages)/(SeparatePages)/UpdatePass");
      }}
      className="my-2"
    >
      <Card key={_id}>
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

  const router = useRouter();

  return (
    <>
      <SafeAreaView className="flex-1 m-3">
        <View className="my-2 flex flex-row items-center gap-2">
          <CircleUserRound size={28} />
          <Text className="">Shubhankar Marathe</Text>
        </View>
        <Text className="text-3xl font-bold my-2">Welcome back </Text>
        <Separator />

        <View className="bg-gray-100 h-56 flex p-3 items-center flex-row my-3 gap-3">
          <View className="bg-white w-32 h-32 flex justify-center items-center rounded-2xl">
            <Text className="text-center font-bold my-2">Saved Passwords</Text>
            <Text className="text-3xl text-center font-thin text-green-400">
              {Saved}
            </Text>
          </View>
          <Pressable
            onPress={() => {
              router.push("/(Pages)/(SeparatePages)/Password");
            }}
            className="bg-gray-600 w-32 h-32 flex justify-center items-center rounded-2xl"
          >
            <Text className="text-center font-bold my-2 text-white">
              Generate New Password
            </Text>
          </Pressable>
        </View>
        <Separator />
        <Text className="my-2">Recent Passwords</Text>
        <ScrollView className="my-3">
          <View>
            <ShowPassword _id={1} name={"Gmail"} />
            <ShowPassword _id={1} name={"Gmail"} />
            <ShowPassword _id={1} name={"Gmail"} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
