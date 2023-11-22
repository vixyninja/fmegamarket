import { FONT_MANAGER } from "@assets/fonts";
import { Colors, Theme, makeStyles } from "@rneui/themed";

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  textContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  text1: {
    fontFamily: FONT_MANAGER.poppins_semi_bold,
    fontSize: 36,
    color: theme.colors.primary,
  },
  text2: {
    color: theme.colors.primary,
    fontFamily: FONT_MANAGER.poppins_medium,
    fontSize: 52,
  },
  text3: {
    color: theme.colors.primary,
    fontFamily: FONT_MANAGER.poppins_regular,
    fontSize: 16,
  },
  nextButton: {
    position: "absolute",
    bottom: 20,
    right: 30,
    zIndex: 999,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nextText: {
    color: "#fff",
    fontFamily: FONT_MANAGER.poppins_regular,
    fontSize: 16,
  },
}));

export default useStyles;
