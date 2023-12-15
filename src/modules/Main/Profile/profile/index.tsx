import { useAppDispatch } from "@/common";
import { AppParamList, AuthAction, BottomParamList, UserAction } from "@/core";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Button, Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomParamList, "PROFILE">,
  StackScreenProps<AppParamList, "BOTTOM_TAB">
>;

export default function ProfileScreen({ navigation, route }: Props) {
  const dispatch = useAppDispatch();

  function handleSignOut() {
    dispatch(AuthAction.clearCredentials());
    dispatch(UserAction.clearUser());
  }

  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button
        title={"Home screen"}
        onPress={() => {
          navigation.navigate("BOTTOM_TAB", { screen: "HOME" });
        }}
      />
      <Button
        title={"Notification"}
        onPress={() => {
          navigation.navigate("NOTIFICATION_SCREEN");
        }}
      />
      <Button title={"Sign out"} onPress={handleSignOut} />
    </View>
  );
}
