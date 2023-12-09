import { BaseLoadingLottie, useAppSelector } from "@/common";
import { useFlipper } from "@react-navigation/devtools";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import i18next from "../../configuration/intl";
import { appSelector, authSelector } from "../reduxs";
import { AppNavigation } from "./app.navigation";
import { AuthNavigation } from "./auth.navigation";
import { linking, navigationRef } from "./services.navigation";

export function RootNavigation() {
  const { isAuth } = useAppSelector(authSelector);
  const { language } = useAppSelector(appSelector);

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  useFlipper(navigationRef);

  return (
    <NavigationContainer ref={navigationRef} linking={linking} fallback={<BaseLoadingLottie />}>
      {isAuth ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}
