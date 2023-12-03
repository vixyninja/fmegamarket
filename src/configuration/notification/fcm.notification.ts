import { IMAGE_MANAGER } from "@/assets";
import { usePermission } from "@/common";
import {
  AndroidBadgeIconType,
  AndroidColor,
  AndroidImportance,
  AuthorizationStatus,
  Notification,
  NotificationAndroid,
} from "@notifee/react-native";
import auth from "@react-native-firebase/auth";
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

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    } else {
      await requestPermission("android.permission.POST_NOTIFICATIONS");
    }

    const permission = await notification.requestPermission();
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
      console.log("Authorization status:", authStatus);
      return;
    }
  };

  const checkPermission = async () => {
    const authStatus = await messaging().hasPermission();
    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log("Authorization status:", authStatus);
      return;
    } else {
      requestUserPermission();
    }
  };

  const getToken = async () => {
    let fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("Your Firebase Token is:", fcmToken);
    } else {
      console.log("Failed", "No token received");
    }
    return fcmToken;
  };

  const saveTokenToFirestore = async (fcmToken: string) => {
    const userId = auth().currentUser?.uid;

    if (!userId) return;

    await firestore()
      .collection("users")
      .doc(userId)
      .update({
        fcmToken: firestore.FieldValue.arrayUnion(fcmToken),
        credential: auth().currentUser?.providerData,
        email: auth().currentUser?.email,
        phoneNumber: auth().currentUser?.phoneNumber,
      })
      .then(() => {
        console.log("Token saved to firestore");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const clearNotification = async () =>
    await notification.cancelAllNotifications();

  const getListNotification = async () =>
    await notification.getDisplayedNotifications();

  const pushNotification = async (data: Partial<Notification>) => {
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
  };

  const registerAppBackground = async () => {
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
  };

  const registerAppForeground = async () => {
    await messaging().registerDeviceForRemoteMessages();
    messaging().onMessage(async (remoteMessage) => {
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
  };

  const setBadgeCount = async (count: number) => {
    await notification.setBadgeCount(count);
  };

  useEffect(() => {
    checkPermission();
    registerAppBackground();
    // registerAppForeground();

    getToken().then((fcmToken) => {
      if (fcmToken) {
        saveTokenToFirestore(fcmToken);
      } else {
        console.log("Failed", "No token received");
      }
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
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

    messaging().onTokenRefresh((fcmToken) => {
      saveTokenToFirestore(fcmToken);
    });

    return unsubscribe;
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
