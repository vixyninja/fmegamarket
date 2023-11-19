import { BaseStatusBar } from "@components/shared";
import { ThemeProvider } from "@wrappers/providers";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Metrics, SafeAreaProvider } from "react-native-safe-area-context";
import { RootNavigation } from "./libs";

export default function App() {
  const initialMetrics: Metrics = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  return (
    <SafeAreaProvider initialMetrics={initialMetrics}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <BaseStatusBar />
          <RootNavigation />
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
