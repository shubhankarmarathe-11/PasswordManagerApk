import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
  return (
    <>
      {/* <StatusBar style="dark" /> */}
      <SafeAreaView className="flex-1">
        <Stack initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" options={{ title: "" }} />
          <Stack.Screen name="RegisterUser" options={{ title: "" }} />
          <Stack.Screen name="ForgotPassword" options={{ title: "" }} />
          <Stack.Screen name="ChangePassword" options={{ title: "" }} />
        </Stack>
      </SafeAreaView>
    </>
  );
}
