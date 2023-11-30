import { useAppDispatch, useAppSelector } from "@/common/hooks";
import { AlertAction, alertSelector } from "@/core";
import { useThemeMode } from "@rneui/themed";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

export default function BaseAlert() {
  const { callback, cancel, isShow, message, title } =
    useAppSelector(alertSelector);

  const { t } = useTranslation();
  const { mode } = useThemeMode();
  const dispatch = useAppDispatch();

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
          onPress: () => {
            callback();
            dispatch(AlertAction.disposeAlert());
          },
          isPreferred: true,
          style: "default",
        },
      ],
      {
        cancelable: false,
        userInterfaceStyle: mode === "dark" ? "dark" : "light",
        onDismiss: () => {
          callback();
          dispatch(AlertAction.disposeAlert());
        },
      },
    );
  }

  return <></>;
}
