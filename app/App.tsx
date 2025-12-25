import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  // let isactive = true;
  // let router = useRouter();
  // if (isactive) return router.push("/auth/Login");
  return (
    <View className="flex-1 items-center justify-center ">
      <Text style={Style.main} className="text-xl font-bold text-blue-200">
        Welcome to Nativewind!
      </Text>
      <Link href={"/auth/Login"}>Login</Link>
    </View>
  );
}

const Style = StyleSheet.create({
  main: {},
});
