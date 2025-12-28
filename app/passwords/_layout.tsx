import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";

export default function PasswordLayout() {
  return (
    <>
      <StatusBar style="dark" />

      <Stack
        initialRouteName="AllPasswords"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AllPasswords" />
        <Stack.Screen name="[id]" />
      </Stack>
    </>
  );
}
