import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LottieSplashScreen from "react-native-lottie-splash-screen";
import { Metrics, SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import {
  BaseAlert,
  BaseLoadingLottie,
  BaseStatusBar,
  ThemeProvider,
} from "./common";
import { ENVIRONMENT_MANAGER, useNotifee } from "./configuration";
import i18Config from "./configuration/intl";
import { persistor, store } from "./core";
import RootNavigation from "./core/navigation/root.navigation";

export default function App() {
  const initialMetrics: Metrics = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };
  const { checkPermission } = useNotifee();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: ENVIRONMENT_MANAGER.WEB_CLIENT_ID,
    });
    LottieSplashScreen.hide();
    checkPermission();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<BaseLoadingLottie />} persistor={persistor}>
        <SafeAreaProvider initialMetrics={initialMetrics}>
          <I18nextProvider i18n={i18Config}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <ThemeProvider>
                <BaseStatusBar />
                <RootNavigation />
                <BaseLoadingLottie />
                <BaseAlert />
              </ThemeProvider>
            </GestureHandlerRootView>
          </I18nextProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
