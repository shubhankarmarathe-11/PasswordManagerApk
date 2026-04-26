import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import * as Clipboard from "expo-clipboard";
import * as Crypto from "expo-crypto";
import { CircleAlert, KeyRound, LucideCopy } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PasswordPage() {
  const [Password, SetPassword] = useState("");

  const [alert, SetAlert] = useState({ status: false, text: "", title: "" });

  const getRandomChar = async (chars: string) => {
    const bytes = await Crypto.getRandomBytesAsync(1);
    return chars[bytes[0] % chars.length];
  };

  const copyToClipboard = async () => {
    if (Password.length > 0) {
      await Clipboard.setStringAsync(Password);
      SetPassword("");
    } else {
      SetAlert({
        status: true,
        text: "please generate password first",
        title: "Can not Copy",
      });

      setTimeout(() => {
        SetAlert({ status: false, text: "", title: "" });
      }, 3000);
    }
  };

  const generatePassword = async (length = 12) => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

    const all = lowercase + uppercase + numbers + symbols;

    let passwordArray = [
      await getRandomChar(lowercase),
      await getRandomChar(uppercase),
      await getRandomChar(numbers),
      await getRandomChar(symbols),
    ];

    for (let i = passwordArray.length; i < length; i++) {
      passwordArray.push(await getRandomChar(all));
    }

    // shuffle (optional but okay here)
    passwordArray = passwordArray.sort(() => 0.5 - Math.random());

    SetPassword(passwordArray.join(""));
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
        ) : (
          <></>
        )}

        <View className="flex flex-row items-center gap-3">
          <KeyRound />
          <Text className="font-bold text-2xl my-3">Generate Password</Text>
        </View>
        <Separator />

        <Card className="my-3">
          <CardContent>
            <View className="flex gap-2">
              <Text>Password</Text>
              <Input className="text-black" editable={false} value={Password} />
            </View>

            <View className="flex flex-row my-5 items-center justify-between">
              <Button
                onPress={() => {
                  generatePassword(12);
                }}
              >
                <Text>Generate</Text>
              </Button>
              <Button onPress={copyToClipboard}>
                <LucideCopy color={"white"} />
              </Button>
            </View>
          </CardContent>
        </Card>
      </SafeAreaView>
    </>
  );
}
