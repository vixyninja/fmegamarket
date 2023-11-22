import { dimens } from "@libs/rne";
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
}));

export default useStyles;
