import { LayoutAnimation, LayoutAnimationConfig, Platform, UIManager } from "react-native";

export const useLayoutAnimation = (animation: LayoutAnimationConfig) => LayoutAnimation.configureNext(animation);

export const initialLayoutAnimation = () => {
  if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return LayoutAnimation.configureNext({
    duration: 300,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
  });
};
