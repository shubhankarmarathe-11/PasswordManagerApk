import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { getData } from "@/database/Cache";
import { getDB } from "@/database/db";
import { useRouter } from "expo-router";
import { CircleAlert } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddNewPassPage() {
  const router = useRouter();

  const [newpassDetail, SetnewPassDetail] = useState({
    appname: "",
    username: "",
    password: "",
  });

  const [alert, SetAlert] = useState({ status: false, text: "", title: "" });

  const InsertDocument = async () => {
    if (
      newpassDetail.appname == "" ||
      newpassDetail.username == "" ||
      newpassDetail.password == ""
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
    try {
      const db = await getDB();

      await db.execAsync(`
            CREATE TABLE IF NOT EXISTS StoredPasswords (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              appname TEXT,
              username TEXT ,
              password TEXT,
              account_id TEXT
              );
              
              INSERT INTO StoredPasswords (appname,username,password,account_id) VALUES ('${newpassDetail.appname}','${newpassDetail.username}','${newpassDetail.password}','${await getData("_id")}');
              `);

      router.replace("/(Pages)/(tabs)/Home");
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
          <Text className="text-2xl font-bold">Add New Password</Text>
        </View>

        <Separator />

        <View className="flex gap-5 my-3">
          <Text>App-Name / Website-Name</Text>
          <Input
            keyboardType="default"
            value={newpassDetail.appname}
            onChangeText={(text) => {
              SetnewPassDetail({ ...newpassDetail, appname: text });
            }}
          ></Input>
          <Text>Username / Email</Text>
          <Input
            keyboardType="default"
            value={newpassDetail.username}
            onChangeText={(text) => {
              SetnewPassDetail({ ...newpassDetail, username: text });
            }}
          ></Input>
          <Text>Password</Text>
          <Input
            keyboardType="visible-password"
            value={newpassDetail.password}
            onChangeText={(text) => {
              SetnewPassDetail({ ...newpassDetail, password: text });
            }}
          ></Input>
          <Button onPress={InsertDocument}>
            <Text>Submit</Text>
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
}
