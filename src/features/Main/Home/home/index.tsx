import { BaseHeader } from "@components/shared";
import { BASE_IMAGE_URL } from "@constants/system.constant";
import { AppScreenKeys } from "@features/Main";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { AlertAction, AppAction, appSelector } from "@libs/app-redux";
import { NavigationServices } from "@libs/navigation";
import { Button, Text, useThemeMode } from "@rneui/themed";
import { BaseRootView } from "@wrappers/hoc";
import React from "react";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const { mode, setMode } = useThemeMode();
  const { language } = useAppSelector(appSelector);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  function _handleToggleTheme() {
    setMode(mode === "light" ? "dark" : "light");
  }

  function _handleToggleLanguage() {
    dispatch(AppAction.setLanguage(language === "en" ? "vi" : "en"));
  }

  function _handleAlert() {
    dispatch(
      AlertAction.setAlert({
        type: "success",
        title: "NOTIFICATIONS",
        callback: () => {
          dispatch(AlertAction.hideAlert());
        },
        cancel: () => {
          dispatch(AlertAction.hideAlert());
        },
        message: "This is message",
      }),
    );
    dispatch(AlertAction.showAlert());
  }

  return (
    <BaseRootView padding>
      <Text>{t("change_language")}</Text>
      <Text>Current theme mode: {mode}</Text>
      <Button onPress={_handleToggleTheme} title="Toggle theme" />
      <Button onPress={_handleToggleLanguage} title={t("change_language")} />
      <Button onPress={_handleAlert} title="Handle alert" />

      <BaseHeader
        source={{ uri: BASE_IMAGE_URL }}
        onPress={() => {
          NavigationServices.navigate(AppScreenKeys.SettingScreen);
        }}
      />
    </BaseRootView>
  );
}
