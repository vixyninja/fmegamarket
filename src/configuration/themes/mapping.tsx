import { Colors, TextProps, Theme, createTheme } from "@rneui/themed";
import { spacing } from "./dimens";
import { ActivityIndicator } from "react-native";
import { FONT_MANAGER, IMAGE_MANAGER } from "@/assets";

export const theme = createTheme({
  lightColors: {
    primary: "#ffffff",
    secondary: "#000000",
    background: "#ffffff",
    tertiary: "#1DA1F2",
    facebook: "#3b5998",
    google: "#db3236",
    twitter: "#00acee",
  },
  darkColors: {
    primary: "#000000",
    secondary: "#ffffff",
    background: "#000000",
    tertiary: "#1DA1F2",
    facebook: "#3b5998",
    google: "#db3236",
    twitter: "#00acee",
  },
  mode: "light",
  spacing: spacing,
  components: {
    Text(
      props: Partial<TextProps>,
      theme: Theme & {
        colors: Colors;
      },
    ) {
      return {
        style: {
          color: theme.colors.secondary,
          fontFamily: FONT_MANAGER.poppins_regular,
        },
        h1Style: {
          fontFamily: FONT_MANAGER.poppins_semi_bold,
          fontSize: 52,
          color: theme.colors.secondary,
        },
        h2Style: {
          fontFamily: FONT_MANAGER.poppins_semi_bold,
          fontSize: 36,
          color: theme.colors.secondary,
        },
        h3Style: {
          fontFamily: FONT_MANAGER.poppins_semi_bold,
          fontSize: 24,
          color: theme.colors.secondary,
        },
        h4Style: {
          fontFamily: FONT_MANAGER.poppins_medium,
          fontSize: 18,
          color: theme.colors.secondary,
        },
        h5Style: {
          fontFamily: FONT_MANAGER.poppins_medium,
          fontSize: 16,
          color: theme.colors.secondary,
        },
        ...props,
      };
    },
    Button(props, theme) {
      return {
        buttonStyle: {
          backgroundColor: theme.colors.secondary,
        },
        titleStyle: {
          color: theme.colors.primary,
        },
        ...props,
      };
    },
    Image(props, theme) {
      return {
        defaultSource: IMAGE_MANAGER.placeholder,
        transitionDuration: 500,
        transition: true,
        fadeDuration: 500,
        resizeMode: "center",
        alt: "image",
        PlaceholderContent: <ActivityIndicator />,
        ...props,
      };
    },
  },
});
