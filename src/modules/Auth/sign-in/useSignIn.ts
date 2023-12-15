import { isPlatForm, useAppDispatch } from "@/common";
import { useFCM } from "@/configuration";
import {
  AuthAction,
  ISignInNormalCredential,
  LoadingAction,
  UserAction,
  useSignInNormalMutation
} from "@/core";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export const useSignIn = () => {
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

  const signInNormal = useCallback(async () => {
    try {
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
        throw new Error(res.message);
      }
    } catch (error: any) {
      throw new Error(error.message);
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

  return {
    credential,
    onChangeEmail,
    onChangePassword,
    onChangeRemember,
    signInNormal,
    setCredential,
    isRemember,
    disable,
  };
};
