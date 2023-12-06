import { FONT_MANAGER } from "@/assets";
import { Colors, Theme, makeStyles, normalize } from "@rneui/themed";

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  image: {
    width: "100%",
    height: "70%",
  },
  bottomSheetContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  bottomSheetBackdrop: {
    width: "100%",
    backgroundColor: "transparent",
  },
  containerChildren: {
    width: "100%",
    height: normalize(280),
    backgroundColor: theme.colors.grey5,
    padding: normalize(20),
    borderTopLeftRadius: normalize(30),
    borderTopRightRadius: normalize(30),
  },
  welcomeText: {
    fontFamily: FONT_MANAGER.roboto_blackItalic,
  },
  nextButtonContainer: {
    marginTop: normalize(30),
  },
}));

export default useStyles;
