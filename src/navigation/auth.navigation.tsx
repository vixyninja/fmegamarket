import { authScreenStack } from "@features/Auth";
import {
  OnBoardingScreenKeys,
  onBoardingScreenStack,
} from "@features/OnBoarding";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import React from "react";

export default function AuthNavigation() {
  const AuthStack = createNativeStackNavigator();

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
      initialRouteName={OnBoardingScreenKeys.Welcome}
    >
      <AuthStack.Screen
        key={onBoardingScreenStack[0].name}
        name={onBoardingScreenStack[0].name}
        component={onBoardingScreenStack[0].component}
      />

      <AuthStack.Screen
        key={onBoardingScreenStack[1].name}
        name={onBoardingScreenStack[1].name}
        component={onBoardingScreenStack[1].component}
        options={{
          animation: "slide_from_right",
        }}
      />

      <AuthStack.Screen
        key={authScreenStack[0].name}
        name={authScreenStack[0].name}
        component={authScreenStack[0].component}
      />

      <AuthStack.Screen
        key={authScreenStack[1].name}
        name={authScreenStack[1].name}
        component={authScreenStack[1].component}
      />
    </AuthStack.Navigator>
  );
}
