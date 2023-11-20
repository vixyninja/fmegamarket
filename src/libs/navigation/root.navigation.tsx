import { useAppSelector } from "@hooks/useRedux";
import { appSelector } from "@libs/app-redux";
import { NavigationContainer } from "@react-navigation/native";
import i18next from "../intl";
import React, { useEffect } from "react";
import AppNavigation from "./app.navigation";
import AuthNavigation from "./auth.navigation";
import { navigationRef } from "./services.navigation";

export default function RootNavigation() {
  const isSignedIn = false;

  const language = useAppSelector(appSelector);

  useEffect(() => {
    i18next.changeLanguage(language.language);
  }, [language.language]);

  return (
    <NavigationContainer ref={navigationRef}>
      {isSignedIn ? <AuthNavigation /> : <AppNavigation />}
    </NavigationContainer>
  );
}
