import {
  OnBoardingScreenKeys,
  AppScreenKeys,
  AuthScreenKeys,
  BottomTabScreenKeys,
  HomeScreenKeys,
  ExploreScreenKeys,
  CartScreenKeys,
  ProfileScreenKeys,
  OrderScreenKey,
} from "@/modules";

export const AppRoutes = Object.freeze({
  ...OnBoardingScreenKeys,
  ...AuthScreenKeys,
  ...AppScreenKeys,
  ...BottomTabScreenKeys,
  ...HomeScreenKeys,
  ...ExploreScreenKeys,
  ...CartScreenKeys,
  ...ProfileScreenKeys,
  ...OrderScreenKey,
});
