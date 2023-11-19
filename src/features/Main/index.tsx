import { ScreenType } from "@libs/navigation";
import { ExploreScreen, SubScreen } from "./Explore";
import { HomeScreen } from "./Home";

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
      icon: "home",
      type: "feather",
      label: "Home",
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
