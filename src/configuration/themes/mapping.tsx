import { FONT_MANAGER, IMAGE_MANAGER } from "@/assets";
import { Colors, TextProps, Theme, createTheme } from "@rneui/themed";
import { ActivityIndicator } from "react-native";
import { spacing } from "./dimens";

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
          fontFamily: FONT_MANAGER.roboto_regular,
          elevation: 1,
          overflow: "scroll",
        },
        h1Style: {
          fontFamily: FONT_MANAGER.roboto_regular,
          fontSize: 32,
          color: theme.colors.secondary,
          elevation: 1,
          overflow: "scroll",
        },
        h2Style: {
          fontFamily: FONT_MANAGER.roboto_regular,
          fontSize: 28,
          color: theme.colors.secondary,
          elevation: 1,
          overflow: "scroll",
        },
        h3Style: {
          fontFamily: FONT_MANAGER.roboto_regular,
          fontSize: 24,
          color: theme.colors.secondary,
          elevation: 1,
          overflow: "scroll",
        },
        h4Style: {
          fontFamily: FONT_MANAGER.roboto_regular,
          fontSize: 20,
          color: theme.colors.secondary,
          overflow: "scroll",
          elevation: 1,
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
    Image(props, _) {
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
