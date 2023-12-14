import { isEmail, isPassword, isPlatForm, useAppDispatch } from "@/common";
import { useFCM } from "@/configuration";
import {
  AlertAction,
  ISignUpNormalCredential,
  LoadingAction,
  NavigationServices,
  useSignUpNormalMutation,
} from "@/core";
import lodash from "lodash";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export const useSignUp = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const { getToken, pushNotification } = useFCM();

  const [credential, setCredential] = useState<ISignUpNormalCredential>({
    firstName: "Guest ",
    lastName: Math.floor(Math.random() * 1000000).toString(),
    confirmPassword: "",
    email: "",
    password: "",
    deviceToken: "",
    deviceType: isPlatForm(),
  });

  const [disable, setDisable] = useState<boolean>(false);

  const [signUpNormalMutation] = useSignUpNormalMutation();

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

    if (lodash.isEmpty(credential.confirmPassword)) {
      dispatch(
        AlertAction.showAlert({
          title: t("alert.default.title"),
          message: t("validation.confirm_password.required"),
          type: "error",
        }),
      );
      return false;
    }

    if (credential.password !== credential.confirmPassword) {
      dispatch(
        AlertAction.showAlert({
          title: t("alert.default.title"),
          message: t("validation.confirm_password.not_match"),
          type: "error",
        }),
      );
      return false;
    }

    return true;
  }, [credential]);

  const signUpNormal = useCallback(async () => {
    try {
      if (!validatorForm()) {
        return;
      }
      setDisable(true);
      dispatch(
        LoadingAction.showLoadingWithTitle(t("loading.sign_up") + "..."),
      );
      const res = await signUpNormalMutation({
        email: credential.email,
        password: credential.password,
        firstName: credential.firstName,
        confirmPassword: credential.confirmPassword,
        lastName: credential.lastName,
        deviceToken: await getToken(),
        deviceType: isPlatForm(),
      }).unwrap();

      if (res.statusCode === 201) {
        pushNotification({
          title: t("notification.sign_up_success.title"),
          body: t("notification.sign_up_success.message"),
        });

        dispatch(
          AlertAction.showAlert({
            title: t("alert.sign_up_success.title"),
            message: t("alert.sign_up_success.message"),
            type: "success",
            callback: () => {
              NavigationServices.goBack();
            },
          }),
        );
      } else {
        dispatch(
          AlertAction.showAlert({
            title: t("alert.sign_up_failed.title"),
            message: res.message,
            type: "error",
          }),
        );
      }
    } catch (e) {
      dispatch(
        AlertAction.showAlert({
          title: t("alert.sign_up_failed.title"),
          message: t("alert.sign_up_failed.message"),
          type: "error",
        }),
      );
    } finally {
      dispatch(LoadingAction.hideLoading());
      setDisable(false);
    }
  }, [credential]);

  const onChangeEmail = (email: string) => {
    setCredential((prev) => ({ ...prev, email: email.trim() }));
  };

  const onChangePassword = (password: string) => {
    setCredential((prev) => ({ ...prev, password: password.trim() }));
  };

  const onChangeConfirmPassword = (confirmPassword: string) => {
    setCredential((prev) => ({
      ...prev,
      confirmPassword: confirmPassword.trim(),
    }));
  };

  return {
    signUpNormal,
    credential,
    disable,
    onChangeEmail,
    onChangePassword,
    onChangeConfirmPassword,
  };
};
