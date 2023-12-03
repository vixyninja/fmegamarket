import notifee, {
  AndroidImportance,
  AndroidVisibility,
  Event,
  EventType,
} from "@notifee/react-native";
import { Linking } from "react-native";
import { ENVIRONMENT_MANAGER } from "../environments";
import { COLORS } from "../themes";

const openDeepLink = (link: string) => {
  Linking.openURL(link)
    .then((data) => {
      if (data) {
        Linking.openURL(link);
      } else {
        Linking.openSettings();
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

notifee.createChannel({
  id: ENVIRONMENT_MANAGER.NOTIFICATION_CHANNEL_ID,
  name: ENVIRONMENT_MANAGER.NOTIFICATION_CHANNEL_NAME,
  badge: true,
  description: "This is a channel for Mega Market App.",
  importance: AndroidImportance.HIGH,
  lightColor: COLORS.MEDIUM_DARK_GREEN,
  lights: true,
  vibrationPattern: [300, 500],
  soundURI: "default",
  sound: "default",
  vibration: true,
  visibility: AndroidVisibility.PUBLIC,
});

notifee.registerForegroundService((notification) => {
  return new Promise(() => {
    console.log("registerForegroundService", notification);
  });
});

notifee.isBatteryOptimizationEnabled().then((enabled) => {
  console.log("isBatteryOptimizationEnabled", enabled);
});

// THIS CONFIG FOR BACKGROUND NOTIFICATION, BACKGROUND IS SERVICE WORKER WHEN APP IS KILLED
notifee.onBackgroundEvent(async ({ type, detail }: Event) => {
  console.log("onBackgroundEvent", type);
  switch (type) {
    case EventType.DISMISSED:
      console.log("User dismissed notification", detail);
      break;
    case EventType.PRESS:
      console.log("User pressed notification", detail);
      //   event.detail.notification?.data.link &&
      //     openDeepLink(event.detail.notification?.data.link);

      break;
  }
});

// THIS CONFIG FOR FOREGROUND NOTIFICATION, FOREGROUND IS SERVICE WORKER WHEN APP IS OPEN
notifee.onForegroundEvent(async ({ type, detail }: Event) => {
  console.log("onForegroundEvent", type);
  switch (type) {
    case EventType.DISMISSED:
      console.log("User dismissed notification", detail);
      break;
    case EventType.PRESS:
      console.log("User pressed notification", detail);
      //   event.detail.notification?.data.link &&
      //     openDeepLink(event.detail.notification?.data.link);
      break;
  }
});

export const notification = notifee;
