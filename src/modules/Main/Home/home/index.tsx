import { ANIMS_MANAGER } from "@/assets";
import { BaseRootView, useAppDispatch, useAppSelector, useGoogleSignin, useLayoutAnimation } from "@/common";
import { useFCM } from "@/configuration";
import { AppParamList, AuthAction, BottomParamList, authSelector } from "@/core";
import { UserAction } from "@/core/reduxs/reducers";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, useLinkTo } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

import { Button } from "@rneui/themed";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomParamList, "HOME">,
  StackScreenProps<AppParamList, "BOTTOM_TAB">
>;

export default function HomeScreen({ navigation }: Props) {
  useLayoutAnimation(ANIMS_MANAGER.layout.LayoutVerticalEaseInEase);

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const { isAuth } = useAppSelector(authSelector);

  const { signOut } = useGoogleSignin();

  const { pushNotification } = useFCM();

  function _handleLogout() {
    signOut();
    dispatch(AuthAction.clearCredentials());
    dispatch(UserAction.clearUser());
  }
  const linkTo = useLinkTo();

  return (
    <BaseRootView padding>
      {isAuth && <Button onPress={_handleLogout} title={t("button.sign_out")} />}
      <Button
        onPress={() => {
          dispatch(AuthAction.clearCredentials());
        }}
        title={"Logout"}
      />
      <Button
        title={"PUSH NOTIFICATION"}
        onPress={async () => {
          await pushNotification({});
        }}
      />
      <Button
        onPress={() => {
          navigation.navigate("BOTTOM_TAB", {
            screen: "ORDER",
            params: {
              userId: "123123",
            },
          });
        }}
        title={"Notification"}
      />
    </BaseRootView>
  );
}
