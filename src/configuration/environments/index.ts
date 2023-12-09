import Config from "react-native-config";

const BASE_URL: string = Config.BASE_URL || "";
const WEB_CLIENT_ID: string = Config.WEB_CLIENT_ID || "";
const USER_AGENT: string = Config.USER_AGENT || "";
const NOTIFICATION_CHANNEL_ID: string = Config.NOTIFICATION_CHANNEL_ID || "";
const NOTIFICATION_CHANNEL_NAME: string = Config.NOTIFICATION_CHANNEL_NAME || "";
const STATIC_URL: string = Config.STATIC_URL || "";

export const ENVIRONMENT_MANAGER = {
  BASE_URL,
  WEB_CLIENT_ID,
  USER_AGENT,
  NOTIFICATION_CHANNEL_NAME,
  NOTIFICATION_CHANNEL_ID,
  STATIC_URL,
} as const;
