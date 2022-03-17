import AsyncStorage from "@react-native-async-storage/async-storage";

const JWT_STORAGE_KEY = "jwt_token";

export const storeJwt = async (value: string) => {
  try {
    await AsyncStorage.setItem(JWT_STORAGE_KEY, value);
  } catch (e) {
    // saving error
  }
};

export const getJwt = async () => {
  try {
    const value = await AsyncStorage.getItem(JWT_STORAGE_KEY);
    if (value !== null) {
      return value;
    } else {
      throw new Error("No value");
    }
  } catch (error) {
    throw new Error();
  }
};
