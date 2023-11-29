import { Colors, Theme, makeStyles, normalize } from "@rneui/themed";

const useStyles = makeStyles((theme: { colors: Colors } & Theme) => ({
  backIcon: {
    marginTop: normalize(40),
    marginLeft: normalize(16),
  },
  image: {
    width: normalize(200),
    height: normalize(200),
    borderRadius: normalize(99),
  },
  imageContainer: {
    alignSelf: "center",
    marginTop: normalize(64),
  },
  titleStyle: {
    textAlign: "center",
    marginVertical: normalize(16),
  },
  buttonForm: {
    marginVertical: normalize(16),
    marginHorizontal: normalize(16),
    gap: normalize(16),
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
    marginTop: normalize(16),
    marginBottom: normalize(16),
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
  signInButtonContainer: {
    marginVertical: normalize(8),
    marginHorizontal: normalize(20),
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
