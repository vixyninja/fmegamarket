import { useTranslation } from "react-i18next";
import { Alert, Platform } from "react-native";
import { Permission, RESULTS, check, openSettings, request } from "react-native-permissions";

export const usePermission = () => {
  const { t } = useTranslation();

  const requestPermission = async (permission: Permission) => {
    try {
      if (Platform.OS !== "android") {
        Alert.alert(
          t("permission.unavailable.title"),
          t("permission.unavailable.message"),
          [
            {
              text: t("permission.default.ok"),
              onPress: () => {},
            },
          ],
          { cancelable: false },
        );
        return false;
      }

      const granted = await request(permission);
      if (granted === RESULTS.GRANTED) {
        return true;
      } else {
        checkPermission(permission);
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  const checkPermission = async (type: Permission) => {
    try {
      const result = await check(type);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          Alert.alert(
            t("permission.unavailable.title"),
            t("permission.unavailable.message"),
            [
              {
                text: t("permission.default.ok"),
                onPress: () => {},
              },
              {
                text: t("permission.default.settings"),
                onPress: () => openSettings(),
              },
            ],
            { cancelable: false },
          );
          break;
        case RESULTS.DENIED:
          Alert.alert(
            t("permission.denied.title"),
            t("permission.denied.message"),
            [
              {
                text: t("permission.default.ok"),
                onPress: () => {},
              },
              {
                text: t("permission.default.settings"),
                onPress: () => openSettings(),
              },
            ],
            { cancelable: false },
          );
          break;
        case RESULTS.GRANTED:
          return true;
        case RESULTS.LIMITED:
          Alert.alert(
            t("permission.limited.title"),
            t("permission.limited.message"),
            [
              {
                text: t("permission.default.ok"),
                onPress: () => {},
              },
              {
                text: t("permission.default.settings"),
                onPress: () => openSettings(),
              },
            ],
            { cancelable: false },
          );
          break;
        case RESULTS.BLOCKED:
          Alert.alert(
            t("permission.blocked.title"),
            t("permission.blocked.message"),
            [
              {
                text: t("permission.default.ok"),
                onPress: () => {},
              },
              {
                text: t("permission.default.settings"),
                onPress: () => openSettings(),
              },
            ],
            { cancelable: false },
          );
          break;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  return {
    requestPermission,
    checkPermission,
  };
};
