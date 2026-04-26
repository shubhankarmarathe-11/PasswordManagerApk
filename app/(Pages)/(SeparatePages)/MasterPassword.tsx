import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MasterPasswordPage() {
  const [PassWordDetail, SetPasswordDetail] = useState({
    OldPassword: "",
    NewPassword: "",
    confirmPassword: "",
  });

  return (
    <>
      <SafeAreaView className="flex-1 m-3">
        <View className="my-3">
          <Text className="text-2xl font-bold">Change Account Password</Text>
        </View>

        <Separator />

        <View className="my-3 gap-3">
          <Text>Old Password</Text>
          <Input
            keyboardType="default"
            value={PassWordDetail.OldPassword}
            onChangeText={(text) => {
              SetPasswordDetail({ ...PassWordDetail, OldPassword: text });
            }}
          />

          <Text>New Password</Text>
          <Input
            keyboardType="default"
            value={PassWordDetail.NewPassword}
            onChangeText={(text) => {
              SetPasswordDetail({ ...PassWordDetail, NewPassword: text });
            }}
          />

          <Text>Confirm Password</Text>
          <Input
            keyboardType="default"
            value={PassWordDetail.confirmPassword}
            onChangeText={(text) => {
              SetPasswordDetail({ ...PassWordDetail, confirmPassword: text });
            }}
          />
        </View>

        <Separator />

        <Button className="my-3">
          <Text>Update </Text>
        </Button>
      </SafeAreaView>
    </>
  );
}
