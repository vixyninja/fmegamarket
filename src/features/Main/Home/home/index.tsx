import { BaseHeader } from "@components/shared";
import { BASE_IMAGE_URL } from "@constants/system.constant";
import { Button, Text, useThemeMode } from "@rneui/themed";
import { BaseRootView } from "@wrappers/hoc";
import React from "react";

export default function HomeScreen() {
  const { mode, setMode } = useThemeMode();

  function _handleToggleTheme() {
    setMode(mode === "light" ? "dark" : "light");
  }

  return (
    <BaseRootView>
      <Text>HomeScreen</Text>
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
