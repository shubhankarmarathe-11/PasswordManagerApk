import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { View } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import { Eye, EyeClosed } from "lucide-react-native";

export default function SignupPage() {
  const [ShowPass, SetShowPass] = useState(false);

  const router = useRouter();

  return (
    <>
      <SafeAreaView className="flex-1 ">
        <Card className="m-1 mt-10">
          <CardTitle className="text-center font-bold ">
            <Text className="text-2xl text-black">Create New Account</Text>
          </CardTitle>
          <CardContent className="flex gap-5">
            <Text>Username</Text>
            <Input keyboardType="default" className="" />
            <Text>Email Address</Text>
            <Input keyboardType="email-address" className="" />
            <Text>Password</Text>
            <View className="flex flex-row items-center gap-1 relative">
              <Input
                keyboardType="default"
                secureTextEntry={ShowPass ? true : false}
                className="bg-white "
              />
              {!ShowPass ? (
                <EyeClosed
                  size={20}
                  onPress={() => {
                    SetShowPass(!ShowPass);
                  }}
                />
              ) : (
                <Eye
                  size={20}
                  className="abs"
                  onPress={() => {
                    SetShowPass(!ShowPass);
                  }}
                />
              )}
            </View>

            <Button className="">
              <Text>Create Account</Text>
            </Button>

            <Text
              className="text-blue-800 gap-3"
              onPress={() => {
                router.navigate("/Login");
              }}
            >
              Login Now
            </Text>
          </CardContent>
        </Card>
      </SafeAreaView>
    </>
  );
}
