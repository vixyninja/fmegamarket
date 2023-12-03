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
  icon?: string;
  type?: string;
  label: string;
};

// AUTH MODULE
type AuthParamList = {
  [OnBoardingScreenKeys.INTRODUCTION_SCREEN]: { test: string };
  [OnBoardingScreenKeys.WELCOME_SCREEN]: { test: string };
  [OnBoardingScreenKeys.LOBBY_SCREEN]: { test: string };
  [AuthScreenKeys.SIGN_IN_SCREEN]: { test: string };
  [AuthScreenKeys.SIGN_UP_SCREEN]: { test: string };
};

// HOME GROUP MODULE
type HomeGroupParamList = {
  [HomeScreenKeys.HOME_SCREEN]: { test: string };
  [HomeScreenKeys.NOTIFICATION_SCREEN]: { test: string };
};

// EXPLORE GROUP MODULE
type ExploreGroupParamList = {
  [ExploreScreenKeys.EXPLORE_SCREEN]: { test: string };
  [ExploreScreenKeys.SEARCH_SCREEN]: { test: string };
};

// ORDERS GROUP MODULE
type OrdersGroupParamList = {
  [OrderScreenKey.ORDER_SCREEN]: { test: string };
  [OrderScreenKey.HISTORY_SCREEN]: { test: string };
};

// CART GROUP MODULE
type CartGroupParamList = {
  [CartScreenKeys.CART_SCREEN]: { test: string };
  [CartScreenKeys.WISHLIST_SCREEN]: { test: string };
};

// PROFILE GROUP MODULE
type ProfileGroupParamList = {
  [ProfileScreenKeys.PROFILE_SCREEN]: { userId: string };
  [ProfileScreenKeys.SETTING_SCREEN]: { test: string };
};

// BOTTOM TAB MODULE
type BottomParamList = {
  [BottomTabScreenKeys.HOME]: NavigatorScreenParams<HomeGroupParamList>;
  [BottomTabScreenKeys.EXPLORE]: NavigatorScreenParams<ExploreGroupParamList>;
  [BottomTabScreenKeys.ORDERS]: NavigatorScreenParams<OrdersGroupParamList>;
  [BottomTabScreenKeys.CART]: NavigatorScreenParams<CartGroupParamList>;
  [BottomTabScreenKeys.PROFILE]: NavigatorScreenParams<ProfileGroupParamList>;
};

// ROOT MODULE
type AppParamList = {
  [AppScreenKeys.BOTTOM_TAB]: NavigatorScreenParams<BottomParamList>;
  [AppScreenKeys.NOT_FOUND]: undefined;
  [AppScreenKeys.ERROR_BOUNDARY]: undefined;
};

export {
  AppParamList,
  AuthParamList,
  BottomParamList,
  CartGroupParamList,
  ExploreGroupParamList,
  HomeGroupParamList,
  OrdersGroupParamList,
  ProfileGroupParamList,
  ScreenOption,
};
