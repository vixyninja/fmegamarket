import { ScreenOption } from "@/core";

const BottomTabScreenKeys = {
  HOME: "HOME",
  EXPLORE: "EXPLORE",
  CART: "CART",
  ORDER: "ORDER",
  PROFILE: "PROFILE",
} as const;

const bottomTabScreenStack: Array<ScreenOption> = [
  {
    icon: "home",
    type: "feather",
    label: "HOME",
  },
  {
    icon: "search",
    type: "feather",
    label: "EXPLORE",
  },
  {
    icon: "shopping-cart",
    type: "feather",
    label: "CART",
  },
  {
    icon: "shopping-bag",
    type: "feather",
    label: "ORDER",
  },
  {
    icon: "user",
    type: "feather",
    label: "PROFILE",
  },
];

export { BottomTabScreenKeys, bottomTabScreenStack };
