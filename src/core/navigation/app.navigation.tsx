import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import React from "react";
import { BottomTabNavigation } from "./bottom.navigation";
import { AppParamList } from "./types.navigation";
import { Text } from "@rneui/themed";

export function AppNavigation() {
  const AppStack = createNativeStackNavigator<AppParamList>();

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
        component={() => <Text>Not Found</Text>}
      />

      <AppStack.Screen
        key={"ERROR_BOUNDARY"}
        name={"ERROR_BOUNDARY"}
        component={() => <Text>Error Boundary</Text>}
      />
    </AppStack.Navigator>
  );
}
