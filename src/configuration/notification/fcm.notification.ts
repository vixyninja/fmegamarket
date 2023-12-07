import { IMAGE_MANAGER } from "@/assets";
import { isPlatForm, usePermission } from "@/common";
import {
  AndroidBadgeIconType,
  AndroidColor,
  AndroidImportance,
  AuthorizationStatus,
  Notification,
  NotificationAndroid,
} from "@notifee/react-native";
import firestore from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import uuid from "react-native-uuid";
import { ENVIRONMENT_MANAGER } from "../environments";
import { notification } from "./initial.notification";

const useFCM = () => {
  const { requestPermission } = usePermission();
  const { t } = useTranslation();

  async function requestUserPermission(): Promise<void> {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      await requestPermission("android.permission.POST_NOTIFICATIONS");
    }

    const permission = await notification.requestPermission();
    if (permission.authorizationStatus === AuthorizationStatus.DENIED) {
      await requestPermission("android.permission.POST_NOTIFICATIONS");
    } else if (permission.authorizationStatus === AuthorizationStatus.NOT_DETERMINED) {
      await requestPermission("android.permission.POST_NOTIFICATIONS");
    } else if (permission.authorizationStatus === AuthorizationStatus.PROVISIONAL) {
      await requestPermission("android.permission.POST_NOTIFICATIONS");
    } else if (permission.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
      return;
    }
  }

  async function getToken(): Promise<string> {
    let fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("FCM TOKEN: ", fcmToken);
    }
    return fcmToken;
  }

  async function saveTokenToFirestore(userId: string): Promise<void> {
    if (!userId) return;

    const fcmToken = await getToken();

    const existUser = await firestore().collection("users").where("id", "==", userId).get();

    if (existUser.empty) {
      await firestore().collection("users").doc(userId).set({
        id: userId,
        fcmToken: fcmToken,
        deviceType: isPlatForm(),
        createAt: Date.now(),
        updateAt: Date.now(),
      });
    } else {
      await firestore().collection("users").doc(userId).update({
        fcmToken: fcmToken,
        updateAt: Date.now(),
        deviceType: isPlatForm(),
      });
    }
  }

  async function clearNotification(): Promise<void> {
    return await notification.cancelAllNotifications();
  }

  async function getListNotification() {
    return await notification.getDisplayedNotifications();
  }

  async function pushNotification(data: Partial<Notification>) {
    const configAndroid: NotificationAndroid = {
      asForegroundService: true,
      actions: [
        {
          pressAction: {
            id: "cancel_press_action",
          },
          title: t("notification.cancel"),
          icon: "ic_launcher",
        },
      ],
      autoCancel: true,
      badgeIconType: AndroidBadgeIconType.SMALL,
      channelId: ENVIRONMENT_MANAGER.NOTIFICATION_CHANNEL_ID,
      circularLargeIcon: true,
      color: AndroidColor.TEAL,
      colorized: true,
      importance: AndroidImportance.HIGH,
      largeIcon: IMAGE_MANAGER.appIcon,
      lightUpScreen: true,
      showTimestamp: true,
      sound: "default",
      ticker: data.title || t("notification.ticker.default"),
      pressAction: {
        id: "default_press_action",
      },
      timestamp: Date.now(),
      ...data.android,
    };

    await notification.displayNotification({
      id: uuid.v4().toString(),
      android: configAndroid,
      ios: {},
      title: data.title || t("notification.title"),
      body: data.body || t("notification.message"),
      subtitle: data.subtitle || t("notification.subMessage"),
      data: {
        id: uuid.v4().toString(),
      },
      ...data,
    });
  }

  async function registerAppBackground() {
    await messaging().registerDeviceForRemoteMessages();
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
      // NOTIFEE DISPLAY SHOW HERE
      await pushNotification({
        android: {
          channelId: ENVIRONMENT_MANAGER.NOTIFICATION_CHANNEL_ID,
          autoCancel: true,
          badgeIconType: AndroidBadgeIconType.SMALL,
          circularLargeIcon: true,
          color: AndroidColor.TEAL,
          colorized: true,
          importance: AndroidImportance.HIGH,
          largeIcon: IMAGE_MANAGER.appIcon,
          lightUpScreen: true,
          showTimestamp: true,
          sound: "default",
          ticker: t("notification.ticker.default"),
          pressAction: {
            id: "default_press_action",
          },
          timestamp: Date.now(),
        },
        data: remoteMessage.data,
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        id: uuid.v4().toString(),
      });
    });
  }

  async function registerAppForeground() {
    await messaging().registerDeviceForRemoteMessages();
    messaging().onMessage(async (remoteMessage) => {
      console.log("FCM Message Data:", remoteMessage.data);
      // NOTIFEE DISPLAY SHOW HERE
      await pushNotification({
        android: {
          channelId: ENVIRONMENT_MANAGER.NOTIFICATION_CHANNEL_ID,
          autoCancel: true,
          badgeIconType: AndroidBadgeIconType.LARGE,
          circularLargeIcon: true,
          smallIcon: IMAGE_MANAGER.appIcon,
          color: AndroidColor.TEAL,
          colorized: true,
          importance: AndroidImportance.HIGH,
          largeIcon: IMAGE_MANAGER.appIcon,
          lightUpScreen: true,
          showTimestamp: true,
          sound: "default",
          ticker: t("notification.ticker.default"),
          pressAction: {
            id: "default_press_action",
          },
          timestamp: Date.now(),
        },
        data: remoteMessage.data,
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        id: uuid.v4().toString(),
      });
    });
  }

  async function setBadgeCount(count: number) {
    await notification.setBadgeCount(count);
  }

  useEffect(() => {
    (async () => {
      const authStatus = await messaging().hasPermission();
      if (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        return;
      } else {
        requestUserPermission();
      }
    })();
    registerAppBackground();
    registerAppForeground();

    return messaging().onMessage(async (remoteMessage) => {
      console.log("FCM Message Data:", remoteMessage.data);
      // NOTIFEE DISPLAY SHOW HERE
      await pushNotification({
        android: {
          channelId: ENVIRONMENT_MANAGER.NOTIFICATION_CHANNEL_ID,
          autoCancel: true,
          badgeIconType: AndroidBadgeIconType.SMALL,
          circularLargeIcon: true,
          color: AndroidColor.TEAL,
          colorized: true,
          importance: AndroidImportance.HIGH,
          largeIcon: IMAGE_MANAGER.appIcon,
          lightUpScreen: true,
          showTimestamp: true,
          sound: "default",
          ticker: t("notification.ticker.default"),
          pressAction: {
            id: "default_press_action",
          },
          timestamp: Date.now(),
        },
        data: remoteMessage.data,
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        id: uuid.v4().toString(),
      });
    });
  }, []);

  return {
    requestUserPermission,
    getToken,
    saveTokenToFirestore,
    clearNotification,
    getListNotification,
    registerAppBackground,
    registerAppForeground,
    pushNotification,
    setBadgeCount,
  };
};

export default useFCM;
