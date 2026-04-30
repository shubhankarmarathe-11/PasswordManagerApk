import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { getData, saveData } from "@/database/Cache";
import { getDB } from "@/database/db";
import { onAuthenticate } from "@/functions/LocalAuth";
import { useRouter } from "expo-router";
import { CircleAlert, Eye, EyeClosed, Fingerprint } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginPage() {
  const [ShowPass, SetShowPass] = useState(false);

  const [alert, SetAlert] = useState({ status: false, text: "", title: "" });
  const [auth, Setauth] = useState({ email: "", Password: "" });

  const [ShowBioIcon, SetShowBioIcon] = useState(false);

  const router = useRouter();

  async function CheckIsLoggedIn() {
    let result = await getData("usebiomatric");

    if (result == null) return await saveData("usebiomatric", "false");

    if (result != null && result == "true") {
      SetShowBioIcon(true);
      let result = await onAuthenticate();
      if (result.error == "user_cancel" || result.success == false) {
        return false;
      }

      if (result.success) return router.replace("/(Pages)/(tabs)/Home");
    }
  }

  useEffect(() => {
    CheckIsLoggedIn();
  }, []);

  const OnSubmitForm = async () => {
    if (auth.email == "" || auth.Password == "") {
      SetAlert({
        status: true,
        text: "Please fill all fields",
        title: "Incomplete Fields",
      });

      setTimeout(() => {
        SetAlert({ status: false, text: "", title: "" });
      }, 3000);
      return false;
    }

    try {
      const db = await getDB();

      const allRows = await db.getAllAsync("SELECT * FROM UserDetails");

      let authDetail: any[] = [];

      for (const row of allRows) {
        if (row.email == auth.email) {
          authDetail.push({
            email: row.email,
            id: String(row.id),
            password: row.password,
            username: row.username,
          });
          break;
        }
      }

      if (authDetail.length == 0) {
        SetAlert({
          status: true,
          title: "Not Found",
          text: "Please enter correct email",
        });

        setTimeout(() => {
          SetAlert({ status: false, text: "", title: "" });
        }, 3000);
        return false;
      }

      for (const i of authDetail) {
        if (i.password != auth.Password) {
          SetAlert({
            status: true,
            title: "Incorrect Password",
            text: "Please enter correct password",
          });

          setTimeout(() => {
            SetAlert({ status: false, text: "", title: "" });
          }, 3000);
          return false;
        }

        await saveData("isLoggedIn", "true");
        await saveData("_id", i.id);
        await saveData("username", i.username);
        await saveData("email", i.email);

        authDetail = [];

        router.replace("/(Pages)/(tabs)/Home");
      }
    } catch (err) {}
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
          <Text className="text-3xl text-black text-center font-semibold">
            Sign In
          </Text>

          <View className="flex gap-5 w-4/5 my-20">
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
              placeholder="Email"
            />
            <View className="flex flex-row items-center gap-1 relative ">
              <Input
                style={{
                  backgroundColor: "white",
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: "black",
                }}
                keyboardType="default"
                secureTextEntry={!ShowPass}
                className="bg-white"
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

            <Text
              className="text-blue-800 gap-3 text-left my-2"
              onPress={() => {
                router.navigate("/(Pages)/(SeparatePages)/forgetPassword");
              }}
            >
              forget Password?
            </Text>

            <Button className="my-5 rounded-3xl" onPress={OnSubmitForm}>
              <Text>Login</Text>
            </Button>

            <Text
              className="text-blue-800 gap-3 text-center my-5"
              onPress={() => {
                router.navigate("/Signup");
              }}
            >
              Don't have an account? Sign Up
            </Text>
          </View>
        </View>

        {ShowBioIcon ? (
          <>
            <View className="w-full flex items-center justify-center">
              <Fingerprint onPress={CheckIsLoggedIn} size={52} />
              <Text className="text-center text-sm text-gray-400 my-5">
                Use FingerPrint To access
              </Text>
            </View>
          </>
        ) : null}
      </SafeAreaView>
    </>
  );
}
