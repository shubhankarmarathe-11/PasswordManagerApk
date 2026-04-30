import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { getDB } from "@/database/db";
import axios from "axios";
import { CircleAlert } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForegetPasswordPage() {
  const [email, setemail] = useState("");
  const [alert, SetAlert] = useState({ status: false, text: "", title: "" });

  const [OTP, SETOTP] = useState(0);
  const [Totp, SetTotp] = useState(0);

  const [showOTP, SETShowotp] = useState(false);

  const [pass, Setpass] = useState("");

  async function CheckOtp() {
    if (Totp == 0) {
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

    if (Totp != OTP) {
      SetAlert({
        status: true,
        text: "Please enter correct otp",
        title: "Invalid OTP",
      });

      setTimeout(() => {
        SetAlert({ status: false, text: "", title: "" });
      }, 3000);
      return false;
    }

    const db = await getDB();
    let r = await db.getAllAsync(
      `SELECT email,password FROM UserDetails WHERE email='${email}'`,
    );

    Setpass(r[0].password);
  }

  async function SendOtp() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    SETOTP(parseInt(otp));

    if (email == "") {
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
      let r = await db.getAllAsync(
        `SELECT email,password FROM UserDetails WHERE email='${email}'`,
      );

      if (r.length == 0) {
        SetAlert({
          status: true,
          text: "Please enter correct email",
          title: "Invalid Email",
        });

        setTimeout(() => {
          SetAlert({ status: false, text: "", title: "" });
        }, 3000);
        return false;
      }

      await axios
        .post("http://passwordmanager.shubhankarmarathe.online/send-otp", {
          email: email,
          otp: otp,
        })
        .then((res) => {
          if (res.status == 201) {
            SETShowotp(true);
          }
        })
        .catch((err) => {
          SetAlert({
            status: true,
            text: "Please try again",
            title: "server error",
          });

          setTimeout(() => {
            SetAlert({ status: false, text: "", title: "" });
          }, 3000);
          return false;
        });
    } catch (error) {
      if (error) {
        SetAlert({
          status: true,
          text: "Please enter correct email",
          title: "Invalid Email",
        });

        setTimeout(() => {
          SetAlert({ status: false, text: "", title: "" });
        }, 3000);
        return false;
      }
    }
  }

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
        <View className="flex gap-5">
          <Text className="">Enter Registered Email</Text>
          <Input
            keyboardType="email-address"
            placeholder="Enter Email"
            value={email}
            onChangeText={(text) => {
              setemail(text);
            }}
          />
          <Button onPress={SendOtp}>
            <Text>Send OTP</Text>
          </Button>
        </View>

        {showOTP ? (
          <>
            <View className="flex gap-5">
              <Text className="">Enter OTP</Text>
              <Input
                keyboardType="number-pad"
                placeholder="Enter otp "
                value={String(Totp)}
                maxLength={6}
                onChangeText={(text) => {
                  SetTotp(parseInt(text));
                }}
              />
              <Button onPress={CheckOtp}>
                <Text>Check OTP</Text>
              </Button>
            </View>
          </>
        ) : null}

        <Text className="my-5 font-bold">Your Password - {pass}</Text>
      </SafeAreaView>
    </>
  );
}
