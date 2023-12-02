import { FONT_MANAGER } from "@/assets";
import { Colors, Theme, makeStyles, normalize } from "@rneui/themed";

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    padding: 6,
  },
  textContainer: {
    position: "absolute",
    bottom: normalize(40),
    alignSelf: "center",
  },
  text1: {
    fontFamily: FONT_MANAGER.poppins_semi_bold,
    fontSize: normalize(36),
    color: theme.colors.primary,
  },
  text2: {
    color: theme.colors.primary,
    fontFamily: FONT_MANAGER.poppins_medium,
    fontSize: normalize(52),
  },
  text3: {
    color: theme.colors.primary,
    fontFamily: FONT_MANAGER.poppins_regular,
    fontSize: normalize(16),
  },
  nextButton: {
    position: "absolute",
    bottom: normalize(20),
    right: normalize(30),
    zIndex: 999,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nextText: {
    color: "#fff",
    fontFamily: FONT_MANAGER.poppins_regular,
    fontSize: normalize(16),
  },
}));

export default useStyles;
