import { useAppSelector } from "@hooks/useRedux";
import { appSelector, authSelector } from "@libs/app-redux";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import i18next from "../intl";
import AppNavigation from "./app.navigation";
import AuthNavigation from "./auth.navigation";
import { navigationRef } from "./services.navigation";

export default function RootNavigation() {
  const isSignedIn = useAppSelector(authSelector);
  const language = useAppSelector(appSelector);

  useEffect(() => {
    i18next.changeLanguage(language.language);
  }, [language.language]);

  return (
    <NavigationContainer ref={navigationRef}>
      {isSignedIn.isAuth ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}
