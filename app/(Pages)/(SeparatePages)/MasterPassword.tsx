import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { clearData, getData } from "@/database/Cache";
import { getDB } from "@/database/db";
import { useRouter } from "expo-router";
import { CircleAlert } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MasterPasswordPage() {
  const router = useRouter();

  const [PassWordDetail, SetPasswordDetail] = useState({
    OldPassword: "",
    NewPassword: "",
    confirmPassword: "",
  });

  const [alert, SetAlert] = useState({ status: false, text: "", title: "" });

  const UpdateMasterPass = async () => {
    if (
      PassWordDetail.OldPassword == "" ||
      PassWordDetail.NewPassword == "" ||
      PassWordDetail.confirmPassword == ""
    ) {
      SetAlert({
        status: true,
        text: "Incomplete Fields",
        title: "Please fill all fields",
      });

      setTimeout(() => {
        SetAlert({ status: false, text: "", title: "" });
      }, 3000);
      return false;
    }
    if (PassWordDetail.NewPassword != PassWordDetail.confirmPassword) {
      SetAlert({
        status: true,
        text: "Password Not Match",
        title: "New Password and Confirm Password must be same",
      });

      setTimeout(() => {
        SetAlert({ status: false, text: "", title: "" });
      }, 3000);
      return false;
    }

    try {
      let user_id = await getData("_id");

      const db = await getDB();

      const result = await db.runAsync(
        `UPDATE UserDetails SET password='${PassWordDetail.confirmPassword}' WHERE id=${parseInt(user_id)}`,
      );

      await clearData("isLoggedIn");
      await clearData("_id");
      await clearData("username");
      await clearData("email");
      await clearData("usebiomatric");
      await clearData("pass_id");

      router.replace("/(Pages)/(Auth)/");
    } catch (error) {}
  };

  return (
    <>
      <SafeAreaView className="flex-1 m-3">
        {alert.status ? (
          <>
            <Alert className="" icon={CircleAlert}>
              <AlertTitle className="text-red-600">{alert.title}</AlertTitle>
              <AlertDescription>{alert.text}</AlertDescription>
            </Alert>
          </>
        ) : null}
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

        <Button className="my-3" onPress={UpdateMasterPass}>
          <Text>Update </Text>
        </Button>
      </SafeAreaView>
    </>
  );
}
