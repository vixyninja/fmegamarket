import { AppScreenKeys, appScreenStack } from "@modules/Main";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import React from "react";

export default function AppNavigation() {
  const AppStack = createNativeStackNavigator();

  const authNavigationOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: "simple_push",
    animationDuration: 300,
    animationTypeForReplace: "push",
    autoHideHomeIndicator: true,
    customAnimationOnGesture: true,
    fullScreenGestureEnabled: true,
    orientation: "default",
    statusBarAnimation: "slide",
  };

  return (
    <AppStack.Navigator
      screenOptions={authNavigationOptions}
      id="appNavigation"
      initialRouteName={AppScreenKeys.BottomTab}
    >
      <AppStack.Screen
        key={appScreenStack[0].name}
        name={appScreenStack[0].name}
        component={appScreenStack[0].component}
      />
      <AppStack.Screen
        key={appScreenStack[1].name}
        name={appScreenStack[1].name}
        component={appScreenStack[1].component}
      />
    </AppStack.Navigator>
  );
}
