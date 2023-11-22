import { usePermission } from "@hooks/usePermission";
import PushNotification, {
  PushNotificationObject,
  Importance,
} from "react-native-push-notification";

PushNotification.createChannel(
  {
    channelId: "push-notification-channel",
    channelName: "Mega Market Channel",
    channelDescription: "A channel to categorise your notifications",
    playSound: true,
    soundName: "default",
    vibrate: true,
    importance: Importance.HIGH,
  },
  (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);
  },
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
  },
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  onRemoteFetch: function (notification) {
    console.log("REMOTE FETCH NOTIFICATION:", notification);
    return Promise.resolve(notification);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

export type PushNotificationType = PushNotificationObject;

const usePushNotification = () => {
  const { requestPermission } = usePermission();

  const clearNotification = () => {
    PushNotification.cancelAllLocalNotifications();
  };

  const getAllChannels = () => {
    PushNotification.getChannels((channel_ids) => {
      console.log(channel_ids);
    });
  };

  const getAllNotifications = () => {
    PushNotification.getDeliveredNotifications((notifications) => {
      console.log(notifications);
    });
  };

  const testLocalNotification = () => {
    requestNotificationPermission();
    PushNotification.localNotification({
      message: "My Notification Message", // (required)
      actions: ["Yes", "No"],
      visibility: "public",
      channelId: "push-notification-channel",
      id: 0,
      vibrate: true,
      importance: "high",
      priority: "high",
      title: "My Notification Title",
      ticker: "My Notification Ticker",
      largeIcon: "ic_launcher",
      smallIcon: "ic_launcher",
      bigText: "My big text that will be shown when notification is expanded",
      subText: "This is a subText",
    });
  };

  const setApplicationIconBadgeNumber = (number: number) => {
    requestNotificationPermission();
    PushNotification.setApplicationIconBadgeNumber(number);
  };

  const createLocalNotification = (obj: PushNotificationType) => {
    requestNotificationPermission();
    PushNotification.localNotification(obj);
  };

  const requestNotificationPermission = () => {
    requestPermission("android.permission.POST_NOTIFICATIONS");
  };

  return {
    clearNotification,
    getAllChannels,
    getAllNotifications,
    testLocalNotification,
    createLocalNotification,
    setApplicationIconBadgeNumber,
    requestNotificationPermission,
  };
};

export default usePushNotification;
