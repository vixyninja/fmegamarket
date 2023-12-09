import { dimens } from "@/configuration";
import { Colors, Theme, makeStyles, normalize } from "@rneui/themed";

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  imageCard: {
    width: dimens.width,
    height: dimens.height,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: normalize(300),
    height: normalize(300),
    borderRadius: normalize(20),
  },
  fallBackContainer: {
    flex: 1,
    position: "absolute",
    width: dimens.width,
    height: dimens.height,
    borderRadius: normalize(20),
    justifyContent: "center",
    alignItems: "center",
  },
  fallBack: {
    width: normalize(300),
    height: normalize(300),
  },
  backDropContainer: {
    width: dimens.width,
    height: dimens.height,
    flex: 1,
  },
  backDropImage: {
    width: dimens.width,
    height: dimens.height,
  },
  indicatorContainer: {
    position: "absolute",
    bottom: normalize(20),
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  indicator: {
    width: normalize(12),
    height: normalize(12),
    borderRadius: normalize(99),
    marginHorizontal: normalize(12),
    backgroundColor: theme.colors.primary,
  },
  buttonNextContainer: {
    position: "absolute",
    top: normalize(40),
    right: normalize(20),
  },
  buttonNext: {
    width: normalize(80),
    borderRadius: normalize(12),
    backgroundColor: "transparent",
  },
}));

export default useStyles;
