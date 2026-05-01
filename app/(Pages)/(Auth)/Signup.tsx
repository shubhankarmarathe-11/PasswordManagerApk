import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { getDB } from "@/database/db";
import { useRouter } from "expo-router";
import { CircleAlert, Eye, EyeClosed } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignupPage() {
  const [ShowPass, SetShowPass] = useState(false);

  const router = useRouter();

  const [auth, Setauth] = useState({ Username: "", email: "", Password: "" });
  const [alert, SetAlert] = useState({ status: false, text: "", title: "" });

  const OnSubmitForm = async () => {
    if (auth.email == "" || auth.Password == "" || auth.Username == "") {
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
        CREATE TABLE IF NOT EXISTS UserDetails (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT,
          email TEXT UNIQUE,
          password TEXT
          );
          
          INSERT INTO UserDetails (username, email,password) VALUES ('${auth.Username}','${auth.email}','${auth.Password}');
          `);

      router.replace("/(Pages)/(Auth)/");
    } catch (err) {
      if (err?.message?.includes("UNIQUE constraint failed")) {
        SetAlert({
          status: true,
          text: "please use different email.",
          title: "Email Conflict",
        });

        setTimeout(() => {
          SetAlert({ status: false, text: "", title: "" });
        }, 3000);
        return false;
      } else {
      }
    }
  };

  return (
    <>
      <SafeAreaView className="flex-1 ">
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
        <View className="flex w-full items-center my-10 mt-16">
          <Text className="text-3xl text-center text-black font-semibold">
            Sign Up
          </Text>

          <View className="flex gap-5 w-4/5 my-20">
            <Input
              style={{
                backgroundColor: "white",
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: "black",
              }}
              keyboardType="default"
              className="w-full"
              value={auth.Username}
              onChangeText={(text) => {
                Setauth({ ...auth, Username: text });
              }}
              placeholder="Username"
            />
            <Input
              style={{
                backgroundColor: "white",
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: "black",
              }}
              keyboardType="email-address"
              className="w-full"
              value={auth.email}
              onChangeText={(text) => {
                Setauth({ ...auth, email: text });
              }}
              placeholder="Email address"
            />
            <View className="flex flex-row items-center gap-1 relative">
              <Input
                style={{
                  backgroundColor: "white",
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: "black",
                }}
                keyboardType="default"
                secureTextEntry={!ShowPass}
                className="w-full"
                value={auth.Password}
                onChangeText={(text) => {
                  Setauth({ ...auth, Password: text });
                }}
                placeholder="Password"
              />

              {!ShowPass ? (
                <Eye
                  size={20}
                  onPress={() => {
                    SetShowPass(!ShowPass);
                  }}
                />
              ) : (
                <EyeClosed
                  size={20}
                  className="abs"
                  onPress={() => {
                    SetShowPass(!ShowPass);
                  }}
                />
              )}
            </View>

            <Button className="my-5 rounded-3xl" onPress={OnSubmitForm}>
              <Text>Create Account</Text>
            </Button>

            <Text
              className="text-blue-800 gap-3 text-center my-5"
              onPress={() => {
                router.navigate("/index");
              }}
            >
              Al Ready have an account? Sign in
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
