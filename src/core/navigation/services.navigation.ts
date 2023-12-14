import { BottomTabScreenKeys } from "@/modules";
import {
  CommonActions,
  DrawerActions,
  LinkingOptions,
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

  static drawerOpen = () =>
    navigationRef.current?.dispatch(DrawerActions.openDrawer());

  static drawerClose = () =>
    navigationRef.current?.dispatch(DrawerActions.closeDrawer());

  static drawerToggle = () =>
    navigationRef.current?.dispatch(DrawerActions.toggleDrawer());

  static drawerJumpTo = (route: string) =>
    navigationRef.current?.dispatch(DrawerActions.jumpTo(route));

  static bottomTabJumpTo = (route: string) =>
    navigationRef.current?.dispatch(CommonActions.navigate(route));

  static bottomTabJumpToWithParams = (route: string, params: any) =>
    navigationRef.current?.dispatch(CommonActions.navigate(route, params));

  static bottomTabReset = (
    routes: { name: string; params?: any }[],
    index: number,
  ) =>
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    );
}

export const linking: LinkingOptions<any> = {
  prefixes: ["app://"],
  config: {
    screens: {
      BottomTab: {
        path: "BottomTab",
        screens: {
          Home: {
            path: BottomTabScreenKeys.HOME,
          },
          Profile: {
            path: BottomTabScreenKeys.PROFILE,
          },
        },
      },
    },
  },
  enabled: true,
};
