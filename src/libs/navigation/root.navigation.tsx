import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AppNavigation from "./app.navigation";
import AuthNavigation from "./auth.navigation";
import { navigationRef } from "./services.navigation";

export default function RootNavigation() {
  const isSignedIn = false;

  return (
    <NavigationContainer ref={navigationRef}>
      {isSignedIn ? <AuthNavigation /> : <AppNavigation />}
    </NavigationContainer>
  );
}
