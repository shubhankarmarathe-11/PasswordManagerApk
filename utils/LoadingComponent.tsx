import { ActivityIndicator, View } from "react-native";
import "../app/global.css";

const LoadingComponent = () => {
  return (
    <View className="">
      <ActivityIndicator size="small" color="#5F4A9F" />
    </View>
  );
};

export { LoadingComponent };
