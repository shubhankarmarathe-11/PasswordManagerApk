import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { clearData, getData, saveData } from "@/database/Cache";
import { useRouter } from "expo-router";
import {
  Delete,
  Fingerprint,
  KeyRound,
  Lock,
  LogOut,
  User,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { AlertDialog, } from "@/components/ui/alert-dialog";

export default function SettingPage() {
  const router = useRouter();

  const [username, SetUsername] = useState("");
  const [useBio, SetuseBio] = useState(false);

  async function SetBiomatric() {
    if (useBio) {
      await saveData("usebiomatric", "false");
      SetuseBio(false);
    } else {
      await saveData("usebiomatric", "true");
      SetuseBio(true);
    }
  }

  async function CheckIsLoggedIn() {
    let getusername = await getData("username");
    let getusebiomatric = await getData("usebiomatric");

    if (getusername != null && getusebiomatric != null) {
      if (getusebiomatric == "true") {
        SetuseBio(true);
      } else {
        SetuseBio(false);
      }
      return SetUsername(getusername);
    }
  }

  useEffect(() => {
    CheckIsLoggedIn();
  }, []);

  async function LogoutFunction() {
    await clearData("isLoggedIn");
    await clearData("_id");
    await clearData("username");
    await clearData("email");
    await clearData("usebiomatric");
    await clearData("pass_id");

    router.replace("/(Pages)/(Auth)/Login");
  }

  function DeleteAccountFunction() {}

  return (
    <>
      <SafeAreaView className="flex-1 m-3">
        <View className="flex gap-2 my-5">
          <View className="flex flex-row items-center gap-3">
            <User />
            <Text className="text-3xl font-bold">Current Account</Text>
          </View>
          <Text className="text-xl">{username}</Text>
        </View>

        <Separator />

        {/*To Change the Password*/}

        <Card className="my-3">
          <Pressable
            onPress={() => {
              router.push("/(Pages)/(SeparatePages)/MasterPassword");
            }}
          >
            <CardContent className="flex flex-row gap-3">
              <KeyRound size={28} />
              <Text>Update Master Password</Text>
            </CardContent>
          </Pressable>
        </Card>

        {/*Go to vault*/}

        <Card className="my-3">
          <Pressable
            onPress={() => {
              router.push("/(Pages)/(tabs)/Vault");
            }}
          >
            <CardContent className="flex flex-row gap-3">
              <Lock size={28} />
              <Text>Go to Vault</Text>
            </CardContent>
          </Pressable>
        </Card>

        <Separator />
        {/*To use Fingerprint */}

        <Text className="my-2">Use FingerPrint to unlock</Text>
        <Card className="my-3">
          <CardContent className="flex flex-row gap-3 items-center justify-between">
            <View className="flex flex-row gap-2 items-center">
              <Fingerprint size={28} />
              <Text>FingerPrint</Text>
            </View>
            <Switch checked={useBio} onCheckedChange={SetBiomatric} />
          </CardContent>
        </Card>

        <Separator />

        {/*Logout*/}

        <Card className="my-3">
          <Pressable onPress={LogoutFunction}>
            <CardContent className="flex flex-row gap-3">
              <LogOut size={28} color={"red"} />
              <Text className="">Logout</Text>
            </CardContent>
          </Pressable>
        </Card>

        <Separator />

        {/*Delete Account*/}

        <Card className="my-3">
          <Pressable onPress={DeleteAccountFunction}>
            <CardContent className="flex flex-row gap-3">
              <Delete size={28} color={"red"} />
              <Text className="">Delete Account</Text>
            </CardContent>
          </Pressable>
        </Card>
      </SafeAreaView>
    </>
  );
}
