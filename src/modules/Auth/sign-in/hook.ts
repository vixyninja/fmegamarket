import { isEmail, isPassword, isPlatForm, useAppDispatch } from "@/common";
import { useFCM } from "@/configuration";
import {
  AlertAction,
  AuthAction,
  AuthParamList,
  ISignInNormalCredential,
  LoadingAction,
  UserAction,
  useSignInNormalMutation,
} from "@/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import lodash from "lodash";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export type UseSignInType = {
  navigation: NativeStackNavigationProp<
    AuthParamList,
    "SIGN_IN_SCREEN",
    undefined
  >;
};

export const useSignIn = (props: UseSignInType) => {
  const { navigation } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [signInNormalMutation] = useSignInNormalMutation();
  const { getToken, pushNotification, saveTokenToFirestore } = useFCM();
  const [disable, setDisable] = useState<boolean>(false);
  const [isRemember, setIsRemember] = useState<boolean>(false);
  const [credential, setCredential] = useState<ISignInNormalCredential>({
    email: "",
    password: "",
    deviceToken: "",
    deviceType: isPlatForm(),
  });

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

  const signInNormal = useCallback(async () => {
    try {
      if (!validatorForm()) {
        return;
      }
      setDisable(true);
      dispatch(
        LoadingAction.showLoadingWithTitle(t("loading.sign_in") + "..."),
      );
      const res = await signInNormalMutation({
        email: credential.email,
        password: credential.password,
        deviceToken: await getToken(),
        deviceType: isPlatForm(),
      }).unwrap();
      if (res.statusCode === 200) {
        await pushNotification({
          title: t("notification.sign_in_success.title"),
          body: t("notification.sign_in_success.message"),
        });
        await saveTokenToFirestore(res.data.user?.uuid!);
        dispatch(
          AuthAction.setCredentials({
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            provider: "email",
            isAuth: true,
            isRememberMe: isRemember,
          }),
        );
        dispatch(UserAction.setUser({ ...res.data.user }));
      } else {
        dispatch(
          AlertAction.showAlert({
            title: t("alert.sign_in_failed.title"),
            message: res.message,
            type: "error",
          }),
        );
      }
    } catch (error) {
      dispatch(
        AlertAction.showAlert({
          title: t("alert.sign_in_failed.title"),
          message: t("alert.sign_in_failed.message"),
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

  const onChangeRemember = () => {
    setIsRemember((prev) => !prev);
  };

  const onClickBack = useCallback(() => {
    navigation.canGoBack() && navigation.goBack();
  }, []);

  const onClickSignUp = useCallback(() => {
    navigation.navigate("SIGN_UP_SCREEN");
  }, []);

  const onClickOtherLogin = useCallback(() => {
    navigation.navigate("LOBBY_SCREEN");
  }, []);

  return {
    credential,
    onChangeEmail,
    onChangePassword,
    onChangeRemember,
    signInNormal,
    setCredential,
    isRemember,
    disable,
    onClickBack,
    onClickSignUp,
    onClickOtherLogin,
  };
};
