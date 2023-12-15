import {
  isPlatForm,
  useAppDispatch,
  useAppSelector,
  useGoogleSignin,
} from "@/common";
import { useFCM } from "@/configuration";
import {
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

export const useSocialSignIn = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(authSelector);
  const { getToken, saveTokenToFirestore, pushNotification } = useFCM();
  const { signIn, getTokens, signOut } = useGoogleSignin();
  const [signInGoogle] = useSignInGoogleMutation();
  const [disabled, setDisabled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
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
        throw new Error("Credential is null");
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
                isAuth: true,
                provider: "google",
                idToken: idToken,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
              }),
            );
            dispatch(UserAction.setUser({ ...res.data.user }));
          } else {
            throw new Error("Sign in failed");
          }
        });
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        throw new Error("User cancelled the login flow");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new Error("Play services not available");
      } else {
        throw new Error("Something went wrong");
      }
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
