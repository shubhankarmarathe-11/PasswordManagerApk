import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function PasswordLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1">
        <Stack
          initialRouteName="AllPasswords"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="AllPasswords" />
          <Stack.Screen name="[id]" />
        </Stack>
      </SafeAreaView>
    </>
  );
}
