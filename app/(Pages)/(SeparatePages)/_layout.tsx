import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={"dark-content"} />
      <Stack>
        <Stack.Screen name="UpdatePass" options={{ headerShown: false }} />
        <Stack.Screen name="MasterPassword" options={{ headerShown: false }} />
        <Stack.Screen name="Password" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
