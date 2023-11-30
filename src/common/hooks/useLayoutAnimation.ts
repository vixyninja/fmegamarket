import {
  LayoutAnimation,
  LayoutAnimationConfig,
  Platform,
  UIManager,
} from "react-native";

export const useLayoutAnimation = (animation: LayoutAnimationConfig) => {
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return LayoutAnimation.configureNext(animation);
};
