import { LayoutAnimation, LayoutAnimationConfig } from "react-native";

const LayoutEaseInEase: LayoutAnimationConfig = {
  duration: 600,
  create: {
    type: LayoutAnimation.Types.easeIn,
    property: LayoutAnimation.Properties.opacity,
    delay: 300,
  },
  update: {
    type: LayoutAnimation.Types.easeIn,
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

export const LayoutAnims = {
  LayoutEaseInEase,
};
