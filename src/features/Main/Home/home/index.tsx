import React from "react";
import { Button, Text, useThemeMode } from "@rneui/themed";
import { View } from "react-native";

export default function HomeScreen() {
  const { mode, setMode } = useThemeMode();

  function _handleToggleTheme() {
    setMode(mode === "light" ? "dark" : "light");
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text>HomeScreen</Text>
      <Text>Current theme mode: {mode}</Text>
      <Button onPress={_handleToggleTheme} title="Toggle theme" />
    </View>
  );
}
