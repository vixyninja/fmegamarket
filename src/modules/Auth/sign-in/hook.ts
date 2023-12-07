import { isEmail, isPassword, isPlatForm, useAppDispatch } from "@/common";
import { useFCM } from "@/configuration";
import { AlertAction, AuthAction, CredentialSignIn, LoadingAction, useSignInNormalMutation } from "@/core";
import lodash from "lodash";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";

export const useSignIn = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const [credential, setCredential] = useState<CredentialSignIn>({
    email: "nevergiveup2k3@gmail.com",
    password: "nevergiveup2k3",
    rememberMe: true,
    deviceToken: "",
    deviceType: isPlatForm(),
  });

  const { getToken, pushNotification, saveTokenToFirestore } = useFCM();

  const [signInNormal, { isLoading }] = useSignInNormalMutation();

  const validatorForm = useCallback(() => {
    if (lodash.isEmpty(credential.email)) {
      dispatch(
        AlertAction.showAlert({
          message: t("validation.email.required"),
          title: t("alert.default.title"),
          type: "error",
        }),
      );
      return false;
    }

    if (!isEmail(credential.email)) {
      dispatch(
        AlertAction.showAlert({
          title: t("alert.default.title"),
          message: t("validation.email.invalid"),
          type: "error",
        }),
      );
      return false;
    }

    if (lodash.isEmpty(credential.password)) {
      dispatch(
        AlertAction.showAlert({
          title: t("alert.default.title"),
          message: t("validation.password.required"),
          type: "error",
        }),
      );
      return false;
    }

    if (!isPassword(credential.password)) {
      dispatch(
        AlertAction.showAlert({
          title: t("alert.default.title"),
          message: t("validation.password.invalid"),
          type: "error",
        }),
      );
      return false;
    }

    return true;
  }, [credential]);

  const signIn = useCallback(async () => {
    if (!validatorForm()) {
      return;
    }

    dispatch(LoadingAction.showLoadingWithTitle(t("loading.sign_in") + "..."));
    await signInNormal({
      email: credential.email,
      password: credential.password,
      deviceToken: await getToken(),
      deviceType: isPlatForm(),
      rememberMe: credential.rememberMe,
    })
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          pushNotification({
            title: t("notification.sign_in_success.title"),
            body: t("notification.sign_in_success.message"),
          });
          saveTokenToFirestore("a2b3c4d5e6f7g8h9i10j11k12l13m14n15");
          dispatch(LoadingAction.hideLoading());
          dispatch(
            AuthAction.setCredentials({
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
              provider: "email",
              isAuth: true,
            }),
          );
        } else {
          dispatch(LoadingAction.hideLoading());
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
        dispatch(LoadingAction.hideLoading());
        dispatch(
          AlertAction.showAlert({
            title: t("alert.sign_in_failed.title"),
            message: t("alert.sign_in_failed.message"),
            type: "error",
          }),
        );
      });
  }, [credential]);

  const onChangeEmail = (email: string) => {
    setCredential((prev) => ({ ...prev, email: email.trim() }));
  };

  const onChangePassword = (password: string) => {
    setCredential((prev) => ({ ...prev, password: password.trim() }));
  };

  const onChangeRemember = () => {
    setCredential((prev) => ({ ...prev, rememberMe: !prev.rememberMe }));
  };

  return {
    credential,
    isLoading,
    onChangeEmail,
    onChangePassword,
    onChangeRemember,
    signIn,
    setCredential,
  };
};
