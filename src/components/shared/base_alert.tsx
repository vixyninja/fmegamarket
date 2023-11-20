import { useAppSelector } from "@hooks/useRedux";
import { alertSelector } from "@libs/app-redux";
import { useThemeMode } from "@rneui/themed";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

export default function BaseAlert() {
  const { callback, cancel, isShow, message, title, type } =
    useAppSelector(alertSelector);

  const { t } = useTranslation();
  const { mode } = useThemeMode();

  if (isShow) {
    Alert.alert(
      title,
      message,
      [
        {
          onPress: cancel,
          text: t("cancel"),
          isPreferred: true,
          style: "cancel",
        },
        {
          text: t("ok"),
          onPress: callback,
          isPreferred: true,
          style: "default",
        },
      ],
      {
        cancelable: false,
        userInterfaceStyle: mode === "dark" ? "dark" : "light",
        onDismiss: cancel,
      },
    );
  }

  return <></>;
}
