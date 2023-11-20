import { ScreenType } from "@libs/navigation";
import { ExploreScreen, SubScreen } from "./Explore";
import { HomeScreen } from "./Home";
import { OrderScreen } from "./Order";
import { CartScreen } from "./Cart";
import { WalletScreen } from "./Wallet";

export const bottomTabScreenStack: Array<ScreenType> = [
  {
    name: "Home",
    component: HomeScreen,
    option: {
      icon: "home",
      type: "feather",
      label: "Home",
    },
  },
  {
    name: "Explore",
    component: ExploreScreen,
    option: {
      icon: "search",
      type: "feather",
      label: "Explore",
    },
  },
  {
    name: "Orders",
    component: OrderScreen,
    option: {
      icon: "shopping-bag",
      type: "feather",
      label: "Orders",
    },
  },
  {
    name: "Cart",
    component: CartScreen,
    option: {
      icon: "shopping-cart",
      type: "feather",
      label: "Cart",
    },
  },
  {
    name: "Wallet",
    component: WalletScreen,
    option: {
      icon: "credit-card",
      type: "feather",
      label: "Wallet",
    },
  },
];

export enum AppScreenKeys {
  BottomTab = "BottomTab",
  Sub = "Sub",
}

export const appScreenStack: Array<ScreenType> = [
  {
    name: AppScreenKeys.Sub,
    component: SubScreen,
  },
];
