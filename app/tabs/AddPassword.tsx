import { Text, TextInput, View } from "react-native";

const AddPassword = () => {
  return (
    <>
      <View className=" flex-1 pt-24 w-screen ">
        <View className="p-3 gap-5">
          <Text className="text-center text-3xl ">Add Password</Text>
          <Text className="font-bold">Website / App name</Text>
          <TextInput
            className="border border-1 rounded p-3 text-lg font-extralight"
            placeholder="Enter Website / App name"
          />
          <Text className="font-bold">Username / email</Text>
          <TextInput
            className="border border-1 rounded p-3 text-lg font-extralight"
            placeholder="Enter username / email"
          />
          <Text className="font-bold">Password</Text>
          <TextInput
            className="border border-1 rounded p-3 text-lg font-extralight"
            placeholder="Enter Password"
          />

          <Text
            // onPress={}
            className="w-full bg-violet-700 text-center text-white rounded-md p-5 font-bold "
          >
            Submit
          </Text>
        </View>
      </View>
    </>
  );
};

export default AddPassword;
