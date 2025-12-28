import { LoadingComponent } from "@/utils/LoadingComponent";
import { showToast } from "@/utils/ShowMessage";
import { useRouter } from "expo-router";
import * as sqlite from "expo-sqlite";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function App() {
  const [loading, Setloading] = useState(true);
  let router = useRouter();

  useEffect(() => {
    const openDb = async () => {
      try {
        const db = await sqlite.openDatabaseAsync("passwords.db");

        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS allpasswords (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userid TEXT,
          title TEXT,
          username TEXT,
          password TEXT
        );
      `);
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS USERS (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT,
          email TEXT UNIQUE,
          mobilenum TEXT,
          password TEXT
        );
      `);

        await db.closeAsync();
        return router.replace("/auth/Login");
      } catch (error) {
        console.log(error);
        return showToast("error", "Error", "Please try again");
      }
    };
    openDb();
  }, []);
  if (loading)
    return (
      <View className="flex-1 items-center justify-center ">
        <Toast />
        <LoadingComponent />
      </View>
    );

  return null;
}
