import { Colors, Theme, makeStyles, normalize } from "@rneui/themed";

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  root: {
    paddingBottom: normalize(32),
  },
  image: {
    width: normalize(200),
    height: normalize(200),
    borderRadius: normalize(99),
  },
  imageContainer: {
    alignSelf: "center",
    marginTop: normalize(24),
  },
  titleStyle: {
    textAlign: "center",
    marginVertical: normalize(16),
  },
  buttonForm: {
    marginVertical: normalize(16),
    marginHorizontal: normalize(16),
    gap: normalize(12),
  },
  buttonTitle: {
    paddingStart: normalize(16),
    color: theme.colors.secondary,
  },
  buttonContainer: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.grey5,
    borderRadius: normalize(8),
    paddingVertical: normalize(16),
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: normalize(8),
  },
  dividerText: {
    marginHorizontal: normalize(16),
    color: theme.colors.grey3,
    fontSize: normalize(12),
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.grey5,
    marginHorizontal: normalize(16),
  },
  signUpButtonContainer: {
    marginVertical: normalize(8),
    marginHorizontal: normalize(20),
  },
  icon: {
    color: theme.colors.grey0,
  },
  selectionGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: normalize(16),
    marginVertical: normalize(8),
  },
  selectionButtonContainer: {
    width: normalize(80),
    height: normalize(60),
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.grey5,
    borderRadius: normalize(12),
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: normalize(8),
  },
  footerText: {
    color: theme.colors.grey3,
    fontSize: normalize(12),
  },
  footerTextClick: {
    fontSize: normalize(12),
  },
}));

export default useStyles;
