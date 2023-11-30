import { FONT_MANAGER } from "@/assets";
import { dimens } from "@/configuration/themes";
import { Colors, Theme, makeStyles, normalize } from "@rneui/themed";

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  image: {
    width: normalize(dimens.width),
    height: normalize(dimens.height / 1.6),
    resizeMode: "stretch",
  },
  containerList: {
    width: normalize(dimens.width),
    height: normalize(dimens.height / 1.6),
  },
  containerDot: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: normalize(20),
  },
  containerText: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: normalize(20),
    height: normalize(dimens.height * 0.17),
  },
  text: {
    fontFamily: FONT_MANAGER.poppins_extra_bold,
    marginVertical: normalize(20),
    marginHorizontal: normalize(20),
    textAlign: "center",
    textAlignVertical: "center",
  },
  dot: {
    backgroundColor: theme.colors.grey3,
    width: normalize(10),
    height: normalize(10),
    borderRadius: normalize(99),
    marginHorizontal: normalize(4),
    marginVertical: normalize(4),
  },
  activeDot: {
    backgroundColor: theme.colors.secondary,
    width: normalize(30),
    height: normalize(10),
    borderRadius: normalize(20),
    marginHorizontal: normalize(4),
    marginVertical: normalize(4),
  },
  button: {
    marginHorizontal: normalize(20),
    borderRadius: normalize(99),
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 30,
    zIndex: 999,
  },
  backText: {
    color: "#000",
    fontFamily: FONT_MANAGER.poppins_regular,
    fontSize: 16,
  },
}));

export default useStyles;
