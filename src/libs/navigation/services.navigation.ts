import {
  CommonActions,
  NavigationContainerRef,
  StackActions,
} from "@react-navigation/native";
import React from "react";

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export class NavigationServices {
  static navigate(name: string, params?: any, key?: string, replace?: boolean) {
    if (key) {
      return navigationRef.current?.navigate({
        name,
        key,
        params,
        merge: replace,
      });
    }
    return navigationRef.current?.navigate(name, params);
  }

  static navigateAndRemoveUntil(name: string, params?: any) {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name, params }],
      }),
    );
  }

  static canGoBack = () => navigationRef.current?.canGoBack();

  static goBack() {
    if (navigationRef.current?.canGoBack()) {
      navigationRef.current?.goBack();
    } else {
      this.navigateAndReset([{ name: "BottomTab" }], 0);
    }
  }

  static navigateAndReset(
    routes: { name: string; params?: any }[],
    index: number,
  ) {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    );
  }

  static push(name: string, params?: any) {
    navigationRef.current?.dispatch(StackActions.push(name, params));
  }

  static replace = (name: string, params?: any) =>
    navigationRef.current?.dispatch(StackActions.replace(name, params));

  static popToTop = () =>
    navigationRef.current?.dispatch(StackActions.popToTop());

  static pop = (count?: number) =>
    navigationRef.current?.dispatch(StackActions.pop(count));
}
