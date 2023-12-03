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

// HOME GROUP MODULE
type HomeGroupParamList = {
  [HomeScreenKeys.HOME_SCREEN]: { test: string } | undefined;
  [HomeScreenKeys.NOTIFICATION_SCREEN]: { test: string } | undefined;
};

// EXPLORE GROUP MODULE
type ExploreGroupParamList = {
  [ExploreScreenKeys.EXPLORE_SCREEN]: { test: string } | undefined;
  [ExploreScreenKeys.SEARCH_SCREEN]: { test: string } | undefined;
};

// ORDERS GROUP MODULE
type OrderGroupParamList = {
  [OrderScreenKey.ORDER_SCREEN]: { test: string } | undefined;
  [OrderScreenKey.HISTORY_SCREEN]: { test: string } | undefined;
};

// CART GROUP MODULE
type CartGroupParamList = {
  [CartScreenKeys.CART_SCREEN]: { test: string } | undefined;
  [CartScreenKeys.WISHLIST_SCREEN]: { test: string } | undefined;
};

// PROFILE GROUP MODULE
type ProfileGroupParamList = {
  [ProfileScreenKeys.PROFILE_SCREEN]: { userId: string } | undefined;
  [ProfileScreenKeys.SETTING_SCREEN]: { test: string } | undefined;
};

// BOTTOM TAB MODULE
type BottomParamList = {
  [BottomTabScreenKeys.HOME]:
    | NavigatorScreenParams<HomeGroupParamList>
    | undefined;
  [BottomTabScreenKeys.EXPLORE]:
    | NavigatorScreenParams<ExploreGroupParamList>
    | undefined;
  [BottomTabScreenKeys.ORDER]:
    | NavigatorScreenParams<OrderGroupParamList>
    | undefined;
  [BottomTabScreenKeys.CART]:
    | NavigatorScreenParams<CartGroupParamList>
    | undefined;
  [BottomTabScreenKeys.PROFILE]:
    | NavigatorScreenParams<ProfileGroupParamList>
    | undefined;
};

// ROOT MODULE
type AppParamList = {
  [AppScreenKeys.BOTTOM_TAB]:
    | NavigatorScreenParams<BottomParamList>
    | undefined;
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
  OrderGroupParamList,
  ProfileGroupParamList,
  ScreenOption,
};
