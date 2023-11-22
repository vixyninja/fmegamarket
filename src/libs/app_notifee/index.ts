import { usePermission } from "@hooks/usePermission";
import notifee, {
  AndroidColor,
  AndroidImportance,
  AndroidVisibility,
  AuthorizationStatus,
  EventType,
  Notification,
} from "@notifee/react-native";
import { Linking } from "react-native";

notifee.createChannel({
  id: "push-notification-channel",
  name: "Mega Market Channel",
  badge: true,
  description: "Mega Market Channel",
  importance: AndroidImportance.HIGH,
  lightColor: "#FF231F7C",
  lights: true,
  sound: "default",
  vibration: true,
  visibility: AndroidVisibility.PUBLIC,
});

notifee.registerForegroundService((notification) => {
  return new Promise(() => {
    console.log("registerForegroundService", notification);
  });
});

notifee.onBackgroundEvent(async (event: any) => {
  console.log("onBackgroundEvent", event);
  switch (event.type) {
    case EventType.DISMISSED:
      console.log("User dismissed notification", event.detail.notification);
      break;
    case EventType.PRESS:
      console.log("User pressed notification", event.detail.notification);
      event.detail.notification?.data.link &&
        Linking.openURL(event.detail.notification?.data.link);
      break;
  }
});

notifee.onForegroundEvent(async (event: any) => {
  console.log("onForegroundEvent", event);
  switch (event.type) {
    case EventType.DISMISSED:
      console.log("User dismissed notification", event.detail.notification);
      break;
    case EventType.PRESS:
      console.log("User pressed notification", event.detail.notification);
      event.detail.notification?.data.link &&
        Linking.openURL(event.detail.notification?.data.link);
      break;
  }
});

notifee.getChannels().then((channels) => {
  console.log("channels", channels);
});

export const useNotifee = () => {
  const { requestPermission } = usePermission();

  const checkPermission = async () => {
    const permission = await notifee.requestPermission();
    if (permission.authorizationStatus === AuthorizationStatus.DENIED) {
      await requestPermission("android.permission.POST_NOTIFICATIONS");
    } else if (
      permission.authorizationStatus === AuthorizationStatus.NOT_DETERMINED
    ) {
      await requestPermission("android.permission.POST_NOTIFICATIONS");
    } else if (
      permission.authorizationStatus === AuthorizationStatus.PROVISIONAL
    ) {
      await requestPermission("android.permission.POST_NOTIFICATIONS");
    } else if (
      permission.authorizationStatus === AuthorizationStatus.AUTHORIZED
    ) {
      return;
    }
  };

  const testNotification = async () => {
    notifee.displayNotification({
      title: "This is a title",
      body: "This is a body",
      android: {
        autoCancel: true,
        visibility: AndroidVisibility.PUBLIC,
        badgeCount: 1,
        color: "#FF231F7C",
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: "yes-press-action",
        },
        asForegroundService: true,
        showTimestamp: true,
        sound: "default",
        timestamp: Date.now(),
        ticker: "This is a ticker",
        channelId: "push-notification-channel",
        actions: [
          {
            pressAction: {
              id: "yes",
            },
            title: "Yes",
            icon: "ic_launcher",
          },
          {
            pressAction: {
              id: "no",
            },
            title: "No",
            icon: "ic_launcher",
          },
        ],
      },
      data: {
        id: "123",
        link: "app://BottomTab/Profile",
      },
      ios: {},
      subtitle: "This is a subtitle",
      id: Math.random().toString(),
    });
  };

  const pushNotification = async (
    data?: Partial<Notification>,
    color?: string,
    fontTitle?: string,
    fontBody?: string,
  ) => {
    color = color || "#ffffff";
    fontTitle = fontTitle || "16";
    fontBody = fontBody || "14";

    notifee.displayNotification({
      ...data,
      id: data?.id || Math.floor(Math.random() * 1000000).toString(),
      android: {
        ...data?.android,
        color: AndroidColor.SILVER,
        actions: [
          {
            title: '<p style="color: #f44336;"><b>Close</b></p>',
            pressAction: { id: "close" },
          },
        ],
        channelId: "push-notification-channel",
      },
      data: {
        ...data?.data,
        dataID: Math.floor(Math.random() * 1000000).toString(),
      },
      title: `<p style="color: ${color}, font-size: ${fontTitle}px, font-weight: bold">${
        data?.title || "TITLE"
      }</p>`,
      body: `<p style="color: ${color}, font-size: ${fontBody}px">${
        data?.body || "BODY"
      }</p>`,
      subtitle: "&#127881",
    });
  };

  const customNotification = async (data: Partial<Notification>) => {
    notifee.displayNotification(data);
  };

  const clearNotification = async (id: string) => {
    notifee.cancelNotification(id);
  };

  const clearAllNotification = async () => {
    notifee.cancelAllNotifications();
  };

  const getListNotification = async () => {
    const listNotification = await notifee.getDisplayedNotifications();
    return listNotification;
  };

  return {
    checkPermission,
    testNotification,
    pushNotification,
    customNotification,
    clearNotification,
    clearAllNotification,
    getListNotification,
  };
};
