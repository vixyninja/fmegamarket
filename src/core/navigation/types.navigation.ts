import {
  AppScreenKeys,
  AuthScreenKeys,
  BottomTabScreenKeys,
  CartScreenKeys,
  ExploreScreenKeys,
  HomeScreenKeys,
  OnBoardingScreenKeys,
  OrderScreenKey,
  ProfileScreenKeys,
} from "@/modules";
import { NavigatorScreenParams } from "@react-navigation/native";

type ScreenOption = {
  icon: string;
  type?: string;
  label?: string;
};

// AUTH MODULE
type AuthParamList = {
  [OnBoardingScreenKeys.INTRODUCTION_SCREEN]: { test: string } | undefined;
  [OnBoardingScreenKeys.WELCOME_SCREEN]: { test: string } | undefined;
  [OnBoardingScreenKeys.LOBBY_SCREEN]: { test: string } | undefined;
  [AuthScreenKeys.SIGN_IN_SCREEN]: { test: string } | undefined;
  [AuthScreenKeys.SIGN_UP_SCREEN]: { test: string } | undefined;
};

type BottomParamList = {
  [BottomTabScreenKeys.HOME]: { userId: string } | undefined;
  [BottomTabScreenKeys.EXPLORE]: undefined;
  [BottomTabScreenKeys.ORDER]: { userId: string } | undefined;
  [BottomTabScreenKeys.CART]: undefined;
  [BottomTabScreenKeys.PROFILE]: undefined | { test: string };
};

// ROOT MODULE
type AppParamList = {
  [AppScreenKeys.BOTTOM_TAB]: NavigatorScreenParams<BottomParamList> | undefined;
  [AppScreenKeys.NOT_FOUND]: undefined;
  [AppScreenKeys.ERROR_BOUNDARY]: undefined;

  //   HOME MODULE
  [HomeScreenKeys.NOTIFICATION_SCREEN]: undefined;

  //   EXPLORE MODULE
  [ExploreScreenKeys.SEARCH_SCREEN]: undefined;

  //   CART MODULE
  [CartScreenKeys.WISHLIST_SCREEN]: undefined;

  //   ORDER MODULE
  [OrderScreenKey.HISTORY_SCREEN]: undefined;

  //   PROFILE MODULE
  [ProfileScreenKeys.SETTING_SCREEN]: undefined;
};

export { AppParamList, AuthParamList, BottomParamList, ScreenOption };
