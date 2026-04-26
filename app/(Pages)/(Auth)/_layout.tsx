import { Stack } from 'expo-router';
import { StatusBar } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function RootLayout() {

  return (
    <SafeAreaProvider>
        <StatusBar barStyle={'dark-content'} />
      <Stack initialRouteName='Login'>
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="Signup" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
