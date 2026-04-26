import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UpdatePasswordPage() {
  const [PassWordDetail, SetPasswordDetail] = useState({
    App: "",
    username: "",
    Password: "",
  });

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

        <Button className="my-3">
          <Text>Update </Text>
        </Button>

        <Text className="text-center text-red-500 my-3">Delete </Text>
      </SafeAreaView>
    </>
  );
}
