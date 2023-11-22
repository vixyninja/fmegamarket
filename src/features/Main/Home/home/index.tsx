import { BaseHeader } from "@components/shared";
import { systemConstant } from "@constants/system.constant";
import { AppScreenKeys } from "@features/Main";
import { useGoogleSignin } from "@hooks/useGoogleSignIn";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import {
  AlertAction,
  AppAction,
  AuthAction,
  appSelector,
  authSelector,
  useLazyGetTodoQuery,
} from "@libs/app_redux";
import usePushNotification from "@libs/local_notification";

import { NavigationServices } from "@libs/navigation";
import { Button, Text, useThemeMode } from "@rneui/themed";
import { BaseRootView } from "@wrappers/hoc";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const dispatch = useAppDispatch();

  const { mode, setMode } = useThemeMode();
  const { t } = useTranslation();

  const { language } = useAppSelector(appSelector);
  const { isAuth } = useAppSelector(authSelector);
  const { signOut } = useGoogleSignin();
  const { testLocalNotification, getAllNotifications } = usePushNotification();

  const [getTodo, { data }] = useLazyGetTodoQuery({});

  function _handleToggleTheme() {
    setMode(mode === "light" ? "dark" : "light");
  }

  function _handleToggleLanguage() {
    dispatch(AppAction.setLanguage(language === "en" ? "vi" : "en"));
  }

  useEffect(() => {
    getAllNotifications();
  }, [data]);

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

  function _handleLogout() {
    signOut();
    dispatch(AuthAction.clearCredentials());
  }

  return (
    <BaseRootView padding>
      <Text>{t("button.change_language")}</Text>
      <Text>Current theme mode: {mode}</Text>
      <Button onPress={_handleToggleTheme} title={t("button.change_theme")} />
      <Button
        onPress={_handleToggleLanguage}
        title={t("button.change_language")}
      />
      <Button onPress={_handleAlert} title="Handle alert" />
      {isAuth && (
        <Button onPress={_handleLogout} title={t("button.sign_out")} />
      )}

      <Button
        onPress={() => {
          testLocalNotification();
        }}
        title="Test local notification"
      />

      <Button
        onPress={() =>
          getTodo({
            page: 1,
            limit: 10,
          })
        }
        title="Get todo"
      />

      <Button
        title="Force get todo"
        onPress={() => {
          getTodo({
            page: 1,
            limit: 10,
          }).unwrap();
        }}
      />

      <BaseHeader
        source={{ uri: systemConstant.BASE_IMAGE_URL }}
        onPress={() => {
          NavigationServices.navigate(AppScreenKeys.SettingScreen);
        }}
      />
    </BaseRootView>
  );
}
