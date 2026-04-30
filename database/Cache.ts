import * as secureStore from "expo-secure-store";

// Save passwords
export const saveData = async (KEY: string, data: any) => {
  await secureStore.setItemAsync(KEY, JSON.stringify(data));
};

// Get passwords
export const getData = async (KEY: string) => {
  try {
    const result = await secureStore.getItemAsync(KEY);
    return result ? JSON.parse(result) : null;
  } catch (error) {
    return null;
  }
};

// Delete all
export const clearData = async (Key: string) => {
  await secureStore.deleteItemAsync(Key);
};
