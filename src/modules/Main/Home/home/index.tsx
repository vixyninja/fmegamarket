import { ANIMS_MANAGER } from "@/assets";
import {
  BaseRootView,
  useAppDispatch,
  useAppSelector,
  useGoogleSignin,
  useLayoutAnimation,
} from "@/common";
import { AuthAction, authSelector } from "@/core";
import { useLinkTo } from "@react-navigation/native";

import { Button } from "@rneui/themed";
import React from "react";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  useLayoutAnimation(ANIMS_MANAGER.layout.LayoutEaseInEase);

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
      <Button
        onPress={() => {
          dispatch(AuthAction.clearCredentials());
        }}
        title={"Logout"}
      />
    </BaseRootView>
  );
}
