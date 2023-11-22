import PushNotification, {
  PushNotificationObject,
  Importance,
} from "react-native-push-notification";

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

PushNotification.createChannel(
  {
    channelId: "fcm_fallback_notification_channel", // (required)
    channelName: "My channel", // (required)
    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    importance: Importance.HIGH, // (optional) default: 4. Int value of the Android notification importance
    playSound: true,
    soundName: "default",
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`),
); // (optional) callback returns whether the channel was created, false means it already existed.

PushNotification.localNotification({
  message: "My Notification Message", // (required)
  actions: ["Yes", "No"],
  autoCancel: true,
  visibility: "public",
  channelId: "fcm_fallback_notification_channel",
  ticker: "My Notification Ticker",
  largeIcon: "ic_launcher",
  smallIcon: "ic_launcher",
  bigText: "My big text that will be shown when notification is expanded",
  subText: "This is a subText",
  bigLargeIcon: "ic_launcher",
  playSound: true,
});

PushNotification.getChannels(function (channel_ids) {
  console.log(channel_ids); // ['fcm_fallback_notification_channel']
});

export type PushNotificationType = PushNotificationObject;

const usePushNotification = () => {
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
    PushNotification.localNotification({
      message: "My Notification Message", // (required)
      actions: ["Yes", "No"],
      autoCancel: true,
      visibility: "public",
      channelId: "fcm_fallback_notification_channel",
      ticker: "My Notification Ticker",
      largeIcon: "ic_launcher",
      smallIcon: "ic_launcher",
      bigText: "My big text that will be shown when notification is expanded",
      subText: "This is a subText",
      bigLargeIcon: "ic_launcher",
    });
  };

  const setApplicationIconBadgeNumber = (number: number) => {
    PushNotification.setApplicationIconBadgeNumber(number);
  };

  const createLocalNotification = (obj: PushNotificationType) => {
    PushNotification.localNotification(obj);
  };

  const requestPermission = () => {
    PushNotification.requestPermissions();
  };

  return {
    clearNotification,
    getAllChannels,
    getAllNotifications,
    testLocalNotification,
    createLocalNotification,
    setApplicationIconBadgeNumber,
    requestPermission,
  };
};

export default usePushNotification;
