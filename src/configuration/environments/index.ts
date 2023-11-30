import Config from "react-native-config";

const BASE_URL: string = Config.BASE_URL || "";
const WEB_CLIENT_ID: string = Config.WEB_CLIENT_ID || "";

export const ENVIRONMENT_MANAGER = {
  BASE_URL,
  WEB_CLIENT_ID,
};
