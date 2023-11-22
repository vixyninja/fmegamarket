import { Colors, TextProps, Theme, createTheme } from "@rneui/themed";
import { spacing } from "./dimens";

export const theme = createTheme({
  lightColors: {
    primary: "#ffffff",
    secondary: "#000000",
    background: "#ffffff",
  },
  darkColors: {
    primary: "#000000",
    secondary: "#ffffff",
    background: "#000000",
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
  },
});
