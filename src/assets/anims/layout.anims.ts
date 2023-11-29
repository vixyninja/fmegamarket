import { LayoutAnimation, LayoutAnimationConfig } from "react-native";

const LayoutSpring: LayoutAnimationConfig = {
  duration: 400,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.opacity,
    springDamping: 0.7,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.7,
  },
};

const LayoutEaseInEaseOut: LayoutAnimationConfig = {
  duration: 400,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

const LayoutLinear: LayoutAnimationConfig = {
  duration: 400,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.linear,
  },
};

const LayoutEaseInEaseOutDelay: LayoutAnimationConfig = {
  duration: 400,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
    delay: 300,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
    delay: 300,
  },
};

const LayoutSpringDelay: LayoutAnimationConfig = {
  duration: 400,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.opacity,
    springDamping: 0.7,
    delay: 300,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.7,
    delay: 300,
  },
};

const LayoutLinearDelay: LayoutAnimationConfig = {
  duration: 400,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
    delay: 300,
  },
  update: {
    type: LayoutAnimation.Types.linear,
    delay: 300,
  },
};

const LayoutEaseInEaseOutDelayLong: LayoutAnimationConfig = {
  duration: 400,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
    delay: 600,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
    delay: 600,
  },
};

export const LayoutAnims = {
  LayoutSpring,
  LayoutEaseInEaseOut,
  LayoutLinear,
  LayoutEaseInEaseOutDelay,
  LayoutSpringDelay,
  LayoutLinearDelay,
  LayoutEaseInEaseOutDelayLong,
};
