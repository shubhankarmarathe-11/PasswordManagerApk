import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { UserRoundKey } from "lucide-react-native";
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

export default function VaultPage() {
  const router = useRouter();
  return (
    <>
      <SafeAreaView className="flex-1 m-3">
        <View className="my-3">
          <Text className="text-2xl font-bold">Password Vault</Text>
        </View>
        <Separator />

        <ScrollView className="my-3">
          <View>
            <ShowPassword _id={1} name={"Gmail"} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
