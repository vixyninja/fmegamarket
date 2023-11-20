import { BottomTab, ScreenType } from "@libs/navigation";
import { CartScreen } from "./Cart";
import { ExploreScreen } from "./Explore";
import { HomeScreen } from "./Home";
import { OrderScreen } from "./Order";
import { ProfileScreen, SettingScreen } from "./Profile";

export enum AppScreenKeys {
  BottomTab = "BottomTab",
  SettingScreen = "SettingScreen",
}

export enum BottomTabScreenKeys {
  Home = "Home",
  Explore = "Explore",
  Orders = "Orders",
  Cart = "Cart",
  Profile = "Profile",
}

export const bottomTabScreenStack: Array<ScreenType> = [
  {
    name: BottomTabScreenKeys.Home,
    component: HomeScreen,
    option: {
      icon: "home",
      type: "feather",
      label: "HOME",
    },
  },
  {
    name: BottomTabScreenKeys.Explore,
    component: ExploreScreen,
    option: {
      icon: "search",
      type: "feather",
      label: "EXPLORE",
    },
  },
  {
    name: BottomTabScreenKeys.Orders,
    component: OrderScreen,
    option: {
      icon: "shopping-bag",
      type: "feather",
      label: "ORDERS",
    },
  },
  {
    name: BottomTabScreenKeys.Cart,
    component: CartScreen,
    option: {
      icon: "shopping-cart",
      type: "feather",
      label: "CART",
    },
  },
  {
    name: BottomTabScreenKeys.Profile,
    component: ProfileScreen,
    option: {
      icon: "user",
      type: "feather",
      label: "PROFILE",
    },
  },
];

export const appScreenStack: Array<ScreenType> = [
  {
    name: AppScreenKeys.BottomTab,
    component: BottomTab,
    option: {
      icon: "home",
      type: "feather",
      label: "Home",
    },
  },
  {
    name: AppScreenKeys.SettingScreen,
    component: SettingScreen,
    option: {
      icon: "settings",
      type: "feather",
      label: "Setting",
    },
  },
];
