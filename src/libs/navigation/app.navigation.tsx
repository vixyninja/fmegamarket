import { AppScreenKeys, appScreenStack } from "@features/Main";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import React from "react";
import BottomTabNavigation from "./bottom.navigation";

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
      screenListeners={{
        focus: (e) => {
          console.log("=================> FOCUS", e);
        },
        blur: (e) => {
          console.log("=================> BLUR", e);
        },
        state: (e) => {
          console.log("=================> STATE", e);
        },
      }}
      initialRouteName={AppScreenKeys.BottomTab}
    >
      <AppStack.Screen
        key={AppScreenKeys.BottomTab}
        name={AppScreenKeys.BottomTab}
        component={BottomTabNavigation}
      />

      {appScreenStack.map((_, index) => (
        <AppStack.Screen
          key={index}
          name={appScreenStack[index].name}
          component={appScreenStack[index].component}
        />
      ))}
    </AppStack.Navigator>
  );
}
