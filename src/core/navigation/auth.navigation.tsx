import { useAppSelector } from "@/common";
import {
    IntroductionScreen,
    LobbyScreen,
    SignInScreen,
    SignUpScreen,
    WelcomeScreen,
} from "@/modules";
import {
    NativeStackNavigationOptions,
    createNativeStackNavigator,
} from "@react-navigation/native-stack";
import React from "react";
import { appSelector } from "../reduxs";
import { AuthParamList } from "./types.navigation";

export function AuthNavigation() {
  const AuthStack = createNativeStackNavigator<AuthParamList>();
  const appState = useAppSelector(appSelector);

  const authNavigationOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: "default",
    animationDuration: 300,
    animationTypeForReplace: "pop",
    autoHideHomeIndicator: true,
    customAnimationOnGesture: true,
    fullScreenGestureEnabled: true,
    orientation: "default",
    statusBarAnimation: "slide",
  };

  return (
    <AuthStack.Navigator
      screenOptions={authNavigationOptions}
      id="authNavigation"
      initialRouteName={
        appState.firstTime ? "WELCOME_SCREEN" : "SIGN_IN_SCREEN"
      }
    >
      {appState.firstTime && (
        <>
          <AuthStack.Screen
            key={"WELCOME_SCREEN"}
            name={"WELCOME_SCREEN"}
            component={WelcomeScreen}
          />
          <AuthStack.Screen
            key={"INTRODUCTION_SCREEN"}
            name={"INTRODUCTION_SCREEN"}
            component={IntroductionScreen}
            options={{
              animation: "slide_from_right",
            }}
          />
        </>
      )}

      <AuthStack.Screen
        key={"LOBBY_SCREEN"}
        name={"LOBBY_SCREEN"}
        component={LobbyScreen}
        options={{
          animation: "slide_from_right",
        }}
      />

      <AuthStack.Screen
        key={"SIGN_IN_SCREEN"}
        name={"SIGN_IN_SCREEN"}
        component={SignInScreen}
      />
      <AuthStack.Screen
        key={"SIGN_UP_SCREEN"}
        name={"SIGN_UP_SCREEN"}
        component={SignUpScreen}
      />
    </AuthStack.Navigator>
  );
}
