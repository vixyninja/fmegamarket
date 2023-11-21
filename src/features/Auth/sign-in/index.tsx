import { useGoogleSignin } from "@hooks/useGoogleSignIn";
import { useAppDispatch } from "@hooks/useRedux";
import { AlertAction, AuthAction, LoadingAction } from "@libs/app-redux";
import auth from "@react-native-firebase/auth";
import {
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { BaseRootView } from "@wrappers/hoc";
import React from "react";
import { useTranslation } from "react-i18next";

export default function SignInScreen() {
  const dispatch = useAppDispatch();
  const { signIn, getTokens } = useGoogleSignin();
  const { t } = useTranslation();
  const [disabled, setDisabled] = React.useState(false);

  async function onGoogleButtonPress() {
    dispatch(LoadingAction.showLoadingWithTitle(t("loading.sign_in")));
    try {
      setDisabled(true);
      await signIn();
      const { idToken, accessToken } = await getTokens();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const credential = await auth().signInWithCredential(googleCredential);

      if (credential) {
        dispatch(
          AuthAction.setCredentials({
            provider: "google",
            idToken: idToken,
            isAuth: true,
          }),
        );
      } else {
        dispatch(
          AlertAction.setAlert({
            title: t("alert.sign_in_failed.title"),
            message: t("alert.sign_in_failed.message"),
            callback: () => {
              dispatch(AlertAction.disposeAlert());
              dispatch(AlertAction.hideAlert());
            },
            cancel: () => {
              dispatch(AlertAction.disposeAlert());
              dispatch(AlertAction.hideAlert());
            },
            type: "warning",
          }),
        );
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        dispatch(
          AlertAction.setAlert({
            title: t("alert.sign_in_cancelled.title"),
            message: t("alert.sign_in_cancelled.message"),
            callback: () => {
              dispatch(AlertAction.disposeAlert());
              dispatch(AlertAction.hideAlert());
            },
            cancel: () => {
              dispatch(AlertAction.disposeAlert());
              dispatch(AlertAction.hideAlert());
            },
            type: "warning",
          }),
        );
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        dispatch(
          AlertAction.setAlert({
            title: t("alert.play_services_not_available.title"),
            message: t("alert.play_services_not_available.message"),
            callback: () => {
              dispatch(AlertAction.disposeAlert());
              dispatch(AlertAction.hideAlert());
            },
            cancel: () => {
              dispatch(AlertAction.disposeAlert());
              dispatch(AlertAction.hideAlert());
            },
            type: "warning",
          }),
        );
      } else {
        dispatch(
          AlertAction.setAlert({
            title: t("alert.sign_in_failed.title"),
            message: t("alert.sign_in_failed.message"),
            callback: () => {
              dispatch(AlertAction.disposeAlert());
              dispatch(AlertAction.hideAlert());
            },
            cancel: () => {
              dispatch(AlertAction.disposeAlert());
              dispatch(AlertAction.hideAlert());
            },
            type: "warning",
          }),
        );
      }
    } finally {
      setDisabled(false);
      dispatch(LoadingAction.hideLoading());
    }
  }

  return (
    <BaseRootView>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onGoogleButtonPress}
        disabled={disabled}
      />
    </BaseRootView>
  );
}
