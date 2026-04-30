import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { getData } from "@/database/Cache";
import { getDB } from "@/database/db";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [PassWordDetail, SetPasswordDetail] = useState({
    App: "",
    username: "",
    Password: "",
  });

  const FetchData = async () => {
    try {
      const getId = await getData("pass_id");

      const db = await getDB();

      const Rows = await db.getAllAsync(
        `SELECT * FROM StoredPasswords WHERE id=${getId}`,
      );

      SetPasswordDetail({
        App: Rows[0].appname,
        username: Rows[0].username,
        Password: Rows[0].password,
      });
    } catch (err) {}
  };

  const DeleteData = async () => {
    try {
      const getId = await getData("pass_id");
      const db = await getDB();
      const result = await db.runAsync(
        `DELETE FROM StoredPasswords WHERE id=${getId}`,
      );

      router.replace("/(Pages)/(tabs)/Vault");
    } catch (err) {}
  };
  const UpdateData = async () => {
    try {
      const getId = await getData("pass_id");
      const db = await getDB();
      const result = await db.runAsync(
        `UPDATE StoredPasswords SET appname= '${PassWordDetail.App}',username='${PassWordDetail.username}',password='${PassWordDetail.Password}'  WHERE id=${getId}`,
      );

      router.replace("/(Pages)/(tabs)/Vault");
    } catch (err) {}
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <>
      <SafeAreaView className="flex-1 m-3">
        <View className="my-3">
          <Text className="text-2xl font-bold">Update Password</Text>
        </View>

        <Separator />

        <View className="my-3 gap-3">
          <Text>Application/Website</Text>
          <Input
            keyboardType="default"
            value={PassWordDetail.App}
            onChangeText={(text) => {
              SetPasswordDetail({ ...PassWordDetail, App: text });
            }}
          />

          <Text>Username/Email</Text>
          <Input
            keyboardType="default"
            value={PassWordDetail.username}
            onChangeText={(text) => {
              SetPasswordDetail({ ...PassWordDetail, username: text });
            }}
          />

          <Text>Password</Text>
          <Input
            keyboardType="default"
            value={PassWordDetail.Password}
            onChangeText={(text) => {
              SetPasswordDetail({ ...PassWordDetail, Password: text });
            }}
          />
        </View>

        <Separator />

        <Button className="my-3" onPress={UpdateData}>
          <Text>Update </Text>
        </Button>

        <Text onPress={DeleteData} className="text-center text-red-500 my-3">
          Delete{" "}
        </Text>
      </SafeAreaView>
    </>
  );
}
