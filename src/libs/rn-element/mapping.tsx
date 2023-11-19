import { TextProps, createTheme, Theme, Colors } from "@rneui/themed";
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
  },
});
