import { isPlatForm, useAppDispatch, useAppSelector, useGoogleSignin } from "@/common";
import { useFCM } from "@/configuration";
import {
  AlertAction,
  AppAction,
  AuthAction,
  LoadingAction,
  UserAction,
  authSelector,
  useSignInGoogleMutation,
} from "@/core";
import auth from "@react-native-firebase/auth";
import { statusCodes } from "@react-native-google-signin/google-signin";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useSignIn = () => {
  const [disabled, setDisabled] = useState(false);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const authState = useAppSelector(authSelector);

  const { getToken, saveTokenToFirestore, pushNotification } = useFCM();

  const { signIn, getTokens, signOut } = useGoogleSignin();

  const [signInGoogle] = useSignInGoogleMutation();

  useEffect(() => {
    dispatch(AppAction.setFirstTime(true));
    if (authState.isRememberMe) {
      switch (authState.provider) {
        case "google":
          onGoogleButtonPress();
          break;
        case "facebook":
          break;
        case "email":
          break;
        default:
          break;
      }
    }
  }, []);

  const onGoogleButtonPress = useCallback(async () => {
    try {
      setDisabled(true);

      dispatch(LoadingAction.showLoadingWithTitle(t("loading.sign_in")));

      await signOut();

      await signIn();

      const { idToken, accessToken } = await getTokens();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const credential = await auth().signInWithCredential(googleCredential);

      if (!credential) {
        dispatch(
          AlertAction.showAlert({
            title: t("alert.sign_in_failed.title"),
            message: t("alert.sign_in_failed.message"),
            type: "error",
          }),
        );
        return;
      }

      await signInGoogle({
        accessToken: accessToken,
        idToken: idToken,
        deviceToken: await getToken(),
        deviceType: isPlatForm(),
      })
        .unwrap()
        .then(async (res) => {
          if (res.statusCode === 200) {
            await pushNotification({});
            await saveTokenToFirestore(res.data.user?.uuid!);
            dispatch(
              AuthAction.setCredentials({
                provider: "google",
                idToken: idToken,
                isAuth: true,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
              }),
            );
            dispatch(UserAction.setUser({ ...res.data.user }));
            dispatch(LoadingAction.hideLoading());
          } else {
            dispatch(
              AlertAction.showAlert({
                title: t("alert.sign_in_failed.title"),
                message: t("alert.sign_in_failed.message"),
                type: "error",
              }),
            );
          }
        })
        .catch((_) => {
          dispatch(
            AlertAction.showAlert({
              title: t("alert.sign_in_failed.title"),
              message: t("alert.sign_in_failed.message"),
              type: "error",
            }),
          );
        });
      dispatch(LoadingAction.hideLoading());
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("user cancelled the login flow");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        dispatch(
          AlertAction.showAlert({
            title: t("alert.play_services_not_available.title"),
            message: t("alert.play_services_not_available.message"),
            type: "error",
          }),
        );
      } else {
        dispatch(
          AlertAction.showAlert({
            title: t("alert.sign_in_failed.title"),
            message: t("alert.sign_in_failed.message"),
            type: "error",
          }),
        );
      }
      setDisabled(false);
      dispatch(LoadingAction.hideLoading());
    } finally {
      setDisabled(false);
      dispatch(LoadingAction.hideLoading());
    }
  }, []);

  return {
    onGoogleButtonPress,
    disabled,
  };
};
