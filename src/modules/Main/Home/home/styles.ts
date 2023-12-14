import { FONT_MANAGER } from "@/assets";
import { makeStyles, normalize } from "@rneui/themed";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  paddingRoot: {
    padding: normalize(8),
  },
  title: {
    fontSize: normalize(24),
    fontWeight: "bold",
    marginBottom: normalize(8),
  },
  textIntroContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textIntro1: {
    fontSize: normalize(18),
    fontFamily: FONT_MANAGER.poppins_semibold,
  },
  textIntro2: {
    fontSize: normalize(16),
    fontFamily: FONT_MANAGER.poppins_semibold,
  },
}));

export default useStyles;
