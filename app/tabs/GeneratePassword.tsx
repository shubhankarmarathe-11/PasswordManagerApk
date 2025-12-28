import { showToast } from "@/utils/ShowMessage";
import { Checkbox } from "expo-checkbox";
import * as Clipboard from "expo-clipboard";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

const GeneratePassword = () => {
  const [isCheckedlower, setCheckedlower] = useState(true);
  const [isCheckedupper, setCheckedupper] = useState(true);
  const [isCheckedchar, setCheckedchar] = useState(true);
  const [isCheckednum, setCheckednum] = useState(true);

  const [selectlength, Setselectlength] = useState(12);

  const [password, Setpassword] = useState("");

  const copyToClipboard = async () => {
    if (password == "")
      return showToast("error", "Error", "please generate password first.");
    await Clipboard.setStringAsync(password);
  };

  let rawpass = "";

  const onClicklength = async (val: number) => {
    Setselectlength(val);
  };

  const GeneratePasswordfun = async () => {
    if (rawpass == "")
      return showToast("error", "Error", "please select atleast one option.");

    let pass = "";
    for (let i = 0; i < selectlength; i++) {
      const randIdx = Math.floor(Math.random() * rawpass.length);
      pass += rawpass[randIdx];
    }

    return Setpassword(pass);
  };

  useEffect(() => {
    rawpass = "";
    if (isCheckedlower) {
      rawpass += "abcdefghijklmnopqrstuvwxyz";
    }
    if (isCheckedupper) {
      rawpass += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (isCheckedchar) {
      rawpass += "!@#$%^&*~`|><.,?";
    }
    if (isCheckednum) {
      rawpass += "0123456789";
    }
  }, [
    isCheckedlower,
    isCheckedupper,
    isCheckedchar,
    isCheckednum,
    password,
    selectlength,
  ]);

  return (
    <View className=" flex-1 pt-24 w-screen ">
      <Toast />
      <View className="p-3 gap-8">
        <Text className="text-center text-3xl ">Generate Password</Text>
        <TextInput
          keyboardType="default"
          className="border border-1 rounded-2xl p-3 text-lg font-extralight"
          value={password}
          onChangeText={(text) => Setpassword(text)}
        />

        <Text className="font-bold text-lg">Select Options</Text>

        <View className="flex flex-row items-center">
          <Checkbox
            className="my-3"
            value={isCheckedlower}
            onValueChange={setCheckedlower}
            color={isCheckedlower ? "#4630EB" : undefined}
          />
          <Text className="mx-5 text-lg font-bold">
            Include lower case alphabets.
          </Text>
        </View>
        <View className="flex flex-row items-center">
          <Checkbox
            className="my-3"
            value={isCheckedupper}
            onValueChange={setCheckedupper}
            color={isCheckedupper ? "#4630EB" : undefined}
          />
          <Text className="mx-5 text-lg font-bold">
            Include upper case alphabets.
          </Text>
        </View>
        <View className="flex flex-row items-center">
          <Checkbox
            className="my-3"
            value={isCheckedchar}
            onValueChange={setCheckedchar}
            color={isCheckedchar ? "#4630EB" : undefined}
          />
          <Text className="mx-5 text-lg font-bold">
            Include special character.
          </Text>
        </View>
        <View className="flex flex-row items-center">
          <Checkbox
            className="my-3"
            value={isCheckednum}
            onValueChange={setCheckednum}
            color={isCheckednum ? "#4630EB" : undefined}
          />
          <Text className="mx-5 text-lg font-bold">Include numbers.</Text>
        </View>

        <Text className="font-bold text-lg">Select Password length</Text>
        <View className="flex flex-row items-center justify-around">
          <Text
            onPress={() => {
              onClicklength(8);
            }}
            className={`p-2 border border-1 rounded-md w-12 text-center ${selectlength == 8 ? "border-gray-700 text-white bg-gray-700" : "border-black"}`}
          >
            8
          </Text>
          <Text
            onPress={() => {
              onClicklength(12);
            }}
            className={`p-2 border border-1 rounded-md w-12 text-center ${selectlength == 12 ? "border-gray-700 text-white bg-gray-700" : "border-black"}`}
          >
            12
          </Text>
          <Text
            onPress={() => {
              onClicklength(16);
            }}
            className={`p-2 border border-1 rounded-md w-12 text-center ${selectlength == 16 ? "border-gray-700 text-white bg-gray-700" : "border-black"}`}
          >
            16
          </Text>
        </View>
        <Text
          onPress={GeneratePasswordfun}
          className="w-full bg-gray-700 text-center text-white rounded-2xl p-5 font-bold "
        >
          Generate
        </Text>
        <Text
          onPress={copyToClipboard}
          className="w-full bg-gray-700 text-center text-white rounded-2xl p-5 font-bold "
        >
          Copy to Clipboard
        </Text>
      </View>
    </View>
  );
};

export default GeneratePassword;
