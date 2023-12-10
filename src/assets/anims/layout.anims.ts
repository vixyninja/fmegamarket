import { LayoutAnimation, LayoutAnimationConfig } from "react-native";

const LayoutEaseInEase: LayoutAnimationConfig = {
  duration: 500,
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

const LayoutVerticalEaseInEase: LayoutAnimationConfig = {
  duration: 600,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    delay: 600,
    springDamping: 0.7,
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
  LayoutVerticalEaseInEase,
};
