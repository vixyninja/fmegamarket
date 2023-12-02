import EncryptedStorage from "react-native-encrypted-storage";
import { StorageType } from "../types";

const setStorageItem = async ({ key, value }: StorageType) => {
  try {
    const jsonValues = JSON.stringify(value);
    await EncryptedStorage.setItem(key, jsonValues);
  } catch (error) {
    throw new Error("Error setting storage item");
  }
};

const getStorageItem = async ({ key }: StorageType) => {
  try {
    const jsonValues = await EncryptedStorage.getItem(key);
    return jsonValues !== null ? JSON.parse(jsonValues) : null;
  } catch (error) {
    throw new Error("Error getting storage item");
  }
};

const removeStorageItem = async ({ key }: StorageType) => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    throw new Error("Error removing storage item");
  }
};

export { setStorageItem, getStorageItem, removeStorageItem };
