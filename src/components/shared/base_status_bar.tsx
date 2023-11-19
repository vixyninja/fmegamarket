import { useTheme } from "@rneui/themed";
import React from "react";
import { StatusBar } from "react-native";

export default function BaseStatusBar() {
  const { theme } = useTheme();
  return (
    <StatusBar
      barStyle={theme.mode === "dark" ? "light-content" : "dark-content"}
      backgroundColor={theme.colors.background}
      animated
      networkActivityIndicatorVisible
      showHideTransition={"slide"}
    />
  );
}
