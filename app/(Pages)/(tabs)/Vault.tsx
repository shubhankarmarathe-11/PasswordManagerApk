import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { getData, saveData } from "@/database/Cache";
import { getDB } from "@/database/db";
import { useRouter } from "expo-router";
import { UserRoundKey } from "lucide-react-native";
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

export default function VaultPage() {
  const router = useRouter();

  const [FetchedData, SetFetchedData] = useState<any>([]);

  const FetchStoredData = async () => {
    try {
      const getId = await getData("_id");

      const db = await getDB();

      const Rows = await db.getAllAsync(
        `SELECT id,appname FROM StoredPasswords WHERE account_id=${getId}`,
      );
      SetFetchedData(Rows);
    } catch (err) {}
  };

  useEffect(() => {
    FetchStoredData();
  }, []);
  return (
    <>
      <SafeAreaView className="flex-1 m-3">
        <View className="my-3">
          <Text className="text-2xl font-bold">Password Vault</Text>
        </View>
        <Separator />

        <ScrollView className="my-3">
          <View>
            {FetchedData.reverse().map((val) => {
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
