import { ErrorBoundary, NotFound, NotificationScreen } from "@/modules";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import React from "react";
import { BottomTabNavigation } from "./bottom.navigation";
import { AppParamList } from "./types.navigation";

export function AppNavigation() {
  const AppStack = createNativeStackNavigator<AppParamList>();

  const authNavigationOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: "simple_push",
    animationDuration: 500,
    autoHideHomeIndicator: true,
    customAnimationOnGesture: true,
    fullScreenGestureEnabled: true,
    statusBarAnimation: "slide",
  };

  return (
    <AppStack.Navigator
      screenOptions={authNavigationOptions}
      id="appNavigation"
      initialRouteName={"BOTTOM_TAB"}
    >
      <AppStack.Screen
        key={"BOTTOM_TAB"}
        name={"BOTTOM_TAB"}
        component={BottomTabNavigation}
      />

      <AppStack.Screen
        key={"NOT_FOUND"}
        name={"NOT_FOUND"}
        component={NotFound}
      />

      <AppStack.Screen
        key={"ERROR_BOUNDARY"}
        name={"ERROR_BOUNDARY"}
        component={ErrorBoundary}
      />

      <AppStack.Screen
        key={"NOTIFICATION_SCREEN"}
        name={"NOTIFICATION_SCREEN"}
        component={NotificationScreen}
      />
    </AppStack.Navigator>
  );
}
