import { AuthScreenKeys, authScreenStack } from "@features/Auth";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import React from "react";

export default function AuthNavigation() {
  const AuthStack = createNativeStackNavigator();

  const authNavigationOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: "slide_from_bottom",
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
      initialRouteName={AuthScreenKeys.SignIn}
    >
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
