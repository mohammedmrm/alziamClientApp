import Constants from "expo-constants";
const settings = {
  dev: {
    apiUrl: "http://alzaimexpress.com/client/api",
    logo: require("../app/assets/logo/logoZaim.png"),
  },
  staging: {
    apiUrl: "http://alzaimexpress.com/client/api",
    logo: require("../app/assets/logo/logoZaim.png"),
  },
  prod: {
    apiUrl: "http://alzaimexpress.com/client/api",
    logo: require("../app/assets/logo/logoZaim.png"),
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
