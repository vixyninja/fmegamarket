import { ThemeSpacing } from "@rneui/base";
import { Dimensions } from "react-native";

export const spacing: ThemeSpacing = {
  xl: 24,
  lg: 16,
  md: 12,
  sm: 8,
  xs: 4,
};

export const dimens = {
  width: Dimensions.get("screen").width,
  height: Dimensions.get("screen").height,
  spacing: spacing,
};
