import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Tabslayout = () => {
  return (
    <>
      <SafeAreaView className="flex-1">
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              margin: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
              height: "10%",
            },
          }}
        >
          <Tabs.Screen
            name="Homepage"
            options={{
              title: "Home",
              tabBarIconStyle: {
                padding: 0,
                margin: 5,
              },
              tabBarIcon: ({ color, size, focused }) => (
                <MaterialIcons name={"home"} size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="GeneratePassword"
            options={{
              title: "Generate New",
              tabBarIconStyle: {
                padding: 0,
                margin: 5,
              },
              tabBarIcon: ({ color, size, focused }) => (
                <MaterialIcons name={"vpn-key"} size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="AddPassword"
            options={{
              title: "Add",
              tabBarIconStyle: {
                padding: 0,
                margin: 5,
              },
              tabBarIcon: ({ color, size, focused }) => (
                <MaterialIcons name={"add-circle"} size={size} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="Settings"
            options={{
              title: "Settings",
              tabBarIconStyle: {
                padding: 0,
                margin: 5,
              },
              tabBarIcon: ({ color, size, focused }) => (
                <MaterialIcons name={"settings"} size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </>
  );
};

export default Tabslayout;
