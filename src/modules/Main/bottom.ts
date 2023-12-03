import { ScreenOption } from "@/core";

const BottomTabScreenKeys = {
  HOME: "HOME",
  EXPLORE: "EXPLORE",
  ORDERS: "ORDERS",
  CART: "CART",
  PROFILE: "PROFILE",
} as const;

const bottomTabScreenStack: Array<ScreenOption> = [
  {
    icon: "home",
    type: "feather",
    label: "Home",
  },
  {
    icon: "search",
    type: "feather",
    label: "Explore",
  },
  {
    icon: "shopping-bag",
    type: "feather",
    label: "Orders",
  },
  {
    icon: "shopping-cart",
    type: "feather",
    label: "Cart",
  },
  {
    icon: "person",
    type: "feather",
    label: "Profile",
  },
];

export { BottomTabScreenKeys, bottomTabScreenStack };
