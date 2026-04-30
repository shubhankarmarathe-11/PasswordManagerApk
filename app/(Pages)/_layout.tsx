import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={"dark-content"} />
      <Stack initialRouteName="(Auth)">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(Auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(SeparatePages)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
