import {
  BaseAlert,
  BaseLoadingLottie,
  BaseStatusBar,
} from "@components/shared";
import { persistor, store } from "@libs/app-redux";
import { ThemeProvider } from "@wrappers/providers";
import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LottieSplashScreen from "react-native-lottie-splash-screen";
import { Metrics, SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RootNavigation } from "./libs";
import i18Config from "./libs/intl";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function App() {
  const initialMetrics: Metrics = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  useEffect(() => {
    LottieSplashScreen.hide();
    GoogleSignin.configure({
      webClientId:
        "705194195270-8hiek6umkvrvn9d7q2u2uam4b6ag6v31.apps.googleusercontent.com",
    });
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
