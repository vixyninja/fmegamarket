import { useAppSelector } from "@hooks/useRedux";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { appSelector, authSelector } from "../libs/app_redux";
import i18next from "../libs/intl";
import AppNavigation from "./app.navigation";
import AuthNavigation from "./auth.navigation";
import { linking, navigationRef } from "./services.navigation";

export default function RootNavigation() {
  const isSignedIn = useAppSelector(authSelector);
  const language = useAppSelector(appSelector);

  useEffect(() => {
    i18next.changeLanguage(language.language);
  }, [language.language]);

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      {isSignedIn.isAuth ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}
