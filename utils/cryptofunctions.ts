import CryptoJS from "react-native-crypto-js";

const EncryptDecrypt = async () => {
  let data = [{ id: 1 }, { id: 2 }];

  let ciphertext = await CryptoJS.AES.encrypt(
    JSON.stringify(data),
    "secret key 123"
  ).toString();

  console.log(ciphertext);

  let bytes = await CryptoJS.AES.decrypt(ciphertext, "secret key 123");
  let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  console.log(decryptedData);
};

export { EncryptDecrypt };
