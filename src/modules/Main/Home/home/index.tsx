import { ANIMS_MANAGER } from "@/assets";
import { BaseRootView, useAppDispatch, useAppSelector, useGoogleSignin, useLayoutAnimation } from "@/common";
import { AppParamList, AuthAction, BottomParamList, authSelector } from "@/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, useLinkTo } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

import { Button } from "@rneui/themed";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomParamList, "HOME">,
  StackScreenProps<AppParamList, "BOTTOM_TAB">
>;

export default function HomeScreen({ navigation, route }: Props) {
  console.log(route.name);

  console.log(route.params?.userId);

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
      {isAuth && <Button onPress={_handleLogout} title={t("button.sign_out")} />}
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
