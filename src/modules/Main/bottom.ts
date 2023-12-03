import { ScreenOption } from "@/core";

const BottomTabScreenKeys = {
  HOME: "HOME",
  EXPLORE: "EXPLORE",
  ORDER: "ORDER",
  CART: "CART",
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
    icon: "shopping-bag",
    type: "feather",
    label: "ORDER",
  },
  {
    icon: "shopping-cart",
    type: "feather",
    label: "CART",
  },
  {
    icon: "user",
    type: "feather",
    label: "PROFILE",
  },
];

export { BottomTabScreenKeys, bottomTabScreenStack };
