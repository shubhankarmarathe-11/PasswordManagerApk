import { NAV_THEME } from "@/lib/theme";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "../global.css";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <ThemeProvider value={NAV_THEME["light"]}>
      <SafeAreaProvider>
        <StatusBar barStyle={"dark-content"} />

        <Stack>
          <Stack.Screen name="(Pages)" options={{ headerShown: false }} />
        </Stack>
        <PortalHost />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
