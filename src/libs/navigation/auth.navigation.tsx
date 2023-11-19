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
      initialRouteName={AuthScreenKeys.SignIn}
    >
      {authScreenStack.map((_, index) => (
        <AuthStack.Screen
          key={index}
          name={authScreenStack[index].name}
          component={authScreenStack[index].component}
        />
      ))}
    </AuthStack.Navigator>
  );
}
