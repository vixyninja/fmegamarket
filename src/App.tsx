import {
  BaseAlert,
  BaseLoadingLottie,
  BaseStatusBar,
} from "@components/shared";
import usePushNotification from "@libs/local_notification";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { ThemeProvider } from "@wrappers/providers";
import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LottieSplashScreen from "react-native-lottie-splash-screen";
import { Metrics, SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { systemConstant } from "./constants";
import { persistor, store } from "./libs";
import i18Config from "./libs/intl";
import RootNavigation from "@navigation/root.navigation";

export default function App() {
  const { requestNotificationPermission, setApplicationIconBadgeNumber } =
    usePushNotification();

  const initialMetrics: Metrics = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: systemConstant.WEB_CLIENT_ID,
    });
    LottieSplashScreen.hide();
    requestNotificationPermission();
    setApplicationIconBadgeNumber(0);
  }, [requestNotificationPermission]);

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
