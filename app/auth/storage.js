import * as SecureStore from "expo-secure-store";

const key = "authToken";

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(authToken));
  } catch (error) {
    console.log("Error storing the auth token");
  }
};

const getToken = async () => {
  try {
    const user = JSON.parse(await SecureStore.getItemAsync(key));
    return user;
  } catch (error) {
    console.log("Error getting the auth token");
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? token : null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

export default { getToken, getUser, removeToken, storeToken };
