import CryptoJS from "react-native-crypto-js";

const Encryptdata = async (data: string) => {
  try {
    const encryptedData = CryptoJS.AES.encrypt(
      data,
      "secret key 123"
    ).toString();

    return encryptedData;
  } catch (error) {
    return false;
  }
};

const Decryptdata = async (data: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(data, "secret key 123");
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    return decryptedData;
  } catch (error) {
    return false;
  }
};

export { Decryptdata, Encryptdata };
