import { BottomParamList, ProfileGroupParamList } from "@/core";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";
import { Button, Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomParamList, "PROFILE">,
  StackScreenProps<ProfileGroupParamList, "PROFILE_SCREEN">
>;

export default function ProfileScreen({ navigation, route }: Props) {
  console.log(route.name);
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button
        title={"Notification"}
        onPress={() => {
          navigation.navigate("HOME", { screen: "NOTIFICATION_SCREEN" });
        }}
      />
      <Button
        title={"Setting"}
        onPress={() => {
          navigation.navigate("SETTING_SCREEN");
        }}
      />
    </View>
  );
}
