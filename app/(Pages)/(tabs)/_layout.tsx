import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Home, Settings, Key, Lock } from "lucide-react-native";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "blue",
          headerShown: false,
          tabBarStyle: {
            margin: 20,
            borderRadius: 50,
          },
          tabBarIconStyle: {
            margin: 5,
          },
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <Home size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="Password"
          options={{
            title: "Generate",
            tabBarIcon: ({ color }) => <Key size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="Vault"
          options={{
            title: "Vault",
            tabBarIcon: ({ color }) => <Lock size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="Settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => <Settings size={28} color={color} />,
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
