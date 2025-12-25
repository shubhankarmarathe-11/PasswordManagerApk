import Toast from "react-native-toast-message";
const showToast = (type: string, Text1: string, message: string) => {
  Toast.show({
    type: type, // 'success', 'error', 'info' (default)
    text1: Text1,
    text2: message,
    position: "top", // 'top' or 'bottom'
    visibilityTime: 4000, // milliseconds
  });
};

export { showToast };
