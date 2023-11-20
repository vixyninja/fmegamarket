import { BaseHeader } from "@components/shared";
import { BASE_IMAGE_URL } from "@constants/system.constant";
import { useAppDispatch } from "@hooks/useRedux";
import { Button, Text, useThemeMode } from "@rneui/themed";
import { BaseRootView } from "@wrappers/hoc";
import { t } from "i18next";
import React from "react";

export default function HomeScreen() {
  const { mode, setMode } = useThemeMode();

  const dispatch = useAppDispatch();

  function _handleToggleTheme() {
    setMode(mode === "light" ? "dark" : "light");
  }

  return (
    <BaseRootView padding>
      {/* <BaseLoadingLottie /> */}

      <Text>{t("change_language")}</Text>
      <Text>Current theme mode: {mode}</Text>
      <Button onPress={_handleToggleTheme} title="Toggle theme" />
      <BaseHeader
        source={{ uri: BASE_IMAGE_URL }}
        onPress={() => {
          console.log("onPress");
        }}
      />
    </BaseRootView>
  );
}
