import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <>
      {/* <StatusBar style="dark" /> */}
      <Stack initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" options={{ title: "" }} />
        <Stack.Screen name="RegisterUser" options={{ title: "" }} />
        <Stack.Screen name="ForgotPassword" options={{ title: "" }} />
        <Stack.Screen name="ChangePassword" options={{ title: "" }} />
      </Stack>
    </>
  );
}
