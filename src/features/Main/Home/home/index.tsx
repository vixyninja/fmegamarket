import { useGoogleSignin } from "@hooks/useGoogleSignIn";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { AuthAction, authSelector } from "@libs/app_redux";
import { useLinkTo } from "@react-navigation/native";

import { Button } from "@rneui/themed";
import { BaseRootView } from "@wrappers/hoc";
import React from "react";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const { isAuth } = useAppSelector(authSelector);
  const { signOut } = useGoogleSignin();

  function _handleLogout() {
    signOut();
    dispatch(AuthAction.clearCredentials());
  }
  const linkTo = useLinkTo();

  return (
    <BaseRootView padding>
      {isAuth && (
        <Button onPress={_handleLogout} title={t("button.sign_out")} />
      )}
      <Button
        onPress={() => {
          linkTo("/BottomTab/Profile");
        }}
        title={"TEST"}
      />
    </BaseRootView>
  );
}
