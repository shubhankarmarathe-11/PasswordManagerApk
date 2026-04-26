import { Text } from "@/components/ui/text";
import { View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  KeyRound,
  User,
  Lock,
  Fingerprint,
  LogOut,
  Delete,
} from "lucide-react-native";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "expo-router";
import { Card, CardContent } from "@/components/ui/card";

export default function SettingPage() {
  const router = useRouter();

  function LogoutFunction() {}

  function DeleteAccountFunction() {}

  return (
    <>
      <SafeAreaView className="flex-1 m-3">
        <View className="flex gap-2 my-5">
          <View className="flex flex-row items-center gap-3">
            <User />
            <Text className="text-3xl font-bold">Current Account</Text>
          </View>
          <Text className="text-xl">Shubhankar Marathe</Text>
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
          <Pressable
            onPress={() => {
              router.push("/(Pages)/(tabs)/Vault");
            }}
          >
            <CardContent className="flex flex-row gap-3">
              <Fingerprint size={28} />
              <Text>FingerPrint</Text>
            </CardContent>
          </Pressable>
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
